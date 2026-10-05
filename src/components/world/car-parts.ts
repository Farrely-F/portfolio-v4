export type PartTone = "fg" | "muted" | "purple" | "yellow" | "green" | "red"

/** Outline colors per car. The model itself is untextured; only edge tones differ between cars. */
export interface Livery {
  body: PartTone
  wing: PartTone
  wheel: PartTone
}

export const LIVERIES: Record<"player" | "leader" | "chaser", Livery> = {
  player: { body: "fg", wing: "yellow", wheel: "muted" },
  leader: { body: "purple", wing: "purple", wheel: "muted" },
  chaser: { body: "green", wing: "green", wheel: "muted" },
}
