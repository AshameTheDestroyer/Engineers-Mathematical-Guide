import { FC } from "react";
import { PaletteCollection } from "../components/PaletteCollection";

export const PalettesPage: FC = () => {
    return (
        <div className="flex flex-col gap-8">
            <PaletteCollection
                title="Default"
                classNames={{
                    background: [
                        "bg-default-background-light",
                        "bg-default-background-light-hover",
                        "bg-default-background-light-active",
                        "bg-default-background-normal",
                        "bg-default-background-normal-hover",
                        "bg-default-background-normal-active",
                        "bg-default-background-dark",
                        "bg-default-background-dark-hover",
                        "bg-default-background-dark-active",
                        "bg-default-background-darker",
                    ],
                    foreground: [
                        "bg-default-foreground-light",
                        "bg-default-foreground-light-hover",
                        "bg-default-foreground-light-active",
                        "bg-default-foreground-normal",
                        "bg-default-foreground-normal-hover",
                        "bg-default-foreground-normal-active",
                        "bg-default-foreground-dark",
                        "bg-default-foreground-dark-hover",
                        "bg-default-foreground-dark-active",
                        "bg-default-foreground-darker",
                    ],
                }}
            />
            <PaletteCollection
                title="Sakura"
                classNames={{
                    background: [
                        "bg-sakura-background-light",
                        "bg-sakura-background-light-hover",
                        "bg-sakura-background-light-active",
                        "bg-sakura-background-normal",
                        "bg-sakura-background-normal-hover",
                        "bg-sakura-background-normal-active",
                        "bg-sakura-background-dark",
                        "bg-sakura-background-dark-hover",
                        "bg-sakura-background-dark-active",
                        "bg-sakura-background-darker",
                    ],
                    foreground: [
                        "bg-sakura-foreground-light",
                        "bg-sakura-foreground-light-hover",
                        "bg-sakura-foreground-light-active",
                        "bg-sakura-foreground-normal",
                        "bg-sakura-foreground-normal-hover",
                        "bg-sakura-foreground-normal-active",
                        "bg-sakura-foreground-dark",
                        "bg-sakura-foreground-dark-hover",
                        "bg-sakura-foreground-dark-active",
                        "bg-sakura-foreground-darker",
                    ],
                }}
            />
        </div>
    );
};
