export function buildCommitMessage(
  type: string,
  scope: string,
  message: string,
  hasBreakingChanges: boolean,
): string {
  let commitMessage = type;
  if (scope) commitMessage += `(${scope})`;
  if (hasBreakingChanges) commitMessage += "!";
  commitMessage += ": ";
  commitMessage += message;
  return commitMessage;
}
