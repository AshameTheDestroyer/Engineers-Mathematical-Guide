import { FC } from "react";
import { UsersDisplay } from "./UsersDisplay";
import { UserDTO } from "@/schemas/UserSchema";
import { Button } from "@/components/Button/Button";
import {
    SearchResultDisplay,
    SearchResultDisplayProps,
} from "@/components/SearchResultDisplay/SearchResultDisplay";

export type RelatedUsersDisplayProps = QueryProps<
    Array<UserDTO> | undefined
> & {
    skeletonArray: Array<Partial<UserDTO>>;
    emptyDisplay: Pick<SearchResultDisplayProps, "title" | "paragraph">;
    errorDisplay: Pick<SearchResultDisplayProps, "title" | "paragraph"> & {
        button: string;
    };
};

export const RelatedUsersDisplay: FC<RelatedUsersDisplayProps> = ({
    isError,
    isLoading,
    isSuccess,
    errorDisplay,
    emptyDisplay,
    skeletonArray,
    refetch: Refetch,
    data: relatedUsers,
}) => {
    if (isLoading || relatedUsers == null) {
        return <UsersDisplay isSkeleton users={skeletonArray} />;
    }

    if (isError) {
        return (
            <SearchResultDisplay
                className="place-items-start!"
                {...errorDisplay}
                iconType="error"
                buttons={
                    <Button onClick={(_e) => Refetch()}>
                        {errorDisplay.button}
                    </Button>
                }
            />
        );
    }

    if (isSuccess && relatedUsers.length == 0) {
        return (
            <SearchResultDisplay
                className="place-items-start! [&>h2.typography]:text-lg [&>h2.typography]:font-normal"
                iconType="none"
                {...emptyDisplay}
            />
        );
    }

    return <UsersDisplay users={relatedUsers} />;
};
