import { FC } from "react";
import { Button } from "@/components/Button/Button";
import { Collection } from "../components/Collection";
import { ButtonBox } from "@/components/ButtonBox/ButtonBox";

import home_icon from "@icons/home.svg";
import arrow_icon from "@icons/arrow.svg";

export const ButtonCollection: FC = () => {
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
            <Collection title="Icon-ed" inner className="[&>div]:flex-col">
                <ButtonBox>
                    <Button
                        variant="default"
                        icon={{
                            width: 24,
                            source: arrow_icon,
                            placement: "right",
                            className: "rotate-90",
                        }}
                    >
                        Default
                    </Button>
                    <Button
                        variant="primary"
                        icon={{
                            width: 24,
                            source: arrow_icon,
                            placement: "right",
                            className: "rotate-90",
                        }}
                    >
                        Primary
                    </Button>
                    <Button
                        variant="secondary"
                        icon={{
                            width: 24,
                            source: arrow_icon,
                            placement: "right",
                            className: "rotate-90",
                        }}
                    >
                        Secondary
                    </Button>
                </ButtonBox>
                <ButtonBox>
                    <Button
                        variant="default"
                        icon={{
                            width: 24,
                            source: arrow_icon,
                            placement: "left",
                            className: "-rotate-90",
                        }}
                    >
                        Default
                    </Button>
                    <Button
                        variant="primary"
                        icon={{
                            width: 24,
                            source: arrow_icon,
                            placement: "left",
                            className: "-rotate-90",
                        }}
                    >
                        Primary
                    </Button>
                    <Button
                        variant="secondary"
                        icon={{
                            width: 24,
                            source: arrow_icon,
                            placement: "left",
                            className: "-rotate-90",
                        }}
                    >
                        Secondary
                    </Button>
                </ButtonBox>
            </Collection>
            <Collection title="Linked" inner>
                <ButtonBox>
                    <Button
                        variant="default"
                        link="/"
                        icon={{
                            width: 24,
                            source: home_icon,
                            placement: "left",
                        }}
                    >
                        Default
                    </Button>
                    <Button
                        variant="primary"
                        link="/"
                        icon={{
                            width: 24,
                            source: home_icon,
                            placement: "left",
                        }}
                    >
                        Primary
                    </Button>
                    <Button
                        variant="secondary"
                        link="/"
                        icon={{
                            width: 24,
                            source: home_icon,
                            placement: "left",
                        }}
                    >
                        Secondary
                    </Button>
                </ButtonBox>
            </Collection>
        </Collection>
    );
};
