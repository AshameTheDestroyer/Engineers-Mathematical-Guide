import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Input } from "@/components/Input/Input";
import { Typography } from "@/components/Typography/Typography";
import { FC } from "react";
import { LearningTracksDisplay } from "../components/LearningTracksDisplay";

export const LearningTracksPage: FC = () => {
    return (
        <div>
            <Flexbox
                rowGap="4"
                columnGap="8"
                variant="header"
                placeItems="center"
                placeContent="space-between"
                className="max-sm:flex-wrap"
            >
                <Typography variant="h1" className="text-xl font-bold">
                    Learning Tracks
                </Typography>
                <Input
                    className="max-sm:grow"
                    name="query"
                    type="search"
                    label="Search"
                />
            </Flexbox>
            <Flexbox direction="column" gap={3}>
                <LearningTracksDisplay />
                <hr />
                <LearningTracksDisplay />
                <hr />
                <LearningTracksDisplay />
                <hr />
                <LearningTracksDisplay />
            </Flexbox>
        </div>
    );
};
