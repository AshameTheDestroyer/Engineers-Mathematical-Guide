import { FC } from "react";
import { Button } from "@components/Button/Button";
import { CogIcon } from "@/components/CogIcon/CogIcon";
import { ButtonBox } from "@components/ButtonBox/ButtonBox";
import { DoubleCogIcon } from "@/components/DoubleCogIcon/DoubleCogIcon";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import pi_image from "@images/pi.webp";
import arrow_icon from "@icons/arrow.svg";

import locales from "@localization/landing_page.json";

export const MainContent: FC = () => {
    const { language, direction } = useLocalization();

    return (
        <div className="centralize bg-gray flex h-32 grow flex-row justify-between gap-5">
            <section className="w-150 flex flex-col gap-5">
                <h2 className="text-primary-normal text-3xl font-bold">
                    {locales.title[language as "en" | "ar"]}
                </h2>
                <h3 className="text-xl">
                    {locales.subtitle[language as "en" | "ar"]}
                </h3>
                <p>{locales.body[language as "en" | "ar"]}</p>
                <ButtonBox
                    direction={direction == "ltr" ? "row" : "reverse-row"}
                >
                    <Button className="grow-[0.6]" link="/learn-more">
                        {locales.buttons.learn[language as "en" | "ar"]}
                    </Button>
                    <Button
                        className="grow"
                        link="/app"
                        variant="primary"
                        icon={{
                            placement: "right",
                            source: arrow_icon,
                            className: "rotate-90",
                        }}
                    >
                        {locales.buttons.start[language as "en" | "ar"]}
                    </Button>
                </ButtonBox>
            </section>
            <img
                className="w-100 [filter:drop-shadow(4px_4px_2px_#0000007c)]"
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
