import React from "react";
import { Metadata } from "next";
import { getUsers } from "@/actions/user";
import UserClient from "@/components/users/UserClient";

export const metadata: Metadata = {
    title: "Teachers & Staff | PTA Albashiirah",
    description: "Manage Teachers and Staff",
};

export default async function UsersPage() {
    const { data: users } = await getUsers();

    return <UserClient users={users || []} />;
}
