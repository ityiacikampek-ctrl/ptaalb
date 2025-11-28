"use server";

import { PrismaClient, Gender } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function getStudents() {
    try {
        const students = await prisma.student.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                class: true,
                halaqah: true,
            },
        });
        return { success: true, data: students };
    } catch (error) {
        if (existingNis) {
            return { success: false, error: "NIS already exists" };
        }

        const student = await prisma.student.create({
            data,
        });

        revalidatePath("/students");
        return { success: true, data: student };
    } catch (error) {
        console.error("Error creating student:", error);
        return { success: false, error: "Failed to create student" };
    }
}

export async function updateStudent(
    id: number,
    data: {
        nis: string;
        nsin?: string;
        fullName: string;
        gender: Gender;
        birthPlace?: string;
        birthDate?: Date;
        address?: string;
        fatherName?: string;
        motherName?: string;
        parentPhone?: string;
        classId?: number;
        halaqahId?: number;
    }
) {
    try {
        const student = await prisma.student.update({
            where: { id },
            data,
        });

        revalidatePath("/students");
        return { success: true, data: student };
    } catch (error) {
        console.error("Error updating student:", error);
        return { success: false, error: "Failed to update student" };
    }
}

export async function deleteStudent(id: number) {
    try {
        await prisma.student.delete({
            where: { id },
        });

        revalidatePath("/students");
        return { success: true };
    } catch (error) {
        console.error("Error deleting student:", error);
        return { success: false, error: "Failed to delete student" };
    }
}
