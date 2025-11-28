"use client";

import React, { useState } from "react";
import { Exam, AcademicYear } from "@prisma/client";
import ExamTable from "./ExamTable";
import ExamForm from "./ExamForm";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

interface ExamWithRelations extends Exam {
    academicYear: AcademicYear;
    _count: {
        sessions: number;
        scores: number;
    };
}

interface ExamClientProps {
    exams: ExamWithRelations[];
    academicYears: AcademicYear[];
}

export default function ExamClient({ exams, academicYears }: ExamClientProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<ExamWithRelations | null>(null);

    const handleAdd = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    const handleEdit = (item: ExamWithRelations) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    return (
        <>
            <PageBreadcrumb pageTitle="Exams" />

            <div className="flex flex-col gap-10">
                <div className="flex justify-end">
                    <button
                        onClick={handleAdd}
                        className="inline-flex items-center justify-center rounded-lg bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    >
                        Add Exam
                    </button>
                </div>

                <ExamTable exams={exams} onEdit={handleEdit} />

                {isModalOpen && (
                    <ExamForm
                        initialData={editingItem}
                        academicYears={academicYears}
                        onClose={handleClose}
                    />
                )}
            </div>
        </>
    );
}
