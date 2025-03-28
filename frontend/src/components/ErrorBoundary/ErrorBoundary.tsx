import React, { PropsWithChildren } from "react";

export type ErrorBoundaryProps = PropsWithChildren & {
    fallback?: (error: Error) => React.ReactNode;
};

export type ErrorBoundaryState = {
    error?: Error;
};

export class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {};
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.error("Error caught by Error Boundary:", error, errorInfo);
    }

    render(): React.ReactNode {
        if (this.state.error != undefined) {
            return this.props.fallback?.(this.state.error);
        }

        return this.props.children;
    }
}
