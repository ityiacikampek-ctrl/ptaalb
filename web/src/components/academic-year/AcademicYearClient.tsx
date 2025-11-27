"use client";

import React, { useState } from "react";
import { AcademicYear } from "@prisma/client";
import AcademicYearTable from "./AcademicYearTable";
import AcademicYearForm from "./AcademicYearForm";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

interface AcademicYearClientProps {
    academicYears: AcademicYear[];
}

export default function AcademicYearClient({ academicYears }: AcademicYearClientProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<AcademicYear | null>(null);

    const handleAdd = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    const handleEdit = (item: AcademicYear) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    return (
        <>
            <Breadcrumb pageName="Academic Years" />

            <div className="flex flex-col gap-10">
                <div className="flex justify-end">
                    <button
                        onClick={handleAdd}
                        className="inline-flex items-center justify-center rounded-lg bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    >
                        Add Academic Year
                    </button>
                </div>

                <AcademicYearTable academicYears={academicYears} onEdit={handleEdit} />

                {isModalOpen && (
                    <AcademicYearForm initialData={editingItem} onClose={handleClose} />
                )}
            </div>
        </>
    );
}
