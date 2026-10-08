# 上游合并记录

- 上游仓库：https://github.com/nextlevelbuilder/ui-ux-pro-max-skill（分支 `main`）
- 说明：按时间倒序记录，每次合并新增一条写在最上方，旧的往下顶。

---

## 2026-10-09

- **对齐提交**：`1a2c459b35f26116fd165b0a0f30597f252749ff`（上游提交日期 2026-10-08）
- **合并方式**：稀疏检出，仅取所需目录
- **保留**：`skills/`（7 个技能；上游原路径为 `.claude/skills/`，本库改名为 `skills/`）、`skill.json`、`LICENSE`、`README.md`；与上游一致，未改动
- **移除**：仓库其余内容 —— `cli/`、`docs/`、`gallery/`、`preview/`、`projects/`、`screenshots/`、`scripts/`、`src/`、`stack/`、`.claude-plugin/`、`.claude/`、`.github/`、多语言 README、`CLAUDE.md`、`CONTRIBUTING.md`、`SECURITY.md` 等
- **本地改动**：仅路径改名：`.claude/skills/` → `skills/`
- **下次合并注意**：上游技能在 `.claude/skills/` 下，拉取后按本库命名放到 `skills/`
