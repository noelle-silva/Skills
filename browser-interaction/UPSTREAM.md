# 上游合并记录

- 上游仓库：
  - https://github.com/ChromeDevTools/chrome-devtools-mcp（分支 `main`）→ `chrome-devtools/`
  - https://github.com/microsoft/playwright-cli（分支 `main`）→ `playwright/playwright-cli/`
  - https://github.com/lackeyjb/playwright-skill（分支 `main`）→ `playwright/playwright-script/`
- 说明：按时间倒序记录，每次合并新增一条写在最上方，旧的往下顶。

---

## 2026-10-05

### chrome-devtools ← chrome-devtools-mcp

- **对齐提交**：`b2f522c8ba0fd2e00a679159b4aa5243de5f1b78`（上游提交日期 2026-10-02）
- **合并方式**：稀疏检出，仅取所需目录
- **保留**：上游 `skills/` 下 5 个技能 —— `a11y-debugging`、`chrome-devtools-cli`、`cookie-debugging`、`debug-optimize-lcp`、`memory-leak-debugging`
- **移除**：上游 `skills/` 中的 `chrome-devtools`（主技能）与 `troubleshooting`；仓库其余全部内容（源码、构建、文档等）
- **本地改动**：将文档中 `chrome-devtools-mcp` 相关措辞改为 `chrome-devtools` CLI / 后台服务的表述，涉及 `a11y-debugging`、`chrome-devtools-cli`、`cookie-debugging`、`debug-optimize-lcp`、`memory-leak-debugging` 的 `SKILL.md` 及 `memory-leak-debugging/references/common-leaks.md`；其余 reference 文件与上游一致
- **下次合并注意**：上游 `chrome-devtools`、`troubleshooting` 两技能本库有意未纳入，如需要再评估

### playwright-cli ← playwright-cli

- **对齐提交**：`b85c7a736bb473bf55b584e54a09ffa698d6d871`（上游提交日期 2026-09-28）
- **合并方式**：稀疏检出，仅取所需目录
- **保留**：上游 `skills/playwright-cli` 全部（含 `references/`），内容与上游一致，未改动
- **移除**：仓库其余全部内容
- **本地改动**：无

### playwright-script ← playwright-skill

- **对齐提交**：`dd47a6a023e249eb1b36e9e943eab89d0900865d`（上游提交日期 2026-08-14）
- **合并方式**：稀疏检出，仅取所需目录
- **保留**：上游 `skills/playwright-skill`，目录改名 `playwright-script`
- **移除**：仓库其余全部内容（`tests/`、`.github/`、`CHANGELOG.md` 等）
- **本地改动**：技能名 `playwright-skill` → `playwright-script`（`SKILL.md` 头部与 `package.json`）；`API_REFERENCE.md`、`package-lock.json` 有相应调整
