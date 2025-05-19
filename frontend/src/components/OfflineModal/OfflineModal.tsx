import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "../Button/Button";
import { Modal, ModalProps } from "../Modal/Modal";
import { Typography } from "../Typography/Typography";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";

export type OfflineModalProps = Omit<
    ModalProps,
    "children" | "hasCloseButton" | "isOpen" | "setIsOpen"
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
            <Typography className="text-lg font-bold" variant="h1">
                You're Offline
            </Typography>
            <Typography variant="p">
                You seem to have an unstable internet connection.
            </Typography>
            <Button className="w-full" onClick={Refresh}>
                Refresh
            </Button>
        </Modal>
    );
};
