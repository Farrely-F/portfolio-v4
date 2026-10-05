/** Shared race state. Written by the 3D sim every frame, read by the scene and the world scrim. */
export const race = {
  /** performance.now() when the start lights went out; 0 = still on the grid */
  launchAt: 0,
  /** world scroll speed in units/s (drives road, posts, wheels) */
  speed: 0,
  /** distance travelled along the circuit (world units); places static track features like the start grid */
  dist: 0,
  /** rear-wing flap opening, 0 closed .. 1 fully open */
  drs: 0,
  /** 0 = page content fully covers the world, 1 = world fully visible */
  reveal: 1,
  sim: { r1x: 13, r2x: 8, r1z: -0.6, r2z: 0.6, ownZ: 0, lineX: 40, tC: 0, kSide: 0, kFront: 0 },
}

export const LAUNCH_MS = 2800

/** 0 on the grid, easing to 1 (full throttle) after lights out. */
export function throttle(now: number): number {
  if (!race.launchAt) return 0
  const t = Math.min(1, (now - race.launchAt) / LAUNCH_MS)
  return 1 - Math.pow(1 - t, 3)
}

export function resetRace() {
  race.launchAt = 0
  race.dist = 0
}

export function launchRace() {
  race.launchAt = performance.now()
}
