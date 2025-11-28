"use client";

import React, { useState, useEffect } from "react";
import { Exam, AcademicYear, ExamType, Semester } from "@prisma/client";
import { createExam, updateExam } from "@/actions/exam";

interface ExamFormProps {
    initialData?: Exam | null;
    academicYears: AcademicYear[];
    onClose: () => void;
}

export default function ExamForm({ initialData, academicYears, onClose }: ExamFormProps) {
    const [formData, setFormData] = useState({
        title: "",
        type: "UTS" as ExamType,
        semester: "GANJIL" as Semester,
        academicYearId: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title,
                type: initialData.type,
                semester: initialData.semester,
                academicYearId: initialData.academicYearId.toString(),
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.academicYearId) {
            setError("Please select an academic year");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const dataToSubmit = {
                ...formData,
                academicYearId: Number(formData.academicYearId),
            };

            let result;
            if (initialData) {
                result = await updateExam(initialData.id, dataToSubmit);
            } else {
                result = await createExam(dataToSubmit);
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
                    {initialData ? "Edit Exam" : "Add Exam"}
                </h3>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                            Exam Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter exam title (e.g. UAS Semester 1)"
                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                            Type
                        </label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        >
                            <option value="UTS">UTS</option>
                            <option value="UAS">UAS</option>
                            <option value="HARIAN">HARIAN</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                            Semester
                        </label>
                        <select
                            name="semester"
                            value={formData.semester}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        >
                            <option value="GANJIL">GANJIL</option>
                            <option value="GENAP">GENAP</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                            Academic Year
                        </label>
                        <select
                            name="academicYearId"
                            value={formData.academicYearId}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            required
                        >
                            <option value="">Select Academic Year</option>
                            {academicYears.map((year) => (
                                <option key={year.id} value={year.id}>
                                    {year.name} {year.isActive ? "(Active)" : ""}
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
