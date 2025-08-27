import { useState } from "react";
import { Flexbox } from "../Flexbox/Flexbox";
import { Button } from "../Button/Button";
import { Typography } from "../Typography/Typography";

const ProbabilitySimulator = ({ onClose }: { onClose?: () => void }) => {
    const [mode, setMode] = useState<"coin" | "dice" | "cards">("coin");
    const [flips, setFlips] = useState({ heads: 0, tails: 0 });
    const [rolls, setRolls] = useState<number[]>([]);
    const [drawnCards, setDrawnCards] = useState<string[]>([]);
    const [history, setHistory] = useState<string[]>([]);

    const reset = () => {
        setFlips({ heads: 0, tails: 0 });
        setRolls([]);
        setDrawnCards([]);
        setHistory([]);
    };

    const flipCoin = () => {
        const result = Math.random() < 0.5 ? "heads" : "tails";
        setFlips((prev) => ({ ...prev, [result]: prev[result] + 1 }));
        setHistory((prev) => [...prev, `Flip: ${result}`]);
    };

    const rollDice = () => {
        const result = Math.floor(Math.random() * 6) + 1;
        setRolls((prev) => [...prev, result]);
        setHistory((prev) => [...prev, `Roll: ${result}`]);
    };

    const drawCard = () => {
        const suits = ["♠", "♥", "♦", "♣"];
        const ranks = [
            "A",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "J",
            "Q",
            "K",
        ];
        const deck = suits.flatMap((suit) =>
            ranks.map((rank) => `${rank}${suit}`)
        );
        const remaining = deck.filter((card) => !drawnCards.includes(card));
        if (remaining.length === 0) return;
        const randomCard =
            remaining[Math.floor(Math.random() * remaining.length)];
        setDrawnCards((prev) => [...prev, randomCard]);
        setHistory((prev) => [...prev, `Draw: ${randomCard}`]);
    };

    const runMany = (fn: () => void, times: number) => {
        for (let i = 0; i < times; i++) fn();
    };

    const totalFlips = flips.heads + flips.tails;
    const headsPct = totalFlips
        ? ((flips.heads / totalFlips) * 100).toFixed(1)
        : "0";
    const tailsPct = totalFlips
        ? ((flips.tails / totalFlips) * 100).toFixed(1)
        : "0";

    const totalRolls = rolls.length;
    const rollCounts = [0, 0, 0, 0, 0, 0];
    rolls.forEach((r) => rollCounts[r - 1]++);
    const rollPcts = rollCounts.map((c) =>
        totalRolls ? ((c / totalRolls) * 100).toFixed(1) : "0"
    );

    const cardsLeft = 52 - drawnCards.length;

    return (
        <div
            className="fixed z-50 h-4/5 max-w-3xl overflow-auto rounded-xl p-6 shadow-lg"
            style={{
                top: 100,
                left: window.innerWidth / 2 - 384,
                backgroundColor: "var(--color-background-light)",
                color: "var(--color-foreground-normal)",
            }}
        >
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute -top-8 right-0 flex h-6 w-6 items-center justify-center rounded"
                    style={{
                        backgroundColor: "var(--color-secondary-normal)",
                        color: "white",
                    }}
                >
                    ✕
                </button>
            )}

            <Flexbox direction="column" gap={4}>
                <Typography
                    variant="h2"
                    style={{ color: "var(--color-foreground-darker)" }}
                >
                    Interactive Probability Lab
                </Typography>

                <Typography
                    variant="p"
                    className="text-sm"
                    style={{ color: "var(--color-foreground-normal)" }}
                >
                    Run experiments and watch probability in action. See how
                    experimental results approach theory!
                </Typography>

                <Flexbox gap={2} wrap="wrap">
                    <Button
                        onClick={() => setMode("coin")}
                        variant={mode === "coin" ? "primary" : "default"}
                        thickness="normal"
                        className="text-sm"
                        style={{
                            backgroundColor:
                                mode === "coin"
                                    ? "var(--color-primary-normal)"
                                    : "",
                            color: mode === "coin" ? "white" : "",
                        }}
                    >
                        Coin Flips
                    </Button>
                    <Button
                        onClick={() => setMode("dice")}
                        variant={mode === "dice" ? "primary" : "default"}
                        thickness="normal"
                        className="text-sm"
                        style={{
                            backgroundColor:
                                mode === "dice"
                                    ? "var(--color-primary-normal)"
                                    : "",
                            color: mode === "dice" ? "white" : "",
                        }}
                    >
                        Dice Rolls
                    </Button>
                    <Button
                        onClick={() => setMode("cards")}
                        variant={mode === "cards" ? "primary" : "default"}
                        thickness="normal"
                        className="text-sm"
                        style={{
                            backgroundColor:
                                mode === "cards"
                                    ? "var(--color-primary-normal)"
                                    : "",
                            color: mode === "cards" ? "white" : "",
                        }}
                    >
                        Card Draw
                    </Button>
                    <Button
                        onClick={reset}
                        variant="default"
                        thickness="normal"
                        className="ml-auto text-sm"
                        style={{
                            backgroundColor: "var(--color-secondary-normal)",
                            color: "white",
                        }}
                    >
                        Reset All
                    </Button>
                </Flexbox>

                <Flexbox direction="row" gap={6}>
                    <Flexbox direction="column" gap={4} className="flex-1">
                        {mode === "coin" && (
                            <Flexbox direction="column" gap={4}>
                                <div className="text-center">
                                    <div
                                        className="mx-auto flex h-24 w-24 items-center justify-center rounded-full text-2xl font-bold"
                                        style={{
                                            backgroundColor:
                                                flips.heads + flips.tails > 0 &&
                                                history[
                                                    history.length - 1
                                                ].includes("heads")
                                                    ? "var(--color-secondary-light)"
                                                    : "var(--color-secondary-light-active)",
                                            transform:
                                                flips.heads + flips.tails > 0 &&
                                                history[
                                                    history.length - 1
                                                ].includes("heads")
                                                    ? "scale(1.1)"
                                                    : "scale(1)",
                                            transition: "transform 0.3s",
                                            color: "var(--color-foreground-darker)",
                                        }}
                                    >
                                        {totalFlips > 0
                                            ? history[
                                                  history.length - 1
                                              ].includes("heads")
                                                ? "H"
                                                : "T"
                                            : "?"}
                                    </div>
                                    <Typography
                                        variant="p"
                                        className="mt-2 text-sm"
                                        style={{
                                            color: "var(--color-foreground-normal)",
                                        }}
                                    >
                                        Last flip
                                    </Typography>
                                </div>
                                <Flexbox direction="column" gap={2}>
                                    <Button
                                        onClick={flipCoin}
                                        variant="default"
                                        thickness="normal"
                                        style={{
                                            backgroundColor:
                                                "var(--color-primary-normal)",
                                            color: "white",
                                        }}
                                    >
                                        Flip Coin
                                    </Button>
                                    <Button
                                        onClick={() => runMany(flipCoin, 10)}
                                        variant="default"
                                        thickness="normal"
                                        className="text-sm"
                                        style={{
                                            backgroundColor:
                                                "var(--color-primary-light)",
                                            color: "var(--color-primary-darker)",
                                        }}
                                    >
                                        Flip 10 Times
                                    </Button>
                                </Flexbox>
                            </Flexbox>
                        )}

                        {mode === "dice" && (
                            <Flexbox direction="column" gap={4}>
                                <div className="text-center">
                                    <div
                                        className="mx-auto grid h-20 w-20 place-items-center rounded border-2 text-2xl font-bold"
                                        style={{
                                            borderColor:
                                                "var(--color-background-dark)",
                                            backgroundColor:
                                                "var(--color-background-light)",
                                            color: "var(--color-foreground-darker)",
                                        }}
                                    >
                                        {rolls.length > 0
                                            ? rolls[rolls.length - 1]
                                            : "?"}
                                    </div>
                                    <Typography
                                        variant="p"
                                        className="mt-2 text-sm"
                                        style={{
                                            color: "var(--color-foreground-normal)",
                                        }}
                                    >
                                        Last roll
                                    </Typography>
                                </div>
                                <Flexbox direction="column" gap={2}>
                                    <Button
                                        onClick={rollDice}
                                        variant="default"
                                        thickness="normal"
                                        style={{
                                            backgroundColor:
                                                "var(--color-primary-normal)",
                                            color: "white",
                                        }}
                                    >
                                        Roll Dice
                                    </Button>
                                    <Button
                                        onClick={() => runMany(rollDice, 10)}
                                        variant="default"
                                        thickness="normal"
                                        className="text-sm"
                                        style={{
                                            backgroundColor:
                                                "var(--color-primary-light)",
                                            color: "var(--color-primary-darker)",
                                        }}
                                    >
                                        Roll 10 Times
                                    </Button>
                                </Flexbox>
                            </Flexbox>
                        )}

                        {mode === "cards" && (
                            <Flexbox direction="column" gap={4}>
                                <div className="text-center">
                                    <div
                                        className="mx-auto flex h-24 w-16 items-center justify-center rounded border-2 p-1 text-xl font-bold"
                                        style={{
                                            borderColor:
                                                "var(--color-background-dark)",
                                            backgroundColor:
                                                "var(--color-background-light)",
                                            color: "var(--color-foreground-darker)",
                                        }}
                                    >
                                        {drawnCards.length > 0
                                            ? drawnCards[drawnCards.length - 1]
                                            : "🂠"}
                                    </div>
                                    <Typography
                                        variant="p"
                                        className="mt-2 text-sm"
                                        style={{
                                            color: "var(--color-foreground-normal)",
                                        }}
                                    >
                                        Last card
                                    </Typography>
                                </div>
                                <Flexbox direction="column" gap={2}>
                                    <Button
                                        onClick={drawCard}
                                        disabled={cardsLeft === 0}
                                        variant="default"
                                        thickness="normal"
                                        style={{
                                            backgroundColor:
                                                "var(--color-primary-normal)",
                                            color: "white",
                                        }}
                                    >
                                        Draw Card
                                    </Button>
                                    <Typography
                                        variant="p"
                                        className="text-center text-xs"
                                        style={{
                                            color: "var(--color-foreground-light)",
                                        }}
                                    >
                                        {cardsLeft} cards left
                                    </Typography>
                                </Flexbox>
                            </Flexbox>
                        )}
                    </Flexbox>

                    <Flexbox
                        direction="column"
                        gap={4}
                        className="flex-1 rounded-lg p-5"
                        style={{
                            backgroundColor: "var(--color-background-normal)",
                            color: "var(--color-foreground-darker)",
                        }}
                    >
                        <Typography
                            variant="h3"
                            className="font-semibold"
                            style={{ color: "var(--color-foreground-darker)" }}
                        >
                            Results
                        </Typography>

                        {mode === "coin" && (
                            <Flexbox direction="column" gap={2}>
                                <Typography
                                    variant="p"
                                    className="text-sm"
                                    style={{
                                        color: "var(--color-foreground-normal)",
                                    }}
                                >
                                    Flips: {totalFlips}
                                </Typography>
                                <div
                                    style={{
                                        color: "var(--color-foreground-normal)",
                                    }}
                                >
                                    Heads: {flips.heads} ({headsPct}%)
                                </div>
                                <div
                                    style={{
                                        color: "var(--color-foreground-normal)",
                                    }}
                                >
                                    Tails: {flips.tails} ({tailsPct}%)
                                </div>
                                <div
                                    className="mt-3 h-2 w-full rounded-full"
                                    style={{
                                        backgroundColor:
                                            "var(--color-background-dark)",
                                    }}
                                >
                                    <div
                                        className="h-2 rounded-full"
                                        style={{
                                            width: `${headsPct}%`,
                                            backgroundColor:
                                                "var(--color-primary-normal)",
                                        }}
                                    />
                                </div>
                            </Flexbox>
                        )}

                        {mode === "dice" && (
                            <Flexbox direction="column" gap={2}>
                                <Typography
                                    variant="p"
                                    className="text-sm"
                                    style={{
                                        color: "var(--color-foreground-normal)",
                                    }}
                                >
                                    Rolls: {totalRolls}
                                </Typography>
                                {rollCounts.map((count, i) => (
                                    <div key={i} className="text-xs">
                                        {i + 1}: {count} ({rollPcts[i]}%)
                                        <div
                                            className="mt-1 h-1.5 w-full rounded-full"
                                            style={{
                                                backgroundColor:
                                                    "var(--color-background-dark)",
                                            }}
                                        >
                                            <div
                                                className="h-1.5 rounded-full"
                                                style={{
                                                    width: `${rollPcts[i]}%`,
                                                    backgroundColor:
                                                        "var(--color-primary-normal)",
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </Flexbox>
                        )}

                        {mode === "cards" && (
                            <Flexbox direction="column" gap={2}>
                                <Typography
                                    variant="p"
                                    className="text-sm"
                                    style={{
                                        color: "var(--color-foreground-normal)",
                                    }}
                                >
                                    Drawn: {drawnCards.length}
                                </Typography>
                                <Typography
                                    variant="p"
                                    className="text-sm"
                                    style={{
                                        color: "var(--color-foreground-normal)",
                                    }}
                                >
                                    Remaining: {cardsLeft}
                                </Typography>
                                {drawnCards.length > 0 && (
                                    <div className="mt-2 max-h-20 overflow-y-auto text-xs">
                                        <Typography
                                            variant="strong"
                                            style={{
                                                color: "var(--color-foreground-normal)",
                                            }}
                                        >
                                            Drawn:
                                        </Typography>{" "}
                                        {drawnCards.slice(-5).join(", ")}
                                        {drawnCards.length > 5 && " ..."}
                                    </div>
                                )}
                            </Flexbox>
                        )}
                    </Flexbox>
                </Flexbox>

                <Flexbox direction="column" gap={2}>
                    <Typography
                        variant="h3"
                        className="text-sm font-semibold"
                        style={{ color: "var(--color-foreground-darker)" }}
                    >
                        History
                    </Typography>
                    <div
                        className="max-h-32 overflow-y-auto rounded p-2 text-xs"
                        style={{
                            backgroundColor: "var(--color-background-normal)",
                            borderColor: "var(--color-background-dark)",
                            color: "var(--color-foreground-light)",
                        }}
                    >
                        {history.length === 0 ? (
                            <Typography variant="i">No actions yet</Typography>
                        ) : (
                            history
                                .slice(-20)
                                .reverse()
                                .map((h, i) => (
                                    <Typography
                                        key={i}
                                        variant="p"
                                        className="block"
                                    >
                                        {h}
                                    </Typography>
                                ))
                        )}
                    </div>
                </Flexbox>
            </Flexbox>
        </div>
    );
};

export default ProbabilitySimulator;
