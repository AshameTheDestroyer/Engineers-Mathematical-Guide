import { FC } from "react";
import { Image } from "@/components/Image/Image";
import { useOutlines } from "@/hooks/useOutlines";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { FlippableContainer } from "@/components/FlippableContainer/FlippableContainer";

import profile_dummy_data from "@data/profile.dummy.json";

export type ProfileAvatarProps = ChildlessComponentProps<HTMLDivElement>;

export const ProfileAvatar: FC<ProfileAvatarProps> = ({
    id,
    ref,
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
                <div
                    className="overflow-hidden rounded-full"
                    style={{ boxShadow: outlines }}
                >
                    <Image
                        source={profile_dummy_data.avatar}
                        alternative={`Avatar of ${profile_dummy_data.name}'s Profile.`}
                    />
                </div>
            }
            backChild={
                <div
                    className="overflow-hidden rounded-full"
                    style={{ boxShadow: outlines }}
                >
                    <Image
                        source={profile_dummy_data.personalImage}
                        alternative={`Personal Image of ${profile_dummy_data.name}'s Profile.`}
                    />
                </div>
            }
        />
    );
};
