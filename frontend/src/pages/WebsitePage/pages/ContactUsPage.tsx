import { FC } from "react";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Locale } from "@/components/Locale/Locale";
import { Typography } from "@/components/Typography/Typography";
import locales from "@localization/contact_us_page.json";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { Select } from "@/components/Select/Select";

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
                <Locale variant="p" className="text-foreground-normal">
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
                            <Input
                                name="name"
                                label={<Locale>{locales.form.name}</Locale>}
                                type="text"
                                className="border-foreground-light bg-foreground-light"
                                placeholder="Ahmed Mohamed"
                            />
                        </Flexbox>

                        <Flexbox direction="column" gap="1">
                            <label>
                                <Locale>{locales.form.email}</Locale>
                            </label>
                            <Input
                                name="email"
                                type="email"
                                className="bg-foreground-light border-foreground-light w-full rounded-lg border px-4 py-2"
                                placeholder="ahmed@example.com"
                            />
                        </Flexbox>

                        <Flexbox direction="column" gap="1">
                            <label>
                                <Locale>{locales.form.subject}</Locale>
                            </label>
                            {/* <Select
                                className="bg-foreground-light border-foreground-light w-full rounded-lg border px-4 py-2"
                                options={[locales.form.locales.form.subjectOptions]}
                            /> */}
                            <Select
                                name="subject"
                                label="Subject"
                                options={locales.form.subjectOptions.map(
                                    (o) => o.value
                                )}
                                RendersOptions={(value) => {
                                    const option =
                                        locales.form.subjectOptions.find(
                                            (o) => o.value === value
                                        );
                                    if (!option) return value;
                                    return (
                                        <Locale>
                                            {/* {{ en: option.en, ar: option.ar }} */}
                                            {option}
                                        </Locale>
                                    );
                                }}
                            />
                        </Flexbox>

                        <Flexbox direction="column" gap="1">
                            <label>
                                <Locale>{locales.form.message}</Locale>
                            </label>
                            <textarea
                                rows={5}
                                className="bg-foreground-light border-foreground-light w-full rounded-lg border px-4 py-2"
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

            <Flexbox direction="column" gap="6" className="px-4 py-8 md:px-0">
                <Locale variant="h2" className="text-center text-2xl font-bold">
                    {locales.team.title}
                </Locale>

                <Flexbox
                    direction="row"
                    wrap="wrap"
                    justifyContent="center"
                    gap="8"
                    className="gap-y-12"
                >
                    {locales.team.members.map((member, index) => (
                        <Flexbox
                            key={index}
                            direction="column"
                            className="w-full flex-col overflow-hidden rounded-xl bg-white shadow-md transition-transform duration-300 hover:scale-105 sm:w-80 dark:bg-gray-800"
                        >
                            <div className="h-48 w-full overflow-hidden">
                                <img
                                    src={member.image}
                                    alt={member.name.en}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            <Flexbox direction="column" className="p-5" gap="2">
                                <Locale
                                    variant="h3"
                                    className="text-primary-normal text-xl font-bold"
                                >
                                    {member.name}
                                </Locale>

                                <Locale
                                    variant="p"
                                    className="text-sm font-medium text-gray-600 dark:text-gray-300"
                                >
                                    {member.role}
                                </Locale>

                                <Locale
                                    variant="p"
                                    className="text-sm italic text-blue-600 dark:text-blue-400"
                                >
                                    {member.credentials}
                                </Locale>

                                <Locale
                                    variant="p"
                                    className="mt-2 text-gray-700 dark:text-gray-200"
                                >
                                    {member.bio}
                                </Locale>

                                <Locale
                                    variant="p"
                                    className="mt-3 border-t pt-2 text-xs italic text-gray-500 dark:text-gray-400"
                                >
                                    {member.personal}
                                </Locale>
                            </Flexbox>
                        </Flexbox>
                    ))}
                </Flexbox>
            </Flexbox>
        </Flexbox>
        // <div></div>
    );
};
