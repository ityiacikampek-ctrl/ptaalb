"use client";

import React, { useState } from "react";
import { AcademicYear } from "@prisma/client";
import { deleteAcademicYear, toggleActiveAcademicYear } from "@/actions/academic-year";
import { PencilIcon, TrashIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

interface AcademicYearTableProps {
    academicYears: AcademicYear[];
    onEdit: (academicYear: AcademicYear) => void;
}

export default function AcademicYearTable({ academicYears, onEdit }: AcademicYearTableProps) {
    const [loadingId, setLoadingId] = useState<number | null>(null);

    const handleDelete = async (id: number) => {
        if (confirm("Are you sure you want to delete this academic year?")) {
            setLoadingId(id);
            await deleteAcademicYear(id);
            setLoadingId(null);
        }
    };

    const handleToggleActive = async (id: number) => {
        setLoadingId(id);
        await toggleActiveAcademicYear(id);
        setLoadingId(null);
    };

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                Academic Year
                            </th>
                            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                Status
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark:text-white">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {academicYears.map((year) => (
                            <tr key={year.id}>
                                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                    <h5 className="font-medium text-black dark:text-white">
                                        {year.name}
                                    </h5>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <button
                                        onClick={() => handleToggleActive(year.id)}
                                        disabled={loadingId === year.id}
                                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${year.isActive
                                                ? "bg-success text-success"
                                                : "bg-warning text-warning"
                                            }`}
                                    >
                                        {loadingId === year.id ? "Updating..." : year.isActive ? "Active" : "Inactive"}
                                    </button>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                                        <button
                                            onClick={() => onEdit(year)}
                                            className="hover:text-primary"
                                        >
                                            <PencilIcon className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(year.id)}
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
