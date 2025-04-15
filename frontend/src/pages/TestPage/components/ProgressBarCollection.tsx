import { FC } from "react";
import { Collection } from "./Collection";
import { ProgressBar } from "@/components/ProgressBarComponent/ProgressBar";

export const ProgressBarCollection: FC = () => {
    return (
        <Collection title="Progress Bar Component" className="[&>div]:flex-col">
            <Collection title="Normal" inner className="[&>div]:gap-8">
                <ProgressBar variant="default" value={25} />
                <ProgressBar variant="primary" value={25} />
                <ProgressBar variant="secondary" value={25} />
            </Collection>
            <Collection title="Checkpoint-ed" inner className="[&>div]:gap-8">
                <ProgressBar
                    value={25}
                    variant="default"
                    checkpoints={[25, 50, 75]}
                />
                <ProgressBar
                    value={25}
                    variant="primary"
                    checkpoints={[25, 50, 75]}
                />
                <ProgressBar
                    value={25}
                    variant="secondary"
                    checkpoints={[25, 50, 75]}
                />
            </Collection>
        </Collection>
    );
};
