import { FC } from "react";

import logoIcon from "../../assets/icons/logo.png";

export const Logo: FC = () => {
    return (
        <div className="flex place-items-center gap-1">
            <img src={logoIcon} className="icon" />
            <p className="text-primary-normal text-lg font-bold">EMG</p>
        </div>
    );
};
