"use client"

import { useEffect, useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"
import { race } from "@/lib/race-state"
import type { Mats } from "./race-world"

/**
 * The circuit, authored as three repeating segments that scroll past as a belt. Everything static in a
 * segment is merged into a handful of geometries (one fill + one edge set per role) so it stays cheap,
 * and structures use the same hidden-line look as the car: dark fill, thin outline.
 */

const SEG_LEN = 40
const SEGS = 3
const BELT_X0 = -18
const LITE = typeof window !== "undefined" && window.innerWidth < 1024

type Role = "struct" | "accent" | "curb2" | "lamp"
const ROLES: Role[] = ["struct", "accent", "curb2", "lamp"]

function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface Built {
  fills: Partial<Record<Role, THREE.BufferGeometry>>
  edges?: THREE.BufferGeometry
  faint?: THREE.BufferGeometry
  crowd?: THREE.BufferGeometry
  win?: THREE.BufferGeometry
}

class Builder {
  private boxes: Record<Role, THREE.BufferGeometry[]> = { struct: [], accent: [], curb2: [], lamp: [] }
  private faint: number[] = []
  crowd: number[] = []
  win: number[] = []

  box(role: Role, x0: number, x1: number, y0: number, y1: number, z0: number, z1: number) {
    const g = new THREE.BoxGeometry(x1 - x0, y1 - y0, z1 - z0)
    g.translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2)
    this.boxes[role].push(g)
  }

  line(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number) {
    this.faint.push(x0, y0, z0, x1, y1, z1)
  }

  private points(data: number[]) {
    if (!data.length) return undefined
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.Float32BufferAttribute(data, 3))
    return g
  }

  build(): Built {
    const out: Built = { fills: {} }
    for (const role of ROLES) {
      const list = this.boxes[role]
      if (!list.length) continue
      const merged = mergeGeometries(list, false)
      list.forEach((g) => g.dispose())
      if (!merged) continue
      out.fills[role] = merged
      if (role === "struct") out.edges = new THREE.EdgesGeometry(merged, 24)
    }
    if (this.faint.length) {
      out.faint = new THREE.BufferGeometry()
      out.faint.setAttribute("position", new THREE.Float32BufferAttribute(this.faint, 3))
    }
    out.crowd = this.points(this.crowd)
    out.win = this.points(this.win)
    return out
  }
}

/** One side of the circuit (s = +1 near side, -1 far side): barrier, fence, floodlights, towers, skyline. */
function side(b: Builder, s: 1 | -1, r: () => number) {
  const zr = (a: number, c: number): [number, number] => (s > 0 ? [a, c] : [-c, -a])

  // concrete barrier blocks: the seams read as outlines
  for (let x = 0; x < SEG_LEN; x += 2) {
    const [z0, z1] = zr(5.1, 5.4)
    b.box("struct", x, x + 1.96, 0, 0.95, z0, z1)
  }
  // catch fencing: posts leaning toward the track + wire runs
  for (let x = 0; x < SEG_LEN; x += 4) {
    const [a, c] = zr(5.4, 5.5)
    b.box("struct", x, x + 0.08, 0.95, 4.2, a, c)
    const [d, e] = zr(5.0, 5.5)
    b.box("struct", x, x + 0.08, 4.1, 4.2, d, e)
  }
  for (const y of [1.6, 2.4, 3.2, 4.0]) b.line(0, y, s * 5.5, SEG_LEN, y, s * 5.5)

  // floodlight poles with arms
  const off = 2 + r() * 6
  for (let x = off; x < SEG_LEN - 1; x += 10) {
    const [a, c] = zr(6.4, 6.5)
    b.box("struct", x, x + 0.1, 0, 7, a, c)
    const [d, e] = zr(5.6, 6.5)
    b.box("struct", x, x + 0.1, 6.95, 7.05, d, e)
    const [f, g] = zr(5.3, 6.0)
    b.box("lamp", x - 0.15, x + 0.25, 6.85, 6.93, f, g)
  }

  // big floodlight tower
  const tx = SEG_LEN * (0.25 + 0.5 * r())
  const [t0, t1] = zr(13, 13.3)
  b.box("struct", tx, tx + 0.3, 0, 16, t0, t1)
  const [l0, l1] = zr(12.7, 12.9)
  b.box("lamp", tx - 1.5, tx + 1.8, 15.2, 16.6, l0, l1)

  // night skyline with lit windows
  const count = LITE ? 4 : 7
  for (let i = 0; i < count; i++) {
    const w = 3 + r() * 5
    const h = 4 + r() * 13
    const x = r() * (SEG_LEN - w)
    const zz = 26 + r() * 14
    const d = 4 + r() * 4
    const [z0, z1] = zr(zz, zz + d)
    b.box("struct", x, x + w, 0, h, z0, z1)
    const n = LITE ? 3 : 7
    for (let k = 0; k < n; k++) b.win.push(x + r() * w, 0.8 + r() * (h - 1.4), s * zz)
  }
}

