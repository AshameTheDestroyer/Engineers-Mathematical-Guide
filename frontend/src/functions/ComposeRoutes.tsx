import { Routes } from "react-router-dom";
import { PropsWithChildren } from "react";

export function ComposeRoutes(
    ...routes: Array<() => PropsWithChildren["children"]>
) {
    return () => <Routes>{...routes.map((route) => route())}</Routes>;
}
