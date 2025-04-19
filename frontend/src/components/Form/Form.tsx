import { twMerge } from "tailwind-merge";
import { ButtonBox } from "../ButtonBox/ButtonBox";
import { ComponentProps } from "@/types/ComponentProps";
import { FC, FormHTMLAttributes, PropsWithChildren } from "react";
import { useLocalization } from "../LocalizationProvider/LocalizationProvider";

export type FormProps = {
    title: PropsWithChildren["children"];
    buttons: PropsWithChildren["children"];
    options?: PropsWithChildren["children"];
    lastOptions?: PropsWithChildren["children"];
} & ComponentProps<HTMLFormElement> &
    Omit<FormHTMLAttributes<HTMLFormElement>, "title">;

export const Form: FC<FormProps> = ({
    id,
    ref,
    title,
    options,
    buttons,
    children,
    className,
    lastOptions,
    ...props
}) => {
    const { direction } = useLocalization();

    return (
        <form
            id={id}
            ref={ref}
            className={twMerge("flex flex-col gap-8", className)}
            {...props}
        >
            <header>{title}</header>
            <main className="grid grow grid-cols-1 place-content-center gap-6">
                {children}
            </main>
            {options != null && (
                <section className="flex flex-col gap-4">{options}</section>
            )}
            <footer className="flex flex-col gap-6">
                <ButtonBox
                    className="flex-wrap [&>button]:flex-1 [&>button]:text-nowrap"
                    direction={direction == "ltr" ? "row" : "reverse-row"}
                >
                    {buttons}
                </ButtonBox>
                {lastOptions != null && (
                    <section className="flex flex-col gap-4">
                        {lastOptions}
                    </section>
                )}
            </footer>
        </form>
    );
};
