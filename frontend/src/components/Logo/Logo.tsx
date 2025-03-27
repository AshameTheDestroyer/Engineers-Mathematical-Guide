import { FC } from "react";

import logoIcon from "@icons/logo.png";

export const Logo: FC = () => {
    return (
        <div className="flex place-items-center gap-1">
            <img
                src={logoIcon}
                className="icon [filter:drop-shadow(2px_2px_0px_#0000007c)]"
            />
            <p className="text-primary-normal text-lg font-bold">EMG</p>
        </div>
    );
};
