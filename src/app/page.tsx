"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Zap,
  LayoutDashboard,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Github,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "极速创建",
    description: "用最少的步骤创建和管理你的任务，告别繁琐的操作流程。",
    gradient: "from-rose-500 to-orange-500",
  },
  {
    icon: LayoutDashboard,
    title: "可视化看板",
    description: "直观的 Dashboard 视图，一目了然掌控所有任务进度。",
    gradient: "from-teal-500 to-cyan-500",
  },
  {
    icon: CheckCircle2,
    title: "优先级管理",
    description: "轻松设置高/中/低优先级，确保重要任务永远排在前面。",
    gradient: "from-emerald-500 to-green-600",
  },
  {
    icon: Sparkles,
    title: "AI 驱动",
    description: "基于 Vibe Coding 技术栈开发，体验最前沿的 AI 开发范式。",
    gradient: "from-amber-500 to-yellow-500",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 h-full w-full rounded-full bg-gradient-to-br from-emerald-500/20 via-transparent to-transparent blur-3xl animate-[spin_20s_linear_infinite]" />
        <div className="absolute -bottom-1/2 -right-1/2 h-full w-full rounded-full bg-gradient-to-tl from-teal-500/20 via-transparent to-transparent blur-3xl animate-[spin_25s_linear_infinite_reverse]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 md:px-12 lg:px-20">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-600 to-teal-500">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">TaskFlow</span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="hidden sm:inline-flex border-border/50 hover:bg-accent"
            >
              进入看板
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center px-6 pt-20 pb-16 text-center md:pt-32 md:pb-24">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
          <span>Vibe Coding 全栈练手项目</span>
        </div>

        {/* Title */}
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl lg:text-7xl">
          用 AI 驱动你的
          <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-400 bg-clip-text text-transparent">
            {" "}
            任务管理
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
          基于 Next.js + Prisma + Tailwind + Shadcn UI
          打造的现代全栈任务管理应用。简洁、高效、美观。
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-105 px-8"
            >
              开始使用
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <a
            href="https://github.com/alexkingwycdy/taskflow-next"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="lg"
              className="border-border/50 px-8"
            >
              <Github className="mr-2 h-4 w-4" />
              查看源码
            </Button>
          </a>
        </div>

        {/* Tech stack badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
          {["Next.js", "Prisma", "Tailwind V4", "Shadcn UI", "SQLite"].map(
            (tech) => (
              <span
                key={tech}
                className="rounded-full border border-border/40 bg-card/50 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur-sm transition-colors hover:text-foreground hover:border-border"
              >
                {tech}
              </span>
            )
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 pb-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-center text-2xl font-bold md:text-3xl">
            核心特性
          </h2>
          <p className="mb-12 text-center text-muted-foreground">
            为个人开发者量身打造的任务管理体验
          </p>

          <div className="grid gap-6 sm:grid-cols-2">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="group relative overflow-hidden border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div
                    className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
                {/* Hover glow effect */}
                <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-emerald-500/5 to-teal-500/5" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/40 px-6 py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Zap className="h-4 w-4 text-emerald-500" />
            <span>TaskFlow — Vibe Coding 练手项目</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Next.js + Prisma + Tailwind V4 + Shadcn UI
          </p>
        </div>
      </footer>
    </div>
  );
}
