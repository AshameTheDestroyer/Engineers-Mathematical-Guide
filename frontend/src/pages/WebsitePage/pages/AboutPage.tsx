import { FC } from "react";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Locale } from "@/components/Locale/Locale";
import { Separator } from "@/components/Separator/Separator";
import locales from "@localization/about_page.json";

export const AboutPage: FC = () => {
    return (
        <Flexbox className="grow" variant="main" direction="column" gap="8">
            <Locale variant="h1" className="text-2xl">
                {locales.title}
            </Locale>

            <Flexbox direction="column">
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
        </Flexbox>
    );
};
