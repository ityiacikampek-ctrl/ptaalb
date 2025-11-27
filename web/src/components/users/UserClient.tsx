"use client";

import React, { useState } from "react";
import { User } from "@prisma/client";
import UserTable from "./UserTable";
import UserForm from "./UserForm";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

interface UserClientProps {
    users: User[];
}

export default function UserClient({ users }: UserClientProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<User | null>(null);

    const handleAdd = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    const handleEdit = (item: User) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    return (
        <>
            <Breadcrumb pageName="Teachers & Staff" />

            <div className="flex flex-col gap-10">
                <div className="flex justify-end">
                    <button
                        onClick={handleAdd}
                        className="inline-flex items-center justify-center rounded-lg bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    >
                        Add User
                    </button>
                </div>

                <UserTable users={users} onEdit={handleEdit} />

                {isModalOpen && (
                    <UserForm initialData={editingItem} onClose={handleClose} />
                )}
            </div>
        </>
    );
}
