import { FC } from "react";
import { Collection } from "./Collection";
import { ButtonBox } from "@/components/ButtonBox/ButtonBox";
import { StateButton } from "@/components/StateButton/StateButton";
import { useMockMutation } from "@/hooks/useMockMutation";

export const StateButtonCollection: FC = () => {
    const mutationDefault = useMockMutation();
    const mutationPrimary = useMockMutation();
    const mutationSecondary = useMockMutation();

    return (
        <Collection title="State Button Component">
            <ButtonBox>
                <StateButton
                    className="min-w-40"
                    variant="default"
                    {...mutationDefault}
                    onClick={(_e) => mutationDefault.mutateAsync()}
                >
                    Default
                </StateButton>
                <StateButton
                    className="min-w-40"
                    variant="primary"
                    {...mutationPrimary}
                    onClick={(_e) => mutationPrimary.mutateAsync()}
                >
                    Primary
                </StateButton>
                <StateButton
                    className="min-w-40"
                    variant="secondary"
                    {...mutationSecondary}
                    onClick={(_e) => mutationSecondary.mutateAsync()}
                >
                    Secondary
                </StateButton>
            </ButtonBox>
        </Collection>
    );
};
