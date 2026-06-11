import { intro, outro, spinner } from "@clack/prompts";
import { text } from "@clack/prompts";
import { confirm } from "@clack/prompts";
import { autocomplete } from "@clack/prompts";
import { commitTypes } from "./constants.ts";
import type { CommitType } from "./types.ts";
import { execa } from "execa";

intro("Conventional Committer");

const type = await autocomplete({
  message: "What is the type of your commit?",
  placeholder: "Type to search...",
  options: commitTypes.map((_type: CommitType) => ({ value: _type.id, label: _type.value, hint: _type.hint ?? "" })),
});

const scope = await text({
  message: "What is the scope of your commit?",
  placeholder: "None",
  initialValue: "",
});

const message = await text({
  message: "What is the message?",
  placeholder: "",
  initialValue: "",
  validate(value) {
    if (value?.length === 0) return `Value is required!`;
  },
});

const hasBreakingChanges = await confirm({
  message: "Does this commit have breaking changes?",
});

let commitMessage = `${String(type)}`;
if (scope) commitMessage += `(${String(scope)})`;
if (hasBreakingChanges) commitMessage += "!";
commitMessage += ": ";
commitMessage += String(message);

const shouldCommit = await confirm({
  message: `Your commit message is:
  ${commitMessage}
  `,
});

await execa("git", ["commit", "-m", commitMessage]);

outro("Committed");
