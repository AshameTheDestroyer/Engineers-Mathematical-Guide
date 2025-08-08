import { FC } from "react";
import { twJoin } from "tailwind-merge";
import { useNavigate } from "react-router-dom";
import { ModuleDTO } from "@/schemas/ModuleSchema";
import { Button } from "@/components/Button/Button";
import { EnrollmentDTO } from "@/schemas/EnrollmentSchema";
import { DISCOVER_ROUTES } from "@/routes/discover.routes";
import { Typography } from "@/components/Typography/Typography";
import { ProgressBar } from "@/components/ProgressBar/ProgressBar";
import { useScreenSize } from "@/components/ScreenSizeProvider/ScreenSizeProvider";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import flag_icon from "@icons/flag.svg";
import check_icon from "@icons/variant_success.svg";

export type ModuleCardProps = {
    courseID: string;
    module: ModuleDTO;
    enrollment: EnrollmentDTO | undefined;
};

export const ModuleCard: FC<ModuleCardProps> = ({
    module,
    courseID,
    enrollment,
}) => {
    const Navigate = useNavigate();
    const { direction } = useLocalization();
    const { orientation } = useScreenSize();

    const modulesEnrollments = Object.fromEntries(
        (enrollment?.progress ?? []).map((progress) => [
            progress.module,
            { ...Object.omit(progress, "module") },
        ])
    );

    const haveIEnrolled =
        enrollment != null && modulesEnrollments[module.id] != null;

    const haveIFinished =
        modulesEnrollments[module.id] != null &&
        modulesEnrollments[module.id]["finished-lessons"] ==
            module["lesson-count"] &&
        modulesEnrollments[module.id].grade != null;

    return (
        <figure
            className={twJoin(
                "bg-background-normal relative flex flex-col gap-4 rounded-lg p-6",
                orientation == "landscape" && "min-w-[20rem]",
                orientation == "landscape" &&
                    haveIFinished &&
                    (direction == "ltr" ? "mr-6" : "ml-6")
            )}
        >
            {haveIFinished && (
                <span
                    className={twJoin(
                        direction == "ltr"
                            ? "right-4 translate-x-1/2"
                            : "left-4 -translate-x-1/2",
                        "z-1 bg-vibrant-green-normal border-vibrant-green-dark absolute top-4 flex aspect-square min-w-[calc(5ch+1rem)] -translate-y-1/2 place-content-center place-items-center rounded-full border-2 text-center font-bold text-white"
                    )}
                >
                    <p className="scale-80">
                        {Intl.NumberFormat("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        }).format(modulesEnrollments[module.id].grade!)}
                        %
                    </p>
                </span>
            )}
            <Typography
                className={twJoin(
                    direction == "ltr" ? "mr-12" : "ml-12",
                    "overflow-hidden text-ellipsis whitespace-nowrap text-nowrap text-lg font-bold"
                )}
                dir="ltr"
                variant="h3"
            >
                {module.title}
            </Typography>
            <Typography className="grow" variant="p" dir="ltr">
                {module.description}
            </Typography>

            {haveIEnrolled && (
                <ProgressBar
                    className="my-4 w-[calc(100%-3rem)] place-self-center"
                    minimum={0}
                    maximum={module["lesson-count"]}
                    value={modulesEnrollments[module.id]["finished-lessons"]}
                    variant={
                        haveIFinished
                            ? "success"
                            : haveIEnrolled
                              ? "secondary"
                              : "default"
                    }
                    checkpoints={[
                        modulesEnrollments[module.id]["finished-lessons"],
                        {
                            value: 0,
                            icon: { source: flag_icon },
                        },
                        !haveIFinished
                            ? module["lesson-count"]
                            : {
                                  icon: {
                                      source: check_icon,
                                  },
                                  value: module["lesson-count"],
                              },
                    ]}
                />
            )}
            <Button
                className={twJoin(haveIEnrolled && "font-bold")}
                variant={
                    haveIFinished
                        ? "success"
                        : haveIEnrolled
                          ? "secondary"
                          : "default"
                }
                onClick={(_e) =>
                    Navigate(
                        DISCOVER_ROUTES.base.routes.moduleID.MapVariables({
                            courseID,
                            moduleID: module.id.replace(/^[^-]*-/, ""),
                        })
                    )
                }
            >
                {haveIFinished
                    ? "Review"
                    : haveIEnrolled
                      ? "Continue"
                      : "Open Module"}
            </Button>
        </figure>
    );
};
