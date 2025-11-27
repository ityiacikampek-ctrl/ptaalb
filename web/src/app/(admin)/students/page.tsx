import React from "react";
import { Metadata } from "next";
import { getStudents } from "@/actions/student";
import StudentClient from "@/components/students/StudentClient";

export const metadata: Metadata = {
    title: "Students | PTA Albashiirah",
    description: "Manage Students (Santri)",
};

export default async function StudentsPage() {
    const { data: students } = await getStudents();

    return <StudentClient students={students || []} />;
}
