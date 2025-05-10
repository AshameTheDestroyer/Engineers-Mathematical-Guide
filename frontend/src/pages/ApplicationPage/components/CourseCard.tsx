import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { useShadow } from "@/hooks/useShadow";
import { Icon } from "@/components/Icon/Icon";
import { Image } from "@/components/Image/Image";
import { CourseDTO } from "@/schemas/CourseSchema";
import { Rating } from "@/components/Rating/Rating";
import { Typography } from "@/components/Typography/Typography";
import { ChildlessComponentProps } from "@/types/ComponentProps";

import user_icon from "@icons/user.svg";

export type CourseCardProps = ChildlessComponentProps<HTMLElement> & {
    course: CourseDTO;
};

export const CourseCard: FC<CourseCardProps> = ({
    id,
    ref,
    course,
    className,
}) => {
    const shadow = useShadow();

    return (
        <article
            id={id}
            ref={ref}
            className={twMerge(
                "bg-background-normal group relative isolate cursor-pointer overflow-hidden rounded-2xl p-8 text-white transition duration-200 hover:scale-105 [&_.typography]:[text-shadow:2px_2px_2.5px_black]",
                className
            )}
            aria-label={course.title}
            role="region"
            style={{ boxShadow: shadow }}
        >
            <Typography className="" variant="p">
                {course.description}
            </Typography>
            <figure className="absolute inset-0 z-[-1]">
                <footer className="absolute inset-8 top-auto z-[1] flex flex-col gap-2 overflow-hidden">
                    <div className="flex place-items-center gap-2">
                        <Icon source={user_icon} width={20} height={20} />
                        <Typography
                            className="overflow-hidden text-ellipsis whitespace-nowrap text-nowrap"
                            variant="p"
                        >
                            {Intl.NumberFormat("en-US", {
                                notation: "compact",
                                compactDisplay: "short",
                                maximumFractionDigits: 1,
                            }).format(course["enrollment-count"]) +
                                " Enrolled Student"}
                        </Typography>
                    </div>
                    <div className="flex place-items-center gap-2">
                        <Typography
                            className="text-vibrant-yellow font-bold"
                            variant="p"
                        >
                            {course.rating}
                        </Typography>
                        <Rating
                            value={course.rating}
                            iconProps={{
                                className:
                                    "drop-shadow-[3px_3px_1px_#0000007c]",
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
                    </div>
                    <Typography
                        className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-nowrap text-xl font-bold [text-shadow:2px_2px_5px_black!important]"
                        variant="figcaption"
                    >
                        {course.title}
                    </Typography>
                </footer>
                <Image
                    className="absolute inset-0 [&>img]:h-full [&>img]:object-cover"
                    source={course.image}
                    placeholder="Loading..."
                    alternative="A calculator"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/75 to-100%" />
            </figure>
        </article>
    );
};
