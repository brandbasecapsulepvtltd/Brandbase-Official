"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button
                className="p-2 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-500 transition-all opacity-50 cursor-wait"
                aria-label="Toggle theme"
            >
                <Sun size={20} />
            </button>
        );
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all text-gray-700 dark:text-gray-300 border border-transparent hover:border-gray-200 dark:hover:border-zinc-700"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? (
                <Sun size={20} className="text-yellow-400" />
            ) : (
                <Moon size={20} className="text-slate-700" />
            )}
        </button>
    );
};

export default ThemeToggle;
