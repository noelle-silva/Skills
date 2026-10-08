# 上游合并记录

- 上游仓库：https://github.com/tavily-ai/skills（分支 `main`）
- 说明：按时间倒序记录，每次合并新增一条写在最上方，旧的往下顶。

---

## 2026-10-08

- **对齐提交**：`778122e5f9c680f541eeceda5a5b36405eb7980c`（上游提交日期 2026-09-04）
- **合并方式**：稀疏检出，仅取所需目录
- **保留**：`skills/`（8 个技能，含 `tavily-best-practices/references/`）、`LICENSE`、`README.md`；与上游一致，未改动
- **移除**：`.claude-plugin/`（插件清单）
- **本地改动**：新增本库 `.gitignore`
- **下次合并注意**：对照上游 `skills/` 目录拉取即可，本地无内容改动
