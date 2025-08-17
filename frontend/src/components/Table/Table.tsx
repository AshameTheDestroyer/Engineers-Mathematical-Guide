import { Button } from "../Button/Button";
import { twJoin, twMerge } from "tailwind-merge";
import { useLocalization } from "../LocalizationProvider/LocalizationProvider";
import { SearchResultDisplay } from "../SearchResultDisplay/SearchResultDisplay";
import {
    ComponentProps,
    ChildlessComponentProps,
} from "@/types/ComponentProps";
import {
    FC,
    useMemo,
    Dispatch,
    SetStateAction,
    PropsWithChildren,
} from "react";

export type TableProps<T extends Record<string, any>> = QueryProps<
    Array<T> | undefined
> & {
    keys: Array<string>;
    searchQuery: string;
    setSearchQuery: Dispatch<SetStateAction<string>>;
} & ChildlessComponentProps<HTMLDivElement>;

export const Table = <T extends Record<string, any>>({
    id,
    ref,
    data,
    refetch,
    isError,
    isLoading,
    className,
    keys: _keys,
    setSearchQuery,
}: TableProps<T>): ReturnType<FC<TableProps<T>>> => {
    const { direction } = useLocalization();

    const keys = useMemo(
        () => _keys ?? Object.keys(data?.[0] ?? {}),
        [_keys, data]
    );

    const Wrapper = ({ children }: PropsWithChildren) => (
        <Table.Wrapper id={id} ref={ref} className={className} keys={keys}>
            {children}
        </Table.Wrapper>
    );

    if (isLoading || data == null) {
        return (
            <Wrapper>
                <SearchResultDisplay
                    className="-translate-1/2 absolute left-1/2 top-1/2"
                    iconType="loading"
                    title="Loading..."
                    paragraph="Wait till it loads."
                />
            </Wrapper>
        );
    }

    if (isError) {
        return (
            <Wrapper>
                <SearchResultDisplay
                    className="-translate-1/2 absolute left-1/2 top-1/2"
                    iconType="error"
                    title="Error!"
                    paragraph="An unexpected error happened."
                    buttons={
                        <Button onClick={(_e) => refetch()}>Reset Error</Button>
                    }
                />
            </Wrapper>
        );
    }

    if (data.length == 0) {
        return (
            <Wrapper>
                <SearchResultDisplay
                    className="-translate-1/2 absolute left-1/2 top-1/2"
                    iconType="empty"
                    title="No Data Found"
                    paragraph="There were no data found."
                    // paragraph={GetLocale(
                    //     locales.display.empty.paragraph,
                    //     language
                    // ).replace(
                    //     /\*\*([^\*]+)\*\*/,
                    //     `**"${searchQuery}"**`
                    // )}
                    buttons={
                        <Button onClick={(_e) => setSearchQuery("")}>
                            Reset Search
                        </Button>
                    }
                />
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            {keys.map((key, i) => (
                <Table.Cell
                    key={i}
                    className={twJoin(
                        i == 0 &&
                            (direction == "ltr"
                                ? "rounded-tl-[inherit]"
                                : "rounded-tr-[inherit]"),
                        i == keys.length - 1 &&
                            (direction == "ltr"
                                ? "rounded-tr-[inherit]"
                                : "rounded-tl-[inherit]")
                    )}
                    type="heading"
                >
                    {key.toTitleCase()}
                </Table.Cell>
            ))}
            {data.map((datum, i) =>
                keys.map((key, j) => (
                    <Table.Cell
                        key={`${i}-${j}`}
                        className={twJoin(
                            i == data.length - 1 &&
                                j == 0 &&
                                (direction == "ltr"
                                    ? "rounded-bl-[inherit]"
                                    : "rounded-br-[inherit]"),
                            i == data.length - 1 &&
                                j == keys.length - 1 &&
                                (direction == "ltr"
                                    ? "rounded-br-[inherit]"
                                    : "rounded-bl-[inherit]")
                        )}
                        type="cell"
                    >
                        {datum[key] ?? "None"}
                    </Table.Cell>
                ))
            )}
        </Wrapper>
    );
};

Table.Wrapper = <T extends Record<string, any>>({
    id,
    ref,
    keys,
    children,
    className,
}: ComponentProps<HTMLDivElement> & Pick<TableProps<T>, "keys">) => {
    return (
        <div
            id={id}
            ref={ref}
            className={twMerge(
                "bg-background-dark/50 border-background-darker relative grid auto-rows-max overflow-auto rounded-2xl border-[1.5px] p-4 [&::-webkit-scrollbar]:hidden",
                className
            )}
            role="table"
            style={{
                gridTemplateColumns: `repeat(${keys.length}, 1fr)`,
            }}
        >
            {children}
        </div>
    );
};

Table.Cell = ({
    id,
    ref,
    type,
    children,
    className,
}: ComponentProps<HTMLDivElement> & { type: "heading" | "cell" }) => {
    return (
        <div
            id={id}
            ref={ref}
            className={twMerge(
                "border-background-darker border-1 text-nowrap px-4 py-2",
                className
            )}
            role={type}
        >
            {children}
        </div>
    );
};
