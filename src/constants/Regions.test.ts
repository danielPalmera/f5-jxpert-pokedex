import { describe, expect, it } from "vitest";
import { Regions } from "./Regions";

describe("Regions", () => {
  it("has all expected regions", () => {
    expect(Object.keys(Regions)).toEqual([
      "kanto",
      "johto",
      "hoenn",
      "sinnoh",
      "unova",
      "kalos",
      "alola",
      "galar",
      "paldea",
    ]);
  });

  it("each region has start >= 0", () => {
    for (const region of Object.values(Regions)) {
      expect(region.start).toBeGreaterThanOrEqual(0);
    }
  });

  it("each region has end > 0", () => {
    for (const region of Object.values(Regions)) {
      expect(region.end).toBeGreaterThan(0);
    }
  });

  it("kanto has correct offset/limit", () => {
    expect(Regions.kanto).toEqual({ start: 0, end: 151 });
  });

  it("johto starts at 151", () => {
    expect(Regions.johto.start).toBe(151);
  });

  it("regions are in generation order", () => {
    const starts = Object.values(Regions).map((r) => r.start);
    for (let i = 1; i < starts.length; i++) {
      expect(starts[i]).toBeGreaterThanOrEqual(starts[i - 1]);
    }
  });
});
