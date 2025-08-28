import { FC } from "react";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Locale } from "@/components/Locale/Locale";
import locales from "@localization/about_page.json";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { RichText } from "@/components/RichText/RichText";
import { Button } from "@/components/Button/Button";
import { DISCOVER_ROUTES } from "@/routes/discover.routes";
import { Image } from "@/components/Image/Image";
import UnitCircleWidget from "@/components/MathTools/UnitCircleWidget";
import { Separator } from "@/components/Separator/Separator";

export const AboutPage: FC = () => {
    const { direction, GetLocale, language } = useLocalization();

    return (
        <Flexbox className="grow" variant="main" direction="column" gap={30}>
            <Flexbox direction="column" gap={30} className="min-[80dvh]">
                <Locale variant="h1" className="text-3xl">
                    {locales.title}
                </Locale>
                <Flexbox className="relative">
                    <div className="relative inline-block bg-transparent">
                        <Image
                            source={locales.heroSection.image.source}
                            alternative={locales.heroSection.image.alt}
                            className="h-150 w-full object-cover"
                        />
                        <div className="absolute inset-0 animate-pulse rounded-2xl bg-gradient-to-r from-blue-300/40 to-purple-300/40 blur-sm"></div>
                    </div>
                    <Locale
                        variant="h2"
                        className="z-3 top-50 text-azure-foreground-light absolute left-10 p-10 text-justify text-xl"
                    >
                        {locales.heroSection.content}
                    </Locale>
                </Flexbox>
            </Flexbox>
            {/* <UnitCircleWidget /> */}

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
                            <Separator orientation="horizontal" />

                            <Flexbox
                                className={`border-l-5 animate-float border-l-foreground-normal w-full px-10 md:w-1/2 ${direction === "ltr" && i % 2 !== 0 ? "pl-15" : "pr-15"}`}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <RichText
                                    variant="p"
                                    className="text-justify text-xl"
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
                                <div className="transform overflow-hidden rounded-2xl shadow-lg transition duration-500 hover:scale-105 hover:shadow-xl">
                                    <Image
                                        source={part.image}
                                        alternative={part.alternative}
                                        className="h-auto max-h-full w-full max-w-full object-cover"
                                    />
                                </div>
                            </Flexbox>
                        </div>
                    ))}
                </Flexbox>
            </Flexbox>

            <Flexbox
                gap={15}
                alignItems="center"
                direction="column"
                className="py-10"
            >
                <Locale
                    variant="h2"
                    className="text-secondary-normal text-hue text-2xl"
                >
                    {locales.readyToGetStarted}
                </Locale>
                <Button
                    className="h-25 w-1/2 text-xl"
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
            {/* <UnitCircleWidget /> */}
        </Flexbox>
    );
};
