import { FC, PropsWithChildren } from "react";
import { Image } from "@/components/Image/Image";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { FlippableContainer } from "@/components/FlippableContainer/FlippableContainer";

import profile_dummy_data from "@data/profile.dummy.json";

export type ProfileAvatarProps = ChildlessComponentProps<HTMLDivElement>;

export const ProfileAvatar: FC<ProfileAvatarProps> = ({
    id,
    ref,
    className,
}) => {
    const Container = (props: PropsWithChildren) => (
        <div className="overflow-hidden rounded-full shadow-[0_0_0_3px_var(--color-primary-dark),0_0_0_9px_var(--color-primary-normal),0_0_0_12px_var(--color-primary-dark)]">
            {props.children}
        </div>
    );

    return (
        <FlippableContainer
            id={id}
            ref={ref}
            className={className}
            flipType="click"
            frontChild={
                <Container>
                    <Image
                        source={profile_dummy_data.avatar}
                        alternative={`Avatar of ${profile_dummy_data.name}'s Profile.`}
                    />
                </Container>
            }
            backChild={
                <Container>
                    <Image
                        source={profile_dummy_data.personalImage}
                        alternative={`Personal Image of ${profile_dummy_data.name}'s Profile.`}
                    />
                </Container>
            }
        />
    );
};
