import { FC, useState } from "react";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Locale } from "@/components/Locale/Locale";
import { Typography } from "@/components/Typography/Typography";
import locales from "@localization/help_page.json";
import { Button } from "@/components/Button/Button";
import { WEBSITE_ROUTES } from "@/routes/website.routes";
import { ButtonBox } from "@/components/ButtonBox/ButtonBox";
import { SearchHeader } from "@/components/SearchHeader";
import { useSchematicSearch } from "@/hooks/useSchematicSearch";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import {
    FeedbackPopup,
    InlineFeedbackSection,
} from "../components/FeedBackPopUp";

const sections = [
    locales.categories.gettingStarted,
    locales.categories.accountAccess,
    locales.categories.learningResources,
    locales.categories.technicalIssues,
    locales.categories.forEducators,
];

export const HelpPage: FC = () => {
    const { language, GetLocale } = useLocalization();
    const { searchQuery, setSearchQuery } = useSchematicSearch();
    const [showFeedback, setShowFeedback] = useState(false);

    const [openSections, setOpenSections] = useState<Record<string, boolean>>(
        Object.fromEntries(sections.map((s) => [s.title.en, true]))
    );

    const [openParagraphs, setOpenParagraphs] = useState<
        Record<string, boolean>
    >({});
    const [userFeedback, setUserFeedback] = useState("");

    const toggleSection = (titleKey: string) => {
        setOpenSections((prev) => ({
            ...prev,
            [titleKey]: !prev[titleKey],
        }));
    };

    const toggleParagraph = (sectionTitle: string, itemIndex: number) => {
        const key = `${sectionTitle}-${itemIndex}`;
        setOpenParagraphs((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <Flexbox
            variant="main"
            direction="column"
            gap="8"
            className="mx-auto w-full max-w-4xl px-4 py-10 md:px-6"
        >
            <SearchHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                title={GetLocale(locales.title, language)}
                inputLabel={GetLocale(locales.inputs.search.label, language)}
            />

            <Flexbox
                direction="column"
                gap="6"
                className="text-foreground-dark mt-8"
            >
                {sections.map((item) => {
                    const titleKey = item.title.en;
                    const isOpen = openSections[titleKey];

                    return (
                        <Flexbox
                            key={titleKey}
                            direction="column"
                            className="bg-background-normal rounded-xl border border-gray-200 p-5 shadow-sm"
                        >
                            <button
                                type="button"
                                className="text-secondary-dark mb-4 flex w-full items-center justify-between text-lg font-semibold focus:outline-none"
                                onClick={() => toggleSection(titleKey)}
                                aria-expanded={isOpen}
                            >
                                <Locale variant="h3">{item.title}</Locale>
                                <Typography
                                    variant="span"
                                    className={`transform text-xl transition-transform duration-200 ${
                                        isOpen ? "rotate-180" : ""
                                    }`}
                                >
                                    ▼
                                </Typography>
                            </button>

                            <ul
                                className={`space-y-2 overflow-hidden transition-all duration-300 ${
                                    isOpen
                                        ? "max-h-96 opacity-100"
                                        : "max-h-0 opacity-0"
                                }`}
                            >
                                {item.items.map((listItem, idx) => {
                                    const paragraphKey = `${titleKey}-${idx}`;
                                    const isParagraphOpen =
                                        openParagraphs[paragraphKey];
                                    const paragraphLocaleKey = `${titleKey}.items.content${idx + 1}`;
                                    const paragraphContent = GetLocale(
                                        locales.paragraphs?.[
                                            paragraphLocaleKey
                                        ] || "No content available.",
                                        language
                                    );

                                    return (
                                        <li
                                            key={idx}
                                            className="bg-background-normal text-default-normal hover:text-default-dark-hover hover:bg-background-light-hover rounded px-3 py-2 transition"
                                        >
                                            <Flexbox
                                                justifyContent="space-between"
                                                alignItems="center"
                                            >
                                                <Locale>{listItem}</Locale>
                                                <button
                                                    type="button"
                                                    className="text-sm text-blue-600 underline hover:text-blue-800 dark:text-blue-400"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleParagraph(
                                                            titleKey,
                                                            idx
                                                        );
                                                    }}
                                                >
                                                    <Locale>
                                                        {locales.readParagraph}
                                                    </Locale>
                                                </button>
                                            </Flexbox>

                                            <div
                                                className={`mt-2 overflow-hidden transition-all duration-300 ${
                                                    isParagraphOpen
                                                        ? "max-h-96 opacity-100"
                                                        : "max-h-0 opacity-0"
                                                }`}
                                            >
                                                <Typography
                                                    variant="p"
                                                    className="text-foreground-darker text-sm leading-relaxed"
                                                >
                                                    {paragraphContent}
                                                </Typography>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </Flexbox>
                    );
                })}
            </Flexbox>

            <Flexbox
                variant="main"
                direction="column"
                gap="8"
                className="max-w-10xl text-foreground-dark mx-auto w-full px-4 py-6 md:px-6"
            >
                <Flexbox
                    direction="column"
                    className="bg-background-normal text-foreground-dark rounded-xl border border-gray-200 p-5 shadow-sm"
                >
                    <Locale
                        variant="h3"
                        className="text-secondary-dark mb-4 text-lg font-semibold"
                    >
                        {locales.popularArticles.title}
                    </Locale>
                    <ul className="space-y-3">
                        {locales.popularArticles.articles.map(
                            (article, idx) => {
                                const paragraphKey = `popular-${idx}`;
                                const isParagraphOpen =
                                    openParagraphs[paragraphKey];
                                const paragraphLocaleKey = `popularArticles.articles.content${idx + 1}`;
                                const paragraphContent = GetLocale(
                                    locales.paragraphs?.[paragraphLocaleKey] ||
                                        "No content available.",
                                    language
                                );

                                return (
                                    <li key={idx}>
                                        <Flexbox className="text-default-normal hover:text-default-dark-hover hover:bg-background-light-hover flex items-center justify-between rounded px-3 py-2">
                                            <Locale>{article}</Locale>
                                            <button
                                                type="button"
                                                className="text-sm text-blue-600 underline hover:text-blue-800 dark:text-blue-400"
                                                onClick={() =>
                                                    toggleParagraph(
                                                        "popular",
                                                        idx
                                                    )
                                                }
                                            >
                                                <Locale>
                                                    {locales.readParagraph}
                                                </Locale>
                                            </button>
                                        </Flexbox>

                                        <div
                                            className={`mt-2 overflow-hidden transition-all duration-300 ${
                                                isParagraphOpen
                                                    ? "max-h-96 opacity-100"
                                                    : "max-h-0 opacity-0"
                                            }`}
                                        >
                                            <Typography
                                                variant="p"
                                                className="text-foreground-darker text-sm leading-relaxed"
                                            >
                                                {paragraphContent}
                                            </Typography>
                                        </div>
                                    </li>
                                );
                            }
                        )}
                    </ul>
                </Flexbox>

                <Flexbox direction="column" gap="3" className="items-center">
                    {/* <Locale variant="p" className="text-foreground-dark">
                        {locales.feedback.question}
                    </Locale>
                    <ButtonBox className="w-32">
                        <Button
                            className="flex-1"
                            onClick={() => setShowFeedback(true)}
                        >
                            <Locale>{locales.feedback.yes}</Locale>
                        </Button>
                        <Button
                            className="flex-1"
                            onClick={() => setShowFeedback(false)}
                        >
                            <Locale>{locales.feedback.no}</Locale>
                        </Button>
                    </ButtonBox> */}
                </Flexbox>

                {/* <FeedbackPopup
                    isOpen={showFeedback}
                    onClose={() => setShowFeedback(false)}
                /> */}

                <InlineFeedbackSection />

                <Flexbox
                    direction="column"
                    gap={10}
                    className="p-8 text-center"
                >
                    <Locale
                        variant="h2"
                        className="text-xl font-bold md:text-2xl"
                    >
                        {locales.cta.text}
                    </Locale>

                    <Button
                        link={WEBSITE_ROUTES.base.routes["contact-us"].absolute}
                        className="h-15 text-xl"
                        variant="primary"
                    >
                        <Locale>{locales.cta.text}</Locale>
                    </Button>
                </Flexbox>
            </Flexbox>
        </Flexbox>
    );
};

// import { FC, useState } from "react";
// import { Flexbox } from "@/components/Flexbox/Flexbox";
// import { Locale } from "@/components/Locale/Locale";
// import { Typography } from "@/components/Typography/Typography";
// import locales from "@localization/help_page.json";
// import { Button } from "@/components/Button/Button";
// import { WEBSITE_ROUTES } from "@/routes/website.routes";
// import { ButtonBox } from "@/components/ButtonBox/ButtonBox";
// import { SearchHeader } from "@/components/SearchHeader";
// import { useSchematicSearch } from "@/hooks/useSchematicSearch";
// import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

// const sections = [
//     locales.categories.gettingStarted,
//     locales.categories.accountAccess,
//     locales.categories.learningResources,
//     locales.categories.technicalIssues,
//     locales.categories.forEducators,
// ];

// export const HelpPage: FC = () => {
//     const { language, GetLocale } = useLocalization();
//     const { searchQuery, setSearchQuery } = useSchematicSearch();

//     const [openSections, setOpenSections] = useState<Record<string, boolean>>(
//         Object.fromEntries(sections.map((s) => [s.title.en, true]))
//     );

//     const toggleSection = (titleKey: string) => {
//         setOpenSections((prev) => ({
//             ...prev,
//             [titleKey]: !prev[titleKey],
//         }));
//     };

//     return (
//         <Flexbox
//             variant="main"
//             direction="column"
//             gap="8"
//             className="mx-auto w-full max-w-4xl px-4 py-10 md:px-6"
//         >
//             <SearchHeader
//                 searchQuery={searchQuery}
//                 setSearchQuery={setSearchQuery}
//                 title={GetLocale(locales.title, language)}
//                 inputLabel={GetLocale(locales.inputs.search.label, language)}
//             />

//             <Flexbox
//                 direction="column"
//                 gap="6"
//                 className="text-foreground-dark mt-8"
//             >
//                 {sections.map((item) => {
//                     const titleKey = item.title.en;
//                     const isOpen = openSections[titleKey];

//                     return (
//                         <Flexbox
//                             key={titleKey}
//                             direction="column"
//                             className="bg-background-normal rounded-xl border border-gray-200 p-5 shadow-sm"
//                         >
//                             <button
//                                 type="button"
//                                 className="text-secondary-dark mb-4 flex w-full items-center justify-between text-lg font-semibold focus:outline-none"
//                                 onClick={() => toggleSection(titleKey)}
//                                 aria-expanded={isOpen}
//                             >
//                                 <Locale variant="h3">{item.title}</Locale>
//                                 <Typography
//                                     variant="span"
//                                     className={`transform text-xl transition-transform duration-200 ${
//                                         isOpen ? "rotate-180" : ""
//                                     }`}
//                                 >
//                                     ▼
//                                 </Typography>
//                             </button>

//                             <ul
//                                 className={`space-y-2 overflow-hidden transition-all duration-300 ${
//                                     isOpen
//                                         ? "max-h-96 opacity-100"
//                                         : "max-h-0 opacity-0"
//                                 }`}
//                             >
//                                 {item.items.map((listItem, idx) => (
//                                     <li
//                                         key={idx}
//                                         className="bg-background-normal text-default-normal hover:text-default-dark-hover hover:bg-background-light-hover rounded px-3 py-2 transition"
//                                     >
//                                         <Flexbox
//                                             justifyContent="space-between"
//                                             alignItems="center"
//                                         >
//                                             <Locale>{listItem}</Locale>
//                                             <div className="text-sm">
//                                                 <Locale>
//                                                     {locales.readParagraph}
//                                                 </Locale>
//                                             </div>
//                                         </Flexbox>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </Flexbox>
//                     );
//                 })}
//             </Flexbox>

//             <Flexbox
//                 variant="main"
//                 direction="column"
//                 gap="8"
//                 className="max-w-10xl text-foreground-dark mx-auto w-full px-4 py-6 md:px-6"
//             >
//                 <Flexbox
//                     direction="column"
//                     className="bg-background-normal text-foreground-dark rounded-xl border border-gray-200 p-5 shadow-sm"
//                 >
//                     <Locale
//                         variant="h3"
//                         className="text-secondary-dark mb-4 text-lg font-semibold"
//                     >
//                         {locales.popularArticles.title}
//                     </Locale>
//                     <ul className="space-y-3">
//                         {locales.popularArticles.articles.map(
//                             (article, idx) => (
//                                 <li key={idx}>
//                                     <Flexbox className="text-default-normal hover:text-default-dark-hover hover:bg-background-light-hover flex items-center justify-between rounded px-3 py-2 text-sm">
//                                         <Locale>{article}</Locale>
//                                         <div className="hover:bg-background-dark-hover text-sm">
//                                             <Locale>
//                                                 {locales.readParagraph}
//                                             </Locale>
//                                         </div>
//                                     </Flexbox>
//                                 </li>
//                             )
//                         )}
//                     </ul>
//                 </Flexbox>

//                 {/* <Flexbox
//                     direction="column"
//                     className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-5 dark:from-blue-900 dark:to-blue-950"
//                 >
//                     <Typography
//                         variant="p"
//                         className="text-center text-blue-800 dark:text-blue-200"
//                     >
//                         <Locale>{locales.support.chat.text}</Locale>
//                     </Typography>
//                 </Flexbox> */}

//                 <Flexbox direction="column" gap="3" className="items-center">
//                     <Locale variant="p" className="text-foreground-dark">
//                         {locales.feedback.question}
//                     </Locale>
//                     <ButtonBox className="w-32">
//                         <Button className="flex-1">
//                             <Locale>{locales.feedback.yes}</Locale>
//                         </Button>
//                         <Button className="flex-1">
//                             <Locale>{locales.feedback.no}</Locale>
//                         </Button>
//                     </ButtonBox>
//                 </Flexbox>

//                 <Flexbox
//                     direction="column"
//                     gap={10}
//                     className="p-8 text-center"
//                 >
//                     <Locale
//                         variant="h2"
//                         className="text-xl font-bold md:text-2xl"
//                     >
//                         {locales.cta.text}
//                     </Locale>

//                     <Button
//                         link={WEBSITE_ROUTES.base.routes["contact-us"]}
//                         className="h-15 text-xl"
//                         variant="primary"
//                     >
//                         <Locale>{locales.cta.text}</Locale>
//                     </Button>
//                 </Flexbox>
//             </Flexbox>
//         </Flexbox>
//     );
// };
