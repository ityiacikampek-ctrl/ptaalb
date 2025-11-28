"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function submitScore(data: {
    studentId: number;
    examId: number;
    examinerId: number;
    juz: number;
    surahStart: string;
    ayatStart: number;
    surahEnd: string;
    ayatEnd: number;
    question1: number;
    question2: number;
    question3: number;
    question4: number;
    question5: number;
    finalScore: number;
    isRemedial: boolean;
}) {
    try {
        const score = await prisma.tahfidzScore.create({
            data,
        });

        revalidatePath("/scoring");
        return { success: true, data: score };
    } catch (error) {
        console.error("Error submitting score:", error);
        return { success: false, error: "Failed to submit score" };
    }
}

export async function getStudentScores(studentId: number) {
    try {
        const scores = await prisma.tahfidzScore.findMany({
            where: { studentId },
            include: {
                exam: true,
                examiner: true,
            },
            orderBy: { createdAt: "desc" },
        });
        return { success: true, data: scores };
    } catch (error) {
        console.error("Error fetching student scores:", error);
        return { success: false, error: "Failed to fetch scores" };
    }
}
