import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const bootstrapSource = readFileSync(join(process.cwd(), "cms/src/index.ts"), "utf8");

describe("Strapi public permissions", () => {
  it("does not grant public lead creation", () => {
    const readonlyActionsMatch = bootstrapSource.match(/const readonlyActions = \[([\s\S]*?)\];/);

    expect(readonlyActionsMatch?.[1]).toBeDefined();
    expect(readonlyActionsMatch?.[1]).not.toContain('"api::lead.lead.create"');
  });

  it("removes stale public lead creation grants on bootstrap", () => {
    expect(bootstrapSource).toContain('action: "api::lead.lead.create"');
    expect(bootstrapSource).toContain("deleteMany");
    expect(bootstrapSource).toContain("role: publicRole.id");
  });
});
