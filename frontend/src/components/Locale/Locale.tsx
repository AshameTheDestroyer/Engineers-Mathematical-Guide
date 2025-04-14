import { FC } from "react";
import Typography, { TypographyProps } from "../Typography/Typography";
import { useLocalization } from "../LocalizationProvider/LocalizationProvider";

export type LocaleProps = Omit<TypographyProps, "children"> & {
    children: Record<string, string>;
};

export const Locale: FC<LocaleProps> = ({
    id,
    ref,
    variant,
    children,
    className,
}) => {
    const { GetLocale, language } = useLocalization();

    return (
        <Typography id={id} className={className} ref={ref} variant={variant}>
            {GetLocale(children, language)}
        </Typography>
    );
};
