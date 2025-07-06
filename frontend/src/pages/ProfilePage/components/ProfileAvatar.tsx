import { FC } from "react";
import { Image } from "@/components/Image/Image";
import { Flexbox } from "@/components/Flexbox/Flexbox";

import profile_dummy_data from "@data/profile.dummy.json";

export const ProfileAvatar: FC = () => {
    return (
        <Flexbox className="bg-primary-normal border-primary-dark border-3 h-full w-full overflow-hidden rounded-full p-2">
            <Image
                className="bg-background-normal border-3 rounded-full border-[inherit]"
                source={profile_dummy_data.avatar}
                alternative={`Image of ${profile_dummy_data.name}'s Profile.`}
            />
        </Flexbox>
    );
};
