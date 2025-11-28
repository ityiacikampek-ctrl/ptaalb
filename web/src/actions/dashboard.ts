"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getDashboardStats() {
    try {
        const [studentCount, teacherCount, classCount, activeYear] = await Promise.all([
            prisma.student.count(),
            prisma.user.count(),
            prisma.class.count(),
            prisma.academicYear.findFirst({
                where: { isActive: true },
            }),
        ]);

        return {
            success: true,
            data: {
                studentCount,
                teacherCount,
                classCount,
                activeYear: activeYear?.name || "-",
            },
        };
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        return {
            success: false,
            error: "Failed to fetch dashboard stats",
            data: {
                studentCount: 0,
                teacherCount: 0,
                classCount: 0,
                activeYear: "-",
            },
        };
    }
}
