import { FC } from "react";
import { Image } from "@/components/Image/Image";
import { useOutlines } from "@/hooks/useOutlines";
import { DetailedUserDTO } from "@/schemas/UserSchema";
import { ComponentProps } from "@/types/ComponentProps";
import { FlippableContainer } from "@/components/FlippableContainer/FlippableContainer";

export type ProfileAvatarProps = {
    myUser: DetailedUserDTO;
} & ComponentProps<HTMLDivElement>;

export const ProfileAvatar: FC<ProfileAvatarProps> = ({
    id,
    ref,
    myUser,
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
                    className="overflow-visible! [&>img]:rounded-full"
                    style={{ boxShadow: outlines }}
                    source={myUser.avatar}
                    alternative={`Avatar of ${myUser.name}'s Profile.`}
                />
            }
            backChild={
                <Image
                    className="overflow-visible! [&>img]:rounded-full"
                    style={{ boxShadow: outlines }}
                    source={myUser["personal-image"]}
                    alternative={`Personal Image of ${myUser.name}'s Profile.`}
                />
            }
        >
            {children}
        </FlippableContainer>
    );
};
