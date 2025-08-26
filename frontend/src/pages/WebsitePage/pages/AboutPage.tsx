import { FC } from "react";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Locale } from "@/components/Locale/Locale";
import { Separator } from "@/components/Separator/Separator";
import locales from "@localization/about_page.json";
import { Typography } from "@/components/Typography/Typography";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { RichText } from "@/components/RichText/RichText";
import { Button } from "@/components/Button/Button";
import { DISCOVER_ROUTES } from "@/routes/discover.routes";
import { Image } from "@/components/Image/Image";

export const AboutPage: FC = () => {
    const { direction, GetLocale, language } = useLocalization();

    return (
        <Flexbox className="grow" variant="main" direction="column" gap={30}>
            <Flexbox direction="column" gap={30} className="min-[80dvh]">
                <Locale variant="h1" className="text-3xl">
                    {locales.title}
                </Locale>
                <div className="relative">
                    <Image
                        source={locales.heroSection.image.source}
                        alternative={locales.heroSection.image.alt}
                        className="h-150 w-full bg-red-500"
                    />
                    <div className="w-450 h-150 z-2 absolute left-0 top-0 bg-black/60"></div>
                    <Locale
                        variant="h2"
                        className="z-3 top-50 absolute left-10 p-10 text-justify text-xl text-white"
                    >
                        {locales.heroSection.content}
                    </Locale>
                </div>
            </Flexbox>

            <Flexbox direction="column" gap={15} className="min-[80dvh]">
                <Locale variant="h2" className="text-3xl">
                    {locales.whatWeOffer.title}
                </Locale>

                <Flexbox direction="column" gap={10}>
                    {locales.whatWeOffer.content.map((part, i) => (
                        <div
                            key={i}
                            className={`flex flex-col gap-8 md:flex-row ${
                                i % 2 !== 0 ? "md:flex-row-reverse" : ""
                            }`}
                        >
                            <Flexbox
                                className="w-full md:w-1/2"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <RichText
                                    variant="p"
                                    className="text-xl"
                                    ExtractedTextRenders={(text) => (
                                        <span className="text-primary-normal font-bold">
                                            {text}
                                        </span>
                                    )}
                                >
                                    {GetLocale(part, language)}
                                </RichText>
                            </Flexbox>

                            <Flexbox
                                placeItems="center"
                                justifyContent="center"
                                className="w-full md:w-1/2"
                            >
                                <Image
                                    source={part.image}
                                    alternative={part.alternative}
                                    className="h-auto max-h-full w-auto max-w-full"
                                />
                            </Flexbox>
                        </div>
                    ))}
                </Flexbox>
            </Flexbox>

            {/* <Flexbox direction="column" gap="6">
                <Locale variant="h2" className="text-xl">
                    {locales.whyEngineersLoveUs.title}
                </Locale>
                {locales.whyEngineersLoveUs.points.map((point, index) => (
                    <Flexbox gap={5} alignItems="center">
                        <div className="bg-foreground-dark h-3 w-3"></div>
                        <Locale key={index} variant="p">
                            {point}
                        </Locale>
                    </Flexbox>
                ))}
            </Flexbox> */}

            <Flexbox gap={5} alignItems="center" direction="column">
                <Locale variant="h2" className="text-xl">
                    {locales.readyToGetStarted}
                </Locale>
                <Button
                    className="h-18 w-1/2 text-xl"
                    link={DISCOVER_ROUTES.base.routes.courses.absolute}
                    variant="primary"
                >
                    <Locale>{locales.buttons.explore}</Locale>
                </Button>
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
