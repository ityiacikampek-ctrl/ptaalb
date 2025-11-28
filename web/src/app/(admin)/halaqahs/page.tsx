import React from "react";
import { Metadata } from "next";
import { getHalaqahs } from "@/actions/class-halaqah";
import { getUsers } from "@/actions/user";
import HalaqahClient from "@/components/halaqahs/HalaqahClient";

export const metadata: Metadata = {
    title: "Halaqahs | PTA Albashiirah",
    description: "Manage Halaqahs",
};

export default async function HalaqahsPage() {
    const { data: halaqahs } = await getHalaqahs();
    const { data: teachers } = await getUsers();

    return <HalaqahClient halaqahs={halaqahs || []} teachers={teachers || []} />;
}
