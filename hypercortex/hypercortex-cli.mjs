#!/usr/bin/env node
// hypercortex-cli —— HyperCortex 读写工具的命令行封装（二进制版）。
//
// 作用：把命令行参数翻译成 hypercortex_reader / hypercortex_writer 需要的输入 JSON，
// 调用同目录 reader/、writer/ 下的 exe，并把结果回显出来。
//
// 工具以编译好的二进制随本技能提供（取自 eucli-box 的 Dev-Workspace 编译成果），
// 不需要源码、不需要 Go 环境。
//
// 用法：
//   node hypercortex-cli.mjs <reader|writer> <action> [--参数 值 ...] [--json]
//   node hypercortex-cli.mjs reader search_notes --query 关键词 --limit 5
//   node hypercortex-cli.mjs reader read_note --dir Notes/2026-10/xxxx
//
// 连接配置见同目录 hypercortex-cli.config.json（访问地址、默认仓库、仓库钥匙）。

import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))

const TOOLS = {
  reader: {
    bodyDir: path.join(here, 'reader'),
    exe: path.join(here, 'reader', 'hypercortex_reader.exe'),
  },
  writer: {
    bodyDir: path.join(here, 'writer'),
    exe: path.join(here, 'writer', 'hypercortex_writer.exe'),
  },
}

function fail(message, code = 1) {
  console.error(message)
  process.exit(code)
}

function usage() {
  return [
    '用法：node hypercortex-cli.mjs <reader|writer> <action> [--参数 值 ...] [--json]',
    '',
    '示例：',
    '  node hypercortex-cli.mjs reader search_notes --query 关键词 --limit 5',
    '  node hypercortex-cli.mjs reader list_favorites',
    '  node hypercortex-cli.mjs writer list_face_kinds',
    '',
    '可选开关：',
    '  --json            输出完整 JSON（默认只输出正文 content）',
    '  --config <path>   指定配置文件（默认同目录 hypercortex-cli.config.json）',
    '  --timeout-ms <n>  单次调用超时（毫秒）',
  ].join('\n')
}

// 把 "true"/"false"/数字 还原成对应类型，其余按字符串。
function coerce(value) {
  if (value === 'true') return true
  if (value === 'false') return false
  if (value !== '' && !Number.isNaN(Number(value))) return Number(value)
  return value
}

function parseArgs(argv) {
  const positionals = []
  const flags = {}
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i]
    if (!token.startsWith('--')) {
      positionals.push(token)
      continue
    }
    const body = token.slice(2)
    const eq = body.indexOf('=')
    if (eq !== -1) {
      flags[body.slice(0, eq)] = body.slice(eq + 1)
      continue
    }
    const next = argv[i + 1]
    if (next === undefined || next.startsWith('--')) {
      flags[body] = true
      continue
    }
    flags[body] = next
    i += 1
  }
  return { positionals, flags }
}

function loadConfig(configPath) {
  if (!fs.existsSync(configPath)) {
    fail(`找不到配置文件：${configPath}\n请复制 hypercortex-cli.config.example.json 为 hypercortex-cli.config.json 并填写访问地址与仓库钥匙。`)
  }
  try {
    return JSON.parse(fs.readFileSync(configPath, 'utf8'))
  } catch (error) {
    fail(`解析配置文件失败：${error.message}`)
  }
}

function main() {
  const { positionals, flags } = parseArgs(process.argv.slice(2))
  if (positionals.length === 0 && !flags.help && !flags.h) fail(usage())
  if (flags.help || flags.h) {
    console.log(usage())
    return
  }
  const [toolName, action, ...rest] = positionals
  if (!TOOLS[toolName]) fail(`未知工具：${toolName ?? '(空)'}（可选 reader / writer）\n\n${usage()}`)
  if (!action) fail(`缺少动作（action）。\n\n${usage()}`)

  const tool = TOOLS[toolName]
  if (!fs.existsSync(tool.exe)) {
    fail(`找不到工具二进制：${tool.exe}\n请确认 reader/ 与 writer/ 下的 exe 存在。`)
  }

  const configPath = typeof flags.config === 'string' ? flags.config : path.join(here, 'hypercortex-cli.config.json')
  const config = loadConfig(configPath)

  const argumentsMap = { action }
  const reserved = new Set(['json', 'config', 'help', 'h', 'timeout-ms'])
  for (const [key, value] of Object.entries(flags)) {
    if (reserved.has(key)) continue
    argumentsMap[key] = value === true ? true : coerce(value)
  }
  for (const extra of rest) {
    const eq = extra.indexOf('=')
    if (eq > 0) argumentsMap[extra.slice(0, eq)] = coerce(extra.slice(eq + 1))
  }

  const payload = {
    actionId: `cli-${Date.now()}`,
    toolName,
    arguments: argumentsMap,
    userConfig: {
      endpoint: config.endpoint,
      defaultRepo: config.defaultRepo,
      repos: config.repos,
    },
    toolBodyDirectory: tool.bodyDir,
  }
  if (flags['timeout-ms']) payload.timeoutMs = Number(flags['timeout-ms'])

  const result = spawnSync(tool.exe, [], {
    input: JSON.stringify(payload),
    encoding: 'utf8',
  })
  if (result.error) fail(`调用工具失败：${result.error.message}`)

  const stdout = (result.stdout || '').trim()
  if (!stdout) {
    if (result.stderr) console.error(result.stderr.trim())
    fail(`工具无输出，退出码 ${result.status}`)
  }

  let output
  try {
    output = JSON.parse(stdout)
  } catch {
    console.log(stdout)
    process.exit(result.status ?? 0)
  }

  if (flags.json) {
    console.log(JSON.stringify(output, null, 2))
  } else {
    console.log(output.content ?? '')
  }
  if (output.status !== 'success') {
    process.exit(1)
  }
}

main()
