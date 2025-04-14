import React, { useEffect } from "react";

type ProgressBarProps = {
    value: number;
    minimum?: number;
    maximum: number;
    variant?: Variant;
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
        primary: "bg-primary-dark",
        secondary: "bg-secondary-dark",
        default: "bg-gray-dark",
    };

    return (
        <div className="bg-gray-darker m-5 h-4 w-full rounded-full">
            <div
                className={`${variantColors[variant]} h-4 rounded-full transition-all duration-300 ease-out`}
                style={{ width: `${percentage}%` }}
                role="progressbar"
                // aria-valuenow={clampedValue}
                // aria-valuemin={minimum}
                // aria-valuemax={maximum}
            />
        </div>
    );
};

export default ProgressBar;
