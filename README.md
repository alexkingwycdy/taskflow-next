<div align="center">

# ⚡ TaskFlow

**AI 驱动的智能任务管理应用**

基于 Next.js 全栈架构，采用 Prisma + SQLite + Server Actions，打造简洁、高效、美观的现代任务管理体验。

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-V4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>

---

## ✨ 功能特性

- 🚀 **极速创建** — 用最少的步骤创建和管理任务，告别繁琐流程
- 📊 **可视化看板** — 直观的 Dashboard 视图，一目了然掌控全部任务进度
- 🎯 **优先级管理** — 高 / 中 / 低优先级设置，确保重要任务永远排在前面
- 🌙 **深色模式** — 支持亮色 / 暗色主题一键切换
- 🔄 **实时统计** — 任务总数、待办、进行中、已完成等统计数据实时更新

## 🛠️ 技术栈

| 分类 | 技术 |
|------|------|
| **框架** | Next.js 16 (App Router, Server Actions, Turbopack) |
| **语言** | TypeScript 5 |
| **ORM** | Prisma 7 (WASM Client Engine + Driver Adapter) |
| **数据库** | SQLite (via better-sqlite3) |
| **样式** | Tailwind CSS V4 |
| **UI 组件** | Shadcn UI + Radix UI |
| **图标** | Lucide React |
| **主题** | next-themes |

## 📁 项目结构

```
├── prisma/
│   ├── schema.prisma          # 数据模型定义
│   ├── generated/client/      # Prisma 生成的客户端（gitignore）
│   └── migrations/            # 数据库迁移文件
├── src/
│   ├── app/
│   │   ├── page.tsx           # 落地页
│   │   ├── layout.tsx         # 全局布局
│   │   ├── globals.css        # 全局样式
│   │   └── dashboard/
│   │       └── page.tsx       # 任务管理看板
│   ├── components/
│   │   ├── ui/                # Shadcn UI 组件
│   │   └── theme-toggle.tsx   # 主题切换组件
│   └── lib/
│       ├── prisma.ts          # Prisma 客户端单例（Driver Adapter）
│       ├── actions.ts         # Server Actions (CRUD)
│       └── utils.ts           # 工具函数
├── prisma.config.ts           # Prisma 7 CLI 配置
├── package.json
└── README.md
```

## 🚀 快速开始

### 前置要求

- [Node.js](https://nodejs.org/) >= 18
- npm / yarn / pnpm

### 安装与运行

```bash
# 1. 克隆项目
git clone https://github.com/alexkingwycdy/taskflow-next.git
cd taskflow-next

# 2. 安装依赖
npm install

# 3. 配置环境变量
cp .env.example .env
# 编辑 .env，确保 DATABASE_URL 已设置（默认: file:./dev.db）

# 4. 生成 Prisma 客户端
npx prisma generate

# 5. 执行数据库迁移
npx prisma migrate dev

# 6. 启动开发服务器
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 即可访问应用。

### 其他命令

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 查看/编辑数据库
npx prisma studio

# 代码检查
npm run lint
```

## 📝 数据模型

```prisma
model Task {
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  priority    String   @default("medium")  // low | medium | high
  status      String   @default("todo")    // todo | in_progress | done
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## 🏗️ 架构说明

本项目是 **Next.js 全栈应用**，前后端统一在一个 Next.js 项目中：

- **前端**：React + App Router 渲染页面
- **后端**：Next.js Server Actions 直接调用 Prisma ORM 操作数据库，无需额外 API 层
- **数据库**：SQLite 本地文件数据库，通过 Prisma 7 Driver Adapter（`@prisma/adapter-better-sqlite3`）连接

> **关于 Prisma 7**：本项目使用 Prisma 7 的 WASM Client Engine（`engineType = "client"`），无需 Rust 原生二进制。数据库连接通过 Driver Adapter 实现，`schema.prisma` 的 `datasource` 中不再包含 `url` 属性，CLI 工具的数据库 URL 通过 `prisma.config.ts` 配置。

## 📄 License

MIT

---

<div align="center">

**⚡ Built with Vibe Coding**

</div>
