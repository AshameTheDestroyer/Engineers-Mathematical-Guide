import { FC } from "react";
import { TypographyCollection } from "../components/TypographyCollection";

export const TypographyPage: FC = () => {
    const englishSentence = "The quick brown fox jumps over the lazy dog";
    const arabicSentence =
        "الثَّعلبُ البُنيُّ السَّريعُ يَقفزُ فَوقَ الكَلبِ الكَسولِ";

    const textSizes = [
        "text-xs",
        "text-sm",
        "text-md",
        "text-lg",
        "text-xl",
        "text-2xl",
        "text-3xl",
        "text-4xl",
        "text-5xl",
        "text-6xl",
        "text-7xl",
        "text-8xl",
        "text-9xl",
    ];

    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(max(30rem,40vw),1fr))] gap-8 [direction:ltr]">
            <TypographyCollection
                classNames={textSizes}
                title="English"
                text={englishSentence}
            />
            <TypographyCollection
                classNames={textSizes}
                className="[direction:rtl]"
                title="عَربيٌّ"
                text={arabicSentence}
            />
        </div>
    );
};
