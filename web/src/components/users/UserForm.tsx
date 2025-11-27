"use client";

import React, { useState, useEffect } from "react";
import { User, Role, Gender } from "@prisma/client";
import { createUser, updateUser } from "@/actions/user";

interface UserFormProps {
    initialData?: User | null;
    onClose: () => void;
}

export default function UserForm({ initialData, onClose }: UserFormProps) {
    const [formData, setFormData] = useState({
        niy: "",
        fullName: "",
        email: "",
        password: "",
        gender: "IKHWAN" as Gender,
        role: "GURU_DIINIYYAH" as Role,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (initialData) {
            setFormData({
                niy: initialData.niy,
                fullName: initialData.fullName,
                email: initialData.email || "",
                password: "", // Don't show password
                gender: initialData.gender,
                role: initialData.role,
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            let result;
            if (initialData) {
                result = await updateUser(initialData.id, formData);
            } else {
                result = await createUser(formData);
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
            <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg dark:bg-boxdark max-h-[90vh] overflow-y-auto">
                <h3 className="mb-6 text-2xl font-bold text-black dark:text-white">
                    {initialData ? "Edit User" : "Add User"}
                </h3>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="mb-4">
                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                                NIY (Nomor Induk Yayasan)
                            </label>
                            <input
                                type="text"
                                name="niy"
                                value={formData.niy}
                                onChange={handleChange}
                                placeholder="Enter NIY"
                                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Enter full name"
                                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                                Email (Optional)
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                                Password {initialData && "(Leave blank to keep current)"}
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                required={!initialData}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                                Gender
                            </label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            >
                                <option value="IKHWAN">IKHWAN</option>
                                <option value="AKHWAT">AKHWAT</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                                Role
                            </label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            >
                                <option value="MUDIR">MUDIR</option>
                                <option value="GURU_DIINIYYAH">GURU DIINIYYAH</option>
                                <option value="PENGAMPU_TAHFIDZ">PENGAMPU TAHFIDZ</option>
                                <option value="MUSYRIF">MUSYRIF</option>
                                <option value="TU">TU</option>
                                <option value="KESANTRIAN">KESANTRIAN</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                    </div>

                    {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

                    <div className="flex justify-end gap-4 mt-4">
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
