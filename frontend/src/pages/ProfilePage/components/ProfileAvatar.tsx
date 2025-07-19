import { FC } from "react";
import { Image } from "@/components/Image/Image";
import { useOutlines } from "@/hooks/useOutlines";
import { DetailedUserDTO } from "@/schemas/UserSchema";
import { ComponentProps } from "@/types/ComponentProps";
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
    const outlines = useOutlines([
        "3px var(--color-primary-dark)",
        "6px var(--color-primary-normal)",
        "3px var(--color-primary-dark)",
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
                    style={{ boxShadow: outlines }}
                    source={user.avatar ?? default_avatar}
                    alternative={`Avatar of ${user.name}'s Profile.`}
                />
            }
            backChild={
                <Image
                    className="overflow-visible! [&>img]:bg-background-normal [&>img]:rounded-full"
                    style={{ boxShadow: outlines }}
                    source={user["personal-image"] ?? default_personal_image}
                    alternative={`Personal Image of ${user.name}'s Profile.`}
                />
            }
        >
            {children}
        </FlippableContainer>
    );
};
