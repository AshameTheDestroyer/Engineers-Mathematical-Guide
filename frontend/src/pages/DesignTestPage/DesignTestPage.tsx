import { FC } from "react";
import { Page } from "@/components/Page/Page";
import { ColourCollection } from "./components/ColourCollection";

export const DesignTestPage: FC = () => {
    return (
        <Page className="gap-8">
            <ColourCollection
                title="Vibrant Colours"
                classNames={[
                    "bg-vibrant-red",
                    "bg-vibrant-yellow",
                    "bg-vibrant-green",
                    "bg-vibrant-blue",
                    "bg-vibrant-purple",
                ]}
            />
            <ColourCollection
                title="Vibrant Light Colours"
                classNames={[
                    "bg-vibrant-red-light",
                    "bg-vibrant-yellow-light",
                    "bg-vibrant-green-light",
                    "bg-vibrant-blue-light",
                    "bg-vibrant-purple-light",
                ]}
            />
        </Page>
    );
};
