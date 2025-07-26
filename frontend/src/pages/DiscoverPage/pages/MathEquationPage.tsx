import { FC } from "react";
import { useParams } from "react-router-dom";
import { Title } from "@/components/Title/Title";
import { LevelTag } from "../components/LevelTag";
import { Locale } from "@/components/Locale/Locale";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Typography } from "@/components/Typography/Typography";
import { DISCOVER_ROUTES } from "@/routes/discover.routes";
import { useGetCoursesByIDs } from "@/services/Courses/useGetCoursesByIDs";
import { MathExpression } from "@/components/MathExpression/MathExpression";
import { RelatedCoursesDisplay } from "../components/RelatedCoursesDisplay";
import { useGetMathEquationByID } from "@/services/MathEquations/useGetMathEquationByID";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { SearchResultDisplay } from "@/components/SearchResultDisplay/SearchResultDisplay";

import locales from "@localization/math_equations_page.json";

export const MathEquationPage: FC = () => {
    const { mathEquationID } =
        useParams<keyof typeof DISCOVER_ROUTES.base.routes>();

    const { direction, language, GetLocale } = useLocalization();

    const { data: mathEquation } = useGetMathEquationByID(mathEquationID, {
        usesSuspense: true,
    });

    const relatedCoursesQuery = useGetCoursesByIDs(
        mathEquation?.["related-courses"] ?? [],
        { enabled: mathEquation != null }
    );

    const skeletonArray = new Array(3).fill(null);

    if (mathEquation == null) {
        return (
            <SearchResultDisplay
                className="grow"
                iconType="empty"
                title={GetLocale(locales.display["empty"].title, language)}
                paragraph={GetLocale(
                    locales.display["empty"].paragraph,
                    language
                ).replace(/\*\*([^\*]+)\*\*/, `**"${mathEquationID}"**`)}
            />
        );
    }

    return (
        <Flexbox
            className="grow max-xl:flex-col-reverse"
            gap="8"
            variant="main"
            placeContent="start"
        >
            <Title>{mathEquation.title}</Title>
            <Flexbox
                className="lg:flex-1"
                gap="6"
                variant="section"
                direction="column"
            >
                <Flexbox placeItems="center" gap="4" wrap="wrap">
                    <Typography className="text-2xl font-bold" variant="h1">
                        {mathEquation.title}
                    </Typography>
                    <LevelTag level={mathEquation.level} />
                </Flexbox>
                <Flexbox className="max-lg:flex-col" gap="6">
                    <Flexbox className="flex-1" direction="column" gap="4">
                        <Locale className="text-lg font-bold" variant="h2">
                            {locales.profile.description}
                        </Locale>
                        <Typography
                            className={direction == "rtl" ? "text-end" : ""}
                            dir="ltr"
                            variant="p"
                        >
                            {mathEquation.description}
                        </Typography>
                    </Flexbox>
                    <Flexbox className="flex-1" direction="column" gap="4">
                        <Locale className="text-lg font-bold" variant="h2">
                            {locales.profile["discovered-by"]}
                        </Locale>
                        <Typography variant="p">
                            {mathEquation.discoverer}
                        </Typography>
                    </Flexbox>
                </Flexbox>
                <Flexbox className="xl:col-span-2" gap="4" direction="column">
                    <Locale className="text-lg font-bold" variant="h2">
                        {locales.profile["related-courses"].title}
                    </Locale>
                    <RelatedCoursesDisplay
                        {...relatedCoursesQuery}
                        skeletonArray={skeletonArray}
                        errorDisplay={{
                            title: GetLocale(
                                locales.profile["related-courses"].error.title,
                                language
                            ),
                            button: GetLocale(
                                locales.profile["related-courses"].error.button,
                                language
                            ),
                            paragraph: GetLocale(
                                locales.profile["related-courses"].error
                                    .paragraph,
                                language
                            ),
                        }}
                        emptyDisplay={{
                            title: GetLocale(
                                locales.profile["related-courses"].empty.title,
                                language
                            ),
                            paragraph: GetLocale(
                                locales.profile["related-courses"].empty
                                    .paragraph,
                                language
                            ).replace(
                                /\*\*([^\*]+)\*\*/,
                                `**"${mathEquation.title}"**`
                            ),
                        }}
                    />
                </Flexbox>
            </Flexbox>
            <Flexbox
                className="bg-background-dark max-h-[calc(100vh-8rem)] overflow-x-auto overflow-y-hidden rounded-2xl p-8 text-white lg:flex-1 xl:sticky xl:top-[6rem] xl:max-w-[calc(50vw-4rem)]"
                variant="section"
            >
                <MathExpression
                    className="m-auto text-2xl [text-shadow:2px_2px_2.5px_black] max-xl:text-xl max-lg:text-lg"
                    variant="p"
                >
                    {mathEquation.equation}
                </MathExpression>
            </Flexbox>
        </Flexbox>
    );
};
