import { FC, useEffect } from "react";
import { Icon, IconProps } from "../Icon/Icon";
import { twJoin, twMerge } from "tailwind-merge";
import { ChildlessComponentProps } from "@/types/ComponentProps";

export type ProgressBarProps = ChildlessComponentProps<HTMLDivElement> & {
    value: number;
    maximum?: number;
    minimum?: number;
    variant?: Variant;
    onComplete?: () => void;
    onProgress?: (value: number) => void;
    checkpoints?: Array<
        | number
        | { value: number; label: string }
        | { value: number; icon: IconProps }
    >;
};

export const ProgressBar: FC<ProgressBarProps> = ({
    id,
    ref,
    value,
    className,
    onProgress,
    onComplete,
    checkpoints,
    minimum = 0,
    maximum = 100,
    variant = "primary",
}) => {
    if (minimum >= maximum) {
        throw new Error("Minimum value must be less than maximum value.");
    }

    if (value < minimum || value > maximum) {
        throw new Error(
            "Value is out of bounds of minimum value and maximum value."
        );
    }

    function GetPercentage(value: number) {
        return ((value - minimum) / (maximum - minimum)) * 100;
    }

    useEffect(() => {
        onProgress?.(value);

        if (value == maximum) {
            onComplete?.();
        }
    }, [value, onProgress, onComplete]);

    const variantClassNames: VariantClassNames = {
        default: {
            idle: "[&_[data-bar],&_[data-checkpoint]]:bg-tertiary-light [&_[data-bar],&_[data-checkpoint]]:border-tertiary-dark border-tertiary-dark bg-tertiary-normal-hover text-tertiary-normal [&_[data-reached=false]]:bg-tertiary-normal-hover [&_[data-reached=false]]:text-tertiary-dark",
        },
        primary: {
            idle: "[&_[data-bar],&_[data-checkpoint]]:bg-primary-normal [&_[data-bar],&_[data-checkpoint]]:border-primary-darker border-primary-darker bg-primary-dark-hover text-primary-light [&_[data-reached=false]]:bg-primary-dark-hover [&_[data-reached=false]]:text-primary-dark-active",
        },
        secondary: {
            idle: "[&_[data-bar],&_[data-checkpoint]]:bg-secondary-normal [&_[data-bar],&_[data-checkpoint]]:border-secondary-darker border-secondary-darker bg-secondary-dark-hover text-primary-light [&_[data-reached=false]]:bg-secondary-dark-hover [&_[data-reached=false]]:text-secondary-dark-active",
        },
        information: {
            idle: "[&_[data-bar],&_[data-checkpoint]]:bg-vibrant-blue-normal [&_[data-bar],&_[data-checkpoint]]:border-vibrant-blue-light border-vibrant-blue-light bg-vibrant-blue-dark text-white [&_[data-reached=false]]:bg-vibrant-blue-dark [&_[data-reached=false]]:text-white/50",
        },
        warning: {
            idle: "[&_[data-bar],&_[data-checkpoint]]:bg-vibrant-yellow-normal [&_[data-bar],&_[data-checkpoint]]:border-vibrant-yellow-light border-vibrant-yellow-light bg-vibrant-yellow-dark text-white [&_[data-reached=false]]:bg-vibrant-yellow-dark [&_[data-reached=false]]:text-white/50",
        },
        success: {
            idle: "[&_[data-bar],&_[data-checkpoint]]:bg-vibrant-green-normal [&_[data-bar],&_[data-checkpoint]]:border-vibrant-green-light border-vibrant-green-light bg-vibrant-green-dark text-white [&_[data-reached=false]]:bg-vibrant-green-dark [&_[data-reached=false]]:text-white/50",
        },
        error: {
            idle: "[&_[data-bar],&_[data-checkpoint]]:bg-vibrant-red-normal [&_[data-bar],&_[data-checkpoint]]:border-vibrant-red-light border-vibrant-red-light bg-vibrant-red-dark text-white [&_[data-reached=false]]:bg-vibrant-red-dark [&_[data-reached=false]]:text-white/50",
        },
        epic: {
            idle: "[&_[data-bar],&_[data-checkpoint]]:bg-vibrant-purple-normal [&_[data-bar],&_[data-checkpoint]]:border-vibrant-purple-light border-vibrant-purple-light bg-vibrant-purple-dark text-white [&_[data-reached=false]]:bg-vibrant-purple-dark [&_[data-reached=false]]:text-white/50",
        },
    };

    return (
        <div
            id={id}
            ref={ref}
            role="progressbar"
            className={twMerge(
                variantClassNames[variant]["idle"],
                "relative flex h-5 w-full rounded-full border-2",
                className
            )}
        >
            <div className="-m-[2px] box-content w-full overflow-hidden rounded-full border-2 border-transparent">
                <div
                    data-bar
                    role="progressbar"
                    className={twJoin(
                        value == minimum ? "invisible" : "",
                        "-m-[2px] box-content h-full rounded-full border-2 transition-all duration-300"
                    )}
                    style={{ width: `${GetPercentage(value)}%` }}
                />
            </div>
            {checkpoints?.map((checkpoint, i) => {
                const checkpointValue =
                    typeof checkpoint == "number"
                        ? checkpoint
                        : checkpoint.value;

                if (checkpointValue < minimum || checkpointValue > maximum) {
                    throw new Error(
                        "Checkpoints are out of bounds of minimum value and maximum value."
                    );
                }

                return (
                    <div
                        key={i}
                        data-checkpoint
                        data-reached={value >= checkpointValue}
                        className="absolute top-1/2 flex aspect-square w-[calc(3ch+var(--spacing)*4)] -translate-x-[calc(50%-2px)] -translate-y-1/2 place-content-center place-items-center rounded-full border-2 font-bold"
                        style={{ left: `${GetPercentage(checkpointValue)}%` }}
                    >
                        {typeof checkpoint != "number" &&
                        "icon" in checkpoint ? (
                            <Icon width={24} height={24} {...checkpoint.icon} />
                        ) : typeof checkpoint != "number" &&
                          "label" in checkpoint ? (
                            <p>{checkpoint.label}</p>
                        ) : (
                            checkpointValue
                        )}
                    </div>
                );
            })}
        </div>
    );
};
