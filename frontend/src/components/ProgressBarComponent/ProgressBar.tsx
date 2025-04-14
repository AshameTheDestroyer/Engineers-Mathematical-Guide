import React, { useEffect } from "react";

type ProgressBarVariant =
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning";

type ProgressBarProps = {
    value: number;
    minimum?: number;
    maximum: number;
    variant?: ProgressBarVariant;
    onProgress?: (value: number) => void;
    onComplete?: () => void;
};

const ProgressBar: React.FC<ProgressBarProps> = ({
    value,
    minimum = 0,
    maximum,
    variant = "primary",
    onProgress,
    onComplete,
}) => {
    if (minimum >= maximum) {
        throw new Error("Minimum must be less than maximum");
    }

    const clampedValue = Math.max(minimum, Math.min(value, maximum));

    const percentage = ((clampedValue - minimum) / (maximum - minimum)) * 100;

    useEffect(() => {
        onProgress?.(clampedValue);

        if (clampedValue >= maximum) {
            onComplete?.();
        }
    }, [clampedValue, maximum, onProgress, onComplete]);

    const variantColors = {
        primary: "bg-blue-500",
        secondary: "bg-gray-500",
        success: "bg-green-500",
        danger: "bg-red-500",
        warning: "bg-yellow-500",
    };

    return (
        <div className="h-4 w-full rounded-full bg-gray-200">
            <div
                className={`${variantColors[variant]} h-4 rounded-full transition-all duration-300 ease-out`}
                style={{ width: `${percentage}%` }}
                role="progressbar"
                aria-valuenow={clampedValue}
                aria-valuemin={minimum}
                aria-valuemax={maximum}
            />
        </div>
    );
};

export default ProgressBar;
