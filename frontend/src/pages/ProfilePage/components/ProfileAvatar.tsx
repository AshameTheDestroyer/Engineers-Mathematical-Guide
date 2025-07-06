import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { Image } from "@/components/Image/Image";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { ChildlessComponentProps } from "@/types/ComponentProps";

import profile_dummy_data from "@data/profile.dummy.json";

export type ProfileAvatarProps = ChildlessComponentProps<HTMLDivElement>;

export const ProfileAvatar: FC<ProfileAvatarProps> = ({
    id,
    ref,
    className,
}) => {
    return (
        <Flexbox
            id={id}
            ref={ref}
            className={twMerge(
                "bg-primary-normal border-primary-dark border-3 overflow-hidden rounded-full p-2",
                className
            )}
        >
            <Image
                className="bg-background-normal border-3 rounded-full border-[inherit]"
                source={profile_dummy_data.avatar}
                alternative={`Image of ${profile_dummy_data.name}'s Profile.`}
            />
        </Flexbox>
    );
};
