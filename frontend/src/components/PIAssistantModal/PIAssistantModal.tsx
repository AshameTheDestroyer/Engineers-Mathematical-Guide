import { Image } from "../Image/Image";
import { twJoin, twMerge } from "tailwind-merge";
import { Input } from "@/components/Input/Input";
import { Modal, ModalProps } from "../Modal/Modal";
import { Button } from "@/components/Button/Button";
import { PIAssistant } from "@/managers/PIAssistant";
import { Typography } from "../Typography/Typography";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Markdown } from "@/components/Markdown/Markdown";
import { DoubleCogIcon } from "../DoubleCogIcon/DoubleCogIcon";
import { FC, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useLocalization } from "../LocalizationProvider/LocalizationProvider";
import { useThemeMode } from "@/components/ThemeModeProvider/ThemeModeProvider";
import { SearchResultDisplay } from "../SearchResultDisplay/SearchResultDisplay";

import pi_icon from "@icons/pi.svg";
import pi_image from "@images/pi.png";

export type PIAssistantModalProps = ModalProps;

export const PIAssistantModal: FC<PIAssistantModalProps> = ({
    id,
    ref,
    className,
    ...props
}) => {
    const { isDarkThemed } = useThemeMode();
    const { direction } = useLocalization();

    const [messages, setMessages] = useState(PIAssistant.Instance.messages);

    const chatReference = useRef<HTMLDivElement>(null);
    const modalReference = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => modalReference.current!);

    useEffect(() => {
        const Unsubscribe = PIAssistant.Instance.Subscribe(() => {
            setMessages([...PIAssistant.Instance.messages]);

            const messages =
                chatReference.current?.querySelectorAll(".message");

            messages
                ?.item(messages.length - 1)
                ?.scrollIntoView({ behavior: "smooth", block: "end" });
        });

        return Unsubscribe;
    }, []);

    function RenderedMarkdown({
        message,
    }: {
        message: (typeof messages)[number];
    }) {
        const fallback = (item: string) => {
            try {
                const child = item
                    .match(/\"children\"\:\ +\".+\"/)?.[0]
                    .replace('"children": ', "")
                    .trimAll()
                    ?.slice(1, -1);

                return (
                    <Markdown element="p" props={{ className: "message" }}>
                        {child}
                    </Markdown>
                );
            } catch {
                return (
                    <Typography className="message text-wrap" variant="pre">
                        {item}
                    </Typography>
                );
            }
        };

        try {
            const text = message.answer.replace(/\n/g, "").match(/\[.+\]/)![0];

            return Array.from(
                text.matchAll(/\{\ *\"element\":\ \"[^\{\}]+\"\ *\}/g),
                (item) => item[0]
            ).map((item, i) => {
                try {
                    const markdown = JSON.parse(item);
                    return (
                        <Markdown
                            key={i}
                            props={{ ...markdown.props, className: "message" }}
                            {...markdown}
                        />
                    );
                } catch {
                    return fallback(item);
                }
            });
        } catch {
            return fallback(message.answer);
        }
    }

    function Ask() {
        const textInput = modalReference.current?.querySelector(
            "#input-question"
        ) as HTMLInputElement;
        const text = textInput.value.trimAll();

        if (text == null || text.length == 0) {
            return;
        }

        textInput.value = "";
        PIAssistant.Instance.Ask(text);
    }

    return (
        <Modal
            id={id}
            ref={modalReference}
            className={twMerge(
                "bg-background-light h-[90dvh] w-[90vw] gap-4 max-sm:p-4",
                className
            )}
            {...props}
            hasCloseButton
            closeButtonProps={{ isSquare: true }}
        >
            <Typography
                className="text-2xl font-bold max-sm:text-lg"
                variant="h1"
            >
                Welcome to PI Assistant
            </Typography>
            <Flexbox
                ref={chatReference}
                className={twJoin(
                    "border-background-darker h-full overflow-auto rounded-2xl border-2 p-8",
                    isDarkThemed
                        ? "bg-background-normal/50"
                        : "bg-background-dark/50"
                )}
                gap="8"
                direction="column"
            >
                {messages.length == 0 && (
                    <SearchResultDisplay
                        className="max-w-[32rem] grow place-self-center"
                        iconType="custom"
                        title="Ask a Question!"
                        iconProps={{ source: pi_icon }}
                        paragraph="Start a conversation with a mathematics PhD professor AI assistant, preferably called **PI Assistant**. Ask anything you wish to know the answer of."
                    />
                )}
                {messages.map((message, i) => (
                    <Flexbox key={i} gap="4" direction="column">
                        <Flexbox
                            gap="4"
                            placeItems="baseline"
                            direction={
                                direction == "ltr" ? "row-reverse" : "row"
                            }
                        >
                            <span className="you bg-secondary-normal rounded-full px-2 py-1 font-bold">
                                You
                            </span>
                            <Typography variant="p">
                                {message.question}
                            </Typography>
                        </Flexbox>
                        {message.answer.length > 0 && (
                            <Image
                                className="h-[64px] w-[64px]"
                                source={pi_image}
                                alternative="PI Assistant Image."
                            />
                        )}
                        <RenderedMarkdown message={message} />
                        {!message.finished && (
                            <Flexbox gap="4" placeItems="center">
                                <Image
                                    className="h-[64px] w-[64px]"
                                    source={pi_image}
                                    alternative="PI Assistant Image."
                                />
                                <DoubleCogIcon className="scale-85 [&>*]:[animation-duration:3s]" />
                            </Flexbox>
                        )}
                    </Flexbox>
                ))}
            </Flexbox>
            <Flexbox className="grow" gap="4">
                <Input
                    className="grow"
                    name="question"
                    variant="primary"
                    onKeyDown={(e) => e.key == "Enter" && Ask()}
                />
                <Button className="flex-[0.3]" variant="primary" onClick={Ask}>
                    Ask
                </Button>
            </Flexbox>
        </Modal>
    );
};
