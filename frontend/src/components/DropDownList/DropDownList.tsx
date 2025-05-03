import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { DropDown, DropDownProps } from "../DropDown/DropDown";

export type DropDownListProps = DropDownProps;

export const DropDownList: FC<DropDownListProps> = ({
    id,
    ref,
    children,
    className,
    ...props
}) => {
    return (
        <DropDown
            id={id}
            ref={ref}
            className={twMerge(
                "[&>div>div_button>div]:rounded-lg [:is(&,&_.drop-down)>div>div]:p-0 [:is(&,&_.drop-down)>div]:rounded-none [:is(&,&_.drop-down)>div]:border-0 [:is(&,&_.drop-down)>div]:bg-transparent [:is(&,&_.drop-down)>div]:shadow-none",
                className
            )}
            {...props}
        >
            {children}
        </DropDown>
    );
};
