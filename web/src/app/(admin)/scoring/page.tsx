import React from "react";
import { getStudents } from "@/actions/student";
import { getExams } from "@/actions/exam";
import { getUsers } from "@/actions/user";
import ScoringClient from "@/components/scoring/ScoringClient";

export default async function ScoringPage() {
    const { data: students } = await getStudents();
    const { data: exams } = await getExams();
    const { data: teachers } = await getUsers(); // Assuming this fetches all users, might need filtering for teachers

    // Filter users to only show teachers if possible, or just pass all for now
    // Ideally we should have a getTeachers action or filter here
    const teacherList = teachers?.filter(u => u.role === "GURU_DIINIYYAH" || u.role === "PENGAMPU_TAHFIDZ" || u.role === "MUSYRIF") || [];

    return (
        <ScoringClient
            students={students || []}
            exams={exams || []}
            teachers={teacherList}
        />
    );
}
