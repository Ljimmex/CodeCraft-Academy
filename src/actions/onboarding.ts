"use server";

import pool from "@/lib/db";
import { stackServerApp } from "@/stack";
import { revalidatePath } from "next/cache";

export async function completeOnboarding(data: {
    coding_goal: string;
    preferred_language: string;
    username?: string;
    avatar_slug?: string;
}) {
    const user = await stackServerApp.getUser();

    if (!user) {
        throw new Error("User not authenticated");
    }

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        // Update local user record
        await client.query(
            `UPDATE users 
             SET coding_goal = $1, 
                 preferred_language = $2, 
                 onboarding_completed = TRUE,
                 username = COALESCE($3, username),
                 avatar_slug = $4
             WHERE auth_id = $5`,
            [data.coding_goal, data.preferred_language, data.username, data.avatar_slug, user.id]
        );

        await client.query("COMMIT");

        revalidatePath("/");
        return { success: true };
    } catch (error) {
        await client.query("ROLLBACK");
        console.error("Onboarding error:", error);
        return { success: false, error: "Failed to complete onboarding" };
    } finally {
        client.release();
    }
}

export async function checkOnboardingStatus() {
    const user = await stackServerApp.getUser();
    if (!user) return false;

    const client = await pool.connect();
    try {
        const res = await client.query(
            "SELECT onboarding_completed FROM users WHERE auth_id = $1",
            [user.id]
        );
        return res.rows[0]?.onboarding_completed || false;
    } finally {
        client.release();
    }
}
