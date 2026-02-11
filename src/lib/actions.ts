'use server'

import prisma from './prisma'
import { revalidatePath } from 'next/cache'

export type Task = {
    id: number
    title: string
    description: string | null
    priority: "low" | "medium" | "high"
    status: "todo" | "in_progress" | "done"
    createdAt: Date
    updatedAt: Date
}

export type TaskCreate = {
    title: string
    description?: string
    priority?: "low" | "medium" | "high"
    status?: "todo" | "in_progress" | "done"
}

export async function getTasks() {
    try {
        return await prisma.task.findMany({
            orderBy: { createdAt: 'desc' },
        })
    } catch (error) {
        return []
    }
}

export async function createTask(data: TaskCreate) {
    const task = await prisma.task.create({
        data: {
            title: data.title,
            description: data.description,
            priority: data.priority || 'medium',
            status: data.status || 'todo',
        },
    })
    revalidatePath('/dashboard')
    return task
}

export async function updateTask(id: number, data: Partial<TaskCreate>) {
    const task = await prisma.task.update({
        where: { id },
        data,
    })
    revalidatePath('/dashboard')
    return task
}

export async function deleteTask(id: number) {
    await prisma.task.delete({
        where: { id },
    })
    revalidatePath('/dashboard')
}

export async function getStats() {
    try {
        const total = await prisma.task.count()
        const todo = await prisma.task.count({ where: { status: 'todo' } })
        const inProgress = await prisma.task.count({ where: { status: 'in_progress' } })
        const done = await prisma.task.count({ where: { status: 'done' } })

        return { total, todo, inProgress, done }
    } catch (error) {
        return { total: 0, todo: 0, inProgress: 0, done: 0 }
    }
}
