import React from "react";
import { Metadata } from "next";
import { getAcademicYears } from "@/actions/academic-year";
import AcademicYearClient from "@/components/academic-year/AcademicYearClient";

export const metadata: Metadata = {
    title: "Academic Years | PTA Albashiirah",
    description: "Manage Academic Years and Semesters",
};

export default async function AcademicYearsPage() {
    const { data: academicYears } = await getAcademicYears();

    return <AcademicYearClient academicYears={academicYears || []} />;
}