function grandstand(b: Builder, x0: number, x1: number, r: () => number) {
  const TIERS = 6
  for (let k = 0; k < TIERS; k++) {
    const za = -7.2 - 1.2 * k
    const zb = za - 1.2
    const top = 0.8 + 0.9 * k
    b.box("struct", x0, x1, 0, top, zb, za)
    if (!LITE || k % 2 === 0) {
      for (let x = x0 + 0.3; x < x1 - 0.2; x += LITE ? 0.8 : 0.45) {
        for (const dz of [0.35, 0.85]) {
          const p = [x + (r() - 0.5) * 0.2, top + 0.32, za - dz]
          ;(r() < 0.12 ? b.win : b.crowd).push(...p)
        }
      }
    }
  }
  // roof canopy on posts
  b.box("struct", x0 - 1, x1 + 1, 8.3, 8.55, -15.6, -6.8)
  for (let x = x0; x <= x1; x += 6) b.box("struct", x, x + 0.18, 0, 8.3, -15.4, -15.2)
}

function author(variant: number) {
  const r = rng(1337 + variant * 7919)
  const low = new Builder()
  const far = new Builder()
  const near = new Builder()

  // curbs: solid sector-colored rumble strips on both edges
  for (let i = 0; i < SEG_LEN / 0.9; i++) {
    const x = i * 0.9
    const role: Role = i % 2 ? "accent" : "curb2"
    low.box(role, x, x + 0.85, 0, 0.035, 2.6, 2.95)
    low.box(role, x, x + 0.85, 0, 0.035, -2.95, -2.6)
  }
  // asphalt seams and a faint racing line
  for (let x = 0; x < SEG_LEN; x += 4) low.line(x, 0.003, -2.5, x, 0.003, 2.5)
  low.line(0, 0.003, -0.5, SEG_LEN, 0.003, -0.5)
  low.line(0, 0.003, 1.0, SEG_LEN, 0.003, 1.0)

  side(far, -1, r)
  side(near, 1, r)

  // overhead gantry you drive under; the near pillar lives with the near-side group
  const gx = [12, 30, 20][variant % 3]
  far.box("struct", gx - 0.25, gx + 0.25, 0, 6.4, -5.8, -5.3)
  near.box("struct", gx - 0.25, gx + 0.25, 0, 6.4, 5.3, 5.8)
  far.box("struct", gx - 0.35, gx + 0.35, 6.1, 7.1, -5.8, 5.8)
  far.box("lamp", gx - 0.1, gx + 0.1, 6.0, 6.1, -5.2, 5.2)
  far.box("accent", gx - 0.05, gx + 0.05, 5.2, 6.0, -3.8, -1.9)
  far.box("curb2", gx - 0.05, gx + 0.05, 5.2, 6.0, 0.9, 2.8)

  const [gs0, gs1] = [
    [4, 28],
    [10, 36],
    [2, 24],
  ][variant % 3]
  grandstand(far, gs0, gs1, r)

  return { low: low.build(), far: far.build(), near: near.build() }
}

function BuiltGroup({ built, mats }: { built: Built; mats: Mats }) {
  const fillMat: Record<Role, THREE.Material> = {
    struct: mats.fill,
    accent: mats.curbA,
    curb2: mats.curbB,
    lamp: mats.lamp,
  }
  return (
    <>
      {ROLES.map((role) => {
        const g = built.fills[role]
        return g ? <mesh key={role} geometry={g} material={fillMat[role]} frustumCulled={false} /> : null
      })}
      {built.edges && <lineSegments geometry={built.edges} material={mats.envLine} frustumCulled={false} />}
      {built.faint && <lineSegments geometry={built.faint} material={mats.road} frustumCulled={false} />}
      {built.crowd && <points geometry={built.crowd} material={mats.crowd} frustumCulled={false} />}
      {built.win && <points geometry={built.win} material={mats.win} frustumCulled={false} />}
    </>
  )
}

