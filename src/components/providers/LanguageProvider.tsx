"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { dictionaries, Dictionary } from "@/lib/i18n/dictionaries";
import { getCurrentUser } from "@/actions/user";

type LanguageContextType = {
    language: string;
    setLanguage: (lang: string) => void;
    t: Dictionary;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState("en");
    const [t, setT] = useState<Dictionary>(dictionaries.en);

    useEffect(() => {
        async function initLanguage() {
            const user = await getCurrentUser();
            if (user?.language) {
                setLanguage(user.language);
            }
        }
        initLanguage();
    }, []);

    useEffect(() => {
        setT(dictionaries[language] || dictionaries.en);
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
