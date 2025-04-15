import { FC } from "react";
import { Collection } from "./Collection";
import { ProgressBar } from "@/components/ProgressBarComponent/ProgressBar";

import sun_icon from "@icons/sun.svg";
import moon_icon from "@icons/moon.svg";

export const ProgressBarCollection: FC = () => {
    return (
        <Collection title="Progress Bar Component" className="[&>div]:flex-col">
            <Collection title="Normal" inner className="[&>div]:gap-8">
                <ProgressBar variant="default" value={0} />
                <ProgressBar variant="primary" value={50} />
                <ProgressBar variant="secondary" value={75} />
            </Collection>
            <Collection title="Checkpoint-ed" inner className="[&>div]:gap-8">
                <ProgressBar
                    value={25}
                    variant="default"
                    checkpoints={[25, 50, 75]}
                />
                <ProgressBar
                    value={50}
                    variant="primary"
                    checkpoints={[25, 50, 75]}
                />
                <ProgressBar
                    value={75}
                    variant="secondary"
                    checkpoints={[25, 50, 75]}
                />
            </Collection>
            <Collection
                className="[&>div]:gap-8"
                inner
                title="Icon-ed Checkpoints"
            >
                <ProgressBar
                    value={33}
                    variant="default"
                    checkpoints={[
                        { value: 33, icon: { source: sun_icon } },
                        { value: 66, icon: { source: moon_icon } },
                    ]}
                />
                <ProgressBar
                    value={50}
                    variant="primary"
                    checkpoints={[
                        { value: 33, icon: { source: sun_icon } },
                        { value: 66, icon: { source: moon_icon } },
                    ]}
                />
                <ProgressBar
                    value={66}
                    variant="secondary"
                    checkpoints={[
                        { value: 33, icon: { source: sun_icon } },
                        { value: 66, icon: { source: moon_icon } },
                    ]}
                />
            </Collection>
        </Collection>
    );
};
