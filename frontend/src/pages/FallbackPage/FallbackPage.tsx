import { Page } from "@components/Page/Page";
import { FC, PropsWithChildren } from "react";
import { CogIcon } from "@/components/CogIcon/CogIcon";
import { DoubleCogIcon } from "@/components/DoubleCogIcon/DoubleCogIcon";

export type FallbackPageProps = PropsWithChildren;

export const FallbackPage: FC<FallbackPageProps> = ({ children }) => {
    return (
        <Page className="from-primary-normal bg-linear-to-b to-primary-dark flex place-content-center place-items-center overflow-hidden text-white">
            <div className="bg-gray isolate flex flex-col justify-between gap-5 [&>:is(.typography,details)]:[filter:drop-shadow(0px_0px_5px_black)]">
                {children}
                <DoubleCogIcon
                    className="-left-page -bottom-1/10 absolute z-[-1] text-white [filter:drop-shadow(0px_0px_2px_black)]"
                    size={400}
                />
                <CogIcon
                    className="-left-page absolute top-0 -translate-y-1/2 translate-x-[10vw] text-white [animation-direction:reverse] [filter:drop-shadow(0px_0px_2px_black)]"
                    size={250}
                />
                <CogIcon
                    className="-right-page absolute top-0 z-[-1] translate-x-1/4 translate-y-1/3 text-white [animation-direction:reverse] [filter:drop-shadow(0px_0px_2px_black)]"
                    size={250}
                />
            </div>
        </Page>
    );
};
