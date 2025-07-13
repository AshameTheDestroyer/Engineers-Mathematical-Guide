import { FC } from "react";
import { Gender } from "@/schemas/SignupSchema";
import { Typography, TypographyProps } from "../Typography/Typography";
import { useLocalization } from "../LocalizationProvider/LocalizationProvider";

export type LocaleProps = Either<
    {
        children: Record<string, string>;
    },
    {
        gender: Gender;
        children: Record<string, string | Record<Gender, string>>;
    }
> &
    Either<{ variant?: undefined }, Omit<TypographyProps, "children">>;

export const Locale: FC<LocaleProps> = ({
    id,
    ref,
    variant,
    children,
    className,
    ...props
}) => {
    const { GetLocale, GetGenderedLocale, language } = useLocalization();
    const locale =
        "gender" in props
            ? GetGenderedLocale(children, language, props.gender as Gender)
            : GetLocale(children as Record<string, string>, language);

    if (variant == null) {
        return locale;
    }

    return (
        <Typography
            id={id}
            ref={ref}
            className={className}
            variant={variant}
            {...props}
        >
            {locale}
        </Typography>
    );
};
