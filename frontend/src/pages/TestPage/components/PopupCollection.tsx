import { Collection } from "./Collection";
import { FC, Fragment, useState } from "react";
import { Modal } from "@/components/Modal/Modal";
import { Drawer } from "@/components/Drawer/Drawer";
import { IconButton } from "@/components/IconButton/IconButton";
import { Typography } from "@/components/Typography/Typography";

import hexagon_icon from "@icons/hexagons.svg";
import arrow_icon from "@icons/direction_arrow.svg";

export const PopupCollection: FC = () => {
    const [openPopup, setOpenPopup] = useState<
        "modal" | `${Direction}-drawer`
    >();

    const classNames: Record<Direction, string> = {
        top: "rotate-0",
        left: "rotate-270",
        right: "rotate-90",
        bottom: "rotate-180",
    };

    const directions = ["top", "right", "bottom", "left"] as Tuple<
        Direction,
        4
    >;

    return (
        <Collection title="Popup Components">
            <Collection
                title="Modal Component"
                typography={{ variant: "h2", className: "text-lg" }}
            >
                <IconButton
                    icon={{ source: hexagon_icon }}
                    onClick={(_e) => setOpenPopup("modal")}
                />
                <Modal
                    className="bg-background-light"
                    hasCloseButton
                    isOpen={openPopup == "modal"}
                    setIsOpen={(isOpen) =>
                        setOpenPopup(isOpen ? "modal" : undefined)
                    }
                >
                    <Typography className="p-8 text-lg font-bold" variant="h1">
                        Modal
                    </Typography>
                </Modal>
            </Collection>
            <Collection
                title="Drawer Component"
                typography={{ variant: "h2", className: "text-lg" }}
            >
                {directions.map((direction, i) => (
                    <Fragment key={i}>
                        <IconButton
                            icon={{
                                source: arrow_icon,
                                className: classNames[direction],
                            }}
                            onClick={(_e) =>
                                setOpenPopup(`${direction}-drawer`)
                            }
                        />
                        <Drawer
                            className="bg-background-light"
                            hasCloseButton
                            direction={direction}
                            isOpen={openPopup == `${direction}-drawer`}
                            setIsOpen={(isOpen) =>
                                setOpenPopup(
                                    isOpen ? `${direction}-drawer` : undefined
                                )
                            }
                        >
                            <Typography
                                className="p-8 text-lg font-bold"
                                variant="h1"
                            >
                                {direction.toTitleCase()} Drawer
                            </Typography>
                        </Drawer>
                    </Fragment>
                ))}
            </Collection>
        </Collection>
    );
};
