"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { IoColorPaletteOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";

type ThemeOption = {
    name: "blue" | "purple" | "teal" | "rose" | "amber" | "sunset" | "emerald" | "crimson" | "nord" | "cyberpunk" | "mint";
    label: string;
    color: string;
    gradient: string;
};

const themeOptions: ThemeOption[] = [
    {
        name: "blue",
        label: "Blue",
        color: "rgb(37, 99, 235)",
        gradient: "from-blue-600 to-blue-400"
    },
    {
        name: "purple",
        label: "Purple",
        color: "rgb(147, 51, 234)",
        gradient: "from-purple-600 to-purple-400"
    },
    {
        name: "teal",
        label: "Teal",
        color: "rgb(13, 148, 136)",
        gradient: "from-teal-600 to-teal-400"
    },
    {
        name: "rose",
        label: "Rose",
        color: "rgb(225, 29, 72)",
        gradient: "from-rose-600 to-rose-400"
    },
    {
        name: "amber",
        label: "Amber",
        color: "rgb(217, 119, 6)",
        gradient: "from-amber-600 to-amber-400"
    },
    {
        name: "sunset",
        label: "Sunset",
        color: "rgb(234, 88, 12)",
        gradient: "from-orange-600 to-orange-400"
    },
    {
        name: "emerald",
        label: "Emerald",
        color: "rgb(5, 150, 105)",
        gradient: "from-emerald-600 to-emerald-400"
    },
    {
        name: "crimson",
        label: "Crimson",
        color: "rgb(220, 38, 38)",
        gradient: "from-red-600 to-red-400"
    },
    {
        name: "nord",
        label: "Nord",
        color: "rgb(49, 112, 179)",
        gradient: "from-blue-700 to-blue-500"
    },
    {
        name: "cyberpunk",
        label: "Cyberpunk",
        color: "rgb(236, 236, 0)",
        gradient: "from-yellow-400 to-fuchsia-600"
    },
    {
        name: "mint",
        label: "Mint",
        color: "rgb(34, 197, 94)",
        gradient: "from-green-600 to-green-400"
    }
];

export default function ThemeSwitcherButton() {
    const { themeColor, setThemeColor, isLoaded } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    if (!isLoaded) {
        return null;
    }

    const currentTheme = themeOptions.find(option => option.name === themeColor) || themeOptions[0];

    return (
        <>
            <motion.button
                className="fixed bottom-6 right-6 p-3 rounded-full shadow-lg z-40 backdrop-blur-md bg-card/80 border border-color-border"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                style={{
                    backgroundColor: isOpen ? 'var(--color-bg-card)' : currentTheme.color,
                    borderColor: isOpen ? 'var(--color-border)' : 'transparent'
                }}
            >
                <IoColorPaletteOutline className={`w-5 h-5 ${isOpen ? 'text-color-text' : 'text-white'}`} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                        />

                        <motion.div
                            className="fixed bottom-20 right-6 bg-card border border-color-border rounded-2xl p-3 shadow-xl z-50 max-w-xs w-full"
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.9 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-medium text-color-text">Change Theme</h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 rounded-full hover:bg-card-alt"
                                >
                                    <IoCloseOutline className="w-5 h-5 text-color-text-muted" />
                                </button>
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                                {themeOptions.map((option) => (
                                    <button
                                        key={option.name}
                                        className={`
                      flex flex-col items-center gap-1 p-2 rounded-lg transition-all
                      ${themeColor === option.name ? 'ring-2 ring-primary-500 bg-primary-500/10' : 'hover:bg-card-alt'}
                    `}
                                        onClick={() => {
                                            setThemeColor(option.name);
                                        }}
                                    >
                                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${option.gradient}`}></div>
                                        <span className="text-xs text-color-text-muted">{option.label}</span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
