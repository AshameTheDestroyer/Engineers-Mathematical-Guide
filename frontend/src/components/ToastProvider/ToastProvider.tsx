import { useLocalization } from "../LocalizationProvider/LocalizationProvider";
import {
    FC,
    useState,
    useEffect,
    useContext,
    createContext,
    PropsWithChildren,
} from "react";
import {
    toast,
    ToastContent,
    ToastOptions,
    Id as ToastID,
    ToastContainer,
    ToastContainerProps,
} from "react-toastify";

export type ToastStateProps = {
    Alert: (content: ToastContent, options?: ToastOptions) => ToastID;
    UpdateAll: (options?: ToastOptions) => void;
};

export const ToastContext = createContext<ToastStateProps>(null!);

export const useToast = () => useContext(ToastContext);

export type ToastProviderProps = PropsWithChildren<ToastContainerProps>;

export const ToastProvider: FC<ToastProviderProps> = ({
    children,
    className,
    toastStyle,
    ...props
}) => {
    const [state, _setState] = useState<ToastStateProps>({
        Alert,
        UpdateAll,
    });

    const [toasts, setToasts] = useState<
        Array<{ id: ToastID; options?: ToastOptions; content: ToastContent }>
    >([]);

    const { direction } = useLocalization();

    useEffect(() => {
        UpdateAll({
            rtl: direction == "rtl",
            position: direction == "ltr" ? "bottom-left" : "bottom-right",
        });
    }, [direction]);

    function Alert(content: ToastContent, options?: ToastOptions): ToastID {
        const toastID = toast(content, {
            ...options,
            onClose: (reason) => (
                options?.onClose?.(reason),
                setToasts((toasts) =>
                    toasts.filter((toast_) => toast_.id != toastID)
                )
            ),
        });

        setToasts((toasts) => [...toasts, { id: toastID, content, options }]);
        return toastID;
    }

    function UpdateAll(options?: ToastOptions) {
        toasts.forEach((toast_) =>
            toast.update(toast_.id, { ...toast_.options, ...options })
        );
    }

    return (
        <ToastContext.Provider value={state}>
            {children}
            <ToastContainer
                className={className}
                draggable
                limit={3}
                closeButton={false}
                draggablePercent={50}
                rtl={direction == "rtl"}
                position={direction == "ltr" ? "bottom-left" : "bottom-right"}
                toastStyle={{
                    gap: "calc(var(--spacing)*2)",
                    color: "var(--color-foreground-dark)",
                    paddingBlock: "calc(var(--spacing)*2)",
                    paddingInline: "calc(var(--spacing)*4)",
                    backgroundColor: "var(--color-background-light)",
                    ...toastStyle,
                }}
                {...props}
            />
        </ToastContext.Provider>
    );
};
