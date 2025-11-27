"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function getAcademicYears() {
    try {
        const academicYears = await prisma.academicYear.findMany({
            orderBy: { createdAt: "desc" },
        });
        return { success: true, data: academicYears };
    } catch (error) {
        console.error("Error fetching academic years:", error);
        return { success: false, error: "Failed to fetch academic years" };
    }
}

export async function createAcademicYear(name: string) {
    try {
        const existing = await prisma.academicYear.findUnique({
            where: { name },
        });

        if (existing) {
            return { success: false, error: "Academic year already exists" };
        }

        const academicYear = await prisma.academicYear.create({
            data: { name },
        });

        revalidatePath("/academic-years");
        return { success: true, data: academicYear };
    } catch (error) {
        console.error("Error creating academic year:", error);
        return { success: false, error: "Failed to create academic year" };
    }
}

export async function updateAcademicYear(id: number, name: string) {
    try {
        const academicYear = await prisma.academicYear.update({
            where: { id },
            data: { name },
        });

        revalidatePath("/academic-years");
        return { success: true, data: academicYear };
    } catch (error) {
        console.error("Error updating academic year:", error);
        return { success: false, error: "Failed to update academic year" };
    }
}

export async function deleteAcademicYear(id: number) {
    try {
        await prisma.academicYear.delete({
            where: { id },
        });

        revalidatePath("/academic-years");
        return { success: true };
    } catch (error) {
        console.error("Error deleting academic year:", error);
        return { success: false, error: "Failed to delete academic year" };
    }
}

export async function toggleActiveAcademicYear(id: number) {
    try {
        // Transaction to set all others to inactive and this one to active
        await prisma.$transaction([
            prisma.academicYear.updateMany({
                where: { id: { not: id } },
                data: { isActive: false },
            }),
            prisma.academicYear.update({
                where: { id },
                data: { isActive: true },
            }),
        ]);

        revalidatePath("/academic-years");
        return { success: true };
    } catch (error) {
        console.error("Error toggling active academic year:", error);
        return { success: false, error: "Failed to set active academic year" };
    }
}
