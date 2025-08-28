// components/FAQ.tsx
import { FC, useState } from "react";
import { Locale } from "@/components/Locale/Locale";
import { RichText } from "@/components/RichText/RichText";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { Flexbox } from "@/components/Flexbox/Flexbox";

const Accordion = ({ faqs }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const { direction, GetLocale, language } = useLocalization();

    return (
        <div className="mb-8">
            <h2 className="mb-6 text-2xl font-semibold">
                <Locale variant="h2">Frequently Asked Questions</Locale>
            </h2>
            <Flexbox direction="column" className="space-y-4" gap={5}>
                {faqs.map((item, index) => (
                    <div
                        key={index}
                        className="bg-background-normal w-300 overflow-hidden rounded-lg border border-gray-200 shadow-sm"
                    >
                        <button
                            onClick={() =>
                                setOpenIndex(openIndex === index ? null : index)
                            }
                            className="flex w-full cursor-pointer items-center justify-between px-6 py-4 text-left text-lg font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <RichText
                                variant="p"
                                className="text-foreground-dark p-3 text-justify"
                                ExtractedTextRenders={(text) => (
                                    <span className="text-primary-normal font-bold">
                                        {text}
                                    </span>
                                )}
                            >
                                {GetLocale(item.question, language)}
                            </RichText>
                            <span
                                className={`transform transition-transform duration-300 ${
                                    openIndex === index ? "rotate-180" : ""
                                }`}
                            >
                                ▼
                            </span>
                        </button>
                        <div
                            className={`overflow-hidden px-6 transition-all duration-300 ${
                                openIndex === index
                                    ? "max-h-96 pb-4 pt-2 opacity-100"
                                    : "max-h-0 pb-0 pt-0 opacity-0"
                            }`}
                        >
                            <p className="leading-relaxed text-gray-600">
                                <RichText
                                    variant="p"
                                    className="text-foreground-dark p-5 text-justify"
                                    ExtractedTextRenders={(text) => (
                                        <span className="text-primary-normal font-bold">
                                            {text}
                                        </span>
                                    )}
                                >
                                    {GetLocale(item.answer, language)}
                                </RichText>
                            </p>
                        </div>
                    </div>
                ))}
            </Flexbox>
        </div>
    );
};

export default Accordion;
