import { FC } from "react";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { MathParallaxScene } from "@/components/MathParallaxScene/MathParallaxScene";

export const MathEquationsPage: FC = () => {
    return (
        <Flexbox
            gap="8"
            variant="main"
            direction="column"
            className="flex-grow"
        >
            <MathParallaxScene className="flex-grow" />
        </Flexbox>
    );
};
