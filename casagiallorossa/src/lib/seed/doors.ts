import { CITIES } from "./cities";

export type DoorSeed = {
  doorId: string;
  citySlug: string;
  label: string;
  status: "active" | "paused";
};

export const DOORS: DoorSeed[] = CITIES.map((c) => ({
  doorId: `${c.slug}-001`,
  citySlug: c.slug,
  label: "Porta #001",
  status: "active",
}));
