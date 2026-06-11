import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { buildCommitMessage } from "./build-commit-message.ts";

await describe("buildCommitMessage", async () => {
  await it("builds a basic commit message with type and message", () => {
    assert.equal(buildCommitMessage("feat", "", "add user login", false), "feat: add user login");
  });

  await it("includes scope when provided", () => {
    assert.equal(buildCommitMessage("feat", "auth", "add user login", false), "feat(auth): add user login");
  });

  await it("appends breaking change indicator when hasBreakingChanges is true", () => {
    assert.equal(buildCommitMessage("feat", "", "rewrite API", true), "feat!: rewrite API");
  });

  await it("supports scope and breaking changes together", () => {
    assert.equal(buildCommitMessage("feat", "api", "rewrite endpoints", true), "feat(api)!: rewrite endpoints");
  });

  await it("handles fix type", () => {
    assert.equal(buildCommitMessage("fix", "", "null pointer", false), "fix: null pointer");
  });

  await it("handles refactor type with scope and breaking changes", () => {
    assert.equal(buildCommitMessage("refactor", "core", "extract module", true), "refactor(core)!: extract module");
  });

  await it("handles docs type", () => {
    assert.equal(
      buildCommitMessage("docs", "readme", "update install guide", false),
      "docs(readme): update install guide",
    );
  });

  await it("handles chore type with breaking changes", () => {
    assert.equal(buildCommitMessage("chore", "", "drop Node 16", true), "chore!: drop Node 16");
  });

  await it("handles empty message gracefully", () => {
    assert.equal(buildCommitMessage("feat", "", "", false), "feat: ");
  });

  await it("handles all conventional commit types", () => {
    const types = ["feat", "fix", "build", "chore", "ci", "docs", "style", "refactor", "perf", "test"];
    for (const type of types) {
      assert.equal(buildCommitMessage(type, "", "change", false), `${type}: change`);
    }
  });
});
