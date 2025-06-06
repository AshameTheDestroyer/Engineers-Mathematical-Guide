import { FC, Fragment } from "react";
import { twJoin } from "tailwind-merge";
import { Image } from "@/components/Image/Image";
import { Title } from "@/components/Title/Title";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/Button/Button";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Typography } from "@/components/Typography/Typography";
import { APPLICATION_ROUTES } from "@/routes/application.routes";
import { Top10StudentsDisplay } from "../components/Top10StudentsDisplay";
import { LazyComponent } from "@/components/Lazy/components/LazyComponent";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import enrollment_icon from "@icons/enrollment.svg";
import { useGetLearningTrackByID } from "@/services/LearningTracks/useGetLearningTrackByID";

export const LearningTrackPage: FC = () => {
    const { direction } = useLocalization();

    const { learningTrackID } =
        useParams<keyof typeof APPLICATION_ROUTES.base.routes>();

    const { data: learningTrack } = useGetLearningTrackByID(learningTrackID, {
        usesSuspense: true,
    });

    return (
        <Flexbox variant="main" direction="column" gap="8">
            <Title>{learningTrack.title}</Title>
            <figure className="border-background-dark -m-page relative mb-auto border-b-2 text-white">
                {/* <CardSummary
                    title={learningTrack.title}
                    rating={learningTrack.rating}
                    registerParagraph="Enrolled Student"
                    ratingCount={learningTrack["rating-count"]}
                /> */}
                <Button
                    className={twJoin(
                        direction == "ltr" ? "right-[6vw]" : "left-[6vw]",
                        "absolute bottom-0 z-[1] translate-y-1/2"
                    )}
                    thickness="thick"
                    variant="primary"
                    icon={{
                        placement: "left",
                        source: enrollment_icon,
                    }}
                >
                    Enroll Now
                </Button>
                <Image
                    className="h-[60vh] [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
                    source={learningTrack.image}
                    alternative={`Image of ${learningTrack.title} Course.`}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/75 to-100%" />
            </figure>

            <main className="gap-page grid grid-cols-2 max-lg:grid-cols-1">
                <Flexbox variant="section" direction="column" gap="8">
                    <Flexbox direction="column" gap="4">
                        <Typography className="text-lg font-bold" variant="h2">
                            Introduction
                        </Typography>
                        <Typography variant="p">
                            {learningTrack.description}
                        </Typography>
                    </Flexbox>
                    <Flexbox direction="column" gap="4">
                        <Typography className="text-lg font-bold" variant="h2">
                            Description
                        </Typography>
                        <Typography className="text-justify" variant="p">
                            {learningTrack["detailed-description"]}
                        </Typography>
                    </Flexbox>
                    <Flexbox direction="column" gap="4">
                        <Typography className="text-lg font-bold" variant="h2">
                            Modules
                        </Typography>
                        <Flexbox
                            className="bg-background-normal border-background-darker rounded-lg border-2 p-4"
                            variant="ol"
                            direction="column"
                            gap="2"
                        >
                            {learningTrack.courses.map((module, i, array) => (
                                <Fragment key={i}>
                                    {i > 0 && (
                                        <hr className="border-background-darker border" />
                                    )}
                                    <Flexbox variant="li">
                                        <button
                                            className={twJoin(
                                                "active:bg-background-normal-active [&:where(:hover,:focus-within)]:bg-background-normal-hover grow cursor-pointer p-4 text-start text-lg transition duration-200",
                                                i == 0
                                                    ? "rounded-t-lg"
                                                    : i == array.length - 1
                                                      ? "rounded-b-lg"
                                                      : ""
                                            )}
                                        >
                                            {module}
                                        </button>
                                    </Flexbox>
                                </Fragment>
                            ))}
                        </Flexbox>
                    </Flexbox>
                    <Flexbox direction="column" gap="4">
                        <Typography className="text-lg font-bold" variant="h2">
                            Tags
                        </Typography>
                        <Flexbox gap="3" wrap="wrap">
                            {learningTrack.tags.map((tag, i) => (
                                <Link
                                    key={i}
                                    className="bg-background-dark active:bg-background-normal-active [&:where(:hover,:focus-within)]:bg-background-normal-hover cursor-pointer rounded-full px-3 py-1 transition duration-200"
                                    to={
                                        APPLICATION_ROUTES.base.routes[
                                            "learning-tracks"
                                        ].absolute +
                                        "?" +
                                        new URLSearchParams({ query: tag })
                                    }
                                >
                                    {tag}
                                </Link>
                            ))}
                        </Flexbox>
                    </Flexbox>
                </Flexbox>

                <LazyComponent
                    skeleton={
                        <Top10StudentsDisplay
                            isSkeleton
                            top-10-students={new Array(10)
                                .fill(null)
                                .map(() => ({ username: "", grade: 0 }))}
                        />
                    }
                ></LazyComponent>

                <Flexbox className="lg:col-span-2" direction="column" gap="4">
                    <Flexbox
                        className="lg:col-span-2"
                        gap="4"
                        direction="column"
                    >
                        <Typography className="text-lg font-bold" variant="h2">
                            Courses You Need to Finish First
                        </Typography>
                    </Flexbox>
                    <Flexbox
                        className="lg:col-span-2"
                        gap="4"
                        direction="column"
                    >
                        <Typography className="text-lg font-bold" variant="h2">
                            Courses You Unlock When You Finish
                        </Typography>
                    </Flexbox>
                    <Flexbox
                        className="lg:col-span-2"
                        gap="4"
                        direction="column"
                    >
                        <Typography className="text-lg font-bold" variant="h2">
                            Similar Courses
                        </Typography>
                    </Flexbox>
                </Flexbox>
            </main>
        </Flexbox>
    );
};
