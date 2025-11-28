"use client";

import React from "react";
import { Student, Exam, User } from "@prisma/client";
import ScoringForm from "./ScoringForm";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

interface ScoringClientProps {
    students: Student[];
    exams: Exam[];
    teachers: User[];
}

export default function ScoringClient({ students, exams, teachers }: ScoringClientProps) {
    return (
        <>
            <PageBreadcrumb pageTitle="Input Nilai Tahfidz" />
            <div className="grid grid-cols-1 gap-9">
                <div className="flex flex-col gap-9">
                    <ScoringForm
                        students={students}
                        exams={exams}
                        teachers={teachers}
                        onSuccess={() => {
                            // Optional: Refresh data or show toast
                        }}
                    />
                </div>
            </div>
        </>
    );
}
