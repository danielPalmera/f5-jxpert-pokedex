import { describe, expect, it } from "vitest";
import { Stats, SortFiltersOptions } from "./Stats";

describe("Stats", () => {
  it("has 6 stats", () => {
    expect(Object.keys(Stats)).toHaveLength(6);
  });

  it("includes hp with correct apiStatName", () => {
    expect(Stats.hp.apiStatName).toBe("hp");
  });

  it("includes special-attack apiStatName", () => {
    expect(Stats.specialAttack.apiStatName).toBe("special-attack");
  });

  it("each stat has a label", () => {
    for (const stat of Object.values(Stats)) {
      expect(stat.label).toBeTruthy();
    }
  });

  it("each stat has a StatShortName", () => {
    for (const stat of Object.values(Stats)) {
      expect(stat.StatShortName).toBeTruthy();
    }
  });
});

describe("SortFiltersOptions", () => {
  it("includes default entry", () => {
    expect(SortFiltersOptions.default).toBeDefined();
    expect(SortFiltersOptions.default.StatShortName).toBe("Default");
  });

  it("includes all stats", () => {
    for (const key of Object.keys(Stats)) {
      expect(SortFiltersOptions[key]).toBeDefined();
    }
  });

  it("has 7 entries (default + 6 stats)", () => {
    expect(Object.keys(SortFiltersOptions)).toHaveLength(7);
  });
});
