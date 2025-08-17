import { FC, ReactNode } from "react";
import { Routes } from "react-router-dom";

export function ComposeRoutes(...routes: Array<FC>) {
    return () => (
        <Routes>{...routes.map((route) => route({}) as ReactNode)}</Routes>
    );
}
