# HyperCortex

从命令行操作 HyperCortex 知识库的技能：搜索与读取笔记、附件、收藏夹与版本，也能新建与编辑笔记、改面、传附件、管收藏夹。

## 内容

- `reader/`、`writer/`：两个工具的可执行文件、`config.json`，以及各自的 `README.md`（动作与参数说明）与 `tool.json`（参数模式）。
- `hypercortex-cli.mjs`：命令行封装，把参数翻译成工具要的 JSON 并调用、回显结果。
- `hypercortex-cli.config.json`：访问地址、默认仓库、仓库钥匙（含密钥，**不入库**；从 `hypercortex-cli.config.example.json` 复制后填写）。

## 用法

```bash
node hypercortex-cli.mjs <reader|writer> <action> [--参数 值 ...] [--json]
```

- 默认只输出正文，加 `--json` 输出完整 JSON。
- 连接配置读 `hypercortex-cli.config.json`（不是 eucli-box 设置页）。

## 动作

- **reader（只读）**：`search_notes`、`read_note`、`note_relations`、`list_favorites`、`list_repos`、`search_assets`、`list_assets`、`list_trash`、`list_versions`、`read_version`。
- **writer（写入）**：`list_face_kinds`、`create_note`、`write_note`、`patch_face`、`save_face_order`、`save_face_settings`、`delete_face`、`publish_version`、`update_note_metadata`、`upload_assets`、`update_asset_metadata`、`create_favorite_folder`、`update_favorite_folder`、`add_favorite_item`、`remove_favorite_item`、`move_favorite_item`。

每个动作的完整参数：见 `reader/README.md` 与 `writer/README.md`（或对应 `tool.json` 的 `inputSchema`）。

## 笔记引用

引用是写在笔记正文里的内联标记：

```
[[note_id=目标笔记id|face=面id|title=|remarks=标题]]
```

`note_id` 必填，`face` / `title` / `remarks` 可选（`remarks` 是目标标题快照）。用 `write_note` 或 `patch_face` 写进正文即可建立引用；用 `note_relations` 查看引用 / 被引用关系。
