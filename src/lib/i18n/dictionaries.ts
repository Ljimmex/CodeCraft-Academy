export type Dictionary = {
    navbar: {
        dashboard: string;
        learn: string;
        challenges: string;
        community: string;
        profile: string;
        settings: string;
        signOut: string;
    };
    settings: {
        title: string;
        profileInfo: string;
        profileDesc: string;
        appearance: string;
        appearanceDesc: string;
        language: string;
        theme: string;
        save: string;
        saving: string;
        success: string;
        error: string;
    };
    profile: {
        online: string;
        joined: string;
        editProfile: string;
        stats: string;
        totalXp: string;
        currentStreak: string;
        problemsSolved: string;
        activity: string;
        badges: string;
        certificates: string;
        noBadges: string;
        noCertificates: string;
        days: string;
        recently: string;
    };
};

export const dictionaries: Record<string, Dictionary> = {
    en: {
        navbar: {
            dashboard: "Dashboard",
            learn: "Learn",
            challenges: "Challenges",
            community: "Community",
            profile: "Profile",
            settings: "Account Settings",
            signOut: "Sign Out",
        },
        settings: {
            title: "Account Settings",
            profileInfo: "Profile Information",
            profileDesc: "Update your public profile details.",
            appearance: "Appearance",
            appearanceDesc: "Customize your experience.",
            language: "Language",
            theme: "Theme",
            save: "Save Changes",
            saving: "Saving...",
            success: "Profile updated successfully!",
            error: "Failed to update profile.",
        },
        profile: {
            online: "Online",
            joined: "Joined",
            editProfile: "Edit Profile",
            stats: "Stats",
            totalXp: "Total XP",
            currentStreak: "Current Streak",
            problemsSolved: "Problems Solved",
            activity: "Activity",
            badges: "Badges",
            certificates: "Certificates",
            noBadges: "No badges earned yet. Keep coding!",
            noCertificates: "No certificates earned yet. Complete a course to earn one!",
            days: "Days",
            recently: "Recently",
        },
    },
    pl: {
        navbar: {
            dashboard: "Panel",
            learn: "Nauka",
            challenges: "Wyzwania",
            community: "Społeczność",
            profile: "Profil",
            settings: "Ustawienia konta",
            signOut: "Wyloguj się",
        },
        settings: {
            title: "Ustawienia konta",
            profileInfo: "Informacje o profilu",
            profileDesc: "Zaktualizuj swoje dane publiczne.",
            appearance: "Wygląd",
            appearanceDesc: "Dostosuj swoje doświadczenie.",
            language: "Język",
            theme: "Motyw",
            save: "Zapisz zmiany",
            saving: "Zapisywanie...",
            success: "Profil zaktualizowany pomyślnie!",
            error: "Nie udało się zaktualizować profilu.",
        },
        profile: {
            online: "Online",
            joined: "Dołączył",
            editProfile: "Edytuj profil",
            stats: "Statystyki",
            totalXp: "Całkowite XP",
            currentStreak: "Obecna passa",
            problemsSolved: "Rozwiązane problemy",
            activity: "Aktywność",
            badges: "Odznaki",
            certificates: "Certyfikaty",
            noBadges: "Jeszcze nie zdobyto żadnych odznak. Koduj dalej!",
            noCertificates: "Jeszcze nie zdobyto żadnych certyfikatów. Ukończ kurs, aby zdobyć jeden!",
            days: "Dni",
            recently: "Niedawno",
        },
    },
};
