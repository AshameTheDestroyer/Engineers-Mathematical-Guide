import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { Typography } from "@/components/Typography/Typography";
import { FC, useState } from "react";

export const InlineFeedbackSection: FC = () => {
    const [rating, setRating] = useState<number | null>(null);
    const [feedback, setFeedback] = useState<string>("");
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleStarClick = (value: number) => {
        setRating(value);
    };

    const handleSubmit = () => {
        console.log("Submitted rating:", rating, "Feedback:", feedback);
        setSubmitted(true);
    };

    const handleReset = () => {
        setRating(null);
        setFeedback("");
        setSubmitted(false);
    };

    return (
        <div
            className="mx-auto max-w-md rounded-lg border p-6"
            style={{
                backgroundColor: "var(--color-background-light)",
                borderColor: "var(--color-background-dark)",
                color: "var(--color-foreground-normal)",
            }}
        >
            {!submitted ? (
                <>
                    <Typography
                        variant="h5"
                        className="mb-2 text-center"
                        style={{ color: "var(--color-foreground-darker)" }}
                    >
                        Help Us Improve
                    </Typography>
                    <Typography
                        variant="p"
                        className="mb-6 text-center"
                        style={{ color: "var(--color-foreground-dark)" }}
                    >
                        How would you rate your experience?
                    </Typography>

                    <div className="mb-6 flex justify-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                className="focus:outline-none"
                                onClick={() => handleStarClick(star)}
                                aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                            >
                                <span
                                    className="text-2xl"
                                    style={{
                                        color:
                                            rating && star <= rating
                                                ? "var(--color-secondary-normal)"
                                                : "var(--color-foreground-light)",
                                        transition: "color 0.2s ease",
                                    }}
                                >
                                    ★
                                </span>
                            </button>
                        ))}
                    </div>

                    {rating !== null && rating < 3 && (
                        <div className="mb-6">
                            <Input
                                name="feedback"
                                label="We’d love to know how we can improve"
                                placeholder="Tell us what went wrong..."
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                className="w-full"
                                style={{
                                    backgroundColor:
                                        "var(--color-background-normal)",
                                }}
                            />
                        </div>
                    )}

                    {rating !== null && (
                        <Button
                            onClick={handleSubmit}
                            variant="default"
                            className="w-full"
                            style={{
                                backgroundColor: "var(--color-primary-normal)",
                                borderColor: "var(--color-primary-dark)",
                                color: "white",
                            }}
                            onMouseEnter={(e) =>
                                ((
                                    e.currentTarget as HTMLElement
                                ).style.backgroundColor =
                                    "var(--color-primary-normal-hover)")
                            }
                            onMouseLeave={(e) =>
                                ((
                                    e.currentTarget as HTMLElement
                                ).style.backgroundColor =
                                    "var(--color-primary-normal)")
                            }
                        >
                            Submit Feedback
                        </Button>
                    )}
                </>
            ) : (
                <>
                    <Typography
                        variant="h6"
                        className="mb-2 text-center"
                        style={{
                            color:
                                rating && rating >= 3
                                    ? "var(--color-primary-dark)"
                                    : "var(--color-secondary-dark)",
                        }}
                    >
                        Thank you for your feedback!
                    </Typography>

                    {rating !== null && rating >= 3 ? (
                        <Typography
                            variant="p"
                            className="mb-6 text-center"
                            style={{ color: "var(--color-foreground-normal)" }}
                        >
                            We're glad you enjoyed your experience.
                        </Typography>
                    ) : (
                        <Typography
                            variant="p"
                            className="mb-6 text-center"
                            style={{ color: "var(--color-foreground-normal)" }}
                        >
                            We'll use your feedback to improve.
                        </Typography>
                    )}

                    <Button
                        onClick={handleReset}
                        variant="default"
                        thickness="normal"
                        className="w-full"
                        style={{
                            backgroundColor: "var(--color-tertiary-light)",
                            borderColor: "var(--color-tertiary-normal)",
                            color: "var(--color-tertiary-dark)",
                        }}
                        onMouseEnter={(e) => {
                            (
                                e.currentTarget as HTMLElement
                            ).style.backgroundColor =
                                "var(--color-tertiary-light-hover)";
                            (e.currentTarget as HTMLElement).style.color =
                                "var(--color-tertiary-dark-hover)";
                        }}
                        onMouseLeave={(e) => {
                            (
                                e.currentTarget as HTMLElement
                            ).style.backgroundColor =
                                "var(--color-tertiary-light)";
                            (e.currentTarget as HTMLElement).style.color =
                                "var(--color-tertiary-dark)";
                        }}
                    >
                        Submit Another Response
                    </Button>
                </>
            )}
        </div>
    );
};

// import { Button } from "@/components/Button/Button";
// import { Input } from "@/components/Input/Input";
// import { Typography } from "@/components/Typography/Typography";
// import { FC, useState } from "react";

