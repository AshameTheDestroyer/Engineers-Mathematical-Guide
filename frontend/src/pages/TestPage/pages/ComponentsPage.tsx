import { FC } from "react";
import { Button } from "@/components/Button/Button";
import { Collection } from "../components/Collection";
import { ButtonBox } from "@/components/ButtonBox/ButtonBox";

import arrow_icon from "@icons/arrow.svg";

export const ComponentsPage: FC = () => {
    return (
        <div className="flex flex-col gap-8">
            <Collection title="Button">
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
            </Collection>
        </div>
    );
};
