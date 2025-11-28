"use client";

import React, { useState } from "react";
import { Class, User } from "@prisma/client";
import ClassTable from "./ClassTable";
import ClassForm from "./ClassForm";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

interface ClassWithRelations extends Class {
    walikelas: User | null;
    _count: {
        students: number;
    };
}

interface ClassClientProps {
    classes: ClassWithRelations[];
    teachers: User[];
}

export default function ClassClient({ classes, teachers }: ClassClientProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<ClassWithRelations | null>(null);

    const handleAdd = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    const handleEdit = (item: ClassWithRelations) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    return (
        <>
            <PageBreadcrumb pageTitle="Classes" />

            <div className="flex flex-col gap-10">
                <div className="flex justify-end">
                    <button
                        onClick={handleAdd}
                        className="inline-flex items-center justify-center rounded-lg bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    >
                        Add Class
                    </button>
                </div>

                <ClassTable classes={classes} onEdit={handleEdit} />

                {isModalOpen && (
                    <ClassForm
                        initialData={editingItem}
                        teachers={teachers}
                        onClose={handleClose}
                    />
                )}
            </div>
        </>
    );
}
