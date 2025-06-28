import { FC } from "react";
import { twJoin } from "tailwind-merge";
import { useParams } from "react-router-dom";
import { Icon } from "@/components/Icon/Icon";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Typography } from "@/components/Typography/Typography";
import { MathEquationLevel } from "@/schemas/MathEquationSchema";
import { APPLICATION_ROUTES } from "@/routes/application.routes";
import { useGetCoursesByIDs } from "@/services/Courses/useGetCoursesByIDs";
import { MathExpression } from "@/components/MathExpression/MathExpression";
import { RelatedCoursesDisplay } from "../components/RelatedCoursesDisplay";
import { useGetMathEquationByID } from "@/services/MathEquations/useGetMathEquationByID";

import medal_third_place_icon from "@icons/medal_third_place.svg";
import medal_first_place_icon from "@icons/medal_first_place.svg";
import medal_second_place_icon from "@icons/medal_second_place.svg";

const MEDAL_ICONS = {
    basic: medal_third_place_icon,
    advanced: medal_first_place_icon,
    intermediate: medal_second_place_icon,
} satisfies Record<MathEquationLevel, string>;

export const MathEquationPage: FC = () => {
    const { mathEquationID } =
        useParams<keyof typeof APPLICATION_ROUTES.base.routes>();

    const { data: mathEquation } = useGetMathEquationByID(mathEquationID, {
        usesSuspense: true,
    });

    const relatedCoursesQuery = useGetCoursesByIDs(
        mathEquation["related-courses"]
    );
    const skeletonArray = new Array(3).fill(null);

    const variantClassName = {
        basic: "hover:bg-material-bronze-normal bg-material-bronze-light active:bg-material-bronze-dark",
        intermediate:
            "hover:bg-material-silver-normal bg-material-silver-light active:bg-material-silver-dark",
        advanced:
            "hover:bg-material-gold-normal bg-material-gold-light active:bg-material-gold-dark",
    } satisfies Record<MathEquationLevel, string>;

    return (
        <Flexbox
            className="grow max-xl:flex-col-reverse"
            gap="8"
            variant="main"
            placeContent="start"
        >
            <Flexbox
                className="lg:flex-1"
                gap="6"
                variant="section"
                direction="column"
            >
                <Flexbox placeItems="center" gap="4" wrap="wrap">
                    <Typography className="text-2xl font-bold" variant="h1">
                        {mathEquation?.title}
                    </Typography>
                    <button
                        role="button"
                        className={twJoin(
                            "relative flex cursor-pointer gap-2 rounded-full py-2 pl-4 pr-14 text-lg font-bold text-black duration-200",
                            variantClassName[mathEquation.level]
                        )}
                    >
                        <p>{mathEquation.level.toTitleCase()}</p>
                        <Icon
                            className="border-3 absolute bottom-2 right-4 top-2 aspect-square translate-x-1 overflow-hidden rounded-full [&>svg]:h-full [&>svg]:w-full [&>svg]:translate-y-[-2px]"
                            thickness={2}
                            source={MEDAL_ICONS[mathEquation.level]}
                        />
                    </button>
                </Flexbox>
                <Flexbox className="max-lg:flex-col" gap="6">
                    <Flexbox className="flex-1" direction="column" gap="4">
                        <Typography className="text-lg font-bold" variant="h2">
                            Description
                        </Typography>
                        <Typography variant="p">
                            {mathEquation.description}
                        </Typography>
                    </Flexbox>
                    <Flexbox className="flex-1" direction="column" gap="4">
                        <Typography className="text-lg font-bold" variant="h2">
                            Discovered By:
                        </Typography>
                        <Typography variant="p">
                            {mathEquation.discoverer}
                        </Typography>
                    </Flexbox>
                </Flexbox>
                <Flexbox className="xl:col-span-2" gap="4" direction="column">
                    <Typography className="text-lg font-bold" variant="h2">
                        Related Courses
                    </Typography>
                    <RelatedCoursesDisplay
                        {...relatedCoursesQuery}
                        skeletonArray={skeletonArray}
                        errorDisplay={{
                            title: "Error!",
                            paragraph:
                                "An unexpected error occurred, try refetching.",
                        }}
                        searchOffDisplay={{
                            title: "There Are None",
                            paragraph: `The math equation **${mathEquation.title}** has no related courses from what we offer.`,
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
