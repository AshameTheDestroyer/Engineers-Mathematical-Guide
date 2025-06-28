import { FC } from "react";
import { useParams } from "react-router-dom";
import { Title } from "@/components/Title/Title";
import { LevelTag } from "../components/LevelTag";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Typography } from "@/components/Typography/Typography";
import { APPLICATION_ROUTES } from "@/routes/application.routes";
import { useGetCoursesByIDs } from "@/services/Courses/useGetCoursesByIDs";
import { MathExpression } from "@/components/MathExpression/MathExpression";
import { RelatedCoursesDisplay } from "../components/RelatedCoursesDisplay";
import { useGetMathEquationByID } from "@/services/MathEquations/useGetMathEquationByID";

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
