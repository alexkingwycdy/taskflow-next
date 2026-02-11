"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import {
    Zap,
    Plus,
    MoreHorizontal,
    CheckCircle2,
    Circle,
    Clock,
    Trash2,
    Pencil,
    LayoutDashboard,
    ListTodo,
    ArrowLeft,
    Loader2,
    AlertCircle,
} from "lucide-react";
import {
    getTasks as fetchTasksAction,
    createTask as createTaskAction,
    updateTask as updateTaskAction,
    deleteTask as deleteTaskAction,
    getStats as getStatsAction,
    type Task,
    type TaskCreate,
} from "@/lib/actions";

type TaskUpdate = Partial<TaskCreate>;
type Stats = { total: number; todo: number; inProgress: number; done: number };

const priorityConfig = {
    high: { label: "高", className: "bg-red-500/15 text-red-500 border-red-500/30" },
    medium: {
        label: "中",
        className: "bg-amber-500/15 text-amber-500 border-amber-500/30",
    },
    low: {
        label: "低",
        className: "bg-green-500/15 text-green-500 border-green-500/30",
    },
};

const statusConfig = {
    todo: { label: "待办", icon: Circle, className: "text-muted-foreground" },
    in_progress: { label: "进行中", icon: Clock, className: "text-teal-500" },
    done: { label: "已完成", icon: CheckCircle2, className: "text-green-500" },
};

