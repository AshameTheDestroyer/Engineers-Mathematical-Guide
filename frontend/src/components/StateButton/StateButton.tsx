import { Icon } from "../Icon/Icon";
import { FC, useEffect } from "react";
import { Button, ButtonProps } from "../Button/Button";
import { DoubleCogIcon } from "../DoubleCogIcon/DoubleCogIcon";

import check_icon from "@icons/check.svg";
import network_error_icon from "@icons/network_error.svg";

export type StateButtonProps = {
    errorThreshold?: number;
} & ButtonProps &
    MutationProps;

export const StateButton: FC<StateButtonProps> = ({
    id,
    ref,
    reset,
    isError,
    children,
    isPending,
    isSuccess,
    className,
    disabled: _disabled,
    errorThreshold = 1000,
    ...props
}) => {
    const disabled = [_disabled, isPending, isError, isSuccess].some(Boolean);

    useEffect(() => {
        if (!isError) {
            return;
        }

        setTimeout(reset, errorThreshold);
    }, [isError]);

    return (
        <Button
            id={id}
            ref={ref}
            className={className}
            disabled={disabled}
            {...props}
        >
            {isError ? (
                <Icon source={network_error_icon} width={24} height={24} />
            ) : isPending ? (
                <DoubleCogIcon
                    size={24}
                    className="scale-85 [&>*]:[animation-duration:3s]"
                />
            ) : isSuccess ? (
                <Icon
                    source={check_icon}
                    width={24}
                    height={24}
                    stroke="currentColor"
                />
            ) : (
                children
            )}
        </Button>
    );
};
