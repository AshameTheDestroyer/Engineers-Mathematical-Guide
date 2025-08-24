import { FC, useState } from "react";
import { Locale } from "../Locale/Locale";
import { Button, ButtonProps } from "@/components/Button/Button";
import { DropDown, DropDownProps } from "@/components/DropDown/DropDown";
import {
    DropDownList,
    DropDownListProps,
} from "@/components/DropDownList/DropDownList";

import cog_icon from "@icons/cog.svg";
import DerivativeIntegralCalculator from "./components/DerivativeIntegralCalculator";
import DerivativeViewer from "./components/DerivativeViewer";
import { MathGraphWidget } from "./components/MathGraphWidget";
import MatrixCalculator from "./components/MatrixCalculator";
import { ProbabilityRulesExplorer } from "./components/ProbabilityRulesExplorer";
import { ProbabilitySimulator } from "./components/ProbabilitySimulator";
import { UnitCircleWidget } from "./components/UnitCircleWidget";

export type MathToolsDropDownListProps = Omit<
    DropDownListProps,
    "children" | "icon"
> & {
    onToolSelect?: (tool: React.ReactNode) => void;
};

export const MathToolsDropDownList: FC<MathToolsDropDownListProps> = ({
    id,
    ref,
    className,
    onToolSelect,
    ...props
}) => {
    const nestedDropDownIcon: DropDownProps["icon"] = {
        placement: "left",
        className: "-rotate-90",
    };

    const tools = [
        {
            name: "DerivativeIntegralCalculator",
            component: (
                <DerivativeIntegralCalculator
                    onClose={() => onToolSelect?.(null)}
                />
            ),
        },
        // { name: "DerivativeViewer", component: <DerivativeViewer /> },
        {
            name: "MathGraphWidget",
            component: <MathGraphWidget onClose={() => onToolSelect?.(null)} />,
        },
        {
            name: "MatriciesCalculator",
            component: (
                <MatrixCalculator onClose={() => onToolSelect?.(null)} />
            ),
        },
        {
            name: "ProbabilityRulesExplorer",
            component: (
                <ProbabilityRulesExplorer
                    onClose={() => onToolSelect?.(null)}
                />
            ),
        },
        {
            name: "ProbabilitySimulator",
            component: (
                <ProbabilitySimulator onClose={() => onToolSelect?.(null)} />
            ),
        },
        {
            name: "UnitCirculeWidget",
            component: (
                <UnitCircleWidget onClose={() => onToolSelect?.(null)} />
            ),
        },
    ];

    return (
        <DropDownList
            id={id}
            ref={ref}
            className={className}
            icon={{ source: cog_icon }}
            {...props}
        >
            {tools.map((tool, index) => (
                <Button
                    key={index}
                    doesTextGrow
                    onClick={() => onToolSelect?.(tool.component)}
                    variant="default"
                >
                    <span className="text-sm font-medium">{tool.name}</span>
                </Button>
            ))}
        </DropDownList>
    );
};

// import React, { useState } from "react";
// import MatrixCalculator from "./components/MatriciesCalculator";
// import DerivativeIntegralCalculator from "./components/DerivativeIntegralCalculator";
// // import VectorMatrixVisualizer from './components/VectorMatrixVisualizer';
// import { UnitCircleWidget } from "./components/UnitCirculeWidget";
// import { PolygonFromAnglesBuilder } from "./components/PolygonFromAnglesBuilder";
// import { PolygonAngleExplorer } from "./components/PolygonAngleExplorer";
// import { ProbabilityRulesExplorer } from "./components/ProbabilityRulesExplorer";
// import { MathGraphWidget } from "./components/MathGraphWidget";
// import DerivativeViewer from "./components/DerivativeViewer";
// import { ProbabilitySimulator } from "./components/ProbabilitySimulator";

// // Define the calculator names as a union type
// type CalculatorName =
//     | "matricesCalc"
//     | "derivativeIntegralCalculator"
//     | "derivativeViewer"
//     | "mathGraphWidget"
//     | "probabilityRulesExplorer"
//     | "probabilitySimulator"
//     | "unitCircleWidget"
//     | "vectorMatrixVisualizer";

// function MathToolsBar() {
//     const [calcName, setCalcName] = useState<CalculatorName | "">("");
//     const [isShowMathToolsBar, setIsShowMathToolsBar] = useState(true);

//     if (isShowMathToolsBar) {
//         return (
//             <section className="flex flex-col gap-5 overflow-hidden border-b-2 border-gray-200">
//                 <div className="flex flex-wrap items-center gap-2 bg-red-400 p-2">
//                     {/* Matrices Calculator Button */}
//                     <button
//                         className={`rounded p-2 transition-colors ${
//                             calcName === "matricesCalc"
//                                 ? "bg-white font-medium text-blue-600"
//                                 : "hover:bg-red-300"
//                         }`}
//                         onClick={() =>
//                             setCalcName(
//                                 calcName === "matricesCalc"
//                                     ? ""
//                                     : "matricesCalc"
//                             )
//                         }
//                     >
//                         {/* {calcName === 'matricesCalc' ? 'Close' : 'Matrices Calculator'} */}
//                         Matrices Calculator
//                     </button>

