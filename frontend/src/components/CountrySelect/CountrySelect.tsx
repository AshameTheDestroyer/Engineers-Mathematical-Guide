import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { Locale } from "../Locale/Locale";
import { Select, SelectProps } from "../Select/Select";

import countries from "@json/countries.json";
import countries_locales from "@localization/countries.json";

export type CountrySelectProps = {
    onCountryChange?: (country: (typeof countries)[number]) => void;
} & Omit<SelectProps<EnumValues>, "rendersOptions" | "options">;

export const CountrySelect: FC<CountrySelectProps> = ({
    id,
    ref,
    onChange,
    className,
    onCountryChange,
    doesHaveOverflowScroll = true,
    ...props
}) => {
    const options = countries.sort((a, b) => a.name.localeCompare(b.name));

    const mapOptions = (country: (typeof countries)[number]) => country.name;

    const renderOptions = (country: (typeof countries)[number]) => (
        <>
            <Locale
                variant="p"
                className="grow flex-nowrap place-self-center overflow-hidden text-ellipsis"
            >
                {
                    countries_locales[
                        country.name
                            .toLowerCase()
                            .replaceAll(
                                " ",
                                "-"
                            ) as keyof typeof countries_locales
                    ]
                }
            </Locale>
            <img
                className="h-[24px] place-self-center drop-shadow-[3px_3px_1px_#0000004c]"
                src={`/flags/${country.code.toLowerCase()}.svg`}
                width={32}
                height={32}
            />
        </>
    );

    return (
        <Select
            id={id}
            ref={ref}
            className={twMerge(
                "[&>div>button>div>div>p]:text-ellipsis [&>div>button>div>div>p]:whitespace-nowrap [&>div>button>div>div]:flex [&>div>button>div>div]:gap-4 [&>div>button>div>div]:overflow-hidden [&>div>div>div]:max-h-[40vh] [&>div>div_button>div>*]:flex [&>div>div_button>div>*]:w-full [&>div>div_button>div>*]:gap-4 [&>div>div_button>div>*]:px-2",
                className
            )}
            doesHaveOverflowScroll={doesHaveOverflowScroll}
            mapOptions={
                mapOptions as unknown as SelectProps<EnumValues>["mapOptions"]
            }
            rendersOptions={
                renderOptions as unknown as SelectProps<EnumValues>["rendersOptions"]
            }
            options={options as unknown as EnumValues}
            onChange={(e) => (
                onChange?.(e),
                onCountryChange?.(
                    countries.find((country) => country.name == e.target.value)!
                )
            )}
            {...props}
        />
    );
};
