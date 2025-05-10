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

    const mutationDefault = useMockMutation({
        mutationKey: ["state-button-default"],
        onError,
        onSuccess,
    });
    const mutationPrimary = useMockMutation({
        mutationKey: ["state-button-primary"],
        onError,
        onSuccess,
    });
    const mutationSecondary = useMockMutation({
        mutationKey: ["state-button-secondary"],
        onError,
        onSuccess,
    });

    return (
        <Collection title="State Button Component">
            <ButtonBox>
                <StateButton
                    className="min-w-40"
                    variant="default"
                    onClick={(_e) => mutationDefault.mutateAsync()}
                    {...Object.pick(
                        mutationDefault,
                        "reset",
                        "isError",
                        "isPending",
                        "isSuccess"
                    )}
                >
                    Default
                </StateButton>
                <StateButton
                    className="min-w-40"
                    variant="primary"
                    onClick={(_e) => mutationPrimary.mutateAsync()}
                    {...Object.pick(
                        mutationPrimary,
                        "reset",
                        "isError",
                        "isPending",
                        "isSuccess"
                    )}
                >
                    Primary
                </StateButton>
                <StateButton
                    className="min-w-40"
                    variant="secondary"
                    onClick={(_e) => mutationSecondary.mutateAsync()}
                    {...Object.pick(
                        mutationSecondary,
                        "reset",
                        "isError",
                        "isPending",
                        "isSuccess"
                    )}
                >
                    Secondary
                </StateButton>
            </ButtonBox>
        </Collection>
    );
};
