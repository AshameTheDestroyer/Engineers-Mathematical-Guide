import { FC } from "react";
import { Collection } from "./Collection";
import { Button } from "@/components/Button/Button";
import { ButtonBox } from "@/components/ButtonBox/ButtonBox";
import { DropDownList } from "@/components/DropDownList/DropDownList";
import { DropDown, DropDownProps } from "@/components/DropDown/DropDown";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import cog_icon from "@icons/cog.svg";
import user_icon from "@icons/user.svg";
import home_icon from "@icons/home.svg";
import arrow_icon from "@icons/arrow.svg";

export const DropDownCollection: FC = () => {
    const { direction } = useLocalization();

    const cogIcon: DropDownProps["icon"] = {
        source: cog_icon,
        placement: "right",
    };

    const thickArrowIcon: DropDownProps["icon"] = {
        placement: "right",
        className: "scale-140",
    };

    const homeIcon: DropDownProps["icon"] = {
        source: home_icon,
        placement: "right",
    };

    const arrowIcon: DropDownProps["icon"] = {
        source: arrow_icon,
    };

    const userIcon: DropDownProps["icon"] = {
        source: user_icon,
        placement: "right",
    };

    const DropDownChildren: FC = () => {
        return (
            <>
                <div>This</div>
                <div>is a</div>
                <div>Drop-Down</div>
                <div>With a lot of text in it.</div>
            </>
        );
    };

    return (
        <Collection title="Drop Down Component">
            <Collection
                className="[&>div]:flex-col [&>div]:gap-4"
                title="Normal"
                typography={{ variant: "h2", className: "text-lg" }}
            >
                <ButtonBox>
                    <DropDown
                        text="Default"
                        variant="default"
                        position="bottom-end"
                    >
                        <DropDownChildren />
                    </DropDown>
                    <DropDown
                        text="Primary"
                        variant="primary"
                        position="bottom-end"
                    >
                        <DropDownChildren />
                    </DropDown>
                    <DropDown
                        text="Secondary"
                        variant="secondary"
                        position="bottom-end"
                    >
                        <DropDownChildren />
                    </DropDown>
                </ButtonBox>
                <ButtonBox>
                    <DropDown
                        text="Default"
                        variant="default"
                        position="bottom-end"
                        icon={{ placement: "left" }}
                    >
                        <DropDownChildren />
                    </DropDown>
                    <DropDown
                        text="Primary"
                        variant="primary"
                        position="bottom-end"
                        icon={{ placement: "left" }}
                    >
                        <DropDownChildren />
                    </DropDown>
                    <DropDown
                        text="Secondary"
                        variant="secondary"
                        position="bottom-end"
                        icon={{ placement: "left" }}
                    >
                        <DropDownChildren />
                    </DropDown>
                </ButtonBox>
            </Collection>
            <Collection
                className="[&>div]:flex-col [&>div]:gap-4"
                title="Thick"
                typography={{ variant: "h2", className: "text-lg" }}
            >
                <ButtonBox>
                    <DropDown
                        isThick
                        text="Default"
                        variant="default"
                        position="bottom-end"
                        icon={thickArrowIcon}
                    >
                        <DropDownChildren />
                    </DropDown>
                    <DropDown
                        isThick
                        text="Primary"
                        variant="primary"
                        position="bottom-end"
                        icon={thickArrowIcon}
                    >
                        <DropDownChildren />
                    </DropDown>
                    <DropDown
                        isThick
                        text="Secondary"
                        variant="secondary"
                        position="bottom-end"
                        icon={thickArrowIcon}
                    >
                        <DropDownChildren />
                    </DropDown>
                </ButtonBox>
                <ButtonBox>
                    <DropDown
                        isThick
                        text="Default"
                        variant="default"
                        position="bottom-end"
                        icon={{ ...thickArrowIcon, placement: "left" }}
                    >
                        <DropDownChildren />
                    </DropDown>
                    <DropDown
                        isThick
                        text="Primary"
                        variant="primary"
                        position="bottom-end"
                        icon={{ ...thickArrowIcon, placement: "left" }}
                    >
                        <DropDownChildren />
                    </DropDown>
                    <DropDown
                        isThick
                        text="Secondary"
                        variant="secondary"
                        position="bottom-end"
                        icon={{ ...thickArrowIcon, placement: "left" }}
                    >
                        <DropDownChildren />
                    </DropDown>
                </ButtonBox>
            </Collection>
            <Collection
                className="[&>div]:gap-4"
                title="Text-less"
                typography={{ variant: "h2", className: "text-lg" }}
            >
                <DropDown
                    icon={cogIcon}
                    variant="default"
                    position="bottom-end"
                >
                    <DropDownChildren />
                </DropDown>
                <DropDown
                    icon={cogIcon}
                    variant="primary"
                    position="bottom-end"
                >
                    <DropDownChildren />
                </DropDown>
                <DropDown
                    icon={cogIcon}
                    variant="secondary"
                    position="bottom-end"
                >
                    <DropDownChildren />
                </DropDown>
            </Collection>
            <Collection
                className="[&>div]:flex-col [&>div]:gap-4"
                title="Icon-ed"
                typography={{ variant: "h2", className: "text-lg" }}
            >
                <ButtonBox>
                    <DropDown
                        text="Default"
                        icon={homeIcon}
                        variant="default"
                        position="bottom-end"
                    >
                        <DropDownChildren />
                    </DropDown>
                    <DropDown
                        text="Primary"
                        icon={homeIcon}
                        variant="primary"
                        position="bottom-end"
                    >
                        <DropDownChildren />
                    </DropDown>
                    <DropDown
                        icon={homeIcon}
                        text="Secondary"
                        variant="secondary"
                        position="bottom-end"
                    >
                        <DropDownChildren />
                    </DropDown>
                </ButtonBox>
                <ButtonBox>
                    <DropDown
                        text="Default"
                        variant="default"
                        position="bottom-end"
                        icon={{ ...homeIcon, placement: "left" }}
                    >
                        <DropDownChildren />
                    </DropDown>
                    <DropDown
                        text="Primary"
                        variant="primary"
                        position="bottom-end"
                        icon={{ ...homeIcon, placement: "left" }}
                    >
                        <DropDownChildren />
                    </DropDown>
                    <DropDown
                        text="Secondary"
                        variant="secondary"
                        position="bottom-end"
                        icon={{ ...homeIcon, placement: "left" }}
                    >
                        <DropDownChildren />
                    </DropDown>
                </ButtonBox>
            </Collection>
            <Collection
                className="[&>div]:flex-col [&>div]:gap-4"
                title="Closes on Interaction"
                typography={{ variant: "h2", className: "text-lg" }}
            >
                <ButtonBox>
                    <DropDown
                        text="Default"
                        icon={userIcon}
                        variant="default"
                        position="bottom-end"
                        doesCloseOnInteraction
                    >
                        <DropDownChildren />
                    </DropDown>
                    <DropDown
                        text="Primary"
                        icon={userIcon}
                        variant="primary"
                        position="bottom-end"
                        doesCloseOnInteraction
                    >
                        <DropDownChildren />
                    </DropDown>
                    <DropDown
                        icon={userIcon}
                        text="Secondary"
                        variant="secondary"
                        position="bottom-end"
                        doesCloseOnInteraction
                    >
                        <DropDownChildren />
                    </DropDown>
                </ButtonBox>
                <ButtonBox>
                    <DropDown
                        text="Default"
                        variant="default"
                        position="bottom-end"
                        doesCloseOnInteraction
                        icon={{ ...userIcon, placement: "left" }}
                    >
                        <DropDownChildren />
                    </DropDown>
                    <DropDown
                        text="Primary"
                        variant="primary"
                        position="bottom-end"
                        doesCloseOnInteraction
                        icon={{ ...userIcon, placement: "left" }}
                    >
                        <DropDownChildren />
                    </DropDown>
                    <DropDown
                        text="Secondary"
                        variant="secondary"
                        position="bottom-end"
                        doesCloseOnInteraction
                        icon={{ ...userIcon, placement: "left" }}
                    >
                        <DropDownChildren />
                    </DropDown>
                </ButtonBox>
            </Collection>
            <Collection
                className="[&>div]:flex-col"
                title="Positioned"
                typography={{ variant: "h2", className: "text-lg" }}
            >
                <ButtonBox className="grid grid-cols-5 grid-rows-5">
                    <DropDown
                        className={
                            direction == "ltr"
                                ? "[grid-column:2] [grid-row:1]"
                                : "[grid-column:4] [grid-row:1]"
                        }
                        variant="default"
                        position="top-start"
                        icon={{ ...arrowIcon, className: "-rotate-30" }}
                    >
                        <DropDownChildren />
                    </DropDown>
                    <DropDown
                        className="[grid-column:3] [grid-row:1]"
                        variant="default"
                        position="top-center"
                        icon={{ ...arrowIcon, className: "rotate-0" }}
                    >
                        <DropDownChildren />
                    </DropDown>
                    <DropDown
                        className={
                            direction == "ltr"
                                ? "[grid-column:4] [grid-row:1]"
                                : "[grid-column:2] [grid-row:1]"
                        }
                        variant="default"
                        position="top-end"
                        icon={{ ...arrowIcon, className: "rotate-30" }}
                    >
                        <DropDownChildren />
                    </DropDown>
                    <DropDown
                        className={
                            direction == "ltr"
                                ? "[grid-column:5] [grid-row:2]"
                                : "[grid-column:1] [grid-row:2]"
                        }
                        variant="default"
                        position="right-start"
                        icon={{ ...arrowIcon, className: "rotate-60" }}
                    >
                        <DropDownChildren />
                    </DropDown>
                    <DropDown
                        className={
                            direction == "ltr"
                                ? "[grid-column:5] [grid-row:3]"
                                : "[grid-column:1] [grid-row:3]"
                        }
                        variant="default"
                        position="right-center"
                        icon={{ ...arrowIcon, className: "rotate-90" }}
                    >
                        <DropDownChildren />
                    </DropDown>
                    <DropDown
                        className={
                            direction == "ltr"
                                ? "[grid-column:5] [grid-row:4]"
                                : "[grid-column:1] [grid-row:4]"
                        }
                        variant="default"
                        position="right-end"
                        icon={{ ...arrowIcon, className: "rotate-120" }}
                    >
                        <DropDownChildren />
                    </DropDown>
                    <DropDown
                        className={
                            direction == "ltr"
                                ? "[grid-column:4] [grid-row:5]"
                                : "[grid-column:2] [grid-row:5]"
                        }
                        variant="default"
                        position="bottom-start"
                        icon={{ ...arrowIcon, className: "rotate-150" }}
                    >
                        <DropDownChildren />
                    </DropDown>
                    <DropDown
                        className="[grid-column:3] [grid-row:5]"
                        variant="default"
                        position="bottom-center"
                        icon={{ ...arrowIcon, className: "rotate-180" }}
                    >
                        <DropDownChildren />
                    </DropDown>
                    <DropDown
                        className={
                            direction == "ltr"
                                ? "[grid-column:2] [grid-row:5]"
                                : "[grid-column:4] [grid-row:5]"
                        }
                        variant="default"
                        position="bottom-end"
                        icon={{ ...arrowIcon, className: "-rotate-150" }}
                    >
                        <DropDownChildren />
                    </DropDown>
                    <DropDown
                        className={
                            direction == "ltr"
                                ? "[grid-column:1] [grid-row:4]"
                                : "[grid-column:5] [grid-row:4]"
                        }
                        variant="default"
                        position="left-start"
                        icon={{ ...arrowIcon, className: "-rotate-120" }}
                    >
                        <DropDownChildren />
                    </DropDown>
                    <DropDown
                        className={
                            direction == "ltr"
                                ? "[grid-column:1] [grid-row:3]"
                                : "[grid-column:5] [grid-row:3]"
                        }
                        variant="default"
                        position="left-center"
                        icon={{ ...arrowIcon, className: "-rotate-90" }}
                    >
                        <DropDownChildren />
                    </DropDown>
                    <DropDown
                        className={
                            direction == "ltr"
                                ? "[grid-column:1] [grid-row:2]"
                                : "[grid-column:5] [grid-row:2]"
                        }
                        variant="default"
                        position="left-end"
                        icon={{ ...arrowIcon, className: "-rotate-60" }}
                    >
                        <DropDownChildren />
                    </DropDown>
                </ButtonBox>
            </Collection>
            <Collection
                className="[&>div]:flex-col"
                title="List"
                typography={{ variant: "h2", className: "text-lg" }}
            >
                <DropDownList position="bottom-end" text="Nested">
                    <DropDown
                        doesTextGrow
                        text="Default"
                        variant="default"
                        position={
                            direction == "ltr" ? "right-end" : "left-start"
                        }
                        icon={{
                            className:
                                direction == "ltr" ? "rotate-90" : "-rotate-90",
                        }}
                    >
                        <Button variant="default">Button 1</Button>
                        <Button variant="default">Button 2</Button>
                        <Button variant="default">Button 3</Button>
                    </DropDown>
                    <DropDown
                        doesTextGrow
                        text="Primary"
                        variant="primary"
                        position={
                            direction == "ltr" ? "right-end" : "left-start"
                        }
                        icon={{
                            className:
                                direction == "ltr" ? "rotate-90" : "-rotate-90",
                        }}
                    >
                        <Button variant="primary">Button 1</Button>
                        <Button variant="primary">Button 2</Button>
                        <Button variant="primary">Button 3</Button>
                    </DropDown>
                    <DropDown
                        doesTextGrow
                        text="Secondary"
                        variant="secondary"
                        position={
                            direction == "ltr" ? "right-end" : "left-start"
                        }
                        icon={{
                            className:
                                direction == "ltr" ? "rotate-90" : "-rotate-90",
                        }}
                    >
                        <Button variant="secondary">Button 1</Button>
                        <Button variant="secondary">Button 2</Button>
                        <Button variant="secondary">Button 3</Button>
                    </DropDown>
                </DropDownList>
            </Collection>
        </Collection>
    );
};
