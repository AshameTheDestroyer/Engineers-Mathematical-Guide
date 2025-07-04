import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "../Button/Button";
import { Locale } from "../Locale/Locale";
import { Modal, ModalProps } from "../Modal/Modal";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";

import locales from "@localization/offline_modal.json";

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
            className={twMerge("bg-background-light gap-4", className)}
            isOpen={!isOnline}
            setIsOpen={() => {}}
            {...props}
        >
            <Locale className="text-lg font-bold" variant="h1">
                {locales.title}
            </Locale>
            <Locale variant="p">{locales.paragraph}</Locale>
            <Button className="w-full" onClick={Refresh}>
                <Locale>{locales.buttons.refresh}</Locale>
            </Button>
        </Modal>
    );
};
