# HyperCortex

本技能把 HyperCortex 知识库的操作封装成命令行能力，供开发与使用时参考：既能搜索、读取笔记、附件、收藏夹与版本，也能新建编辑笔记、改面、传附件、管收藏夹。

面向开发者：核心是 `reader`（只读）、`writer`（写入）两个可执行工具，外加 `hypercortex-cli.mjs` 封装层，把参数翻译成 JSON 后调用。连接配置在 `hypercortex-cli.config.json`，含密钥、不入库，需从示例文件复制填写。

工具分两类：`reader` 负责只读查询，如搜索笔记、读笔记、查引用关系、列收藏夹与版本；`writer` 负责写入，如新建与编辑笔记、改面、传附件、管收藏夹。

开发要点：改动工具动作或参数时，要同步更新对应 `tool.json` 的参数模式。使用者操作见 `SKILL.md`，动作与参数明细见 `reader/README.md`、`writer/README.md`。
