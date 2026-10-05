/* eslint-disable react-hooks/immutability --
   imperative three.js: objects are mutated inside useFrame by design. */
"use client"

import { Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { LIVERIES, type Livery, type PartTone } from "./car-parts"
import { launchRace, race, resetRace, throttle } from "@/lib/race-state"
import { Environment } from "./environment"

const CSS_TONES: Record<Exclude<PartTone, "red">, string> = {
  fg: "--foreground",
  muted: "--muted-foreground",
  purple: "--sector-purple",
  yellow: "--sector-yellow",
  green: "--sector-green",
}

// phones get a lighter world: shorter draw distance, fewer particles, no MSAA, 1x pixel ratio
const LITE = typeof window !== "undefined" && window.innerWidth < 1024
const X_MIN = -16
const X_MAX = LITE ? 38 : 52
const SPAN = X_MAX - X_MIN
const STREAKS = LITE ? 20 : 48
const SPARKS = LITE ? 24 : 56

const sstep = (a: number, b: number, x: number) => THREE.MathUtils.smoothstep(x, a, b)
const clamp01 = (x: number) => Math.min(1, Math.max(0, x))
const lerp = THREE.MathUtils.lerp

/** Shared materials, recolored in place whenever the theme class on <html> changes. */
function useMaterials() {
  const scene = useThree((s) => s.scene)
  const mats = useMemo(() => {
    const line = {} as Record<PartTone, THREE.LineBasicMaterial>
    for (const t of ["fg", "muted", "purple", "yellow", "green", "red"] as PartTone[])
      line[t] = new THREE.LineBasicMaterial()
    return {
      line,
      fill: new THREE.MeshBasicMaterial({
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
        side: THREE.DoubleSide,
      }),
      road: new THREE.LineBasicMaterial({ transparent: true, opacity: 0.45 }),
      edge: new THREE.LineBasicMaterial({ transparent: true, opacity: 0.8 }),
      streak: new THREE.LineBasicMaterial({ transparent: true, opacity: 0.2 }),
      spark: new THREE.PointsMaterial({ size: 0.04, transparent: true, depthWrite: false }),
      envLine: new THREE.LineBasicMaterial({ transparent: true, opacity: 0.6 }),
      track: new THREE.MeshBasicMaterial(),
      runoff: new THREE.MeshBasicMaterial(),
      crowd: new THREE.PointsMaterial({ size: 0.1, transparent: true, opacity: 0.85, depthWrite: false }),
      win: new THREE.PointsMaterial({ size: 0.14, transparent: true, depthWrite: false }),
      star: new THREE.PointsMaterial({ size: 0.22, transparent: true, opacity: 0.7, depthWrite: false, fog: false }),
      curbA: new THREE.MeshBasicMaterial(),
      curbB: new THREE.MeshBasicMaterial(),
      post: new THREE.MeshBasicMaterial(),
      lamp: new THREE.MeshBasicMaterial(),
    }
  }, [])

  useEffect(() => {
    const sync = () => {
      const css = getComputedStyle(document.documentElement)
      const v = (name: string) => css.getPropertyValue(name).trim()
      for (const t of Object.keys(CSS_TONES) as Array<keyof typeof CSS_TONES>)
        mats.line[t].color.set(v(CSS_TONES[t]))
      mats.line.red.color.set("#ff3b30")
      const bg = v("--background")
      mats.fill.color.set(bg).lerp(new THREE.Color(v("--foreground")), 0.07)
      mats.road.color.set(v("--muted-foreground"))
      mats.edge.color.set(v("--foreground"))
      mats.envLine.color.set(v("--muted-foreground"))
      mats.track.color.set(bg).lerp(new THREE.Color(v("--foreground")), 0.028)
      mats.runoff.color.set(bg).lerp(new THREE.Color(v("--sector-green")), 0.03)
      mats.crowd.color.set(v("--muted-foreground"))
      mats.win.color.set(v("--sector-yellow"))
      mats.star.color.set(v("--foreground"))
      mats.streak.color.set(v("--foreground"))
      mats.spark.color.set(v("--sector-yellow"))
      mats.curbA.color.set(v("--sector-purple"))
      mats.curbB.color.set(v("--foreground"))
      mats.post.color.set(v("--muted-foreground"))
      mats.lamp.color.set(v("--sector-yellow"))
      scene.fog = new THREE.Fog(bg, 16, 58)
    }
    sync()
    const mo = new MutationObserver(sync)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => {
      mo.disconnect()
      scene.fog = null
    }
  }, [mats, scene])

  useEffect(
    () => () => {
      Object.values(mats.line).forEach((m) => m.dispose())
      ;[mats.fill, mats.road, mats.edge, mats.envLine, mats.track, mats.runoff, mats.crowd, mats.win, mats.star, mats.streak, mats.spark, mats.curbA, mats.curbB, mats.post, mats.lamp].forEach(
        (m) => m.dispose(),
      )
    },
    [mats],
  )

  return mats
}

export type Mats = ReturnType<typeof useMaterials>

/** Scroll beats: each <Interlude data-beat> reports travel through the viewport (t, 0..1) and how much of the viewport it covers. */
function useBeats() {
  const els = useRef<Record<string, HTMLElement | null>>({})
  return (id: string) => {
    let el = els.current[id]
    if (!el || !el.isConnected) {
      el = document.querySelector<HTMLElement>(`[data-beat="${id}"]`)
      els.current[id] = el
    }
    if (!el) return { t: 0, cover: 0 }
    const r = el.getBoundingClientRect()
    const vh = window.innerHeight
    const overlap = Math.min(r.bottom, vh) - Math.max(r.top, 0)
    return { t: clamp01((vh - r.top) / (vh + r.height)), cover: clamp01(overlap / vh) }
  }
}

/** The race script. Runs first each frame and publishes everything else reads. */
function Sim() {
  const beat = useBeats()

  useFrame((_, delta) => {
    const now = performance.now()
    const u = throttle(now)
    const { t: tA, cover: cA } = beat("a")
    const { t: tB, cover: cB } = beat("b")
    const { t: tC, cover: cC } = beat("c")
    const launch = race.launchAt ? sstep(0, 1, clamp01((now - race.launchAt) / 6000)) : 0

    const eA = sstep(0.08, 0.92, tA)
    const eB = sstep(0.08, 0.92, tB)
    const base2 = 8 - 3 * launch
    const r2x = lerp(base2, -16, eA) - 3 * sstep(0.2, 0.6, tC)
    const base1 = 13 - 2 * launch - 2 * eA
    const r1x = lerp(base1, -16, eB) - 3 * sstep(0.2, 0.6, tC)

    const bump = (t: number) => sstep(0.18, 0.32, t) - sstep(0.68, 0.84, t)
    const bA = bump(tA)
    const bB = bump(tB)
    const s = race.sim
    s.r1x = r1x
    s.r2x = r2x
    s.r2z = 0.6 + 0.5 * bA
    s.r1z = -0.6 - 0.5 * bB
    s.ownZ = -1.5 * bA + 1.5 * bB
    s.tC = tC
    // the line is crossed while the camera is still side-on; the swing to the front shot follows
    s.lineX = 34 - 44 * sstep(0, 0.5, tC)
    s.kSide = sstep(0.02, 0.35, tB)
    s.kFront = sstep(0.32, 0.6, tC)

    const armA = tA > 0.08 && tA < 0.92 && r2x < 6 && r2x > -2.5
    const armB = tB > 0.08 && tB < 0.92 && r1x < 6 && r1x > -2.5
    race.drs = THREE.MathUtils.damp(race.drs, (armA || armB) && u > 0.6 ? 1 : 0, 6, delta)

    const decel = sstep(0.3, 0.6, tC)
    race.dist += race.speed * delta
    race.speed = (0.8 + 16 * u) * (1 + 0.3 * race.drs) * (1 - 0.88 * decel)

    // the world is only unscrimmed while an interlude (nearly) fills the viewport, so text never sits on it
    const seen = (cover: number) => sstep(0.45, 0.95, cover)
    const heroReveal = 1 - sstep(0.5, 1, window.scrollY / window.innerHeight)
    // the footer keeps a faint look at the front-on finish shot behind it
    const target = Math.max(heroReveal, seen(cA), seen(cB), seen(cC), 0.16 * s.kFront)
    race.reveal = THREE.MathUtils.damp(race.reveal, target, 5, delta)
  })

  return null
}

/** Three shots: rear chase -> right side (beat 2) -> front, tight on the driver and halo (finish). */
const SHOT = {
  close: { pos: [-5.3, 1.25, 1.0], look: [-2.3, 0.85, -1.1], fov: 28 },
  rear: { pos: [-11, 2.1, 0.6], look: [5, 0.5, -2.4], fov: 34 },
  side: { pos: [0.5, 1.5, 9.8], look: [-0.6, 0.7, 0], fov: 36 },
  front: { pos: [3.9, 1.1, 0.8], look: [0.3, 0.82, 0], fov: 24 },
} as const
const _pos = new THREE.Vector3()
const _look = new THREE.Vector3()
const _a = new THREE.Vector3()
const _b = new THREE.Vector3()

function Rig() {
  useFrame((state) => {
    const cam = state.camera as THREE.PerspectiveCamera
    const { pointer } = state
    const now = performance.now()
    const since = race.launchAt ? now - race.launchAt : Infinity
    const burst = Math.max(0, 1 - since / 900)
    const shake = burst * 0.08
    const { kSide, kFront } = race.sim
    const d = race.drs * (1 - kSide) // the DRS dolly only belongs to the rear shot

    // scroll-driven opening: tight on the rear wing at the top, pulling back to the rear chase shot as you scroll the hero
    const intro = sstep(0, 0.9, clamp01(window.scrollY / window.innerHeight))
    const kIntro = 1 - intro

    // rear shot, with the DRS dolly and a little parallax
    _pos.set(SHOT.rear.pos[0] + 1.8 * d, SHOT.rear.pos[1] - 0.85 * d, SHOT.rear.pos[2] + pointer.x * 1.2)
    _look.set(SHOT.rear.look[0], SHOT.rear.look[1], SHOT.rear.look[2])
    let fov = SHOT.rear.fov + 8 * d + 6 * Math.sin(Math.min(1, since / 900) * Math.PI) + throttle(now) * 3
    _pos.lerp(_a.set(SHOT.close.pos[0], SHOT.close.pos[1], SHOT.close.pos[2]), kIntro)
    _look.lerp(_b.set(SHOT.close.look[0], SHOT.close.look[1], SHOT.close.look[2]), kIntro)
    fov = THREE.MathUtils.lerp(fov, SHOT.close.fov, kIntro)

    const blend = (shot: { pos: readonly number[]; look: readonly number[]; fov: number }, k: number, dFov = 0) => {
      _pos.lerp(_a.set(shot.pos[0], shot.pos[1], shot.pos[2]), k)
      _look.lerp(_b.set(shot.look[0], shot.look[1], shot.look[2]), k)
      fov = THREE.MathUtils.lerp(fov, shot.fov + dFov, k)
    }
    blend(SHOT.side, kSide, 3 * race.drs)
    blend(SHOT.front, kFront)

    // portrait screens: widen the lens and back the camera off per shot so the car still fits. The desktop framing
    // pushes the car right to clear the copy; in portrait the copy is above, so center the car and sit it low in the hero.
    const aspect = state.size.width / state.size.height
    if (aspect < 1.2) {
      const k = 1.2 / aspect - 1
      const mix = (rear: number, side: number, front: number) =>
        THREE.MathUtils.lerp(THREE.MathUtils.lerp(rear, side, kSide), front, kFront)
      fov *= 1 + k * mix(0.1, 0.22, 0.16)
      _look.z *= 0.1 * (1 - kSide)
      _look.x += 0.6 * kSide * (1 - kFront)
      _pos.sub(_look).multiplyScalar(1 + k * mix(0.12, 0.3, 0.2)).add(_look)
      const top = 1 - sstep(0, 0.8, clamp01(window.scrollY / window.innerHeight))
      cam.setViewOffset(state.size.width, state.size.height, 0, -state.size.height * (0.26 * top + 0.02), state.size.width, state.size.height)
    } else if (cam.view?.enabled) {
      cam.clearViewOffset()
    }

    cam.position.set(
      _pos.x + pointer.x * 0.25 * kFront + (Math.random() - 0.5) * shake,
      _pos.y + pointer.y * (0.4 - 0.25 * kFront) + (Math.random() - 0.5) * shake,
      _pos.z + pointer.x * 0.3 * kFront,
    )
    if (Math.abs(cam.fov - fov) > 0.01) {
      cam.fov = fov
      cam.updateProjectionMatrix()
    }
    cam.lookAt(_look)
  })
  return null
}

const MODEL_URL = "/models/rb22.glb"
const EDGE_ANGLE = 28

interface CarHandle {
  group: THREE.Group | null
  flap: THREE.Group | null
  wheels: Array<THREE.Group | null>
}

interface ModelPart {
  name: string
  geometry: THREE.BufferGeometry
  edges: THREE.EdgesGeometry
  pivot: THREE.Vector3
}

/** Outline-ready RB22 (untextured): body, rear-wing flap, 4 wheels. Pivots sit at the hinge / hub. */
function useCarModel() {
  const gltf = useLoader(GLTFLoader, MODEL_URL)
  return useMemo(() => {
    const parts: ModelPart[] = []
    gltf.scene.traverse((o) => {
      const m = o as THREE.Mesh
      if (!m.isMesh) return
      parts.push({
        name: m.name,
        geometry: m.geometry,
        edges: new THREE.EdgesGeometry(m.geometry, EDGE_ANGLE),
        pivot: m.getWorldPosition(new THREE.Vector3()),
      })
    })
    return parts
  }, [gltf])
}

function Car({
  parts,
  livery,
  handle,
  mats,
  children,
}: {
  parts: ModelPart[]
  livery: Livery
  handle: CarHandle
  mats: Mats
  children?: ReactNode
}) {
  return (
    <group
      ref={(el) => {
        handle.group = el
      }}
    >
      {parts.map((p) => {
        const isWheel = p.name.startsWith("wheel")
        const tone = p.name === "flap" ? livery.wing : isWheel ? livery.wheel : livery.body
        const inner = (
          <>
            <mesh geometry={p.geometry} material={mats.fill} />
            <lineSegments geometry={p.edges} material={mats.line[tone]} />
          </>
        )
        if (p.name === "body") return <group key={p.name}>{inner}</group>
        return (
          <group
            key={p.name}
            position={p.pivot}
            ref={(el) => {
              if (p.name === "flap") handle.flap = el
              else handle.wheels[["wheel_fl", "wheel_fr", "wheel_rl", "wheel_rr"].indexOf(p.name)] = el
            }}
          >
            {inner}
          </group>
        )
      })}
      {children}
    </group>
  )
}

/** Exhaust sparks in the player's local space. */
function Sparks({ mats }: { mats: Mats }) {
  const spark = useMemo(() => {
    const pos = new Float32Array(SPARKS * 3).fill(-100)
    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3))
    return { geo, pos, vel: new Float32Array(SPARKS * 3), life: new Float32Array(SPARKS), cursor: 0, acc: 0 }
  }, [])
  useEffect(() => () => spark.geo.dispose(), [spark])

  useFrame((_, delta) => {
    const rate = race.speed > 4 ? 24 + 3 * race.speed + race.drs * 30 : 0
    spark.acc += delta * rate
    while (spark.acc >= 1) {
      spark.acc -= 1
      const k = spark.cursor++ % SPARKS
      spark.pos.set([-2.5, 0.15 + Math.random() * 0.12, (Math.random() - 0.5) * 0.5], k * 3)
      spark.vel.set([-(3 + race.speed * 0.4 + Math.random() * 2), 0.8 + Math.random() * 2, (Math.random() - 0.5) * 1.6], k * 3)
      spark.life[k] = 0.4 + Math.random() * 0.4
    }
    for (let k = 0; k < SPARKS; k++) {
      if (spark.life[k] <= 0) {
        spark.pos[k * 3 + 1] = -100
        continue
      }
      spark.life[k] -= delta
      spark.vel[k * 3 + 1] -= 6 * delta
      spark.pos[k * 3] += spark.vel[k * 3] * delta
      spark.pos[k * 3 + 1] = Math.max(0.02, spark.pos[k * 3 + 1] + spark.vel[k * 3 + 1] * delta)
      spark.pos[k * 3 + 2] += spark.vel[k * 3 + 2] * delta
    }
    spark.geo.attributes.position.needsUpdate = true
  })

  return <points geometry={spark.geo} material={mats.spark} frustumCulled={false} />
}

