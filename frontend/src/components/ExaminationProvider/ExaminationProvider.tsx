import { Navigate, useParams } from "react-router-dom";
import { DISCOVER_ROUTES } from "@/routes/discover.routes";
import {
    LocalStorageDTO,
    LocalStorageManager,
} from "@/managers/LocalStorageManager";
import {
    FC,
    useState,
    Dispatch,
    useEffect,
    useContext,
    createContext,
    SetStateAction,
    PropsWithChildren,
} from "react";

export type ExaminationStateProps = {
    examinationInformation?: LocalStorageDTO["examination"];
    StoreTab: (tab: number) => void;
    TerminateExamination: () => void;
    StartExamination: (
        examinationInformation: LocalStorageDTO["examination"] & {}
    ) => void;
    SetExaminationChosenAnswers: Dispatch<
        SetStateAction<(LocalStorageDTO["examination"] & {})["chosen-answers"]>
    >;
};

export const ExaminationContext = createContext<ExaminationStateProps>(null!);

export const useExamination = () => useContext(ExaminationContext);

export type ExaminationProviderProps = PropsWithChildren;

export const ExaminationProvider: FC<ExaminationProviderProps> = ({
    children,
}) => {
    const { courseID, moduleID, lessonID } =
        useParams<keyof typeof DISCOVER_ROUTES.base.routes>();

    const [state, setState] = useState<ExaminationStateProps>({
        examinationInformation: LocalStorageManager.Instance.items.examination,
        StoreTab: (tab) =>
            setState((state) => ({
                ...state,
                examinationInformation:
                    state.examinationInformation == null
                        ? undefined
                        : {
                              ...state.examinationInformation,
                              "last-tab": tab,
                          },
            })),
        TerminateExamination: () =>
            setState((state) => ({
                ...state,
                examinationInformation: undefined,
            })),
        StartExamination: (examinationInformation) =>
            setState((state) => ({ ...state, examinationInformation })),
        SetExaminationChosenAnswers: (allChosenAnswers) =>
            setState((state) => ({
                ...state,
                examinationInformation:
                    state.examinationInformation == null
                        ? undefined
                        : {
                              ...state.examinationInformation,
                              "chosen-answers": Array.isArray(allChosenAnswers)
                                  ? allChosenAnswers
                                  : allChosenAnswers(
                                        state.examinationInformation[
                                            "chosen-answers"
                                        ]
                                    ),
                          },
            })),
    });

    useEffect(() => {
        LocalStorageManager.Instance.SetItem(
            "examination",
            state.examinationInformation
        );
    }, [state.examinationInformation]);

    return (
        <ExaminationContext.Provider value={state}>
            {state.examinationInformation != null &&
            [
                state.examinationInformation.courseID != courseID,
                state.examinationInformation.moduleID != moduleID,
                state.examinationInformation.lessonID != lessonID,
            ].some(Boolean) ? (
                <>
                    <Navigate
                        to={
                            DISCOVER_ROUTES.base.routes.lessonID.MapVariables({
                                ...state.examinationInformation,
                            }) +
                            `?tab=${state.examinationInformation["last-tab"]}`
                        }
                    />
                    {children}
                </>
            ) : (
                children
            )}
        </ExaminationContext.Provider>
    );
};
