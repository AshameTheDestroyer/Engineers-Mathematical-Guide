import { FC } from "react";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Locale } from "@/components/Locale/Locale";
import { Separator } from "@/components/Separator/Separator";
import locales from "@localization/about_page.json";
import { Typography } from "@/components/Typography/Typography";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { RichText } from "@/components/RichText/RichText";
import { Button } from "@/components/Button/Button";

export const AboutPage: FC = () => {
    const { direction, GetLocale, language } = useLocalization();

    return (
        <Flexbox className="grow" variant="main" direction="column" gap="8">
            <Locale variant="h1" className="text-2xl">
                {locales.title}
            </Locale>

            <Flexbox direction="column" gap={5}>
                <Locale variant="h2" className="text-xl">
                    {locales.heroSection.title}
                </Locale>
                <Locale variant="p">{locales.heroSection.content}</Locale>
            </Flexbox>

            <Separator orientation="horizontal" />

            <Flexbox direction="column" gap={2}>
                <Locale variant="h2" className="text-xl">
                    {locales.whatWeOffer.title}
                </Locale>

                <Flexbox direction="column" gap={3}>
                    {locales.whatWeOffer.content.map((part, i) => (
                        <Flexbox direction="row" gap={3}>
                            <div>🔘</div>
                            <RichText
                                variant="p"
                                ExtractedTextRenders={(text) => (
                                    <span className="text-primary-normal font-bold">
                                        {text}
                                    </span>
                                )}
                            >
                                {GetLocale(part, language)}
                            </RichText>
                            <br />
                        </Flexbox>
                    ))}
                </Flexbox>
            </Flexbox>

            <Separator orientation="horizontal" />

            {/* <Separator orientation="horizontal" /> */}

            {/* <Flexbox direction="column" gap="6" className="px-4 py-8 md:px-0">
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
            </Flexbox> */}

            <Flexbox direction="column" gap="6">
                <Locale variant="h2" className="text-xl">
                    {locales.whyEngineersLoveUs.title}
                </Locale>
                {locales.whyEngineersLoveUs.points.map((point, index) => (
                    <Flexbox gap={5}>
                        <Typography variant="span">🔳</Typography>
                        <Locale key={index} variant="p">
                            {point}
                        </Locale>
                    </Flexbox>
                ))}
            </Flexbox>

            <Separator orientation="horizontal" />

            <Flexbox gap={5} alignItems="center">
                <Locale variant="h2" className="text-xl">
                    {locales.readyToGetStarted}
                </Locale>
                <Button className="h-2/3 w-1/4">Explore Courses</Button>
            </Flexbox>

            {/* -------------------------------------------------- */}

            {/* <Flexbox direction="column">
                <Locale variant="h2" className="text-xl">
                    {locales.welcome.welcomeTitle}
                </Locale>
                <Locale variant="p">{locales.welcome.welcomeContent}</Locale>
            </Flexbox>

            <Separator orientation="horizontal" />

            <Flexbox direction="column">
                <Locale variant="h2" className="text-xl">
                    {locales.why.whyTitle}
                </Locale>
                <Locale variant="p">{locales.why.whyContent}</Locale>
            </Flexbox>

            <Separator orientation="horizontal" />

            <Flexbox direction="column">
                <Locale variant="h2" className="text-xl">
                    {locales.why.whyTitle}
                </Locale>
                <Locale variant="p">{locales.why.whyContent}</Locale>
            </Flexbox>

            <Separator orientation="horizontal" />

            <Locale variant="p" className="text-justify">
                {locales.about}
            </Locale>

            <Flexbox>
                <Typography variant="p"></Typography>
                <img src="" alt="" />
            </Flexbox> */}
        </Flexbox>
    );
};
