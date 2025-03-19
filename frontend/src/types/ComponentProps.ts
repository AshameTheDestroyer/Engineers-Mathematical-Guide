import React, { PropsWithChildren } from "react";

export type ChildlessComponentProps = {
    id?: string;
    className?: string;
};

export type ComponentProps = PropsWithChildren<ChildlessComponentProps>;

export type ComponentEventProps<
    T1 extends HTMLElement,
    T2 extends React.HTMLAttributes<T1>,
> = {
    [HTMLKey in keyof T2 as HTMLKey extends `on${string}`
        ? HTMLKey
        : never]?: T2[HTMLKey];
};
