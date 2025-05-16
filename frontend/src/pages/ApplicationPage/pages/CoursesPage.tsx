import { FC } from "react";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { CoursesDisplay } from "../components/CoursesDisplay";
import { Typography } from "@/components/Typography/Typography";
import { LazyComponent } from "@/components/Lazy/components/LazyComponent";

export const CoursesPage: FC = () => {
    return (
        <Flexbox variant="main" direction="column" gap="8">
            <header>
                <Typography variant="h1" className="text-2xl font-bold">
                    Courses
                </Typography>
            </header>
            <main>
                <LazyComponent skeleton={<CoursesDisplay isSkeleton />}>
                    <CoursesDisplay />
                </LazyComponent>
            </main>
        </Flexbox>
    );
};
