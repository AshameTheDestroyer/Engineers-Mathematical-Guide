import { FC } from "react";
import { Collection } from "./Collection";
import { ButtonBox } from "@/components/ButtonBox/ButtonBox";
import {
    IconButton,
    IconButtonProps,
} from "@/components/IconButton/IconButton";

import cog_icon from "@icons/cog.svg";
import user_icon from "@icons/user.svg";
import home_icon from "@icons/home.svg";

export const IconButtonCollection: FC = () => {
    const cogIcon: IconButtonProps["icon"] = {
        source: cog_icon,
    };

    const userIcon: IconButtonProps["icon"] = {
        width: 32,
        height: 32,
        source: user_icon,
        className: "-m-2",
    };

    const homeIcon: IconButtonProps["icon"] = {
        source: home_icon,
    };

    return (
        <Collection title="Icon Button Component">
            <Collection title="Normal" inner>
                <ButtonBox>
                    <IconButton variant="default" icon={cogIcon} />
                    <IconButton variant="primary" icon={cogIcon} />
                    <IconButton variant="secondary" icon={cogIcon} />
                </ButtonBox>
            </Collection>
            <Collection title="Thick" inner>
                <ButtonBox>
                    <IconButton variant="default" isThick icon={userIcon} />
                    <IconButton variant="primary" isThick icon={userIcon} />
                    <IconButton variant="secondary" isThick icon={userIcon} />
                </ButtonBox>
            </Collection>
            <Collection title="Linked" inner>
                <ButtonBox>
                    <IconButton variant="default" link="/" icon={homeIcon} />
                    <IconButton variant="primary" link="/" icon={homeIcon} />
                    <IconButton variant="secondary" link="/" icon={homeIcon} />
                </ButtonBox>
            </Collection>
        </Collection>
    );
};
