import { FC } from "react";
import { useMain } from "@/contexts";
import { twMerge } from "tailwind-merge";
import { useParams } from "react-router-dom";
import { Icon } from "@/components/Icon/Icon";
import { Modal } from "@/components/Modal/Modal";
import { Locale } from "@/components/Locale/Locale";
import { Button } from "@/components/Button/Button";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { DISCOVER_ROUTES } from "@/routes/discover.routes";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { useExamination } from "@/components/ExaminationProvider/ExaminationProvider";

import warning_icon from "@icons/warning.svg";

import locales from "@localization/modules_page.json";

export type ExaminationDisclaimerModalProps =
    ChildlessComponentProps<HTMLDivElement>;

export const ExaminationDisclaimerModal: FC<
    ExaminationDisclaimerModalProps
> = ({ id, ref, className }) => {
    const { myUser } = useMain();
    const { isOnline } = useNetworkStatus();
    const { examinationInformation } = useExamination();

    const { courseID, moduleID, lessonID } =
        useParams<keyof typeof DISCOVER_ROUTES.base.routes>();

    return (
        <Modal
            id={id}
            ref={ref}
            className={twMerge(
                "bg-background-light gap-4 max-sm:w-[90vw]",
                className
            )}
            setIsOpen={() => {}}
            isOpen={
                isOnline &&
                myUser != null &&
                examinationInformation != null &&
                [
                    courseID == null,
                    moduleID == null,
                    lessonID == null,
                    examinationInformation.courseID != courseID,
                    examinationInformation.moduleID != moduleID,
                    examinationInformation.lessonID != lessonID,
                ].some(Boolean)
            }
        >
            <Flexbox gap="4">
                <Icon source={warning_icon} />
                <Locale
                    className="text-lg font-bold"
                    variant="h1"
                    gender={myUser?.gender ?? "male"}
                >
                    {locales.lessons.examination.modals.disclaimer.title}
                </Locale>
            </Flexbox>
            <Locale
                className="max-w-[16rem]"
                variant="p"
                gender={myUser?.gender ?? "male"}
            >
                {locales.lessons.examination.modals.disclaimer.paragraph}
            </Locale>
            <Button
                className="w-full"
                link={
                    DISCOVER_ROUTES.base.routes.lessonID.MapVariables({
                        ...examinationInformation!,
                    }) +
                    `?tab=${(examinationInformation?.["last-tab"] ?? 0) + 1}`
                }
            >
                <Locale>
                    {
                        locales.lessons.examination.modals.disclaimer.buttons[
                            "go-to-exam"
                        ]
                    }
                </Locale>
            </Button>
        </Modal>
    );
};
