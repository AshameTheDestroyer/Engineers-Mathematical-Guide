import { FC } from "react";
import { Icon } from "@/components/Icon/Icon";
import { CourseDTO } from "@/schemas/CourseSchema";
import { Rating } from "@/components/Rating/Rating";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Typography } from "@/components/Typography/Typography";

import user_icon from "@icons/user.svg";

export type CourseSummaryProps = {
    course: CourseDTO;
};

export const CourseSummary: FC<CourseSummaryProps> = ({ course }) => {
    return (
        <Flexbox
            className="absolute inset-8 top-auto z-[1] overflow-hidden"
            gap="2"
            direction="column"
        >
            <Flexbox placeItems="center" gap="2">
                <Icon
                    className="drop-shadow-[3px_3px_1px_#0000007c]"
                    width={20}
                    height={20}
                    source={user_icon}
                />
                <Typography
                    className="overflow-hidden text-ellipsis whitespace-nowrap text-nowrap"
                    variant="p"
                >
                    {Intl.NumberFormat("en-US", {
                        notation: "compact",
                        compactDisplay: "short",
                        maximumFractionDigits: 1,
                    }).format(course["enrollment-count"]) + " Enrolled Student"}
                </Typography>
            </Flexbox>
            <Flexbox placeItems="center" gap="2">
                <Typography
                    className="text-vibrant-yellow-normal min-w-[3ch] text-center font-bold"
                    variant="p"
                >
                    {course.rating}
                </Typography>
                <Rating
                    value={course.rating}
                    iconProps={{
                        className: "drop-shadow-[3px_3px_1px_#0000007c]",
                        width: 20,
                        height: 20,
                        thickness: 0.5,
                        stroke: "black",
                    }}
                />
                <Typography
                    className="overflow-hidden text-ellipsis whitespace-nowrap text-nowrap"
                    variant="p"
                >
                    {Intl.NumberFormat("en-US", {
                        notation: "compact",
                        compactDisplay: "short",
                        maximumFractionDigits: 1,
                    }).format(course["rating-count"]) + " Reviews"}
                </Typography>
            </Flexbox>
            <Typography
                className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-nowrap text-xl font-bold [text-shadow:2px_2px_5px_black!important]"
                variant="figcaption"
            >
                {course.title}
            </Typography>
        </Flexbox>
    );
};
