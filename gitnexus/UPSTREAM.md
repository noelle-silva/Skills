# 上游合并记录

- 上游仓库：https://github.com/abhigyanpatwari/GitNexus（分支 `main`）
- 说明：按时间倒序记录，每次合并新增一条写在最上方，旧的往下顶。

---

## 2026-10-09

- **对齐提交**：`ff922c0a3b0cfc997dfd5b0d35f0c60955f1dc6c`（上游提交日期 2026-10-08）
- **合并方式**：稀疏检出，仅取所需目录
- **保留**：上游插件 `gitnexus-claude-plugin/` 下的 `skills/`（本库改名为 `skills/`）、`.claude-plugin/plugin.json`（本库命名为 `plugin.json`）、`LICENSE`
- **移除**：
  - `skills/gitnexus-pdg-query`、`skills/gitnexus-taint-analysis`（仅用于维护 GitNexus 自身的底层技能，正常使用不需要）
  - 插件其余内容：`hooks/`、`.mcp.json`、`.codex-plugin/`
  - 仓库其余内容：`.claude/skills/`（开发自身用）、`gitnexus-cursor-integration/`、主体源码与文档等
- **本地改动**：仅路径/命名调整：`gitnexus-claude-plugin/skills/` → `skills/`；`plugin.json` 取自插件清单
- **下次合并注意**：上游技能有**对外分发版**（`gitnexus-claude-plugin/skills/`，本库采用）与**开发自用版**（`.claude/skills/`）两套，合并时认准前者；本库有意剔除 `pdg-query`、`taint-analysis`，如后续要用到底层能力再评估纳入
