import { FC } from "react";
import { Icon } from "../Icon/Icon";
import { twMerge } from "tailwind-merge";
import { Button } from "../Button/Button";
import { Locale } from "../Locale/Locale";
import { Modal, ModalProps } from "../Modal/Modal";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";

import offline_icon from "@icons/offline.svg";

import locales from "@localization/offline_modal.json";
import { Flexbox } from "../Flexbox/Flexbox";

export type OfflineModalProps = Omit<
    ModalProps,
    "children" | "hasCloseButton" | "isOpen" | "setIsOpen" | "closeButtonProps"
>;

export const OfflineModal: FC<OfflineModalProps> = ({
    id,
    ref,
    className,
    ...props
}) => {
    const { isOnline, Refresh } = useNetworkStatus();

    return (
        <Modal
            id={id}
            ref={ref}
            className={twMerge(
                "bg-background-light gap-4 max-sm:w-[90vw]",
                className
            )}
            isOpen={!isOnline}
            setIsOpen={() => {}}
            {...props}
        >
            <Flexbox gap="4">
                <Icon source={offline_icon} />
                <Locale className="text-lg font-bold" variant="h1">
                    {locales.title}
                </Locale>
            </Flexbox>
            <Locale className="max-w-[16rem]" variant="p">
                {locales.paragraph}
            </Locale>
            <Button className="w-full" onClick={Refresh}>
                <Locale>{locales.buttons.refresh}</Locale>
            </Button>
        </Modal>
    );
};
