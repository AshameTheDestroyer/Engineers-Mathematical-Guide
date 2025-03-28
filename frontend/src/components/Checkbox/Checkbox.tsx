import React from "react";

interface CustomCheckboxProps {
    name: string;
    value?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    label: string;
    linkText: string;
    link: string;
}

const Checkbox: React.FC<CustomCheckboxProps> = ({
    name,
    value,
    onChange,
    className,
    label,
    link,
    linkText,
}) => {
    return (
        <div className="flex flex-row gap-2">
            <input
                className={`${className} border-primary-dark-active border-2`}
                type="checkbox"
                name={name}
                value={value}
                onChange={onChange}
            />
            <label>
                {label}
                <a href={link}>{linkText}</a>
            </label>
        </div>
    );
};

export default Checkbox;
