import { FC, Fragment } from "react";
import { twJoin } from "tailwind-merge";
import { useNavigate } from "react-router-dom";
import { Flexbox } from "@/components/Flexbox/Flexbox";

export type BorderedListProps = {
    list: Array<{ title: string; path: string }>;
};

export const BorderedList: FC<BorderedListProps> = ({ list }) => {
    const Navigate = useNavigate();

    return (
        <Flexbox
            className="bg-background-normal border-background-darker rounded-lg border-2 p-4"
            gap="2"
            variant="ol"
            direction="column"
        >
            {list.map((item, i, array) => (
                <Fragment key={i}>
                    {i > 0 && (
                        <hr className="border-background-darker border" />
                    )}
                    <Flexbox variant="li">
                        <button
                            className={twJoin(
                                "active:bg-background-normal-active [&:where(:hover,:focus-within)]:bg-background-normal-hover w-full grow cursor-pointer p-4 text-start text-lg transition duration-200",
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
