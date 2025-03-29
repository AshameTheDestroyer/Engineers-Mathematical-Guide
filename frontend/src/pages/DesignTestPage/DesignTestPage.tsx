import { FC } from "react";
import { Page } from "@/components/Page/Page";
import { ColourCollection } from "./components/ColourCollection";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";

export const DesignTestPage: FC = () => {
    return (
        <Page className="gap-8">
            <ThemeToggle className="right-page fixed" />

            <ColourCollection
                title="Primary Colours"
                classNames={[
                    "bg-primary-light",
                    "bg-primary-light-hover",
                    "bg-primary-light-active",
                    "bg-primary-normal",
                    "bg-primary-normal-hover",
                    "bg-primary-normal-active",
                    "bg-primary-dark",
                    "bg-primary-dark-hover",
                    "bg-primary-dark-active",
                    "bg-primary-darker",
                ]}
            />
            <ColourCollection
                title="Secondary Colours"
                classNames={[
                    "bg-secondary-light",
                    "bg-secondary-light-hover",
                    "bg-secondary-light-active",
                    "bg-secondary-normal",
                    "bg-secondary-normal-hover",
                    "bg-secondary-normal-active",
                    "bg-secondary-dark",
                    "bg-secondary-dark-hover",
                    "bg-secondary-dark-active",
                    "bg-secondary-darker",
                ]}
            />
            <ColourCollection
                title="Tertiary Colours"
                classNames={[
                    "bg-tertiary-light",
                    "bg-tertiary-light-hover",
                    "bg-tertiary-light-active",
                    "bg-tertiary-normal",
                    "bg-tertiary-normal-hover",
                    "bg-tertiary-normal-active",
                    "bg-tertiary-dark",
                    "bg-tertiary-dark-hover",
                    "bg-tertiary-dark-active",
                    "bg-tertiary-darker",
                ]}
            />
            <ColourCollection
                title="Background Colours"
                classNames={[
                    "bg-background-light",
                    "bg-background-light-hover",
                    "bg-background-light-active",
                    "bg-background-normal",
                    "bg-background-normal-hover",
                    "bg-background-normal-active",
                    "bg-background-dark",
                    "bg-background-dark-hover",
                    "bg-background-dark-active",
                    "bg-background-darker",
                ]}
            />
            <ColourCollection
                title="Foreground Colours"
                classNames={[
                    "bg-foreground-light",
                    "bg-foreground-light-hover",
                    "bg-foreground-light-active",
                    "bg-foreground-normal",
                    "bg-foreground-normal-hover",
                    "bg-foreground-normal-active",
                    "bg-foreground-dark",
                    "bg-foreground-dark-hover",
                    "bg-foreground-dark-active",
                    "bg-foreground-darker",
                ]}
            />
            <ColourCollection
                title="Gray Colours"
                classNames={[
                    "bg-gray-light",
                    "bg-gray-light-hover",
                    "bg-gray-light-active",
                    "bg-gray-normal",
                    "bg-gray-normal-hover",
                    "bg-gray-normal-active",
                    "bg-gray-dark",
                    "bg-gray-dark-hover",
                    "bg-gray-dark-active",
                    "bg-gray-darker",
                ]}
            />
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
