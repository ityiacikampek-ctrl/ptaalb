"use client";

import React, { useState } from "react";
import { Student } from "@prisma/client";
import StudentTable from "./StudentTable";
import StudentForm from "./StudentForm";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

interface StudentWithRelations extends Student {
    class?: { name: string } | null;
    halaqah?: { name: string } | null;
}

interface StudentClientProps {
    students: StudentWithRelations[];
}

export default function StudentClient({ students }: StudentClientProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<StudentWithRelations | null>(null);

    const handleAdd = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    const handleEdit = (item: StudentWithRelations) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    return (
        <>
            <Breadcrumb pageName="Students (Santri)" />

            <div className="flex flex-col gap-10">
                <div className="flex justify-end">
                    <button
                        onClick={handleAdd}
                        className="inline-flex items-center justify-center rounded-lg bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    >
                        Add Student
                    </button>
                </div>

                <StudentTable students={students} onEdit={handleEdit} />

                {isModalOpen && (
                    <StudentForm initialData={editingItem} onClose={handleClose} />
                )}
            </div>
        </>
    );
}
