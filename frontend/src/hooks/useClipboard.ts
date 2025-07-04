import { useToast } from "@/components/ToastProvider/ToastProvider";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

export const DEFAULT_COPY_MESSAGE = {
    ar: "تَمّ نَسخُ النَّصّ.",
    en: "Text copied.",
};

export function useClipboard(
    messageLocale: Record<string, string> = DEFAULT_COPY_MESSAGE
) {
    const { Alert } = useToast();
    const { language, GetLocale } = useLocalization();

    function CopyToClipboard(text: string | undefined) {
        if (text == null) {
            return;
        }

        navigator.clipboard.writeText(text);
        Alert(GetLocale(messageLocale, language), { type: "info" });
    }

    return { CopyToClipboard };
}
