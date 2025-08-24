import { useState } from "react";

interface ProbabilitySimulatorProps {
    onClose?: () => void;
}

export const ProbabilitySimulator: React.FC<ProbabilitySimulatorProps> = ({
    onClose,
}) => {
    const [mode, setMode] = useState<"coin" | "dice" | "cards">("coin");
    const [flips, setFlips] = useState<{ heads: number; tails: number }>({
        heads: 0,
        tails: 0,
    });
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
        setFlips((prev) => ({
            ...prev,
            [result]: prev[result] + 1,
        }));
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
        <div className="mx-auto h-4/5 max-w-3xl overflow-auto rounded-xl bg-white p-6 shadow-lg">
            {onClose && (
                <button onClick={onClose} className="absolute -top-8 right-0">
                    ✕
                </button>
            )}
            <h2 className="mb-2 text-2xl font-bold text-gray-800">
                Interactive Probability Lab
            </h2>
            <p className="mb-6 text-sm text-gray-600">
                Run experiments and watch probability in action. See how
                experimental results approach theory!
            </p>

            <div className="mb-6 flex flex-wrap gap-2">
                <button
                    onClick={() => setMode("coin")}
                    className={`rounded-lg px-4 py-2 text-sm font-medium ${
                        mode === "coin"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                >
                    Coin Flips
                </button>
                <button
                    onClick={() => setMode("dice")}
                    className={`rounded-lg px-4 py-2 text-sm font-medium ${
                        mode === "dice"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                >
                    Dice Rolls
                </button>
                <button
                    onClick={() => setMode("cards")}
                    className={`rounded-lg px-4 py-2 text-sm font-medium ${
                        mode === "cards"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                >
                    Card Draw
                </button>
                <button
                    onClick={reset}
                    className="ml-auto rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                >
                    Reset All
                </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div>
                    {mode === "coin" && (
                        <div className="space-y-4">
                            <div className="text-center">
                                <div
                                    className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full text-2xl font-bold transition-transform duration-300 ${
                                        flips.heads + flips.tails > 0 &&
                                        history[history.length - 1].includes(
                                            "heads"
                                        )
                                            ? "scale-110 bg-amber-400"
                                            : "bg-amber-300"
                                    }`}
                                >
                                    {totalFlips > 0
                                        ? history[history.length - 1].includes(
                                              "heads"
                                          )
                                            ? "H"
                                            : "T"
                                        : "?"}
                                </div>
                                <p className="mt-2 text-sm text-gray-600">
                                    Last flip
                                </p>
                            </div>
                            <div className="space-y-2">
                                <button
                                    onClick={flipCoin}
                                    className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
                                >
                                    Flip Coin
                                </button>
                                <button
                                    onClick={() => runMany(flipCoin, 10)}
                                    className="w-full rounded bg-blue-500 py-2 text-sm text-white hover:bg-blue-600"
                                >
                                    Flip 10 Times
                                </button>
                            </div>
                        </div>
                    )}

                    {mode === "dice" && (
                        <div className="space-y-4">
                            <div className="text-center">
                                <div
                                    className={`mx-auto grid h-20 w-20 place-items-center rounded border-2 border-gray-400 bg-white text-2xl font-bold text-black ${
                                        rolls.length > 0 &&
                                        rolls[rolls.length - 1] === 6
                                            ? "animate-bounce"
                                            : ""
                                    }`}
                                >
                                    {rolls.length > 0
                                        ? rolls[rolls.length - 1]
                                        : "?"}
                                </div>
                                <p className="mt-2 text-sm text-gray-600">
                                    Last roll
                                </p>
                            </div>
                            <div className="space-y-2">
                                <button
                                    onClick={rollDice}
                                    className="w-full rounded bg-green-600 py-2 text-white hover:bg-green-700"
                                >
                                    Roll Dice
                                </button>
                                <button
                                    onClick={() => runMany(rollDice, 10)}
                                    className="w-full rounded bg-green-500 py-2 text-sm text-white hover:bg-green-600"
                                >
                                    Roll 10 Times
                                </button>
                            </div>
                        </div>
                    )}

                    {mode === "cards" && (
                        <div className="space-y-4 text-black">
                            <div className="text-center">
                                <div className="mx-auto flex h-24 w-16 items-center justify-center rounded border-2 border-gray-400 bg-white p-1 text-xl font-bold">
                                    {drawnCards.length > 0
                                        ? drawnCards[drawnCards.length - 1]
                                        : "🂠"}
                                </div>
                                <p className="mt-2 text-sm text-gray-600">
                                    Last card
                                </p>
                            </div>
                            <div className="space-y-2">
                                <button
                                    onClick={drawCard}
                                    disabled={cardsLeft === 0}
                                    className="w-full rounded bg-purple-600 py-2 text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                                >
                                    Draw Card
                                </button>
                                <p className="text-center text-xs text-gray-500">
                                    {cardsLeft} cards left
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-4 rounded-lg bg-gray-50 p-5 text-black">
                    <h3 className="font-semibold text-gray-800">Results</h3>

                    {mode === "coin" && (
                        <div>
                            <p className="text-sm">Flips: {totalFlips}</p>
                            <div className="mt-2 space-y-1 text-sm">
                                <div>
                                    Heads: {flips.heads} ({headsPct}%)
                                </div>
                                <div>
                                    Tails: {flips.tails} ({tailsPct}%)
                                </div>
                            </div>
                            <div className="mt-3 h-2 w-full rounded-full bg-gray-200">
                                <div
                                    className="h-2 rounded-full bg-blue-600"
                                    style={{ width: `${headsPct}%` }}
                                ></div>
                            </div>
                        </div>
                    )}

                    {mode === "dice" && (
                        <div>
                            <p className="text-sm">Rolls: {totalRolls}</p>
                            {rollCounts.map((count, i) => (
                                <div key={i} className="mt-1 text-xs">
                                    {i + 1}: {count} ({rollPcts[i]}%)
                                    <div className="mt-1 h-1.5 w-full rounded-full bg-gray-200">
                                        <div
                                            className="h-1.5 rounded-full bg-green-600"
                                            style={{ width: `${rollPcts[i]}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {mode === "cards" && (
                        <div className="">
                            <p className="text-sm">
                                Drawn: {drawnCards.length}
                            </p>
                            <p className="text-sm">Remaining: {cardsLeft}</p>
                            {drawnCards.length > 0 && (
                                <div className="mt-2 max-h-20 overflow-y-auto text-xs">
                                    <strong>Drawn:</strong>{" "}
                                    {drawnCards.slice(-5).join(", ")}
                                    {drawnCards.length > 5 && " ..."}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-6">
                <h3 className="mb-2 text-sm font-semibold text-gray-800">
                    History
                </h3>
                <div className="max-h-32 overflow-y-auto rounded border border-gray-200 bg-gray-50 p-2 text-xs text-gray-600">
                    {history.length === 0 ? (
                        <em>No actions yet</em>
                    ) : (
                        history
                            .slice(-20)
                            .reverse()
                            .map((h, i) => <div key={i}>{h}</div>)
                    )}
                </div>
            </div>
        </div>
    );
};
