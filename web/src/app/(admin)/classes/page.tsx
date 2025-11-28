import React from "react";
import { Metadata } from "next";
import { getClasses } from "@/actions/class-halaqah";
import { getUsers } from "@/actions/user";
import ClassClient from "@/components/classes/ClassClient";

export const metadata: Metadata = {
    title: "Classes | PTA Albashiirah",
    description: "Manage Classes",
};

export default async function ClassesPage() {
    const { data: classes } = await getClasses();
    const { data: teachers } = await getUsers();

    return <ClassClient classes={classes || []} teachers={teachers || []} />;
}
