import { FC } from "react";
import { Image } from "@/components/Image/Image";
import { useOutlines } from "@/hooks/useOutlines";
import { ComponentProps } from "@/types/ComponentProps";
import { FlippableContainer } from "@/components/FlippableContainer/FlippableContainer";

import profile_dummy_data from "@data/profile.dummy.json";

export type ProfileAvatarProps = ComponentProps<HTMLDivElement>;

export const ProfileAvatar: FC<ProfileAvatarProps> = ({
    id,
    ref,
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
                    source={profile_dummy_data.avatar}
                    alternative={`Avatar of ${profile_dummy_data.name}'s Profile.`}
                />
            }
            backChild={
                <Image
                    className="overflow-visible! [&>img]:rounded-full"
                    style={{ boxShadow: outlines }}
                    source={profile_dummy_data.personalImage}
                    alternative={`Personal Image of ${profile_dummy_data.name}'s Profile.`}
                />
            }
        >
            {children}
        </FlippableContainer>
    );
};
