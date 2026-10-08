# 上游合并记录

- 上游仓库：https://github.com/anysearch-ai/anysearch-skill（分支 `main`）
- 说明：按时间倒序记录，每次合并新增一条写在最上方，旧的往下顶。

---

## 2026-10-08

- **对齐提交**：`9b91ee215164de60d61c7d63789c891a1948b039`（上游提交日期 2026-09-17）
- **合并方式**：整仓并入
- **保留**：全部内容 —— `SKILL.md`、`README.md`、`README_zh.md`、`LICENSE`、`NOTICE`、`SECURITY.md`、`SHA256SUMS.txt`、`requirements.txt`、`.env.example`、`scripts/`；与上游一致，未改动。
- **移除**：`.github/`
- **本地改动**：新增本库 `.gitignore`，忽略密钥与运行产物（`.env`、`runtime.conf`、`__pycache__` 等）。
- **下次合并注意**：本库为上游干净拷贝，可直接对照上游最新版覆盖，注意保留本库 `.gitignore`。
