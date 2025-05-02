import { FC } from "react";
import { Collection } from "./Collection";
import { useMockMutation } from "@/hooks/useMockMutation";
import { ButtonBox } from "@/components/ButtonBox/ButtonBox";
import { StateButton } from "@/components/StateButton/StateButton";
import { useToast } from "@/components/ToastProvider/ToastProvider";

export const StateButtonCollection: FC = () => {
    const { Alert } = useToast();
    const onError = () => Alert("Error", { type: "error" });
    const onSuccess = () => Alert("Success", { type: "success" });

    const mutationDefault = useMockMutation({ onError, onSuccess });
    const mutationPrimary = useMockMutation({ onError, onSuccess });
    const mutationSecondary = useMockMutation({ onError, onSuccess });

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
