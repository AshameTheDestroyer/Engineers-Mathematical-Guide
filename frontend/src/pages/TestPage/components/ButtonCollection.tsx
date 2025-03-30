import { FC } from "react";
import { Collection } from "../components/Collection";
import { ButtonBox } from "@/components/ButtonBox/ButtonBox";
import { Button, ButtonProps } from "@/components/Button/Button";

import home_icon from "@icons/home.svg";
import arrow_icon from "@icons/arrow.svg";

export const ButtonCollection: FC = () => {
    const arrowRightIcon: ButtonProps["icon"] = {
        source: arrow_icon,
        placement: "right",
        className: "rotate-90",
    };

    const arrowLeftIcon: ButtonProps["icon"] = {
        source: arrow_icon,
        placement: "left",
        className: "-rotate-90",
    };

    const homeIcon: ButtonProps["icon"] = {
        source: home_icon,
        placement: "left",
    };

    return (
        <Collection title="Button Component">
            <Collection title="Normal" inner>
                <ButtonBox>
                    <Button variant="default">Default</Button>
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                </ButtonBox>
            </Collection>
            <Collection title="Thick" inner>
                <ButtonBox>
                    <Button variant="default" isThick>
                        Default
                    </Button>
                    <Button variant="primary" isThick>
                        Primary
                    </Button>
                    <Button variant="secondary" isThick>
                        Secondary
                    </Button>
                </ButtonBox>
            </Collection>
            <Collection title="Linked" inner>
                <ButtonBox>
                    <Button variant="default" link="/" icon={homeIcon}>
                        Default
                    </Button>
                    <Button variant="primary" link="/" icon={homeIcon}>
                        Primary
                    </Button>
                    <Button variant="secondary" link="/" icon={homeIcon}>
                        Secondary
                    </Button>
                </ButtonBox>
            </Collection>
            <Collection title="Icon-ed" inner className="[&>div]:flex-col">
                <ButtonBox>
                    <Button variant="default" icon={arrowRightIcon}>
                        Default
                    </Button>
                    <Button variant="primary" icon={arrowRightIcon}>
                        Primary
                    </Button>
                    <Button variant="secondary" icon={arrowRightIcon}>
                        Secondary
                    </Button>
                </ButtonBox>
                <ButtonBox>
                    <Button variant="default" icon={arrowLeftIcon}>
                        Default
                    </Button>
                    <Button variant="primary" icon={arrowLeftIcon}>
                        Primary
                    </Button>
                    <Button variant="secondary" icon={arrowLeftIcon}>
                        Secondary
                    </Button>
                </ButtonBox>
            </Collection>
        </Collection>
    );
};