function Cars({ mats }: { mats: Mats }) {
  const parts = useCarModel()
  const handles = useMemo(
    () => ({
      us: { group: null, flap: null, wheels: [] } as CarHandle,
      r1: { group: null, flap: null, wheels: [] } as CarHandle,
      r2: { group: null, flap: null, wheels: [] } as CarHandle,
    }),
    [],
  )
  const prevZ = useRef(0)

  useEffect(() => () => parts.forEach((p) => p.edges.dispose()), [parts])

  // the race launches a beat after the cars appear
  useEffect(() => {
    const id = window.setTimeout(launchRace, 900)
    return () => {
      clearTimeout(id)
      resetRace()
    }
  }, [])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const s = race.sim
    const spin = (delta * race.speed) / 0.34

    const dz = (s.ownZ - prevZ.current) / Math.max(delta, 1e-3)
    prevZ.current = s.ownZ
    const us = handles.us.group
    if (us) {
      us.position.set(0, Math.sin(t * 58) * 0.004 * (0.4 + race.speed / 17) + Math.sin(t * 2) * 0.01, s.ownZ)
      us.rotation.y = THREE.MathUtils.clamp(-dz * 0.1, -0.35, 0.35)
      us.rotation.x = THREE.MathUtils.clamp(dz * 0.03, -0.12, 0.12)
    }
    const r1 = handles.r1.group
    if (r1) {
      r1.position.set(s.r1x, 0, s.r1z)
      r1.rotation.y = Math.sin(t * 0.7) * 0.02
    }
    const r2 = handles.r2.group
    if (r2) {
      r2.position.set(s.r2x, 0, s.r2z)
      r2.rotation.y = Math.sin(t * 0.9 + 1) * 0.02
    }
    // wheels roll about the car's lateral (z) axis
    ;[handles.us, handles.r1, handles.r2].forEach((h) => h.wheels.forEach((g) => g && (g.rotation.z -= spin)))
    if (handles.us.flap) handles.us.flap.rotation.z = race.drs * 0.25
  })

  return (
    <>
      <Car parts={parts} livery={LIVERIES.player} handle={handles.us} mats={mats}>
        <Sparks mats={mats} />
      </Car>
      <Car parts={parts} livery={LIVERIES.leader} handle={handles.r1} mats={mats} />
      <Car parts={parts} livery={LIVERIES.chaser} handle={handles.r2} mats={mats} />
    </>
  )
}

