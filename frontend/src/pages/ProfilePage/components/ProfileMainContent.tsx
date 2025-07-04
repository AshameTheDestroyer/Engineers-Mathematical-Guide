import { FC } from "react";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Typography } from "@/components/Typography/Typography";

export const ProfileMainContent: FC = () => {
    return (
        <Flexbox>
            <Typography className="text-2xl font-bold" variant="h1">
                Profile
            </Typography>
        </Flexbox>
    );
};
