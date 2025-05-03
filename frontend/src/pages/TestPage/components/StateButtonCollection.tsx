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
                    onClick={(_e) => mutationDefault.mutateAsync()}
                    {...Object.pick(
                        mutationDefault,
                        "reset",
                        "isPending",
                        "isError",
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
                        "isPending",
                        "isError",
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
                        "isPending",
                        "isError",
                        "isSuccess"
                    )}
                >
                    Secondary
                </StateButton>
            </ButtonBox>
        </Collection>
    );
};
