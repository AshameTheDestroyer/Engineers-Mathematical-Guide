import { FC } from "react";
import { Collection } from "./Collection";
import { ProgressBar } from "@/components/ProgressBarComponent/ProgressBar";

import sun_icon from "@icons/sun.svg";
import moon_icon from "@icons/moon.svg";

export const ProgressBarCollection: FC = () => {
    return (
        <Collection
            className="mb-8 [&>div]:grid [&>div]:grid-cols-[repeat(auto-fill,minmax(40vw,1fr))]"
            title="Progress Bar Component"
        >
            <Collection
                className="[&>div]:gap-8"
                title="Normal"
                typography={{ variant: "h2", className: "text-lg" }}
            >
                <ProgressBar variant="default" value={25} />
                <ProgressBar variant="primary" value={50} />
                <ProgressBar variant="secondary" value={75} />
            </Collection>
            <Collection
                className="[&>div]:gap-8"
                title="Checkpoint-ed"
                typography={{ variant: "h2", className: "text-lg" }}
            >
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
                title="Ranged"
                typography={{ variant: "h2", className: "text-lg" }}
            >
                <ProgressBar
                    value={375}
                    minimum={300}
                    maximum={600}
                    variant="default"
                    checkpoints={[300, 600]}
                />
                <ProgressBar
                    value={450}
                    minimum={300}
                    maximum={600}
                    variant="primary"
                    checkpoints={[300, 600]}
                />
                <ProgressBar
                    value={525}
                    minimum={300}
                    maximum={600}
                    variant="secondary"
                    checkpoints={[300, 600]}
                />
            </Collection>
            <Collection
                className="[&>div]:gap-8"
                title="Icon-ed Checkpoints"
                typography={{ variant: "h2", className: "text-lg" }}
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