function Streaks({ mats }: { mats: Mats }) {
  const [data] = useState(() =>
    Array.from({ length: STREAKS }, () => ({
      x: X_MIN + Math.random() * SPAN,
      y: 0.15 + Math.random() * 2.6,
      z: (Math.random() < 0.5 ? -1 : 1) * (1.4 + Math.random() * 2.8),
      len: 0.5 + Math.random() * 1.6,
      v: 0.6 + Math.random() * 0.8,
    })),
  )
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(STREAKS * 6), 3))
    return g
  }, [])
  useEffect(() => () => geo.dispose(), [geo])

  useFrame((_, delta) => {
    const k = Math.min(1, race.speed / 17)
    const pos = geo.attributes.position as THREE.BufferAttribute
    data.forEach((s, i) => {
      s.x -= delta * s.v * race.speed * 1.4
      if (s.x < X_MIN) s.x = X_MAX
      const len = s.len * (0.15 + 2.4 * k)
      pos.setXYZ(i * 2, s.x, s.y, s.z)
      pos.setXYZ(i * 2 + 1, s.x + len, s.y, s.z)
    })
    pos.needsUpdate = true
    mats.streak.opacity = 0.06 + 0.4 * k
  })

  return <lineSegments geometry={geo} material={mats.streak} frustumCulled={false} />
}

