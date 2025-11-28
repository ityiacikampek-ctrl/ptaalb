"use client";

import React, { useState } from "react";
import { Halaqah, User } from "@prisma/client";
import HalaqahTable from "./HalaqahTable";
import HalaqahForm from "./HalaqahForm";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

interface HalaqahWithRelations extends Halaqah {
    teacher: User;
    _count: {
        students: number;
    };
}

interface HalaqahClientProps {
    halaqahs: HalaqahWithRelations[];
    teachers: User[];
}

export default function HalaqahClient({ halaqahs, teachers }: HalaqahClientProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<HalaqahWithRelations | null>(null);

    const handleAdd = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    const handleEdit = (item: HalaqahWithRelations) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    return (
        <>
            <PageBreadcrumb pageTitle="Halaqahs" />

            <div className="flex flex-col gap-10">
                <div className="flex justify-end">
                    <button
                        onClick={handleAdd}
                        className="inline-flex items-center justify-center rounded-lg bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    >
                        Add Halaqah
                    </button>
                </div>

                <HalaqahTable halaqahs={halaqahs} onEdit={handleEdit} />

                {isModalOpen && (
                    <HalaqahForm
                        initialData={editingItem}
                        teachers={teachers}
                        onClose={handleClose}
                    />
                )}
            </div>
        </>
    );
}
