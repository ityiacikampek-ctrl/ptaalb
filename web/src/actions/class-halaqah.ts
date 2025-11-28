"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

// --- CLASSES ---

export async function getClasses() {
    try {
        const classes = await prisma.class.findMany({
            orderBy: { name: "asc" },
            include: {
                walikelas: true,
                _count: {
                    select: { students: true },
                },
            },
        });
        return { success: true, data: classes };
    } catch (error) {
        console.error("Error fetching classes:", error);
        return { success: false, error: "Failed to fetch classes" };
    }
}

export async function createClass(data: { name: string; level: number; academicYearId: number; walikelasId: number }) {
    try {
        const existing = await prisma.class.findUnique({
            where: {
                name_academicYearId: {
                    name: data.name,
                    academicYearId: data.academicYearId,
                },
            },
        });

        if (existing) {
            return { success: false, error: "Class name already exists in this academic year" };
        }

        const newClass = await prisma.class.create({
            data,
        });

        revalidatePath("/classes");
        return { success: true, data: newClass };
    } catch (error) {
        console.error("Error creating class:", error);
        return { success: false, error: "Failed to create class" };
    }
}

export async function updateClass(id: number, data: { name: string; level: number; academicYearId: number; walikelasId: number }) {
    try {
        const updatedClass = await prisma.class.update({
            where: { id },
            data,
        });

        revalidatePath("/classes");
        return { success: true, data: updatedClass };
    } catch (error) {
        console.error("Error updating class:", error);
        return { success: false, error: "Failed to update class" };
    }
}

export async function deleteClass(id: number) {
    try {
        await prisma.class.delete({
            where: { id },
        });

        revalidatePath("/classes");
        return { success: true };
    } catch (error) {
        console.error("Error deleting class:", error);
        return { success: false, error: "Failed to delete class" };
    }
}

// --- HALAQAHS ---

export async function getHalaqahs() {
    try {
        const halaqahs = await prisma.halaqah.findMany({
            orderBy: { name: "asc" },
            include: {
                teacher: true,
                _count: {
                    select: { students: true },
                },
            },
        });
        return { success: true, data: halaqahs };
    } catch (error) {
        console.error("Error fetching halaqahs:", error);
        return { success: false, error: "Failed to fetch halaqahs" };
    }
}

export async function createHalaqah(data: { name: string; teacherId: number }) {
    try {
        const existing = await prisma.halaqah.findFirst({
            where: { name: data.name },
        });

        if (existing) {
            return { success: false, error: "Halaqah name already exists" };
        }

        const newHalaqah = await prisma.halaqah.create({
            data,
        });

        revalidatePath("/halaqahs");
        return { success: true, data: newHalaqah };
    } catch (error) {
        console.error("Error creating halaqah:", error);
        return { success: false, error: "Failed to create halaqah" };
    }
}

export async function updateHalaqah(id: number, data: { name: string; teacherId: number }) {
    try {
        const updatedHalaqah = await prisma.halaqah.update({
            where: { id },
            data,
        });

        revalidatePath("/halaqahs");
        return { success: true, data: updatedHalaqah };
    } catch (error) {
        console.error("Error updating halaqah:", error);
        return { success: false, error: "Failed to update halaqah" };
    }
}

export async function deleteHalaqah(id: number) {
    try {
        await prisma.halaqah.delete({
            where: { id },
        });

        revalidatePath("/halaqahs");
        return { success: true };
    } catch (error) {
        console.error("Error deleting halaqah:", error);
        return { success: false, error: "Failed to delete halaqah" };
    }
}