// interface FeedbackPopupProps {
//     isOpen: boolean;
//     onClose: () => void;
// }

// export const FeedbackPopup: FC<FeedbackPopupProps> = ({ isOpen, onClose }) => {
//     const [rating, setRating] = useState<number | null>(null);
//     const [feedback, setFeedback] = useState<string>("");
//     const [submitted, setSubmitted] = useState<boolean>(false);

//     if (!isOpen) return null;

//     const handleStarClick = (value: number) => {
//         setRating(value);
//     };

//     const handleSubmit = () => {
//         console.log("Rating:", rating, "Feedback:", feedback);
//         setSubmitted(true);
//     };

//     const handleDone = () => {
//         setRating(null);
//         setFeedback("");
//         setSubmitted(false);
//         onClose();
//     };

//     return (
//         <div
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
//             style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//             onClick={handleDone}
//         >
//             <div
//                 className="relative w-96 rounded-lg p-6 shadow-xl"
//                 style={{
//                     backgroundColor: "var(--color-background-light)",
//                     color: "var(--color-foreground-dark)",
//                 }}
//                 onClick={(e) => e.stopPropagation()}
//             >
//                 {!submitted ? (
//                     <>
//                         <Typography
//                             variant="h4"
//                             className="mb-4 text-center"
//                             style={{ color: "var(--color-foreground-darker)" }}
//                         >
//                             How would you rate your experience?
//                         </Typography>

//                         <div className="mb-6 flex justify-center space-x-2">
//                             {[1, 2, 3, 4, 5].map((star) => (
//                                 <button
//                                     key={star}
//                                     type="button"
//                                     className="text-3xl focus:outline-none"
//                                     onClick={() => handleStarClick(star)}
//                                     aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
//                                 >
//                                     <span
//                                         style={{
//                                             color:
//                                                 rating && star <= rating
//                                                     ? "var(--color-secondary-normal)"
//                                                     : "var(--color-foreground-light)",
//                                             transition: "color 0.2s",
//                                         }}
//                                     >
//                                         ★
//                                     </span>
//                                 </button>
//                             ))}
//                         </div>

//                         {rating !== null && rating < 3 && (
//                             <div className="mb-6">
//                                 <Input
//                                     label="We're sorry to hear that. Please tell us how we can improve."
//                                     placeholder="Your feedback..."
//                                     value={feedback}
//                                     onChange={(e) =>
//                                         setFeedback(e.target.value)
//                                     }
//                                     className="w-full"
//                                 />
//                             </div>
//                         )}

//                         {rating !== null && (
//                             <Button
//                                 onClick={handleSubmit}
//                                 variant="default"
//                                 className="w-full"
//                                 style={{
//                                     backgroundColor:
//                                         "var(--color-primary-normal)",
//                                     borderColor: "var(--color-primary-dark)",
//                                     color: "white",
//                                 }}
//                                 onMouseEnter={(e) =>
//                                     (e.currentTarget.style.backgroundColor =
//                                         "var(--color-primary-normal-hover)")
//                                 }
//                                 onMouseLeave={(e) =>
//                                     (e.currentTarget.style.backgroundColor =
//                                         "var(--color-primary-normal)")
//                                 }
//                             >
//                                 Submit Feedback
//                             </Button>
//                         )}
//                     </>
//                 ) : (
//                     <>
//                         {rating && rating >= 3 ? (
//                             <Typography
//                                 variant="h5"
//                                 className="mb-4 text-center"
//                                 style={{ color: "var(--color-primary-dark)" }}
//                             >
//                                 Thank you for your feedback!
//                             </Typography>
//                         ) : (
//                             <>
//                                 <Typography
//                                     variant="h5"
//                                     className="mb-2 text-center"
//                                     style={{
//                                         color: "var(--color-secondary-dark)",
//                                     }}
//                                 >
//                                     Thank you for your feedback!
//                                 </Typography>
//                                 <Typography
//                                     variant="p"
//                                     className="text-center"
//                                     style={{
//                                         color: "var(--color-foreground-normal)",
//                                     }}
//                                 >
//                                     We'll use your input to improve your
//                                     experience.
//                                 </Typography>
//                             </>
//                         )}
//                         <Button
//                             onClick={handleDone}
//                             variant="default"
//                             thickness="normal"
//                             className="mt-6 w-full"
//                             style={{
//                                 backgroundColor: "var(--color-tertiary-normal)",
//                                 color: "white",
//                             }}
//                             onMouseEnter={(e) =>
//                                 (e.currentTarget.style.backgroundColor =
//                                     "var(--color-tertiary-normal-hover)")
//                             }
//                             onMouseLeave={(e) =>
//                                 (e.currentTarget.style.backgroundColor =
//                                     "var(--color-tertiary-normal)")
//                             }
//                         >
//                             Done
//                         </Button>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };
