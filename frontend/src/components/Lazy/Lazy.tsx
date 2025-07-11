import { ErrorBoundary, ErrorBoundaryProps } from "react-error-boundary";
import { FC, lazy, PropsWithChildren, Suspense, SuspenseProps } from "react";

export function LazyImport(modulePath: string) {
    const exportName =
        modulePath
            .split("/")
            .pop()
            ?.replace(/\.[^/.]+$/, "") || "";

    return lazy(() =>
        import("../../" + modulePath).then((module) => ({
            default: module[exportName],
        }))
    );
}

export type LazyProps = PropsWithChildren<{
    loadingFallback?: SuspenseProps["fallback"];
    errorFallback?: ErrorBoundaryProps["fallbackRender"];
}>;

export const Lazy: FC<LazyProps> = ({
    children,
    errorFallback,
    loadingFallback,
}) => {
    return (
        <ErrorBoundary fallbackRender={errorFallback ?? (({ error }) => error)}>
            <Suspense fallback={loadingFallback}>{children}</Suspense>
        </ErrorBoundary>
    );
};
