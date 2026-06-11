import { autocomplete, cancel, intro, isCancel, outro, text, confirm } from "@clack/prompts";
import { commitTypes } from "./constants.ts";
import type { CommitType } from "./types.ts";
import { execa } from "execa";
import { buildCommitMessage } from "./build-commit-message.ts";

intro("Conventional Committer");

const type = await autocomplete({
  message: "What is the type of your commit?",
  placeholder: "Type to search...",
  options: commitTypes.map((_type: CommitType) => ({ value: _type.id, label: _type.value, hint: _type.hint ?? "" })),
});

checkCancel(type);

const scope = await text({
  message: "What is the scope of your commit?",
  placeholder: "None",
  initialValue: "",
});

checkCancel(scope);

const message = await text({
  message: "What is the message?",
  placeholder: "",
  initialValue: "",
  validate(value) {
    if (value?.length === 0) return `Value is required!`;
  },
});

checkCancel(message);

const hasBreakingChanges = await confirm({
  message: "Does this commit have breaking changes?",
});

checkCancel(hasBreakingChanges);

const commitMessage = buildCommitMessage(String(type), String(scope), String(message), Boolean(hasBreakingChanges));

const shouldCommit = await confirm({
  message: `Your commit message is:
  ${commitMessage}
  `,
});

checkCancel(shouldCommit);

if (shouldCommit) {
  await execa("git", ["commit", "-m", commitMessage]);
}

outro("Committed");

function checkCancel(value: unknown) {
  if (isCancel(value)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }
}
