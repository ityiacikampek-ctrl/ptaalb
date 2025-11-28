import React from "react";
import { getExams } from "@/actions/exam";
import { getAcademicYears } from "@/actions/academic-year";
import ExamClient from "@/components/exams/ExamClient";

export default async function ExamsPage() {
    const { data: exams } = await getExams();
    const { data: academicYears } = await getAcademicYears();

    return (
        <ExamClient
            exams={exams || []}
            academicYears={academicYears || []}
        />
    );
}
