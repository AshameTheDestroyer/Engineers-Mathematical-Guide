import { FC, Fragment } from "react";
import { twJoin } from "tailwind-merge";
import { useNavigate } from "react-router-dom";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Separator } from "@/components/Separator/Separator";
import { useThemeMode } from "@/components/ThemeModeProvider/ThemeModeProvider";

export type BorderedListProps = {
    list: Array<{ title: string; path: string }>;
};

export const BorderedList: FC<BorderedListProps> = ({ list }) => {
    const Navigate = useNavigate();
    const { isDarkThemed } = useThemeMode();

    return (
        <Flexbox
            className={twJoin(
                "border-background-darker rounded-lg border-2 p-4",
                isDarkThemed
                    ? "bg-background-normal/50"
                    : "bg-background-dark/50"
            )}
            gap="2"
            variant="ol"
            direction="column"
        >
            {list.map((item, i, array) => (
                <Fragment key={i}>
                    {i > 0 && (
                        <Separator
                            className="border-background-darker"
                            thickness="thin"
                            orientation="horizontal"
                        />
                    )}
                    <Flexbox variant="li">
                        <button
                            className={twJoin(
                                "w-full grow cursor-pointer p-4 text-start text-lg transition duration-200",
                                isDarkThemed
                                    ? "active:bg-background-normal-active [&:where(:hover,:focus-within)]:bg-background-normal/75"
                                    : "active:bg-background-dark [&:where(:hover,:focus-within)]:bg-background-normal-active",
                                i == 0
                                    ? "rounded-t-lg"
                                    : i == array.length - 1
                                      ? "rounded-b-lg"
                                      : ""
                            )}
                            role="link"
                            onClick={(_e) => Navigate(item.path)}
                        >
                            {item.title}
                        </button>
                    </Flexbox>
                </Fragment>
            ))}
        </Flexbox>
    );
};
