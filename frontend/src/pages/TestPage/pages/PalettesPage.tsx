import { FC } from "react";
import { PaletteCollection } from "../components/PaletteCollection";

export const PalettesPage: FC = () => {
    return (
        <div className="flex flex-col gap-8">
            <PaletteCollection
                title="Default"
                classNames={{
                    background: [
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
                    ],
                    foreground: [
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
                    ],
                }}
            />
            <PaletteCollection
                title="Sakura"
                classNames={{
                    background: [
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
                    ],
                    foreground: [
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
                    ],
                }}
            />
        </div>
    );
};
