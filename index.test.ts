import { describe, it, expect } from "vitest";
import { buildCommitMessage } from "./build-commit-message.ts";

describe("buildCommitMessage", () => {
  it("builds a basic commit message with type and message", () => {
    expect(buildCommitMessage("feat", "", "add user login", false)).toBe("feat: add user login");
  });

  it("includes scope when provided", () => {
    expect(buildCommitMessage("feat", "auth", "add user login", false)).toBe("feat(auth): add user login");
  });

  it("appends breaking change indicator when hasBreakingChanges is true", () => {
    expect(buildCommitMessage("feat", "", "rewrite API", true)).toBe("feat!: rewrite API");
  });

  it("supports scope and breaking changes together", () => {
    expect(buildCommitMessage("feat", "api", "rewrite endpoints", true)).toBe("feat(api)!: rewrite endpoints");
  });

  it("handles fix type", () => {
    expect(buildCommitMessage("fix", "", "null pointer", false)).toBe("fix: null pointer");
  });

  it("handles refactor type with scope and breaking changes", () => {
    expect(buildCommitMessage("refactor", "core", "extract module", true)).toBe("refactor(core)!: extract module");
  });

  it("handles docs type", () => {
    expect(buildCommitMessage("docs", "readme", "update install guide", false)).toBe(
      "docs(readme): update install guide",
    );
  });

  it("handles chore type with breaking changes", () => {
    expect(buildCommitMessage("chore", "", "drop Node 16", true)).toBe("chore!: drop Node 16");
  });

  it("handles empty message gracefully", () => {
    expect(buildCommitMessage("feat", "", "", false)).toBe("feat: ");
  });

  it("handles all conventional commit types", () => {
    const types = ["feat", "fix", "build", "chore", "ci", "docs", "style", "refactor", "perf", "test"];
    for (const type of types) {
      expect(buildCommitMessage(type, "", "change", false)).toBe(`${type}: change`);
    }
  });
});
