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
import variant_epic_icon from "@icons/variant_epic.svg";
import network_error_icon from "@icons/network_error.svg";
import variant_error_icon from "@icons/variant_error.svg";
import variant_success_icon from "@icons/variant_success.svg";
import variant_warning_icon from "@icons/variant_warning.svg";
import variant_information_icon from "@icons/variant_information.svg";

export const IconButtonCollection: FC = () => {
    const cogIcon: IconButtonProps["icon"] = {
        source: cog_icon,
    };

    const networkErrorIcon: IconButtonProps["icon"] = {
        source: network_error_icon,
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
                title="Disabled"
                typography={{ variant: "h2", className: "text-lg" }}
            >
                <ButtonBox>
                    <IconButton
                        disabled
                        variant="default"
                        icon={networkErrorIcon}
                    />
                    <IconButton
                        disabled
                        variant="primary"
                        icon={networkErrorIcon}
                    />
                    <IconButton
                        disabled
                        variant="secondary"
                        icon={networkErrorIcon}
                    />
                </ButtonBox>
            </Collection>
            <Collection
                title="Vibrant"
                typography={{ variant: "h2", className: "text-lg" }}
            >
                <ButtonBox>
                    <IconButton
                        variant="information"
                        icon={{ source: variant_information_icon }}
                    />
                    <IconButton
                        variant="warning"
                        icon={{ source: variant_warning_icon }}
                    />
                    <IconButton
                        variant="success"
                        icon={{ source: variant_success_icon }}
                    />
                    <IconButton
                        variant="error"
                        icon={{ source: variant_error_icon }}
                    />
                    <IconButton
                        variant="epic"
                        icon={{ source: variant_epic_icon }}
                    />
                </ButtonBox>
            </Collection>
            <Collection
                title="Thick"
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
                title="Thin"
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
