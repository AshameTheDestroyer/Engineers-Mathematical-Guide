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
                "perspective-distant",
                doesShowAvatar && "[&>div]:rotate-y-180",
                className
            )}
        >
            <div
                className="border-primary-dark border-3 bg-primary-normal transform-3d perspective-distant relative cursor-pointer rounded-full duration-500"
                onClick={() =>
                    setDoesShowAvatar((doesShowAvatar) => !doesShowAvatar)
                }
            >
                <Image
                    className="border-3 border-primary-dark bg-primary-normal backface-hidden absolute inset-0 h-full w-full scale-[0.97] rounded-full"
                    source={profile_dummy_data.avatar}
                    alternative={`Image of ${profile_dummy_data.name}'s Profile.`}
                />
                <Image
                    className="border-3 border-primary-dark bg-primary-normal backface-hidden rotate-y-180 absolute inset-0 h-full w-full scale-[0.97] rounded-full"
                    source={profile_dummy_data.personalImage}
                    alternative={`Image of ${profile_dummy_data.name}'s Profile.`}
                />
            </div>
        </Flexbox>
    );
};
