import { FC } from "react";
import { Collection } from "./Collection";
import { ProgressBar } from "@/components/ProgressBar/ProgressBar";

import sun_icon from "@icons/sun.svg";
import moon_icon from "@icons/moon.svg";
import epic_icon from "@icons/epic.svg";
import error_icon from "@icons/error.svg";
import success_icon from "@icons/success.svg";
import warning_icon from "@icons/warning.svg";
import information_icon from "@icons/information.svg";

export const ProgressBarCollection: FC = () => {
    const themeIconCheckpoints = [
        { value: 33, icon: { source: sun_icon } },
        { value: 66, icon: { source: moon_icon } },
    ];

    const vibrantIconCheckpoints = [
        { value: 17, icon: { source: information_icon } },
        { value: 33, icon: { source: warning_icon } },
        { value: 50, icon: { source: success_icon } },
        { value: 67, icon: { source: error_icon } },
        { value: 83, icon: { source: epic_icon } },
    ];

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
                    value={400}
                    minimum={350}
                    maximum={650}
                    variant="default"
                    checkpoints={[350, 650]}
                />
                <ProgressBar
                    value={500}
                    minimum={350}
                    maximum={650}
                    variant="primary"
                    checkpoints={[350, 650]}
                />
                <ProgressBar
                    value={600}
                    minimum={350}
                    maximum={650}
                    variant="secondary"
                    checkpoints={[350, 650]}
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
                    checkpoints={themeIconCheckpoints}
                />
                <ProgressBar
                    value={50}
                    variant="primary"
                    checkpoints={themeIconCheckpoints}
                />
                <ProgressBar
                    value={66}
                    variant="secondary"
                    checkpoints={themeIconCheckpoints}
                />
            </Collection>
            <Collection
                className="[&>div]:gap-8"
                title="Vibrant"
                typography={{ variant: "h2", className: "text-lg" }}
            >
                <ProgressBar
                    variant="information"
                    value={17}
                    checkpoints={vibrantIconCheckpoints}
                />
                <ProgressBar
                    variant="warning"
                    value={33}
                    checkpoints={vibrantIconCheckpoints}
                />
                <ProgressBar
                    variant="success"
                    value={50}
                    checkpoints={vibrantIconCheckpoints}
                />
                <ProgressBar
                    variant="error"
                    value={67}
                    checkpoints={vibrantIconCheckpoints}
                />
                <ProgressBar
                    variant="epic"
                    value={83}
                    checkpoints={vibrantIconCheckpoints}
                />
            </Collection>
        </Collection>
    );
};
