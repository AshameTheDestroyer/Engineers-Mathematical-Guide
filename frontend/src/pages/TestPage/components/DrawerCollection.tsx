import { Dispatch, FC, SetStateAction, useState } from "react";
import { Collection } from "./Collection";
import { Drawer } from "@/components/Drawer/Drawer";
import { Typography } from "@/components/Typography/Typography";
import { IconButton } from "@/components/IconButton/IconButton";

import arrow_icon from "@icons/direction_arrow.svg";

export const DrawerCollection: FC = () => {
    const [isTopOpen, setIsTopOpen] = useState(false);
    const [isLeftOpen, setIsLeftOpen] = useState(false);
    const [isRightOpen, setIsRightOpen] = useState(false);
    const [isBottomOpen, setIsBottomOpen] = useState(false);

    const DrawerWithButton = (props: {
        isOpen: boolean;
        className: string;
        direction: Direction;
        setIsOpen: Dispatch<SetStateAction<boolean>>;
    }) => (
        <>
            <IconButton
                onClick={(_e) => props.setIsOpen((isOpen) => !isOpen)}
                icon={{ source: arrow_icon, className: props.className }}
            />
            <Drawer
                isOpen={props.isOpen}
                direction={props.direction}
                setIsOpen={props.setIsOpen}
            >
                <Typography variant="h2" className="text-lg font-bold">
                    {props.direction.toTitleCase()} Drawer
                </Typography>
            </Drawer>
        </>
    );

    return (
        <Collection title="Drawer Component">
            <DrawerWithButton
                className="rotate-0"
                direction="top"
                isOpen={isTopOpen}
                setIsOpen={setIsTopOpen}
            />
            <DrawerWithButton
                className="rotate-270"
                direction="left"
                isOpen={isLeftOpen}
                setIsOpen={setIsLeftOpen}
            />
            <DrawerWithButton
                className="rotate-90"
                direction="right"
                isOpen={isRightOpen}
                setIsOpen={setIsRightOpen}
            />
            <DrawerWithButton
                className="rotate-180"
                direction="bottom"
                isOpen={isBottomOpen}
                setIsOpen={setIsBottomOpen}
            />
        </Collection>
    );
};
