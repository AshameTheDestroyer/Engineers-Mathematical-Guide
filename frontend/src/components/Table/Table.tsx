import { Button } from "../Button/Button";
import { Flexbox } from "../Flexbox/Flexbox";
import { twJoin, twMerge } from "tailwind-merge";
import { useThemeMode } from "../ThemeModeProvider/ThemeModeProvider";
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
    prioritizedKeys?: Array<keyof T>;
    setSearchQuery: Dispatch<SetStateAction<string>>;
    keysClassNames?: Partial<Record<keyof T, string>>;
    loadingTypography: {
        title: string;
        paragraph: string;
    };
    errorTypography: {
        title: string;
        button: string;
        paragraph: string;
    };
    emptyTypography: {
        title: string;
        button: string;
        paragraph: string;
    };
    CellRenders?: (
        cell: {
            [K in keyof T]: {
                key: K;
                value: T[K];
            };
        }[keyof T] & {},
        datum: T
    ) => PropsWithChildren["children"] | void;
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
    CellRenders,
    keysClassNames,
    setSearchQuery,
    prioritizedKeys,
    emptyTypography,
    errorTypography,
    loadingTypography,
}: TableProps<T>): ReturnType<FC<TableProps<T>>> => {
    const { direction } = useLocalization();
    const { isDarkThemed } = useThemeMode();

    const keys = useMemo(
        () =>
            (_keys ?? Object.keys(data?.[0] ?? {})).prioritize(
                (prioritizedKeys as Array<string>) ?? []
            ),
        [_keys, data]
    );

    const Wrapper = ({
        children,
        className: className_,
    }: PropsWithChildren & { className?: string }) => (
        <Table.Wrapper
            id={id}
            ref={ref}
            className={twMerge(className, className_)}
            keys={keys}
        >
            {children}
        </Table.Wrapper>
    );

    if (isLoading || data == null) {
        return (
            <Wrapper className="flex! place-content-center place-items-center">
                <SearchResultDisplay
                    iconType="loading"
                    {...loadingTypography}
                />
            </Wrapper>
        );
    }

    if (isError) {
        return (
            <Wrapper className="flex! place-content-center place-items-center">
                <SearchResultDisplay
                    iconType="error"
                    {...errorTypography}
                    buttons={
                        <Button onClick={(_e) => refetch()}>
                            {errorTypography.button}
                        </Button>
                    }
                />
            </Wrapper>
        );
    }

    if (data.length == 0) {
        return (
            <Wrapper className="flex! place-content-center place-items-center">
                <SearchResultDisplay
                    iconType="empty"
                    {...emptyTypography}
                    buttons={
                        <Button onClick={(_e) => setSearchQuery("")}>
                            {emptyTypography.button}
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
                        "font-bold text-white",
                        i == 0 &&
                            (direction == "ltr"
                                ? "rounded-tl-[inherit]"
                                : "rounded-tr-[inherit]"),
                        i == keys.length - 1 &&
                            (direction == "ltr"
                                ? "rounded-tr-[inherit]"
                                : "rounded-tl-[inherit]"),
                        isDarkThemed
                            ? "bg-background-dark/50"
                            : "bg-background-darker/75",
                        keysClassNames?.[key]
                    )}
                    type="heading"
                >
                    {key.toTitleCase("id")}
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
                                    : "rounded-bl-[inherit]"),
                            i % 2 != 0
                                ? isDarkThemed
                                    ? "bg-background-light/75"
                                    : "bg-background-dark/75"
                                : isDarkThemed && "bg-background-dark/25",
                            keysClassNames?.[key]
                        )}
                        type="cell"
                    >
                        {CellRenders?.({ key, value: datum[key] }, datum) ??
                            (() => {
                                switch (typeof datum[key]) {
                                    case "boolean":
                                        return datum[key] ? "True" : "False";
                                    case "object":
                                        return Array.isArray(datum[key])
                                            ? datum[key].join(", ") + "."
                                            : JSON.stringify(datum[key]);
                                    default:
                                        return datum[key];
                                }
                            })() ??
                            "None"}
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
    const { isDarkThemed } = useThemeMode();

    return (
        <div
            id={id}
            ref={ref}
            className={twMerge(
                "border-background-darker relative grid auto-rows-max overflow-auto rounded-2xl border-2 p-4 [&::-webkit-scrollbar]:hidden",
                isDarkThemed
                    ? "bg-background-normal/50"
                    : "bg-background-dark/50",
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
        <Flexbox
            id={id}
            ref={ref}
            className={twMerge(
                "cell border-background-darker border-1 text-nowrap px-4 py-2",
                className
            )}
            role={type}
        >
            {children}
        </Flexbox>
    );
};
