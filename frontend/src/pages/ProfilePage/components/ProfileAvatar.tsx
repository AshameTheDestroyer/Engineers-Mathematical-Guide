import { FC, useState } from "react";
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
    const [doesShowAvatar, setDoesShowAvatar] = useState(true);

    return (
        <Flexbox
            id={id}
            ref={ref}
            className={twMerge(
                "bg-primary-normal border-primary-dark border-3 cursor-pointer overflow-hidden rounded-full p-2",
                className
            )}
            onClick={() =>
                setDoesShowAvatar((doesShowAvatar) => !doesShowAvatar)
            }
        >
            <Image
                className="bg-background-normal border-3 rounded-full border-[inherit]"
                source={
                    doesShowAvatar
                        ? profile_dummy_data.avatar
                        : profile_dummy_data.personalImage
                }
                alternative={`Image of ${profile_dummy_data.name}'s Profile.`}
            />
        </Flexbox>
    );
};
