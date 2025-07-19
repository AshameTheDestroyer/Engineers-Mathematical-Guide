import { FC } from "react";
import { Image } from "@/components/Image/Image";
import { useOutlines } from "@/hooks/useOutlines";
import { DetailedUserDTO } from "@/schemas/UserSchema";
import { ComponentProps } from "@/types/ComponentProps";
import { useThemeMode } from "@/components/ThemeModeProvider/ThemeModeProvider";
import { FlippableContainer } from "@/components/FlippableContainer/FlippableContainer";

import default_avatar from "@images/default_avatar.png";
import default_personal_image from "@images/default_personal_image.png";

export type ProfileAvatarProps = {
    user: DetailedUserDTO;
} & ComponentProps<HTMLDivElement>;

export const ProfileAvatar: FC<ProfileAvatarProps> = ({
    id,
    ref,
    user,
    children,
    className,
}) => {
    const { isDarkThemed } = useThemeMode();

    const primaryOutlines = useOutlines([
        "3px var(--color-primary-dark)",
        "6px var(--color-primary-normal)",
        "3px var(--color-primary-dark)",
    ]);

    const tertiaryOutlines = useOutlines([
        `3px var(--color-tertiary-${isDarkThemed ? "normal" : "dark"})`,
        `6px var(--color-tertiary-${isDarkThemed ? "light" : "normal"})`,
        `3px var(--color-tertiary-${isDarkThemed ? "normal" : "dark"})`,
    ]);

    return (
        <FlippableContainer
            id={id}
            ref={ref}
            className={className}
            flipType="click"
            frontChild={
                <Image
                    className="overflow-visible! [&>img]:bg-background-normal [&>img]:rounded-full"
                    source={user.avatar ?? default_avatar}
                    alternative={`Avatar of ${user.name}'s Profile.`}
                    style={{
                        boxShadow: primaryOutlines,
                        filter:
                            user.avatar == null
                                ? `hue-rotate(${~~(Math.random() * 360)}deg)`
                                : "",
                    }}
                />
            }
            backChild={
                <Image
                    className="overflow-visible! [&>img]:bg-background-normal [&>img]:rounded-full"
                    source={user["personal-image"] ?? default_personal_image}
                    alternative={`Personal Image of ${user.name}'s Profile.`}
                    style={{
                        boxShadow: tertiaryOutlines,
                        filter:
                            user["personal-image"] == null
                                ? `hue-rotate(${~~(Math.random() * 360)}deg)`
                                : "",
                    }}
                />
            }
        >
            {children}
        </FlippableContainer>
    );
};
