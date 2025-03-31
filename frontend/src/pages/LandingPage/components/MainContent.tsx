import { FC } from "react";
import { Button } from "@components/Button/Button";
import { CogIcon } from "@/components/CogIcon/CogIcon";
import { ButtonBox } from "@components/ButtonBox/ButtonBox";

import pi_image from "@images/pi.webp";
import arrow_icon from "@icons/arrow.svg";

// export const MainContent: FC = () => {
//     return (
//         <div className="centralize bg-gray flex h-32 grow flex-row justify-between gap-5">
//             <section className="w-150 flex flex-col gap-5">
//                 <h2 className="text-primary-normal text-3xl font-bold">
//                     Engineers' Mathematical Guide
//                 </h2>
//                 <h4 className="text-xl">Learn By Doing!</h4>
//                 <p>
//                     Lorem ipsum, dolor sit amet consectetur adipisicing elit.
//                     Dicta, tempora reprehenderit magni, enim eum possimus, fugit
//                     sunt maxime amet error vel. Placeat, deserunt? Perspiciatis
//                     sit dolorem dicta obcaecati, numquam ad.
//                 </p>
//                 <div className="flex place-items-stretch gap-4">
//                     <Button className="grow-[0.6]" link="odwkaodk">
//                         Learn More
//                     </Button>
//                     <Button
//                         className="grow"
//                         variant="primary"
//                         icon={{
//                             placement: "right",
//                             source: arrow_icon,
//                             className: "rotate-90",
//                         }}
//                     >
//                         Start Your Journey Now
//                     </Button>
//                 </div>
//             </section>
//             <img src={Icon} alt="pi-image" className="w-100" />
//         </div>
//     );
// };

export const MainContent: FC = () => {
    return (
        <div className="centralize bg-gray flex h-32 grow flex-row justify-between gap-5">
            <section className="w-150 flex flex-col gap-5">
                <h2 className="text-primary-normal text-3xl font-bold">
                    دَليلُ المُهَنْدِسينَ في الرِّياضِيّات
                </h2>
                <h4 className="text-xl">تَعَلَّمْ عَنْ طَريقِ الفِعْل</h4>
                <p>
                    كَلَامٌ عَرَبِيٌّ كَثِيرٌ لَا مَعْنًى مِنْهُ وَلَا مَغْزًى،
                    كُلُّ الْمَطْلُوبِ هُنَا هُوَ فَقَطْ مَلْءُ الْمُحْتَوَى
                    بِجُمَلٍ كَبِيرَةٍ بِحَيْثُ يُعْطَى لَنَا مَثَالٌ عَمَّا
                    يُمْكِنُ أَنْ يَظْهَرَ فِي حَالِ كَانَ هُنَالِكَ فِعْلًا
                    كَلَامٌ ذُو قِيمَةٍ.
                </p>
                <ButtonBox direction="row">
                    <Button className="grow-[0.6]" link="/learn-more">
                        إقرأ المزيد
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
                        إبدأ رحلتك الآن
                    </Button>
                </ButtonBox>
            </section>
            <img
                className="w-100 [filter:drop-shadow(4px_4px_2px_#0000007c)]"
                loading="lazy"
                src={pi_image}
                alt="pi image"
            />
            <CogIcon
                className="text-background-dark -left-page absolute bottom-0 z-[-1] -translate-x-1/4 translate-y-1/4"
                size={400}
            />
            <CogIcon
                className="text-background-dark -left-page absolute bottom-0 z-[-1] translate-x-[70%] translate-y-[40%] rotate-[-5deg] [animation-direction:reverse]"
                size={350}
            />
            <CogIcon
                className="text-background-dark -right-page absolute top-0 z-[-1] translate-x-1/4 translate-y-2/3 [animation-direction:reverse]"
                size={250}
            />
        </div>
    );
};
