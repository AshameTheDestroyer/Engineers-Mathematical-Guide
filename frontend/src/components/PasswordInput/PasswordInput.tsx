import { Icon } from "../Icon/Icon";
import { createPortal } from "react-dom";
import { FC, useEffect, useState } from "react";
import { Input, InputProps } from "../Input/Input";

import eye_open_icon from "@icons/eye_open.svg";
import eye_closed_icon from "@icons/eye_closed.svg";
import { twMerge } from "tailwind-merge";

export type PasswordInputProps = Omit<InputProps, "type">;

export const PasswordInput: FC<PasswordInputProps> = ({
    id,
    ref,
    name,
    className,
    ...props
}) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [buttonParent, setButtonParent] = useState<HTMLDivElement>();

    useEffect(() => {
        const buttonParent = document.querySelector(`#input-${name}`)
            ?.parentElement as HTMLDivElement;

        if (buttonParent == null) {
            return;
        }

        setButtonParent(buttonParent);
    }, []);

    return (
        <>
            <Input
                id={id}
                ref={ref}
                className={twMerge(
                    "[&>input]:pr-12 [&>label]:max-w-[calc(100%-var(--spacing)*14)]",
                    className
                )}
                name={name}
                type={isPasswordShown ? "text" : "password"}
                {...props}
            />
            {buttonParent != null &&
                createPortal(
                    <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                        type="button"
                        onClick={(_e) =>
                            setIsPasswordShown(
                                (isPasswordShown) => !isPasswordShown
                            )
                        }
                    >
                        <Icon
                            width={24}
                            height={24}
                            source={
                                isPasswordShown
                                    ? eye_closed_icon
                                    : eye_open_icon
                            }
                        />
                    </button>,
                    buttonParent
                )}
        </>
    );
};