function FinishLine({ mats }: { mats: Mats }) {
  const group = useRef<THREE.Group>(null)
  const tiles = useMemo(() => {
    const out: Array<{ x: number; z: number; odd: boolean }> = []
    for (let c = 0; c < 3; c++) for (let r = 0; r < 12; r++) out.push({ x: c * 0.5 - 0.5, z: -2.75 + r * 0.5, odd: (c + r) % 2 === 1 })
    return out
  }, [])

  useFrame(() => {
    if (!group.current) return
    group.current.position.x = race.sim.lineX
    group.current.visible = race.sim.tC > 0.02
  })

  return (
    <group ref={group} position={[40, 0, 0]} visible={false}>
      {tiles.map((t, i) => (
        <mesh key={i} position={[t.x, 0.012, t.z + 0.25]} material={t.odd ? mats.curbB : mats.post}>
          <boxGeometry args={[0.5, 0.02, 0.5]} />
        </mesh>
      ))}
      <mesh position={[0, 3.1, 0]} material={mats.curbB}>
        <boxGeometry args={[0.5, 0.45, 7.4]} />
      </mesh>
      {[-3.6, 3.6].map((z) => (
        <mesh key={z} position={[0, 1.55, z]} material={mats.post}>
          <boxGeometry args={[0.3, 3.1, 0.3]} />
        </mesh>
      ))}
    </group>
  )
}

function Scene() {
  const mats = useMaterials()
  return (
    <>
      <Sim />
      <Rig />
      <Environment mats={mats} />
      <Streaks mats={mats} />
      <FinishLine mats={mats} />
      <Suspense fallback={null}>
        <Cars mats={mats} />
      </Suspense>
    </>
  )
}

export default function RaceWorld({ active }: { active: boolean }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={LITE ? 1 : [1, 1.5]}
      camera={{ position: [-11, 2.1, 0.6], fov: 34, near: 0.1, far: 80 }}
      gl={{ alpha: true, antialias: !LITE, powerPreference: "high-performance" }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
      aria-hidden
    >
      <Scene />
    </Canvas>
  )
}
