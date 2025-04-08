import { FC } from "react";
import { Button } from "@components/Button/Button";
import { CogIcon } from "@/components/CogIcon/CogIcon";
import { ButtonBox } from "@components/ButtonBox/ButtonBox";
import { DoubleCogIcon } from "@/components/DoubleCogIcon/DoubleCogIcon";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import pi_image from "@images/pi.webp";
import arrow_icon from "@icons/arrow.svg";

export const MainContent: FC = () => {
    const { language, direction } = useLocalization();

    const title =
        language == "ar"
            ? "دَليلُ المُهَنْدِسينَ في الرِّياضِيّات"
            : "Engineers' Mathematical Guide";
    const subtitle =
        language == "ar" ? "تَعَلَّمْ عَنْ طَريقِ الفِعْل" : "Learn By Doing!";
    const placeholderText =
        language == "ar"
            ? "كَلَامٌ عَرَبِيٌّ كَثِيرٌ لَا مَعْنًى مِنْهُ وَلَا مَغْزًى، كُلُّ الْمَطْلُوبِ هُنَا هُوَ فَقَطْ مَلْءُ الْمُحْتَوَى بِجُمَلٍ كَبِيرَةٍ بِحَيْثُ يُعْطَى لَنَا مَثَالٌ عَمَّا يُمْكِنُ أَنْ يَظْهَرَ فِي حَالِ كَانَ هُنَالِكَ فِعْلًا كَلَامٌ ذُو قِيمَةٍ."
            : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta, tempora reprehenderit magni, enim eum possimus, fugit sunt maxime amet error vel. Placeat, deserunt? Perspiciatis sit dolorem dicta obcaecati, numquam ad.";
    const readMoreText = language == "ar" ? "إقرأ المزيد" : "Learn More";
    const startJourneyText =
        language == "ar" ? "إبدأ رحلتك الآن" : "Start Your Journey Now";

    return (
        <div className="centralize bg-gray flex h-32 grow flex-row justify-between gap-5">
            <section className="w-150 flex flex-col gap-5">
                <h2 className="text-primary-normal text-3xl font-bold">
                    {title}
                </h2>
                <h3 className="text-xl">{subtitle}</h3>
                <p>{placeholderText}</p>
                <ButtonBox
                    direction={direction == "ltr" ? "row" : "reverse-row"}
                >
                    <Button className="grow-[0.6]" link="/learn-more">
                        {readMoreText}
                    </Button>
                    <Button
                        className="grow"
                        link="/app"
                        variant="primary"
                        icon={{
                            placement: "right",
                            source: arrow_icon,
                            className: "rotate-90",
                        }}
                    >
                        {startJourneyText}
                    </Button>
                </ButtonBox>
            </section>
            <img
                className="w-100 [filter:drop-shadow(4px_4px_2px_#0000007c)]"
                loading="lazy"
                src={pi_image}
                alt="pi image"
            />
            <DoubleCogIcon
                className="text-background-dark -left-page -bottom-1/10 absolute z-[-1]"
                size={400}
            />
            <CogIcon
                className="text-background-dark -right-page absolute top-0 z-[-1] translate-x-1/4 translate-y-2/3 [animation-direction:reverse]"
                size={250}
            />
        </div>
    );
};
