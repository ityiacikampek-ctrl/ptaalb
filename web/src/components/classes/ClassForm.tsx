"use client";

import React, { useState, useEffect } from "react";
import { Class, User } from "@prisma/client";
import { createClass, updateClass } from "@/actions/class-halaqah";

interface ClassFormProps {
    initialData?: Class | null;
    teachers: User[];
    onClose: () => void;
}

export default function ClassForm({ initialData, teachers, onClose }: ClassFormProps) {
    const [name, setName] = useState("");
    const [level, setLevel] = useState<number | "">("");
    const [academicYearId, setAcademicYearId] = useState<number | "">("");
    const [walikelasId, setWalikelasId] = useState<number | "">("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setLevel(initialData.level);
            setAcademicYearId(initialData.academicYearId);
            setWalikelasId(initialData.walikelasId || "");
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!walikelasId || !level || !academicYearId) {
            setError("Please fill all required fields");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const data = {
                name,
                level: Number(level),
                academicYearId: Number(academicYearId),
                walikelasId: Number(walikelasId),
            };

            let result;
            if (initialData) {
                result = await updateClass(initialData.id, data);
            } else {
                result = await createClass(data);
            }

            if (result.success) {
                onClose();
            } else {
                setError(result.error || "An error occurred");
            }
        } catch (err) {
            setError("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-999999 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-lg dark:bg-boxdark">
                <h3 className="mb-6 text-2xl font-bold text-black dark:text-white">
                    {initialData ? "Edit Class" : "Add Class"}
                </h3>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                            Class Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter class name"
                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                            Level (Tingkat)
                        </label>
                        <input
                            type="number"
                            value={level}
                            onChange={(e) => setLevel(Number(e.target.value))}
                            placeholder="Enter level (e.g. 7, 8, 9)"
                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                            Academic Year ID
                        </label>
                        <input
                            type="number"
                            value={academicYearId}
                            onChange={(e) => setAcademicYearId(Number(e.target.value))}
                            placeholder="Enter Academic Year ID"
                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                            Homeroom Teacher (Wali Kelas)
                        </label>
                        <select
                            value={walikelasId}
                            onChange={(e) => setWalikelasId(Number(e.target.value))}
                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            required
                        >
                            <option value="">Select Teacher</option>
                            {teachers.map((teacher) => (
                                <option key={teacher.id} value={teacher.id}>
                                    {teacher.fullName} ({teacher.niy})
                                </option>
                            ))}
                        </select>
                    </div>

                    {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-lg bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-90 disabled:opacity-50"
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