/** Painted slots under the cars at the start; static in the world, so they fall behind as the race launches. */
function StartGrid({ mats }: { mats: Mats }) {
  const group = useRef<THREE.Group>(null)
  const slots = useMemo(
    () => [
      { x: 0, z: 0 },
      { x: 8, z: 0.6 },
      { x: 13, z: -0.6 },
    ],
    [],
  )
  useFrame(() => {
    if (!group.current) return
    group.current.position.x = -race.dist
    group.current.visible = race.dist < 60
  })
  return (
    <group ref={group}>
      {slots.map((s, i) => (
        <group key={i} position={[s.x, 0.012, s.z]}>
          {[-0.95, 0.95].map((dz) => (
            <mesh key={dz} position={[-0.2, 0, dz]} material={mats.curbB}>
              <boxGeometry args={[4.6, 0.01, 0.07]} />
            </mesh>
          ))}
          <mesh position={[2.1, 0, 0]} material={mats.curbB}>
            <boxGeometry args={[0.07, 0.01, 1.9]} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function Stars({ mats }: { mats: Mats }) {
  const geo = useMemo(() => {
    const r = rng(42)
    const n = LITE ? 80 : 180
    const p: number[] = []
    for (let i = 0; i < n; i++) {
      const a = r() * Math.PI * 2
      const el = 0.18 + r() * 0.9
      const R = 70
      p.push(Math.cos(a) * Math.cos(el) * R, Math.sin(el) * R, Math.sin(a) * Math.cos(el) * R)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.Float32BufferAttribute(p, 3))
    return g
  }, [])
  useEffect(() => () => geo.dispose(), [geo])
  return <points geometry={geo} material={mats.star} frustumCulled={false} />
}

export function Environment({ mats }: { mats: Mats }) {
  const variants = useMemo(() => [author(0), author(1), author(2)], [])
  const planes = useMemo(() => {
    const track = new THREE.PlaneGeometry(SEG_LEN, 5.2).rotateX(-Math.PI / 2).translate(SEG_LEN / 2, -0.002, 0)
    const runoff = new THREE.PlaneGeometry(SEG_LEN, 10.8).rotateX(-Math.PI / 2).translate(SEG_LEN / 2, -0.004, 0)
    return { track, runoff }
  }, [])
  const edgeGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute(
      "position",
      new THREE.Float32BufferAttribute([-30, 0.006, -2.5, 120, 0.006, -2.5, -30, 0.006, 2.5, 120, 0.006, 2.5], 3),
    )
    return g
  }, [])
  const segs = useRef<Array<THREE.Group | null>>([])
  const nears = useRef<Array<THREE.Group | null>>([])

  useEffect(
    () => () => {
      planes.track.dispose()
      planes.runoff.dispose()
      edgeGeo.dispose()
      variants.forEach((v) =>
        [v.low, v.far, v.near].forEach((b) => {
          Object.values(b.fills).forEach((g) => g?.dispose())
          ;[b.edges, b.faint, b.crowd, b.win].forEach((g) => g?.dispose())
        }),
      )
    },
    [planes, edgeGeo, variants],
  )

  useFrame(() => {
    const total = SEG_LEN * SEGS
    // near-side structures would cut across the right-side shot
    const hideNear = race.sim.kSide > 0.2 && race.sim.kFront < 0.7
    for (let i = 0; i < SEGS; i++) {
      const g = segs.current[i]
      if (g) g.position.x = BELT_X0 - SEG_LEN + ((((i * SEG_LEN - race.dist) % total) + total) % total)
      const n = nears.current[i]
      if (n) n.visible = !hideNear
    }
  })

  return (
    <group>
      <lineSegments geometry={edgeGeo} material={mats.edge} frustumCulled={false} />
      {variants.map((v, i) => (
        <group
          key={i}
          ref={(el) => {
            segs.current[i] = el
          }}
        >
          <mesh geometry={planes.runoff} material={mats.runoff} frustumCulled={false} />
          <mesh geometry={planes.track} material={mats.track} frustumCulled={false} />
          <BuiltGroup built={v.low} mats={mats} />
          <BuiltGroup built={v.far} mats={mats} />
          <group
            ref={(el) => {
              nears.current[i] = el
            }}
          >
            <BuiltGroup built={v.near} mats={mats} />
          </group>
        </group>
      ))}
      <StartGrid mats={mats} />
      <Stars mats={mats} />
    </group>
  )
}