function TaskDialog({
    task,
    open,
    onOpenChange,
    onSave,
}: {
    task?: Task;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (data: TaskCreate | TaskUpdate) => void;
}) {
    const [title, setTitle] = useState(task?.title || "");
    const [description, setDescription] = useState(task?.description || "");
    const [priority, setPriority] = useState<"low" | "medium" | "high">(
        task?.priority || "medium"
    );
    const [status, setStatus] = useState<"todo" | "in_progress" | "done">(
        task?.status || "todo"
    );

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description || "");
            setPriority(task.priority);
            setStatus(task.status);
        } else {
            setTitle("");
            setDescription("");
            setPriority("medium");
            setStatus("todo");
        }
    }, [task, open]);

    const handleSave = () => {
        if (!title.trim()) return;
        onSave({ title: title.trim(), description, priority, status });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                    <DialogTitle>{task ? "编辑任务" : "新建任务"}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">标题</Label>
                        <Input
                            id="title"
                            placeholder="输入任务标题..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSave()}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">描述</Label>
                        <Textarea
                            id="description"
                            placeholder="输入任务描述（可选）..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label>优先级</Label>
                            <Select value={priority} onValueChange={(v) => setPriority(v as "low" | "medium" | "high")}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="high">🔴 高</SelectItem>
                                    <SelectItem value="medium">🟡 中</SelectItem>
                                    <SelectItem value="low">🟢 低</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label>状态</Label>
                            <Select value={status} onValueChange={(v) => setStatus(v as "todo" | "in_progress" | "done")}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="todo">⭕ 待办</SelectItem>
                                    <SelectItem value="in_progress">🔵 进行中</SelectItem>
                                    <SelectItem value="done">✅ 已完成</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">取消</Button>
                    </DialogClose>
                    <Button
                        onClick={handleSave}
                        disabled={!title.trim()}
                        className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white"
                    >
                        {task ? "保存修改" : "创建任务"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function TaskItem({
    task,
    onEdit,
    onDelete,
    onToggleStatus,
}: {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (id: number) => void;
    onToggleStatus: (task: Task) => void;
}) {
    const StatusIcon = statusConfig[task.status].icon;
    const priority = priorityConfig[task.priority];

    return (
        <div className="group flex items-start gap-3 rounded-lg border border-border/40 bg-card/50 p-4 transition-all duration-200 hover:border-border hover:shadow-md hover:shadow-emerald-500/5">
            <button
                onClick={() => onToggleStatus(task)}
                className={`mt-0.5 flex-shrink-0 transition-colors ${statusConfig[task.status].className} hover:text-emerald-500`}
            >
                <StatusIcon className="h-5 w-5" />
            </button>

            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <h3
                        className={`font-medium leading-snug ${task.status === "done"
                            ? "line-through text-muted-foreground"
                            : ""
                            }`}
                    >
                        {task.title}
                    </h3>
                    <Badge variant="outline" className={`text-xs ${priority.className}`}>
                        {priority.label}
                    </Badge>
                </div>
                {task.description && (
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {task.description}
                    </p>
                )}
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <span
                        className={`inline-flex items-center gap-1 ${statusConfig[task.status].className}`}
                    >
                        {statusConfig[task.status].label}
                    </span>
                    <span>·</span>
                    <span>
                        {new Date(task.createdAt).toLocaleDateString("zh-CN", {
                            month: "short",
                            day: "numeric",
                        })}
                    </span>
                </div>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(task)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        编辑
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => onDelete(task.id)}
                        className="text-red-500 focus:text-red-500"
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        删除
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default function DashboardPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [stats, setStats] = useState<Stats>({ total: 0, todo: 0, inProgress: 0, done: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
    const [filter, setFilter] = useState<"all" | "todo" | "in_progress" | "done">("all");

    const fetchData = useCallback(async () => {
        try {
            setError(null);
            const [tasksData, statsData] = await Promise.all([
                fetchTasksAction(),
                getStatsAction(),
            ]);
            setTasks(tasksData as Task[]);
            setStats(statsData);
        } catch {
            setError("数据加载失败，请刷新页面重试");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleCreate = async (data: TaskCreate | TaskUpdate) => {
        try {
            await createTaskAction(data as TaskCreate);
            fetchData();
        } catch {
            setError("创建任务失败");
        }
    };

    const handleUpdate = async (data: TaskCreate | TaskUpdate) => {
        if (!editingTask) return;
        try {
            await updateTaskAction(editingTask.id, data);
            fetchData();
            setEditingTask(undefined);
        } catch {
            setError("更新任务失败");
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteTaskAction(id);
            fetchData();
        } catch {
            setError("删除任务失败");
        }
    };

    const handleToggleStatus = async (task: Task) => {
        const nextStatus: Record<string, "todo" | "in_progress" | "done"> = {
            todo: "in_progress",
            in_progress: "done",
            done: "todo",
        };
        try {
            await updateTaskAction(task.id, { status: nextStatus[task.status] });
            fetchData();
        } catch {
            setError("更新任务状态失败");
        }
    };

    const filteredTasks =
        filter === "all" ? tasks : tasks.filter((t) => t.status === filter);

    const statCards = [
        {
            label: "全部任务",
            value: stats.total,
            icon: LayoutDashboard,
            gradient: "from-emerald-500 to-teal-500",
        },
        {
            label: "待办",
            value: stats.todo,
            icon: Circle,
            gradient: "from-slate-400 to-slate-500",
        },
        {
            label: "进行中",
            value: stats.inProgress,
            icon: Clock,
            gradient: "from-teal-500 to-cyan-500",
        },
        {
            label: "已完成",
            value: stats.done,
            icon: CheckCircle2,
            gradient: "from-emerald-500 to-green-600",
        },
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Sidebar / Top nav */}
            <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
                <div className="flex items-center justify-between px-6 py-3 md:px-8">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span className="hidden sm:inline text-sm">返回首页</span>
                        </Link>
                        <Separator orientation="vertical" className="h-6" />
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-600 to-teal-500">
                                <Zap className="h-4 w-4 text-white" />
                            </div>
                            <span className="font-bold text-lg">TaskFlow</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <Button
                            onClick={() => {
                                setEditingTask(undefined);
                                setDialogOpen(true);
                            }}
                            size="sm"
                            className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all"
                        >
                            <Plus className="mr-1 h-4 w-4" />
                            新建任务
                        </Button>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-5xl px-6 py-8 md:px-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {statCards.map((stat) => (
                        <Card
                            key={stat.label}
                            className="border-border/40 bg-card/50 backdrop-blur-sm"
                        >
                            <CardContent className="flex items-center gap-3 p-4">
                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}
                                >
                                    <stat.icon className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{stat.value}</p>
                                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Filter Tabs */}
                <div className="mt-8 flex items-center gap-2">
                    {(["all", "todo", "in_progress", "done"] as const).map((f) => {
                        const labels = {
                            all: "全部",
                            todo: "待办",
                            in_progress: "进行中",
                            done: "已完成",
                        };
                        return (
                            <Button
                                key={f}
                                variant={filter === f ? "default" : "ghost"}
                                size="sm"
                                onClick={() => setFilter(f)}
                                className={
                                    filter === f
                                        ? "bg-gradient-to-r from-emerald-600 to-teal-500 text-white"
                                        : "text-muted-foreground"
                                }
                            >
                                {labels[f]}
                            </Button>
                        );
                    })}
                </div>

                {/* Error Banner */}
                {error && (
                    <Card className="mt-6 border-amber-500/30 bg-amber-500/5">
                        <CardContent className="flex items-center gap-3 p-4">
                            <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                            <p className="text-sm text-amber-500">{error}</p>
                        </CardContent>
                    </Card>
                )}

                {/* Task List */}
                <div className="mt-6 space-y-3">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            <p className="mt-3 text-sm text-muted-foreground">加载中...</p>
                        </div>
                    ) : filteredTasks.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <ListTodo className="h-12 w-12 text-muted-foreground/30" />
                            <p className="mt-4 text-muted-foreground">
                                {filter === "all"
                                    ? "还没有任务，点击「新建任务」开始吧！"
                                    : "当前分类没有任务"}
                            </p>
                            {filter === "all" && (
                                <Button
                                    onClick={() => {
                                        setEditingTask(undefined);
                                        setDialogOpen(true);
                                    }}
                                    className="mt-4 bg-gradient-to-r from-emerald-600 to-teal-500 text-white"
                                    size="sm"
                                >
                                    <Plus className="mr-1 h-4 w-4" />
                                    新建任务
                                </Button>
                            )}
                        </div>
                    ) : (
                        filteredTasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onEdit={(t) => {
                                    setEditingTask(t);
                                    setDialogOpen(true);
                                }}
                                onDelete={handleDelete}
                                onToggleStatus={handleToggleStatus}
                            />
                        ))
                    )}
                </div>
            </main>

            {/* Task Dialog */}
            <TaskDialog
                task={editingTask}
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                onSave={editingTask ? handleUpdate : handleCreate}
            />
        </div>
    );
}
