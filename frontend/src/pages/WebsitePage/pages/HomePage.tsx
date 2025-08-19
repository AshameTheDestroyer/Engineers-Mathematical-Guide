import { FC } from "react";
import { Locale } from "@/components/Locale/Locale";
import { Button } from "@/components/Button/Button";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { CogIcon } from "@/components/CogIcon/CogIcon";
import { WEBSITE_ROUTES } from "@/routes/website.routes";
import { RichText } from "@/components/RichText/RichText";
import { DISCOVER_ROUTES } from "@/routes/discover.routes";
import { ButtonBox } from "@components/ButtonBox/ButtonBox";
import { DoubleCogIcon } from "@/components/DoubleCogIcon/DoubleCogIcon";
import { MathParallaxScene } from "@/components/MathParallaxScene/MathParallaxScene";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import pi_image from "@images/pi.webp";
import arrow_icon from "@icons/arrow.svg";

import locales from "@localization/home_page.json";

export const HomePage: FC = () => {
    const { direction, GetLocale, language } = useLocalization();

    return (
        <Flexbox
            className="centralize grow"
            gap="5"
            variant="main"
            wrap="wrap-reverse"
        >
            <Flexbox
                className="w-150 pb-page"
                gap="5"
                variant="section"
                direction="column"
            >
                <Locale
                    className="text-primary-normal text-3xl font-bold max-sm:text-2xl"
                    variant="h1"
                >
                    {locales.title}
                </Locale>
                <Locale variant="h2" className="text-xl">
                    {locales.subtitle}
                </Locale>
                <RichText
                    variant="p"
                    ExtractedTextRenders={(text) => (
                        <span className="text-primary-normal font-bold">
                            {text}
                        </span>
                    )}
                >
                    {GetLocale(locales.body, language)}
                </RichText>
                <ButtonBox
                    className="[&>button]:grow"
                    direction={direction == "ltr" ? "row" : "reverse-row"}
                >
                    <Button link={WEBSITE_ROUTES.base.routes.about.absolute}>
                        <Locale>{locales.buttons.learn}</Locale>
                    </Button>
                    <Button
                        link={DISCOVER_ROUTES.base.absolute}
                        variant="primary"
                        icon={{
                            placement: "right",
                            source: arrow_icon,
                            className: "rotate-90",
                        }}
                    >
                        <Locale>{locales.buttons.start}</Locale>
                    </Button>
                </ButtonBox>
            </Flexbox>

            <MathParallaxScene className="-z-2 fixed inset-0" />

            <img
                className="w-100 [filter:drop-shadow(4px_4px_2px_#0000007c)] max-md:w-60"
                loading="lazy"
                src={pi_image}
                alt="pi image"
            />
            <DoubleCogIcon
                className="text-background-dark -left-page -bottom-1/10 absolute z-[-1]"
                size={400}
            />
            <CogIcon
                className="text-background-dark -right-page absolute top-0 z-[-1] translate-x-1/4 translate-y-2/3 [animation-direction:reverse]"
                size={250}
            />
        </Flexbox>
    );
};
