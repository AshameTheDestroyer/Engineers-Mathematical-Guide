import { FC } from "react";
import { UserCard } from "./UserCard";
import { twMerge } from "tailwind-merge";
import { UserDTO } from "@/schemas/UserSchema";
import { ChildlessComponentProps } from "@/types/ComponentProps";

export type UsersDisplayProps = ChildlessComponentProps<HTMLDivElement> &
    Either<
        {
            isSkeleton?: false;
            users: Array<UserDTO>;
        },
        {
            isSkeleton: true;
            users: Array<Partial<UserDTO> | undefined>;
        }
    >;

export const UsersDisplay: FC<UsersDisplayProps> = ({
    id,
    ref,
    users,
    className,
    isSkeleton,
}) => {
    return (
        <div
            id={id}
            ref={ref}
            className={twMerge(
                "grid grow grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-8",
                className
            )}
        >
            {users.map((user, i) => (
                <UserCard
                    key={isSkeleton ? i : user!.username}
                    isSkeleton={isSkeleton}
                    user={user as UserDTO}
                />
            ))}
        </div>
    );
};
