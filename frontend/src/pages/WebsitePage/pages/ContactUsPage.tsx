import { FC } from "react";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Locale } from "@/components/Locale/Locale";
import { Typography } from "@/components/Typography/Typography";
import locales from "@localization/contact_us_page.json";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { Select } from "@/components/Select/Select";
import { Image } from "@/components/Image/Image";
import linkedin_icon from "@/assets/icons/linkedin.svg";
import { Separator } from "@/components/Separator/Separator";
import { Icon } from "@/components/Icon/Icon";

export const ContactUsPage: FC = () => {
    return (
        <Flexbox
            variant="main"
            direction="column"
            gap={15}
            className="mx-auto max-w-6xl px-4 py-10 md:px-6"
        >
            <Flexbox
                direction="column"
                gap={15}
                justifyContent="center"
                placeItems="center"
                className="px-4 py-8 md:px-0"
            >
                <Locale
                    variant="h2"
                    className="animate-swivel text-hue text-center text-3xl font-bold"
                >
                    {locales.team.title}
                </Locale>

                <Flexbox
                    direction="row"
                    wrap="wrap"
                    justifyContent="center"
                    placeItems="center"
                    gap="8"
                    className="w-300 gap-y-12"
                >
                    {locales.team.members.map((member, index) => (
                        <Flexbox
                            key={index}
                            direction="column"
                            className="bg-background-normal h-250 min-w-140 w-full overflow-hidden rounded-xl shadow-md transition-transform duration-300 hover:scale-105 sm:w-80"
                        >
                            <div className="h-auto w-full overflow-hidden">
                                {/* <Image
                                    source={member.image}
                                    alternative={member.name.en}
                                    className="w-full object-cover"
                                /> */}

                                <img
                                    src={member.image}
                                    alt={member.name.en}
                                    className="h-150 w-full"
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
                                    className="text-foreground-light font-medium"
                                >
                                    {member.role}
                                </Locale>

                                <Locale
                                    variant="p"
                                    className="text-secondary-normal italic"
                                >
                                    {member.credentials}
                                </Locale>

                                <Locale
                                    variant="p"
                                    className="text-foreground-normal mt-2"
                                >
                                    {member.bio}
                                </Locale>

                                <Locale
                                    variant="p"
                                    className="text-foreground-dark-active mt-3 border-t pt-2 italic"
                                >
                                    {member.personal}
                                </Locale>
                            </Flexbox>
                        </Flexbox>
                    ))}
                </Flexbox>
            </Flexbox>

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
                                placeholder="Ahmed Mohamed"
                                className="w-full"
                            />
                        </Flexbox>

                        <Flexbox direction="column" gap="1">
                            <Input
                                name="email"
                                type="email"
                                placeholder="ahmed@example.com"
                            />
                        </Flexbox>

                        <Flexbox direction="column" gap="1">
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
                                className="bg-background-light border-foreground-light w-full rounded-lg border px-4 py-2"
                                placeholder="اكتب رسالتك هنا..."
                            ></textarea>
                        </Flexbox>

                        <Button type="submit">
                            <Locale>{locales.form.submit}</Locale>
                        </Button>
                    </form>
                </Flexbox>

                <Flexbox
                    direction="column"
                    gap="6"
                    className="min-w-100 flex-1"
                >
                    <Flexbox direction="column" gap="3">
                        <Locale variant="h3" className="text-xl font-semibold">
                            {locales.contactInfo.title}
                        </Locale>
                        <div>
                            <Typography
                                variant="p"
                                className="text-foreground-normal font-medium"
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
                            className="text-foreground-normal"
                        >
                            <Locale>{locales.contactInfo.hours}</Locale>
                        </Typography>
                    </Flexbox>

                    <Flexbox direction="column" gap="3">
                        <Locale variant="h3" className="text-xl font-semibold">
                            {locales.social.title}
                        </Locale>
                        <Flexbox
                            direction="row"
                            className="h-10"
                            alignItems="center"
                            gap="4"
                        >
                            {locales.social.links.map((link) => (
                                <Flexbox
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    gap={1}
                                    wrap="wrap"
                                    // className="w-40"
                                >
                                    <Typography
                                        variant="p"
                                        className="text-foreground-dark"
                                    >
                                        {link.developer}
                                    </Typography>
                                    <a href={link.url}>
                                        <Icon
                                            source={linkedin_icon}
                                            width={15}
                                        />
                                    </a>
                                </Flexbox>
                            ))}
                        </Flexbox>
                    </Flexbox>

                    <Flexbox direction="column" gap="2">
                        <Locale variant="h3" className="text-xl font-semibold">
                            {locales.address.title}
                        </Locale>
                        <Typography
                            variant="p"
                            className="text-foreground-dark"
                        >
                            <Locale>{locales.address.line}</Locale>
                        </Typography>
                    </Flexbox>

                    {/* <Flexbox direction="column" gap="2">
                        <Locale
                            variant="p"
                            className="text-foreground-normal font-medium"
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
                    </Flexbox> */}
                </Flexbox>
                <Flexbox
                    direction="column"
                    className="bg-background-normal mt-10 w-full rounded-2xl p-8 text-center"
                >
                    <Locale
                        variant="h2"
                        className="text-secondary-normal font-bold md:text-xl"
                    >
                        {locales.cta.text}
                    </Locale>
                </Flexbox>
            </Flexbox>
        </Flexbox>
        // <div></div>
    );
};