//                     {/* Derivative Integral Calculator */}
//                     <button
//                         className={`rounded p-2 transition-colors ${
//                             calcName === "derivativeIntegralCalculator"
//                                 ? "bg-white font-medium text-blue-600"
//                                 : "hover:bg-red-300"
//                         }`}
//                         onClick={() =>
//                             setCalcName(
//                                 calcName === "derivativeIntegralCalculator"
//                                     ? ""
//                                     : "derivativeIntegralCalculator"
//                             )
//                         }
//                     >
//                         Derivative Integral Calculator
//                     </button>

//                     {/* Derivative Viewer */}
//                     <button
//                         className={`rounded p-2 transition-colors ${
//                             calcName === "derivativeViewer"
//                                 ? "bg-white font-medium text-blue-600"
//                                 : "hover:bg-red-300"
//                         }`}
//                         onClick={() =>
//                             setCalcName(
//                                 calcName === "derivativeViewer"
//                                     ? ""
//                                     : "derivativeViewer"
//                             )
//                         }
//                     >
//                         Derivative Viewer
//                     </button>

//                     {/* Math Graph Widget */}
//                     <button
//                         className={`rounded p-2 transition-colors ${
//                             calcName === "mathGraphWidget"
//                                 ? "bg-white font-medium text-blue-600"
//                                 : "hover:bg-red-300"
//                         }`}
//                         onClick={() =>
//                             setCalcName(
//                                 calcName === "mathGraphWidget"
//                                     ? ""
//                                     : "mathGraphWidget"
//                             )
//                         }
//                     >
//                         Math Graph Widget
//                     </button>

//                     {/* Probability Rules Explorer */}
//                     <button
//                         className={`rounded p-2 transition-colors ${
//                             calcName === "probabilityRulesExplorer"
//                                 ? "bg-white font-medium text-blue-600"
//                                 : "hover:bg-red-300"
//                         }`}
//                         onClick={() =>
//                             setCalcName(
//                                 calcName === "probabilityRulesExplorer"
//                                     ? ""
//                                     : "probabilityRulesExplorer"
//                             )
//                         }
//                     >
//                         Probability Rules Explorer
//                     </button>

//                     {/* Probability Simulator */}
//                     <button
//                         className={`rounded p-2 transition-colors ${
//                             calcName === "probabilitySimulator"
//                                 ? "bg-white font-medium text-blue-600"
//                                 : "hover:bg-red-300"
//                         }`}
//                         onClick={() =>
//                             setCalcName(
//                                 calcName === "probabilitySimulator"
//                                     ? ""
//                                     : "probabilitySimulator"
//                             )
//                         }
//                     >
//                         Probability Simulator
//                     </button>

//                     {/* Unit Circle Widget */}
//                     <button
//                         className={`rounded p-2 transition-colors ${
//                             calcName === "unitCircleWidget"
//                                 ? "bg-white font-medium text-blue-600"
//                                 : "hover:bg-red-300"
//                         }`}
//                         onClick={() =>
//                             setCalcName(
//                                 calcName === "unitCircleWidget"
//                                     ? ""
//                                     : "unitCircleWidget"
//                             )
//                         }
//                     >
//                         Unit Circle Widget
//                     </button>

//                     {/* Vector Matrix Visualizer */}
//                     {/* <button
//             className={`p-2 rounded transition-colors ${
//               calcName === 'vectorMatrixVisualizer'
//                 ? 'bg-white text-blue-600 font-medium'
//                 : 'hover:bg-red-300'
//             }`}
//             onClick={() =>
//               setCalcName(
//                 calcName === 'vectorMatrixVisualizer'
//                   ? ''
//                   : 'vectorMatrixVisualizer'
//               )
//             }
//           >
//             Vector Matrix Visualizer
//           </button> */}

//                     {/* Close Button */}
//                     <button
//                         className="ml-auto rounded bg-gray-200 p-2 text-lg font-bold hover:bg-gray-300"
//                         onClick={() => setIsShowMathToolsBar(false)}
//                         aria-label="Close math tools bar"
//                     >
//                         x
//                     </button>
//                 </div>

//                 <main className={calcName ? "min-h-40 p-4" : "hidden"}>
//                     {calcName === "matricesCalc" && <MatrixCalculator />}
//                     {calcName === "derivativeIntegralCalculator" && (
//                         <DerivativeIntegralCalculator />
//                     )}
//                     {/* {calcName === 'vectorMatrixVisualizer' && <VectorMatrixVisualizer />} */}
//                     {calcName === "derivativeViewer" && <DerivativeViewer />}
//                     {calcName === "mathGraphWidget" && <MathGraphWidget />}
//                     {calcName === "probabilityRulesExplorer" && (
//                         <ProbabilityRulesExplorer />
//                     )}
//                     {calcName === "probabilitySimulator" && (
//                         <ProbabilitySimulator />
//                     )}
//                     {calcName === "unitCircleWidget" && <UnitCircleWidget />}
//                     <PolygonAngleExplorer />
//                 </main>
//             </section>
//         );
//     }

//     return (
//         <button
//             className="bg-yellow-300 p-5 font-medium transition hover:bg-yellow-400"
//             onClick={() => setIsShowMathToolsBar(true)}
//         >
//             Open Math Tools
//         </button>
//     );
// }

// export default MathToolsBar;
