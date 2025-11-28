"use server";

import { PrismaClient, ExamType, Semester } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function getExams() {
    try {
        const exams = await prisma.exam.findMany({
            orderBy: { id: "desc" },
            include: {
                academicYear: true,
                _count: {
                    select: { sessions: true, scores: true },
                },
            },
        });
        return { success: true, data: exams };
    } catch (error) {
        console.error("Error fetching exams:", error);
        return { success: false, error: "Failed to fetch exams" };
    }
}

export async function createExam(data: {
    title: string;
    type: ExamType;
    semester: Semester;
    academicYearId: number;
}) {
    try {
        const newExam = await prisma.exam.create({
            data,
        });

        revalidatePath("/exams");
        return { success: true, data: newExam };
    } catch (error) {
        console.error("Error creating exam:", error);
        return { success: false, error: "Failed to create exam" };
    }
}

export async function updateExam(
    id: number,
    data: {
        title: string;
        type: ExamType;
        semester: Semester;
        academicYearId: number;
    }
) {
    try {
        const updatedExam = await prisma.exam.update({
            where: { id },
            data,
        });

        revalidatePath("/exams");
        return { success: true, data: updatedExam };
    } catch (error) {
        console.error("Error updating exam:", error);
        return { success: false, error: "Failed to update exam" };
    }
}

export async function deleteExam(id: number) {
    try {
        await prisma.exam.delete({
            where: { id },
        });

        revalidatePath("/exams");
        return { success: true };
    } catch (error) {
        console.error("Error deleting exam:", error);
        return { success: false, error: "Failed to delete exam" };
    }
}
