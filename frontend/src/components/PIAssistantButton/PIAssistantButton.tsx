import { FC, useState } from "react";
import { twMerge } from "tailwind-merge";
import { IconButton, IconButtonProps } from "../IconButton/IconButton";
import { PIAssistantModal } from "../PIAssistantModal/PIAssistantModal";
import { useLocalization } from "../LocalizationProvider/LocalizationProvider";

import pi_icon from "@icons/pi.svg";

export type PIAssistantButtonProps = Omit<IconButtonProps, "icon">;

export const PIAssistantButton: FC<PIAssistantButtonProps> = ({
    id,
    ref,
    onClick,
    className,
    ...props
}) => {
    const { direction } = useLocalization();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <IconButton
                id={id}
                ref={ref}
                className={twMerge(
                    "bottom-page fixed z-50 opacity-75",
                    direction == "ltr" ? "left-page" : "right-page",
                    className
                )}
                variant="primary"
                icon={{ source: pi_icon }}
                onClick={(e) => (onClick?.(e), setIsModalOpen(true))}
                {...props}
            />

            <PIAssistantModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        </>
    );
};
