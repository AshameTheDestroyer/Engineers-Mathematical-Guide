import { FC } from "react";
import Icon from "../../../assets/icons/logo.png";

export const MainContent: FC = () => {
    return (
        <div className="centralize bg-gray flex h-32 grow flex-row justify-between gap-5">
            <section className="w-150 flex flex-col gap-5">
                <h2 className="text-primary-normal text-3xl font-bold">
                    Engineers' Mathematical Guide
                </h2>
                <h4 className="text-xl">Learn By Me</h4>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Dicta, tempora reprehenderit magni, enim eum possimus, fugit
                    sunt maxime amet error vel. Placeat, deserunt? Perspiciatis
                    sit dolorem dicta obcaecati, numquam ad.
                </p>
            </section>
            <img src={Icon} alt="pi-image" className="w-100" />
        </div>
    );
};
