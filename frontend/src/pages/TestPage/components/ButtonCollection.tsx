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
            <Collection
                title="Normal"
                typography={{ variant: "h2", className: "text-lg" }}
            >
                <ButtonBox>
                    <Button variant="default">Default</Button>
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                </ButtonBox>
            </Collection>
            <Collection
                title="Vibrant"
                typography={{ variant: "h2", className: "text-lg" }}
            >
                <ButtonBox>
                    <Button variant="information">Information</Button>
                    <Button variant="warning">Warning</Button>
                    <Button variant="success">Success</Button>
                    <Button variant="error">Error</Button>
                    <Button variant="epic">Epic</Button>
                </ButtonBox>
            </Collection>
            <Collection
                title="Thick"
                typography={{ variant: "h2", className: "text-lg" }}
            >
                <ButtonBox>
                    <Button variant="default" thickness="thick">
                        Default
                    </Button>
                    <Button variant="primary" thickness="thick">
                        Primary
                    </Button>
                    <Button variant="secondary" thickness="thick">
                        Secondary
                    </Button>
                </ButtonBox>
            </Collection>
            <Collection
                title="Thin"
                typography={{ variant: "h2", className: "text-lg" }}
            >
                <ButtonBox>
                    <Button variant="default" thickness="thin">
                        Default
                    </Button>
                    <Button variant="primary" thickness="thin">
                        Primary
                    </Button>
                    <Button variant="secondary" thickness="thin">
                        Secondary
                    </Button>
                </ButtonBox>
            </Collection>
            <Collection
                title="Linked"
                typography={{ variant: "h2", className: "text-lg" }}
            >
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
            <Collection
                title="Icon-ed"
                className="[&>div]:flex-col [&>div]:gap-4"
                typography={{ variant: "h2", className: "text-lg" }}
            >
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
