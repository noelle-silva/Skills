---
name: git-worktree-parallel-flow
description: 多 AI 并行开发时，创建集中式 Git Worktree、从指定提交锚点检出、用 patch 把未提交改动搬回主工作区验证，并在完成后退役清理。触发词：Git Worktree、并行工作区、未提交改动回搬、patch 应用、worktree 退役。
---

# Git Worktree 并行开发与改动回搬

## 适用范围

- 多个 AI 或开发者同时修改同一个仓库。
- 需要隔离工作区，但不希望复制 Git 历史。
- 改动先不提交，搬回主工作区由用户验证后再提交。
- 需要从已提交的锚点开始，而不是带上主工作区当前未提交状态。

## 目录与命名

- 统一放在仓库根目录的 `.worktrees/` 下。
- 任务目录使用三位编号加任务名：`<编号>-<任务名>`。
- 多仓库任务使用配对目录：

```text
<repo-root>/.worktrees/<编号>-<任务名>/<repo-a>
<repo-root>/.worktrees/<编号>-<任务名>/<repo-b>
```

- 分支命名：`task/<编号>-<任务名>`。不同仓库可以使用同名分支。
- 分支是 Git ref，不是文件夹；文件夹是 worktree 的工作目录，两者不要混用。
- 在 worktree 所在仓库的 `.git/info/exclude` 中加入 `.worktrees/`，作为本地忽略。
- 只有团队需要共享忽略规则时，才写入 `.gitignore`。
- 不要把 `.worktrees/` 或其中的内容纳入提交。

## 基点与创建

- 默认锚点是当前 `HEAD`。
- 用户指定提交时，使用该 commit 作为锚点。
- 主工作区当前未提交的修改不会进入新 worktree。
- 先创建任务目录，确保 worktree 的父目录存在。
- 创建新分支并检出锚点：

```powershell
git -C <repo-root> worktree add -b <branch> <worktree-path> <anchor>
```

- 使用已有分支时：

```powershell
git -C <repo-root> worktree add <worktree-path> <branch>
```

- 同一个分支不能同时在两个 worktree 检出。
- 多仓库任务必须为每个仓库分别创建 worktree；一个 worktree 不能跨仓库。

## 工作流

1. 确认任务编号、任务名、锚点，以及涉及哪些仓库。
2. 为每个仓库创建配对 worktree。
3. 在各自 worktree 中修改；不要碰主工作区里其他人的未提交修改。
4. 可选：先在 worktree 内自测，但不提交。
5. 用 patch 把改动搬回主工作区。
6. 由用户在主工作区验证。
7. 用户明确确认可以提交后，只暂存本次涉及的文件并提交。
8. 退役并清理 worktree。

## 回搬：不提交、不 merge

原则：改动以未暂存形式落到主工作区；用户确认前不提交。

### 让新文件进入 diff

在 worktree 内执行：

```powershell
git -C <worktree-path> add -N .
```

`add -N` 只是 intent-to-add，不产生提交，也不会把被忽略文件加进来。

### 文本改动优先用管道，不落临时文件

```powershell
git -C <worktree-path> diff HEAD --binary | git -C <main-worktree> apply --check --binary
git -C <worktree-path> diff HEAD --binary | git -C <main-worktree> apply --binary
```

- 必须先 `--check`，通过后再真正应用。
- 应用失败或冲突时立即停止，不要覆盖别人的未提交修改。
- 需要三方合并时，确认安全后可使用 `git apply --3way`，冲突必须手动解决。

### 二进制或 shell 管道不可靠时

把 patch 写到仓库外，应用后立即删除：

```powershell
git -C <worktree-path> diff HEAD --binary > <repo外临时目录>/<编号>-<任务名>.patch
git -C <main-worktree> apply --check --binary <patch>
git -C <main-worktree> apply --binary <patch>
```

### 禁止用提交合并代替回搬

不要用以下方式代替本流程：

- `git merge`
- `git merge --squash`
- `git cherry-pick`

这些都会引入提交或依赖提交，不符合“先由用户验证、确认后才提交”的要求。

## 反向撤销本次回搬

仅在明确要求撤销本次回搬时执行。该动作只反向应用同一份 patch，不影响其他未提交修改。

```powershell
git -C <worktree-path> diff HEAD --binary | git -C <main-worktree> apply -R --binary
```

- `-R` 表示反向应用 patch。
- 新增文件会被删除，修改文件恢复，删除文件恢复。
- 反向应用冲突或失败时停止，不要强制清理。
- 不要用 `reset`、`checkout -- .` 或 `stash` 代替。

## 提交

- 只在用户明确确认验证通过后提交。
- 只暂存本次涉及的文件，不要 `git add -A`。
- 多仓库任务分别提交。
- 提交信息遵循对应仓库的现有风格。

## 退役

确认改动已回搬或已备份后：

```powershell
git -C <repo-root> worktree remove <worktree-path>
```

有残留且确认不再需要：

```powershell
git -C <repo-root> worktree remove --force <worktree-path>
```

删除临时分支：

```powershell
git -C <repo-root> branch -D <branch>
```

清理失效记录并复核：

```powershell
git -C <repo-root> worktree prune
git -C <repo-root> worktree list
```

- 退役会删除 worktree 中的工作文件，不保留第二份代码。
- 共享对象库仍由主仓库管理；需要回收空间时另行执行 `git gc`。

## 安全规则

- 不碰其他人未提交的修改。
- 不把 `.worktrees/` 纳入提交。
- 用户确认前不提交。
- patch 应用前必须 `--check`。
- 冲突、锚点不明、仓库归属不明时停下来上报。
- 所有命令都显式指定仓库路径，避免在错误仓库执行。
