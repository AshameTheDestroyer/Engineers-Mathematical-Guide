import { FC } from "react";
import { Icon } from "../Icon/Icon";
import { Button, ButtonProps } from "../Button/Button";
import { DoubleCogIcon } from "../DoubleCogIcon/DoubleCogIcon";

import check_icon from "@icons/check.svg";
import network_error_icon from "@icons/network_error.svg";

export type StateButtonProps = ButtonProps & {
    isError?: boolean;
    isLoading?: boolean;
    isSuccess?: boolean;
};

export const StateButton: FC<StateButtonProps> = ({
    id,
    ref,
    isError,
    children,
    isLoading,
    isSuccess,
    className,
    disabled: _disabled,
    ...props
}) => {
    const disabled = [_disabled, isLoading, isError, isSuccess].some(Boolean);

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
