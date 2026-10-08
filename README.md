# Skills 中心库

这里是 Skill 中心总库：汇集来自各个仓库的技能，也收纳自创与 DIY 融合的成果，统一存放与维护。

这是所有 Skill 的总库，可直接修改并推送（push）。

## 用法

不必拉取全部，用「稀疏检出」按需只拉需要的 Skill，其余不下载。改动后可照常提交、推送。

## 修改原则

Skill 下的内容只做正式改进：临时或试验性的东西一律不放，只有明确要改进时才修改。

## 新增技能

新增技能的完整流程见 [ADDING-SKILLS.md](./ADDING-SKILLS.md)。

## 忽略规范

仓库根 `.gitignore` 管全局通用忽略；每个 Skill 目录下各有一个子 `.gitignore`，只管自己特有的产物。

## 来源与许可

各技能的来源仓库与协议见 [SOURCES.md](./SOURCES.md)。

## 技能索引

每条明细见其目录下的 README。

- **browser-interaction**：浏览器交互（Chrome DevTools / Playwright）。
- **hypercortex**：命令行操作 HyperCortex 知识库（读笔记/附件/收藏夹，写笔记/改面/传附件）。
- **frontend-automated-testing**：前端代码级自动测试（通用搭法；含「源码拆分 / 重构期特征锁定」用法）。
- **anysearch**：实时网页搜索（网页搜索 / 垂直领域搜索 / 并行批量搜索 / URL 正文提取）。
- **tavily**：网页搜索与内容提取工具集（search / extract / crawl / map / research 等，基于 Tavily 命令行）。
- **taste-skill**：前端审美与设计技能集（12 个：极简 / 粗野 / 柔和 / 改版 / 图生代码 / 品牌套装等），来自 `Leonxlnx/taste-skill`（MIT）。
- **ui-ux-pro-max**：UI/UX 设计智能技能集（7 个：设计系统 / 配色字体 / 组件样式 / 幻灯 / 横幅等），来自 `nextlevelbuilder/ui-ux-pro-max-skill`（MIT）。
- **gitnexus**：代码智能技能集（10 个：探索 / 影响分析 / 调试 / 重构 / 审查 / 规划等），依赖 GitNexus 命令行与知识图谱服务，来自 `abhigyanpatwari/GitNexus`（PolyForm 非商业协议）。

未来新增 Skill 请在此追加一条，明细写进该技能自己的 README。
