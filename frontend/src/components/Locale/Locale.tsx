import { FC } from "react";
import { Typography, TypographyProps } from "../Typography/Typography";
import { useLocalization } from "../LocalizationProvider/LocalizationProvider";

export type LocaleProps = {
    children: Record<string, string>;
} & Either<{ variant?: undefined }, Omit<TypographyProps, "children">>;

export const Locale: FC<LocaleProps> = ({
    id,
    ref,
    variant,
    children,
    className,
    ...props
}) => {
    const { GetLocale, language } = useLocalization();
    const locale = GetLocale(children, language);

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
