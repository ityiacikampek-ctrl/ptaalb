"use client";

import React, { useState, useEffect } from "react";
import { AcademicYear } from "@prisma/client";
import { createAcademicYear, updateAcademicYear } from "@/actions/academic-year";

interface AcademicYearFormProps {
    initialData?: AcademicYear | null;
    onClose: () => void;
}

export default function AcademicYearForm({ initialData, onClose }: AcademicYearFormProps) {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            let result;
            if (initialData) {
                result = await updateAcademicYear(initialData.id, name);
            } else {
                result = await createAcademicYear(name);
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
                    {initialData ? "Edit Academic Year" : "Add Academic Year"}
                </h3>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                            Name (e.g. 2025/2026)
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter academic year"
                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            required
                        />
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
