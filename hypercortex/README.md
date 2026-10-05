# HyperCortex

从命令行操作 HyperCortex 知识库的技能：搜索与读取笔记、附件、收藏夹与版本，也能新建与编辑笔记、改面、传附件、管收藏夹。

## 内容

- `reader/`、`writer/`：两个工具的可执行文件与各自的 `config.json`（取自 eucli-box 的编译成果，**无需源码、无需 Go**）。
- `hypercortex-cli.mjs`：命令行封装，把参数翻译成工具要的 JSON 并调用、回显结果。
- `hypercortex-cli.config.json`：访问地址、默认仓库、仓库钥匙（含密钥，**不入库**；从 `hypercortex-cli.config.example.json` 复制后填写）。

## 用法

```bash
node hypercortex-cli.mjs reader search_notes --query 关键词 --limit 5
node hypercortex-cli.mjs writer list_face_kinds
```

- 默认只输出正文，加 `--json` 输出完整 JSON。
- 动作与参数：先读两个工具各自的 `README.md`（只读动作在 reader，写入动作在 writer）。
