"use client";

import React, { useState, useEffect } from "react";
import { Student, Exam, User } from "@prisma/client";
import { submitScore } from "@/actions/score";
import { getSurahs, getVerses } from "@/actions/quran";

interface ScoringFormProps {
    students: Student[];
    exams: Exam[];
    teachers: User[];
    onSuccess: () => void;
}

interface Surah {
    id: number;
    name_simple: string;
}

export default function ScoringForm({ students, exams, teachers, onSuccess }: ScoringFormProps) {
    const [formData, setFormData] = useState({
        studentId: "",
        examId: "",
        examinerId: "",
        juz: "30",
        surahStart: "",
        ayatStart: "1",
        surahEnd: "",
        ayatEnd: "1",
        question1: 0,
        question2: 0,
        question3: 0,
        question4: 0,
        question5: 0,
        isRemedial: false,
    });

    const [surahs, setSurahs] = useState<Surah[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        async function loadSurahs() {
            const res = await getSurahs();
            if (res.success && res.data) {
                setSurahs(res.data);
            }
        }
        loadSurahs();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const calculateFinalScore = () => {
        const { question1, question2, question3, question4, question5 } = formData;
        const total =
            Number(question1) +
            Number(question2) +
            Number(question3) +
            Number(question4) +
            Number(question5);
        return total / 5;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccessMessage("");

        try {
            const finalScore = calculateFinalScore();
            const dataToSubmit = {
                studentId: Number(formData.studentId),
                examId: Number(formData.examId),
                examinerId: Number(formData.examinerId),
                juz: Number(formData.juz),
                surahStart: formData.surahStart,
                ayatStart: Number(formData.ayatStart),
                surahEnd: formData.surahEnd,
                ayatEnd: Number(formData.ayatEnd),
                question1: Number(formData.question1),
                question2: Number(formData.question2),
                question3: Number(formData.question3),
                question4: Number(formData.question4),
                question5: Number(formData.question5),
                finalScore,
                isRemedial: Boolean(formData.isRemedial),
            };

            const result = await submitScore(dataToSubmit);

            if (result.success) {
                setSuccessMessage("Score submitted successfully!");
                setFormData((prev) => ({
                    ...prev,
                    studentId: "", // Reset student but keep exam/examiner
                    question1: 0,
                    question2: 0,
                    question3: 0,
                    question4: 0,
                    question5: 0,
                    isRemedial: false,
                }));
                onSuccess();
            } else {
                setError(result.error || "Failed to submit score");
            }
        } catch (err) {
            setError("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    Input Nilai Tahfidz
                </h3>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="p-6.5">
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Exam <span className="text-meta-1">*</span>
                            </label>
                            <select
                                name="examId"
                                value={formData.examId}
                                onChange={handleChange}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                required
                            >
                                <option value="">Select Exam</option>
                                {exams.map((exam) => (
                                    <option key={exam.id} value={exam.id}>
                                        {exam.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="w-full xl:w-1/2">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Examiner <span className="text-meta-1">*</span>
                            </label>
                            <select
                                name="examinerId"
                                value={formData.examinerId}
                                onChange={handleChange}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                required
                            >
                                <option value="">Select Examiner</option>
                                {teachers.map((teacher) => (
                                    <option key={teacher.id} value={teacher.id}>
                                        {teacher.fullName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Student <span className="text-meta-1">*</span>
                        </label>
                        <select
                            name="studentId"
                            value={formData.studentId}
                            onChange={handleChange}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            required
                        >
                            <option value="">Select Student</option>
                            {students.map((student) => (
                                <option key={student.id} value={student.id}>
                                    {student.name} ({student.nis})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4.5 border-t border-stroke pt-4 dark:border-strokedark">
                        <h4 className="mb-4 text-lg font-semibold text-black dark:text-white">
                            Materi Ujian
                        </h4>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <div>
                                <label className="mb-2.5 block text-black dark:text-white">Juz</label>
                                <input
                                    type="number"
                                    name="juz"
                                    value={formData.juz}
                                    onChange={handleChange}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>
                            <div>
                                <label className="mb-2.5 block text-black dark:text-white">Surah Awal</label>
                                <select
                                    name="surahStart"
                                    value={formData.surahStart}
                                    onChange={handleChange}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                >
                                    <option value="">Select Surah</option>
                                    {surahs.map(s => <option key={s.id} value={s.name_simple}>{s.name_simple}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="mb-2.5 block text-black dark:text-white">Ayat Awal</label>
                                <input
                                    type="number"
                                    name="ayatStart"
                                    value={formData.ayatStart}
                                    onChange={handleChange}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>
                            <div>
                                <label className="mb-2.5 block text-black dark:text-white">Surah Akhir</label>
                                <select
                                    name="surahEnd"
                                    value={formData.surahEnd}
                                    onChange={handleChange}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                >
                                    <option value="">Select Surah</option>
                                    {surahs.map(s => <option key={s.id} value={s.name_simple}>{s.name_simple}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="mb-2.5 block text-black dark:text-white">Ayat Akhir</label>
                                <input
                                    type="number"
                                    name="ayatEnd"
                                    value={formData.ayatEnd}
                                    onChange={handleChange}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-4.5 border-t border-stroke pt-4 dark:border-strokedark">
                        <h4 className="mb-4 text-lg font-semibold text-black dark:text-white">
                            Penilaian (10-100)
                        </h4>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
                            {[1, 2, 3, 4, 5].map((num) => (
                                <div key={num}>
                                    <label className="mb-2.5 block text-black dark:text-white">Soal {num}</label>
                                    <input
                                        type="number"
                                        name={`question${num}`}
                                        value={(formData as any)[`question${num}`]}
                                        onChange={handleChange}
                                        min="0"
                                        max="100"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 text-right">
                            <p className="text-lg font-bold text-black dark:text-white">
                                Final Score: {calculateFinalScore().toFixed(2)}
                            </p>
                        </div>
                    </div>

                    <div className="mb-4.5">
                        <label className="flex cursor-pointer select-none items-center">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    name="isRemedial"
                                    checked={formData.isRemedial}
                                    onChange={handleChange}
                                    className="sr-only"
                                />
                                <div className={`block h-8 w-14 rounded-full bg-meta-9 ${formData.isRemedial ? '!bg-primary' : ''}`}></div>
                                <div className={`dot absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition ${formData.isRemedial ? '!translate-x-full !bg-primary' : ''}`}></div>
                            </div>
                            <span className="ml-3 text-black dark:text-white">Is Remedial?</span>
                        </label>
                    </div>

                    {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
                    {successMessage && <p className="mb-4 text-sm text-green-500">{successMessage}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 disabled:opacity-50"
                    >
                        {loading ? "Submitting..." : "Submit Score"}
                    </button>
                </div>
            </form>
        </div>
    );
}
