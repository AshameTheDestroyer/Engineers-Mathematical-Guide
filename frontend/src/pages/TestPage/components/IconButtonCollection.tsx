import { FC } from "react";
import { Collection } from "./Collection";
import { ButtonBox } from "@/components/ButtonBox/ButtonBox";
import {
    IconButton,
    IconButtonProps,
} from "@/components/IconButton/IconButton";

import cog_icon from "@icons/cog.svg";
import user_icon from "@icons/user.svg";
import star_icon from "@icons/star.svg";
import home_icon from "@icons/home.svg";
import epic_icon from "@icons/epic.svg";
import error_icon from "@icons/error.svg";
import success_icon from "@icons/success.svg";
import warning_icon from "@icons/warning.svg";
import information_icon from "@icons/information.svg";

export const IconButtonCollection: FC = () => {
    const cogIcon: IconButtonProps["icon"] = {
        source: cog_icon,
    };

    const userIcon: IconButtonProps["icon"] = {
        source: user_icon,
        className: "scale-150",
    };

    const starIcon: IconButtonProps["icon"] = {
        source: star_icon,
    };

    const homeIcon: IconButtonProps["icon"] = {
        source: home_icon,
    };

    return (
        <Collection title="Icon Button Component">
            <Collection
                title="Normal"
                typography={{ variant: "h2", className: "text-lg" }}
            >
                <ButtonBox>
                    <IconButton variant="default" icon={cogIcon} />
                    <IconButton variant="primary" icon={cogIcon} />
                    <IconButton variant="secondary" icon={cogIcon} />
                </ButtonBox>
            </Collection>
            <Collection
                title="Vibrant"
                typography={{ variant: "h2", className: "text-lg" }}
            >
                <ButtonBox>
                    <IconButton
                        variant="information"
                        icon={{ source: information_icon }}
                    />
                    <IconButton
                        variant="warning"
                        icon={{ source: warning_icon }}
                    />
                    <IconButton
                        variant="success"
                        icon={{ source: success_icon }}
                    />
                    <IconButton variant="error" icon={{ source: error_icon }} />
                    <IconButton variant="epic" icon={{ source: epic_icon }} />
                </ButtonBox>
            </Collection>
            <Collection
                title="Thickness"
                typography={{ variant: "h2", className: "text-lg" }}
            >
                <ButtonBox>
                    <IconButton
                        icon={userIcon}
                        variant="default"
                        thickness="thick"
                    />
                    <IconButton
                        icon={userIcon}
                        variant="primary"
                        thickness="thick"
                    />
                    <IconButton
                        icon={userIcon}
                        variant="secondary"
                        thickness="thick"
                    />
                </ButtonBox>
            </Collection>
            <Collection
                title="Thinness"
                typography={{ variant: "h2", className: "text-lg" }}
            >
                <ButtonBox>
                    <IconButton
                        icon={starIcon}
                        variant="default"
                        thickness="thin"
                    />
                    <IconButton
                        icon={starIcon}
                        variant="primary"
                        thickness="thin"
                    />
                    <IconButton
                        icon={starIcon}
                        variant="secondary"
                        thickness="thin"
                    />
                </ButtonBox>
            </Collection>
            <Collection
                title="Linked"
                typography={{ variant: "h2", className: "text-lg" }}
            >
                <ButtonBox>
                    <IconButton variant="default" link="/" icon={homeIcon} />
                    <IconButton variant="primary" link="/" icon={homeIcon} />
                    <IconButton variant="secondary" link="/" icon={homeIcon} />
                </ButtonBox>
            </Collection>
        </Collection>
    );
};
