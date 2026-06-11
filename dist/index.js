#!/usr/bin/env node

// index.ts
import { autocomplete, cancel, intro, isCancel, outro, text, confirm } from "@clack/prompts";

// constants.ts
var commitTypes = [
  { id: "feat", value: "feat", hint: "new feature" },
  { id: "fix", value: "fix" },
  { id: "build", value: "build" },
  { id: "chore", value: "chore" },
  { id: "ci", value: "ci" },
  { id: "docs", value: "docs" },
  { id: "style", value: "style" },
  { id: "refactor", value: "refactor" },
  { id: "perf", value: "perf" },
  { id: "test", value: "test" }
];

// index.ts
import { execa } from "execa";

// build-commit-message.ts
function buildCommitMessage(type2, scope2, message2, hasBreakingChanges2) {
  let commitMessage2 = type2;
  if (scope2) commitMessage2 += `(${scope2})`;
  if (hasBreakingChanges2) commitMessage2 += "!";
  commitMessage2 += ": ";
  commitMessage2 += message2;
  return commitMessage2;
}

// index.ts
intro("Conventional Committer");
var type = await autocomplete({
  message: "What is the type of your commit?",
  placeholder: "Type to search...",
  options: commitTypes.map((_type) => ({ value: _type.id, label: _type.value, hint: _type.hint ?? "" }))
});
checkCancel(type);
var scope = await text({
  message: "What is the scope of your commit?",
  placeholder: "None",
  initialValue: ""
});
checkCancel(scope);
var message = await text({
  message: "What is the message?",
  placeholder: "",
  initialValue: "",
  validate(value) {
    if ((value == null ? void 0 : value.length) === 0) return `Value is required!`;
  }
});
checkCancel(message);
var hasBreakingChanges = await confirm({
  message: "Does this commit have breaking changes?"
});
checkCancel(hasBreakingChanges);
var commitMessage = buildCommitMessage(String(type), String(scope), String(message), Boolean(hasBreakingChanges));
var shouldCommit = await confirm({
  message: `Your commit message is:
  ${commitMessage}
  `
});
checkCancel(shouldCommit);
if (shouldCommit) {
  await execa("git", ["commit", "-m", commitMessage]);
}
outro("Committed");
function checkCancel(value) {
  if (isCancel(value)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }
}
