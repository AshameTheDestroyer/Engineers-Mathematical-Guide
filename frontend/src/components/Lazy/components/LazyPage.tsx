import { Lazy } from "../Lazy";
import { FC, PropsWithChildren } from "react";
import { ErrorPage } from "@/pages/ErrorPage/ErrorPage";
import { LoadingPage } from "@/pages/LoadingPage/LoadingPage";

export type LazyPageProps = PropsWithChildren;

export const LazyPage: FC<LazyPageProps> = ({ children }) => {
    return (
        <Lazy errorFallback={<ErrorPage />} loadingFallback={<LoadingPage />}>
            {children}
        </Lazy>
    );
};
