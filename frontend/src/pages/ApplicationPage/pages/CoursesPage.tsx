import { FC } from "react";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { CoursesDisplay } from "../components/CoursesDisplay";
import { Typography } from "@/components/Typography/Typography";

export const CoursesPage: FC = () => {
    return (
        <Flexbox variant="main" direction="column" gap="8">
            <header>
                <Typography variant="h1" className="text-2xl font-bold">
                    Courses
                </Typography>
            </header>
            <main>
                <CoursesDisplay />
            </main>
        </Flexbox>
    );
};
