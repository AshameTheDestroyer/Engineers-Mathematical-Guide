// components/Accordion/Accordion.tsx
import { useState } from "react";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Locale } from "@/components/Locale/Locale";

export const Accordion = ({ sections }) => {
    const [openSection, setOpenSection] = useState(null); // 'getting-started', etc.
    const [openItem, setOpenItem] = useState(null); // `${sectionKey}-item-0`

    const toggleSection = (key) => {
        setOpenSection(openSection === key ? null : key);
        setOpenItem(null); // Close any open item when section changes
    };

    const toggleItem = (key) => {
        setOpenItem(openItem === key ? null : key);
    };

    return (
        <div className="space-y-4">
            {sections.map((section) => (
                <Flexbox
                    key={section.key}
                    direction="column"
                    className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                >
                    {/* Section Button */}
                    <button
                        type="button"
                        onClick={() => toggleSection(section.key)}
                        className="text-primary-normal flex w-full items-center justify-between text-lg font-semibold"
                    >
                        <Locale variant="h3">{section.title}</Locale>
                        <span
                            className={`transform text-lg transition-transform ${
                                openSection === section.key ? "rotate-180" : ""
                            }`}
                        >
                            ▼
                        </span>
                    </button>

                    {/* Items List */}
                    {openSection === section.key && (
                        <ul className="mt-4 space-y-3 border-t pt-4">
                            {section.items.map((item, idx) => {
                                const itemKey = `${section.key}-item-${idx}`;
                                return (
                                    <li
                                        key={idx}
                                        className="border-b border-gray-100 pb-3 dark:border-gray-700"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => toggleItem(itemKey)}
                                            className="hover:text-primary-normal flex w-full items-center justify-between text-gray-800 dark:text-gray-200"
                                        >
                                            <Locale>{item.title}</Locale>
                                            <span
                                                className={`transform text-sm transition-transform ${
                                                    openItem === itemKey
                                                        ? "rotate-180"
                                                        : ""
                                                }`}
                                            >
                                                ▼
                                            </span>
                                        </button>

                                        {/* Content */}
                                        {openItem === itemKey && (
                                            <p className="mt-3 leading-relaxed text-gray-700 dark:text-gray-300">
                                                <Locale>{item.content}</Locale>
                                            </p>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </Flexbox>
            ))}
        </div>
    );
};
