"use client";

import React, { useState } from "react";
import { Halaqah, User } from "@prisma/client";
import { deleteHalaqah } from "@/actions/class-halaqah";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

interface HalaqahWithRelations extends Halaqah {
    teacher: User;
    _count: {
        students: number;
    };
}

interface HalaqahTableProps {
    halaqahs: HalaqahWithRelations[];
    onEdit: (halaqah: HalaqahWithRelations) => void;
}

export default function HalaqahTable({ halaqahs, onEdit }: HalaqahTableProps) {
    const [loadingId, setLoadingId] = useState<number | null>(null);

    const handleDelete = async (id: number) => {
        if (confirm("Are you sure you want to delete this halaqah?")) {
            setLoadingId(id);
            await deleteHalaqah(id);
            setLoadingId(null);
        }
    };

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                Halaqah Name
                            </th>
                            <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white">
                                Teacher (Musyrif)
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                Students
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark:text-white">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {halaqahs.map((halaqah) => (
                            <tr key={halaqah.id}>
                                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                    <h5 className="font-medium text-black dark:text-white">
                                        {halaqah.name}
                                    </h5>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">{halaqah.teacher.fullName}</p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <span className="inline-flex rounded-full bg-primary bg-opacity-10 py-1 px-3 text-sm font-medium text-primary">
                                        {halaqah._count.students}
                                    </span>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                                        <button
                                            onClick={() => onEdit(halaqah)}
                                            className="hover:text-primary"
                                        >
                                            <PencilIcon className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(halaqah.id)}
                                            className="hover:text-danger"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
