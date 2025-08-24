import { FC } from "react";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Locale } from "@/components/Locale/Locale";
import { Typography } from "@/components/Typography/Typography";
import locales from "@localization/help_page.json";
import { Button } from "@/components/Button/Button";
import { WEBSITE_ROUTES } from "@/routes/website.routes";
import { ButtonBox } from "@/components/ButtonBox/ButtonBox";

export const HelpPage: FC = () => {
    return (
        <Flexbox
            variant="main"
            direction="column"
            gap="8"
            className="mx-auto w-full max-w-4xl px-4 py-10 md:px-6"
        >
            <Flexbox direction="column" className="w-full">
                <div className="relative mx-auto w-full max-w-2xl">
                    <input
                        type="text"
                        placeholder={locales.search.placeholder.en}
                        aria-label={locales.search.placeholder.en}
                        className="focus:ring-primary-light w-full rounded-full border border-gray-300 bg-white px-6 py-3 pl-12 shadow-sm focus:outline-none focus:ring-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    />
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-4 text-gray-500 dark:text-gray-400">
                        🔍
                    </span>
                </div>
            </Flexbox>

            <Flexbox direction="column" gap="6" className="mt-8">
                {[
                    {
                        key: "gettingStarted",
                        data: locales.categories.gettingStarted,
                    },
                    {
                        key: "accountAccess",
                        data: locales.categories.accountAccess,
                    },
                    {
                        key: "learningResources",
                        data: locales.categories.learningResources,
                    },
                    {
                        key: "technicalIssues",
                        data: locales.categories.technicalIssues,
                    },
                    {
                        key: "forEducators",
                        data: locales.categories.forEducators,
                    },
                ].map(({ key, data }) => (
                    <Flexbox
                        key={key}
                        direction="column"
                        className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                    >
                        <Locale
                            variant="h3"
                            className="text-primary-normal mb-4 text-lg font-semibold"
                        >
                            {data.title}
                        </Locale>
                        <ul className="space-y-2">
                            {data.items.map(
                                (
                                    item: { en: string; ar: string },
                                    idx: number
                                ) => (
                                    <li key={idx}>
                                        <a
                                            href={`/help/${key}/${idx}`}
                                            className="hover:text-primary-normal flex items-center justify-between rounded px-3 py-2 text-sm text-gray-800 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                                        >
                                            <Locale>{item}</Locale>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                <Locale>
                                                    {locales.readParagraph}
                                                </Locale>
                                            </div>
                                        </a>
                                    </li>
                                )
                            )}
                        </ul>
                    </Flexbox>
                ))}
            </Flexbox>
            <Flexbox
                variant="main"
                direction="column"
                gap="8"
                className="mx-auto max-w-4xl px-4 py-6 md:px-6"
            >
                <Flexbox
                    direction="column"
                    className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                >
                    <Locale
                        variant="h3"
                        className="text-primary-normal mb-4 text-lg font-semibold"
                    >
                        {locales.popularArticles.title}
                    </Locale>
                    <ul className="space-y-3">
                        {locales.popularArticles.articles.map(
                            (article, idx) => (
                                <li key={idx}>
                                    <a
                                        href={`/article/${idx + 1}`}
                                        className="hover:text-primary-normal flex items-center justify-between rounded px-3 py-2 text-sm text-gray-800 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                                    >
                                        <Locale>{article}</Locale>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            <Locale>
                                                {locales.readParagraph}
                                            </Locale>
                                        </div>
                                    </a>
                                </li>
                            )
                        )}
                    </ul>
                </Flexbox>

                <Flexbox
                    direction="column"
                    className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-5 dark:from-blue-900 dark:to-blue-950"
                >
                    <Typography
                        variant="p"
                        className="text-center text-blue-800 dark:text-blue-200"
                    >
                        <Locale>{locales.support.chat.text}</Locale>
                    </Typography>
                </Flexbox>

                <Flexbox direction="column" gap="3" className="items-center">
                    <Locale
                        variant="p"
                        className="text-gray-700 dark:text-gray-300"
                    >
                        {locales.feedback.question}
                    </Locale>
                    <ButtonBox className="w-32">
                        <Button className="flex-1">
                            <Locale>{locales.feedback.yes}</Locale>
                        </Button>
                        <Button className="flex-1">
                            <Locale>{locales.feedback.no}</Locale>
                        </Button>
                    </ButtonBox>
                </Flexbox>

                <Flexbox
                    direction="column"
                    gap={5}
                    className="rounded-2xl bg-gray-100 p-8 text-center dark:bg-gray-800"
                >
                    <Locale
                        variant="h2"
                        className="text-xl font-bold md:text-2xl"
                    >
                        {locales.cta.text}
                    </Locale>

                    <Button
                        link={WEBSITE_ROUTES.base.routes["contact-us"]}
                        variant="primary"
                    >
                        <Locale>{locales.cta.text}</Locale>
                    </Button>
                </Flexbox>
            </Flexbox>
        </Flexbox>
    );
};
