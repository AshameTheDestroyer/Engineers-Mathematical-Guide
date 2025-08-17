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
    emptyTypography,
    errorTypography,
    loadingTypography,
}: TableProps<T>): ReturnType<FC<TableProps<T>>> => {
    const { direction } = useLocalization();

    const keys = useMemo(
        () => _keys ?? Object.keys(data?.[0] ?? {}),
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
                "bg-background-dark/50 border-background-darker border-1 relative grid auto-rows-max overflow-auto rounded-2xl p-4 [&::-webkit-scrollbar]:hidden",
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
