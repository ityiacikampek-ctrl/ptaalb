"use server";

import { PrismaClient, Role, Gender } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

export async function getUsers(role?: Role) {
    try {
        const where = role ? { role } : {};
        const users = await prisma.user.findMany({
            where,
            orderBy: { createdAt: "desc" },
        });
        return { success: true, data: users };
    } catch (error) {
        console.error("Error fetching users:", error);
        return { success: false, error: "Failed to fetch users" };
    }
}

export async function createUser(data: {
    niy: string;
    email?: string;
    password?: string;
    fullName: string;
    gender: Gender;
    role: Role;
}) {
    try {
        const existingNiy = await prisma.user.findUnique({
            where: { niy: data.niy },
        });

        if (existingNiy) {
            return { success: false, error: "NIY already exists" };
        }

        if (data.email) {
            const existingEmail = await prisma.user.findUnique({
                where: { email: data.email },
            });
            if (existingEmail) {
                return { success: false, error: "Email already exists" };
            }
        }

        // Default password is NIY if not provided
        const password = data.password || data.niy;
        const hashedPassword = await hash(password, 10);

        const user = await prisma.user.create({
            data: {
                ...data,
                password: hashedPassword,
            },
        });

        revalidatePath("/users");
        return { success: true, data: user };
    } catch (error) {
        console.error("Error creating user:", error);
        return { success: false, error: "Failed to create user" };
    }
}

export async function updateUser(
    id: number,
    data: {
        niy: string;
        email?: string;
        fullName: string;
        gender: Gender;
        role: Role;
        password?: string;
    }
) {
    try {
        const updateData: any = { ...data };

        if (data.password) {
            updateData.password = await hash(data.password, 10);
        } else {
            delete updateData.password;
        }

        const user = await prisma.user.update({
            where: { id },
            data: updateData,
        });

        revalidatePath("/users");
        return { success: true, data: user };
    } catch (error) {
        console.error("Error updating user:", error);
        return { success: false, error: "Failed to update user" };
    }
}

export async function deleteUser(id: number) {
    try {
        await prisma.user.delete({
            where: { id },
        });

        revalidatePath("/users");
        return { success: true };
    } catch (error) {
        console.error("Error deleting user:", error);
        return { success: false, error: "Failed to delete user" };
    }
}
