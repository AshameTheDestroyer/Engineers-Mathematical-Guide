import { FC } from "react";
import { Button } from "@/components/Button/Button";
import { Locale } from "@/components/Locale/Locale";
import { CogIcon } from "@/components/CogIcon/CogIcon";
import { RichText } from "@/components/RichText/RichText";
import { ButtonBox } from "@components/ButtonBox/ButtonBox";
import { DoubleCogIcon } from "@/components/DoubleCogIcon/DoubleCogIcon";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import pi_image from "@images/pi.webp";
import arrow_icon from "@icons/arrow.svg";

import locales from "@localization/website_page.json";

export const MainContent: FC = () => {
    const { direction, GetLocale, language } = useLocalization();

    return (
        <div className="centralize flex grow flex-row flex-wrap-reverse justify-between gap-5">
            <section className="w-150 pb-page flex flex-col gap-5">
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
                    <Button link="/learn-more">
                        <Locale>{locales.buttons.learn}</Locale>
                    </Button>
                    <Button
                        link="/app"
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
            </section>
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
        </div>
    );
};
