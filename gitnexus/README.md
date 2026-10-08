# GitNexus

本技能把 GitNexus 的代码智能能力（基于代码知识图谱）整理为一组可复用技能，供理解代码库、影响分析、调试、重构与审查时使用。

内容取自 `abhigyanpatwari/GitNexus` 仓库对外分发的插件，共 10 个技能（已剔除仅用于维护 GitNexus 自身的 pdg-query、taint-analysis）：

- **gitnexus-guide**：总入口，介绍可用工具、知识图谱结构与工作流。
- **gitnexus-exploring**：理解架构、回答"某功能怎么工作"。
- **gitnexus-impact-analysis**：改动影响范围（爆炸半径）分析。
- **gitnexus-debugging**：追踪缺陷、定位失败原因。
- **gitnexus-refactoring**：重命名 / 抽取 / 拆分等重构。
- **gitnexus-review**：代码审查（含多种审查视角）。
- **gitnexus-plan**：基于证据的任务规划。
- **gitnexus-work**：任务执行与证据溯源。
- **gitnexus-cli**：索引、状态、清理、生成文档等命令行操作。
- **gitnexus-lfg**：把"规划 → 执行 → 审查"串成一条流水线的编排入口。

**前置依赖**：技能调用 GitNexus 自身的 MCP 工具与 `gitnexus://` 资源，需先安装 GitNexus 命令行并完成代码库索引（本机已具备）。

**许可证**：PolyForm 非商业协议 1.0.0，仅限非商业用途，保留原始 `LICENSE`。

**结构**：`skills/` 下每个技能一个目录，内含 `SKILL.md`（技能说明）与 `mcp.json`（工具接入），部分附带 `references/`。
