import { FC, useState } from "react";
import { Collection } from "./Collection";
import { Modal } from "@/components/Modal/Modal";
import { IconButton } from "@/components/IconButton/IconButton";
import { Typography } from "@/components/Typography/Typography";

import hexagon_icon from "@icons/hexagons.svg";

export const ModalCollection: FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Collection title="Modal Component">
            <IconButton
                icon={{ source: hexagon_icon }}
                onClick={(_e) => setIsOpen(true)}
            />
            <Modal
                className="bg-background-light"
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                hasCloseButton
            >
                <Typography className="p-8 text-lg font-bold" variant="h1">
                    Modal
                </Typography>
            </Modal>
        </Collection>
    );
};
