# 上游合并记录

- 上游仓库：https://github.com/Leonxlnx/taste-skill（分支 `main`）
- 说明：按时间倒序记录，每次合并新增一条写在最上方，旧的往下顶。

---

## 2026-10-09

- **对齐提交**：`b482f7a970abb98c4108d4a9f761e458c64cefc8`（上游提交日期 2026-10-07）
- **合并方式**：稀疏检出，仅取所需目录
- **保留**：`skills/`（12 个技能）、`LICENSE`、`README.md`；与上游一致，未改动
- **移除**：`skills/taste-skill-v1`（旧版，与 `taste-skill` 重复）；仓库其余内容 —— `.claude-plugin/`、`.github/`、`assets/`、`examples/`、`research/`、`scripts/`、`CHANGELOG.md`、`skill.sh`
- **本地改动**：无（除移除旧版技能外，保留内容与上游一致）
- **下次合并注意**：对照上游 `skills/` 目录拉取；如需重新评估 `taste-skill-v1` 是否纳入，参照上游说明
