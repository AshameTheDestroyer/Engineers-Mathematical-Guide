import { Icon } from "../Icon/Icon";
import { FC, useEffect } from "react";
import { Button, ButtonProps } from "../Button/Button";
import { DoubleCogIcon } from "../DoubleCogIcon/DoubleCogIcon";

import check_icon from "@icons/check.svg";
import network_error_icon from "@icons/network_error.svg";

export const ERROR_THRESHOLD = 1000;

export type StateButtonProps = ButtonProps & {
    reset: () => void;
    isError?: boolean;
    isLoading?: boolean;
    isSuccess?: boolean;
};

export const StateButton: FC<StateButtonProps> = ({
    id,
    ref,
    reset,
    isError,
    children,
    isLoading,
    isSuccess,
    className,
    disabled: _disabled,
    ...props
}) => {
    const disabled = [_disabled, isLoading, isError, isSuccess].some(Boolean);

    useEffect(() => {
        if (!isError) {
            return;
        }

        setTimeout(reset, ERROR_THRESHOLD);
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
            ) : isLoading ? (
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
