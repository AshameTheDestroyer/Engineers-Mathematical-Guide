import { FC } from "react";
import { Page } from "@components/Page/Page";
import { CogIcon } from "@/components/CogIcon/CogIcon";
import { DoubleCogIcon } from "@/components/DoubleCogIcon/DoubleCogIcon";

export const LoadingPage: FC = () => {
    return (
        <Page className="bg-primary-normal overflow-hidden text-white">
            <div className="centralize bg-gray isolate flex h-32 grow flex-col justify-between gap-5 overflow-hidden">
                <h1 className="text-3xl font-bold">Loading...</h1>
                <p>Please wait a moment till page finally loads.</p>
                <DoubleCogIcon
                    className="-left-page -bottom-1/10 absolute z-[-1] text-white"
                    size={400}
                />
                <CogIcon
                    className="-left-page absolute top-0 -translate-y-1/2 translate-x-[10vw] text-white [animation-direction:reverse]"
                    size={250}
                />
                <CogIcon
                    className="-right-page absolute top-0 z-[-1] translate-x-1/4 translate-y-2/3 text-white [animation-direction:reverse]"
                    size={250}
                />
            </div>
        </Page>
    );
};
