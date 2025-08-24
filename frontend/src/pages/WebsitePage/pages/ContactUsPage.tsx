import { FC } from "react";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Locale } from "@/components/Locale/Locale";
import { Typography } from "@/components/Typography/Typography";
import locales from "@localization/contact_us_page.json";
import { Button } from "@/components/Button/Button";

export const ContactUsPage: FC = () => {
    return (
        <Flexbox
            variant="main"
            direction="column"
            gap="8"
            className="mx-auto max-w-4xl px-4 py-10 md:px-6"
        >
            <Flexbox direction="column" gap="3" className="text-center">
                <Locale variant="h1" className="text-2xl font-bold md:text-3xl">
                    {locales.header.title}
                </Locale>
                <Locale
                    variant="p"
                    className="text-gray-600 dark:text-gray-300"
                >
                    {locales.header.subtitle}
                </Locale>
            </Flexbox>

            <Flexbox
                direction="row"
                wrap="wrap"
                gap="8"
                justifyContent="between"
            >
                <Flexbox direction="column" className="min-w-80 flex-1">
                    <form className="space-y-5">
                        <Flexbox direction="column" gap="1">
                            <label>
                                <Locale>{locales.form.name}</Locale>
                            </label>
                            <input
                                type="text"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-600 dark:bg-gray-800"
                                placeholder="Ahmed Mohamed"
                            />
                        </Flexbox>

                        <Flexbox direction="column" gap="1">
                            <label>
                                <Locale>{locales.form.email}</Locale>
                            </label>
                            <input
                                type="email"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-600 dark:bg-gray-800"
                                placeholder="ahmed@example.com"
                            />
                        </Flexbox>

                        <Flexbox direction="column" gap="1">
                            <label>
                                <Locale>{locales.form.subject}</Locale>
                            </label>
                            <select className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-600 dark:bg-gray-800">
                                {locales.form.subjectOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        <Locale>{opt}</Locale>
                                    </option>
                                ))}
                            </select>
                        </Flexbox>

                        <Flexbox direction="column" gap="1">
                            <label>
                                <Locale>{locales.form.message}</Locale>
                            </label>
                            <textarea
                                rows={5}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-600 dark:bg-gray-800"
                                placeholder="اكتب رسالتك هنا..."
                            ></textarea>
                        </Flexbox>

                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900">
                            This site is protected by reCAPTCHA.
                        </div>

                        <Button type="submit">
                            <Locale>{locales.form.submit}</Locale>
                        </Button>
                    </form>
                </Flexbox>

                <Flexbox direction="column" gap="6" className="min-w-64 flex-1">
                    <Flexbox direction="column" gap="3">
                        <Locale variant="h3" className="text-xl font-semibold">
                            {locales.contactInfo.title}
                        </Locale>
                        <div>
                            <Typography
                                variant="p"
                                className="font-medium text-gray-700 dark:text-gray-300"
                            >
                                <Locale>
                                    {locales.contactInfo.emailLabel}
                                </Locale>
                                :
                            </Typography>
                            <a
                                href={`mailto:${locales.contactInfo.email}`}
                                className="text-primary-normal hover:underline"
                            >
                                {locales.contactInfo.email}
                            </a>
                        </div>
                        <Typography
                            variant="p"
                            className="text-sm text-gray-500 dark:text-gray-400"
                        >
                            <Locale>{locales.contactInfo.hours}</Locale>
                        </Typography>
                    </Flexbox>

                    <Flexbox direction="column" gap="3">
                        <Locale variant="h3" className="text-xl font-semibold">
                            {locales.social.title}
                        </Locale>
                        <Flexbox direction="row" gap="4">
                            {locales.social.links.map((link) => (
                                <a
                                    key={link.platform}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-primary-normal text-2xl transition"
                                    aria-label={link.platform}
                                >
                                    <span className="text-gray-600 dark:text-gray-400">
                                        🔗
                                    </span>
                                </a>
                            ))}
                        </Flexbox>
                    </Flexbox>

                    <Flexbox direction="column" gap="2">
                        <Locale variant="h3" className="text-xl font-semibold">
                            {locales.address.title}
                        </Locale>
                        <Typography
                            variant="p"
                            className="text-gray-700 dark:text-gray-300"
                        >
                            <Locale>{locales.address.line}</Locale>
                        </Typography>
                    </Flexbox>

                    <Flexbox direction="column" gap="2">
                        <Locale
                            variant="p"
                            className="font-medium text-gray-700 dark:text-gray-300"
                        >
                            {locales.faq.title}
                        </Locale>
                        <ul className="mt-1 space-y-1">
                            {locales.faq.links.map((link) => (
                                <li key={link.en}>
                                    <a
                                        href={link.url}
                                        className="text-primary-normal text-sm hover:underline"
                                    >
                                        <Locale>{link}</Locale>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </Flexbox>
                </Flexbox>
            </Flexbox>

            <Flexbox
                direction="column"
                className="mt-10 rounded-2xl bg-gray-100 p-8 text-center dark:bg-gray-800"
            >
                <Locale variant="h2" className="text-xl font-bold md:text-2xl">
                    {locales.cta.text}
                </Locale>
            </Flexbox>
        </Flexbox>
        // <div></div>
    );
};
