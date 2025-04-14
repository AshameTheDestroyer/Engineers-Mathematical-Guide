import { FC } from "react";
import { ComponentProps } from "@/types/ComponentProps";

export type TypographyProps = ComponentProps<HTMLElement> & {
    variant: TypographyElement;
};

const Typography: FC<TypographyProps> = ({
    id,
    ref,
    variant,
    children,
    className,
}) => {
    const Element = variant;

    return (
        <Element id={id} ref={ref as any} className={className}>
            {children}
        </Element>
    );
};

export default Typography;
