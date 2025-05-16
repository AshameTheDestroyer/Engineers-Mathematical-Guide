import { FC } from "react";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { ColourCollection } from "../components/ColourCollection";

export const ColoursPage: FC = () => {
    return (
        <Flexbox direction="column" gap="8">
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
            <ColourCollection
                title="Vibrant Normal Colours"
                classNames={[
                    "bg-vibrant-red-normal",
                    "bg-vibrant-yellow-normal",
                    "bg-vibrant-green-normal",
                    "bg-vibrant-blue-normal",
                    "bg-vibrant-purple-normal",
                ]}
            />
            <ColourCollection
                title="Vibrant Dark Colours"
                classNames={[
                    "bg-vibrant-red-dark",
                    "bg-vibrant-yellow-dark",
                    "bg-vibrant-green-dark",
                    "bg-vibrant-blue-dark",
                    "bg-vibrant-purple-dark",
                ]}
            />
            <ColourCollection
                title="Bronze Colours"
                classNames={[
                    "bg-material-bronze-light",
                    "bg-material-bronze-normal",
                    "bg-material-bronze-dark",
                ]}
            />
            <ColourCollection
                title="Silver Colours"
                classNames={[
                    "bg-material-silver-light",
                    "bg-material-silver-normal",
                    "bg-material-silver-dark",
                ]}
            />
            <ColourCollection
                title="Gold Colours"
                classNames={[
                    "bg-material-gold-light",
                    "bg-material-gold-normal",
                    "bg-material-gold-dark",
                ]}
            />
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
        </Flexbox>
    );
};
