"use server";

import pool from "@/lib/db";
import { stackServerApp } from "@/stack";
import { revalidatePath } from "next/cache";

export async function getCurrentUser() {
    const user = await stackServerApp.getUser();
    if (!user) return null;

    const client = await pool.connect();
    try {
        const res = await client.query(
            "SELECT * FROM users WHERE auth_id = $1",
            [user.id]
        );
        return res.rows[0] || null;
    } finally {
        client.release();
    }
}

export async function updateUserProfile(data: {
    username: string;
    bio: string;
    coding_goal: string;
    preferred_language: string;
    avatar_slug?: string;
}) {
    const user = await stackServerApp.getUser();
    if (!user) throw new Error("User not authenticated");

    const client = await pool.connect();
    try {
        await client.query(
            `UPDATE users 
             SET username = $1, bio = $2, coding_goal = $3, preferred_language = $4, avatar_slug = $5
             WHERE auth_id = $6`,
            [data.username, data.bio, data.coding_goal, data.preferred_language, data.avatar_slug, user.id]
        );
        revalidatePath("/");
        revalidatePath("/profile");
        revalidatePath("/settings");
        return { success: true };
    } catch (error) {
        console.error("Update profile error:", error);
        return { success: false, error: "Failed to update profile" };
    } finally {
        client.release();
    }
}
