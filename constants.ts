import type { CommitType } from "./types.ts";

export const commitTypes: CommitType[] = [
  { id: "feat", value: "feat", hint: "new feature" },
  { id: "fix", value: "fix" },
  { id: "build", value: "build" },
  { id: "chore", value: "chore" },
  { id: "ci", value: "ci" },
  { id: "docs", value: "docs" },
  { id: "style", value: "style" },
  { id: "refactor", value: "refactor" },
  { id: "perf", value: "perf" },
  { id: "test", value: "test" },
];
