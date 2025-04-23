import { FC } from "react";
import { MathJax } from "better-react-mathjax";
import { Typography, TypographyProps } from "../Typography/Typography";

export type MathExpressionProps = {
    children: string;
} & Either<{ variant?: undefined }, Omit<TypographyProps, "children">>;

export const MathExpression: FC<MathExpressionProps> = ({
    id,
    ref,
    variant,
    children,
    className,
    ...props
}) => {
    const Content = () => <MathJax>{`\\(${children}\\)`}</MathJax>;

    if (variant == null) {
        return <Content />;
    }

    return (
        <Typography
            id={id}
            ref={ref}
            className={className}
            variant={variant}
            {...props}
        >
            <Content />
        </Typography>
    );
};
