import React, { PropsWithChildren, Ref } from "react";

export type ChildlessComponentProps<
    TRef extends HTMLElement | undefined = undefined,
> = {
    id?: string;
    className?: string;
    ref?: TRef extends undefined ? undefined : Ref<TRef>;
};

export type ComponentProps<TRef extends HTMLElement | undefined = undefined> =
    PropsWithChildren<ChildlessComponentProps<TRef>>;

export type ComponentEventProps<
    T1 extends HTMLElement,
    T2 extends React.HTMLAttributes<T1>,
> = {
    [HTMLKey in keyof T2 as HTMLKey extends `on${string}`
        ? HTMLKey
        : never]?: T2[HTMLKey];
};
