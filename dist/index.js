// index.ts
import { intro, outro } from "@clack/prompts";
import { text } from "@clack/prompts";
import { confirm } from "@clack/prompts";
import { autocomplete } from "@clack/prompts";

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
intro("Conventional Committer");
var type = await autocomplete({
  message: "What is the type of your commit?",
  placeholder: "Type to search...",
  options: commitTypes.map((_type) => ({ value: _type.id, label: _type.value, hint: _type.hint ?? "" }))
});
var scope = await text({
  message: "What is the scope of your commit?",
  placeholder: "None",
  initialValue: ""
});
var message = await text({
  message: "What is the message?",
  placeholder: "",
  initialValue: "",
  validate(value) {
    if ((value == null ? void 0 : value.length) === 0) return `Value is required!`;
  }
});
var hasBreakingChanges = await confirm({
  message: "Does this commit have breaking changes?"
});
var commitMessage = `${String(type)}`;
if (scope) commitMessage += `(${String(scope)})`;
if (hasBreakingChanges) commitMessage += "!";
commitMessage += ": ";
commitMessage += String(message);
var shouldCommit = await confirm({
  message: `Your commit message is:
  ${commitMessage}
  `
});
await execa("git", ["commit", "-m", commitMessage]);
outro("Committed");
