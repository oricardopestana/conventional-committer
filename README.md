# Conventional Committer

A CLI tool that guides you through writing standardized Git commit messages following the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#specification) specification.

## Inspiration

This project is built around the [Conventional Commits v1.0.0 specification](https://www.conventionalcommits.org/en/v1.0.0/#specification), which provides a lightweight convention for commit messages. The specification defines a consistent format that makes it easier to:

- Automatically generate changelogs
- Automatically determine semantic version bumps
- Communicate the nature of changes to teammates and the public
- Trigger build and release processes

## How It Works

`conventional-committer` is an interactive CLI that walks you through each part of a conventional commit message, step by step:

1. **Select a commit type** — `feat`, `fix`, `build`, `chore`, `ci`, `docs`, `style`, `refactor`, `perf`, or `test`
2. **Optionally add a scope** — a contextual label for the area of the codebase being changed
3. **Write a short message** — a brief description of the change
4. **Indicate breaking changes** — if applicable, a `!` marker is added before the colon
5. **Confirm and commit** — review the final message before the tool executes `git commit`

### Example

```
$ conventional-committer
◆  Conventional Committer
✔  What is the type of your commit? · feat
✔  What is the scope of your commit? · api
✔  What is the message? · add user authentication
✔  Does this commit have breaking changes? · No
✔  Your commit message is:
     feat(api): add user authentication
✔  Committed
```

The resulting commit message follows the specification format:

```
<type>[optional scope][optional !]: <description>
```

## Usage

```bash
# Run the tool directly
npx conventional-committer
```

Or install globally:

```bash
npm install -g @oricardopestana/conventional-committer
node conventional-committer
```

## Commit Types

| Type       | Description                        |
| ---------- | ---------------------------------- |
| `feat`     | A new feature                      |
| `fix`      | A bug fix                          |
| `build`    | Changes to the build system        |
| `chore`    | Maintenance tasks                  |
| `ci`       | CI configuration changes           |
| `docs`     | Documentation changes              |
| `style`    | Code style changes (formatting)    |
| `refactor` | Code refactoring                   |
| `perf`     | Performance improvements           |
| `test`     | Adding or updating tests           |

## License

MIT
