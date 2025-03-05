import { FC } from "react";

export const Home: FC = () => {
    return (
        <div>
            <div className="text-primary-normal text-3xl">
                The quick brown fox jumps over the lazy dog
            </div>
            <div className="text-secondary-normal text-2xl">
                The quick brown fox jumps over the lazy dog
            </div>
            <div className="text-foreground-normal text-xl">
                The quick brown fox jumps over the lazy dog
            </div>
            <div className="text-background-normal bg-foreground-normal text-lg">
                The quick brown fox jumps over the lazy dog
            </div>
            <div className="text-gray-normal">
                The quick brown fox jumps over the lazy dog
            </div>
            <div className="text-sm">
                The quick brown fox jumps over the lazy dog
            </div>
            <div className="text-xs">
                The quick brown fox jumps over the lazy dog
            </div>
        </div>
    );
};
