// // FileName: MathTools.tsx

// import React, { useState } from "react";
// import { Button } from "@/components/Button/Button";
// import { DropDown } from "@/components/DropDown/DropDown";
// import { DropDownList } from "../DropDownList/DropDownList";

// import mathware from "@/assets/icons/mathware.svg";

// import { DerivativeIntegralCalculator } from "./DerivativeIntegralCalculator";

// import MatrixCalculator from "./MatrixCalculator";
// import { MathGraphWidget } from "./MathGraphWidget";
// import ScientificCalculator from "./ScientificCalculator";
// import UnitCircleWidget from "./UnitCircleWidget";
// import ProbabilityRulesExplorer from "./ProbabilityRulesExplorer";
// import ProbabilitySimulator from "./ProbabilitySimulator";

// export type CalculatorType =
//     | "derivative-integral"
//     | "math-graph"
//     | "matrix"
//     | "probability-rules"
//     | "probability-simulator"
//     | "scientific"
//     | "unit-circle"
//     | null;

// export const MathTools: React.FC = () => {
//     const [activeCalculator, setActiveCalculator] =
//         useState<CalculatorType>(null);

//     const closeActiveCalculator = () => {
//         setActiveCalculator(null);
//     };

//     const mathware_icon = "/frontend/src/assets/icons/cloud.svg";

//     return (
//         <>
//             <DropDownList icon={mathware_icon} position="bottom-end">
//                 <DropDown text="Calculators" position="bottom-end">
//                     <Button onClick={() => setActiveCalculator("scientific")}>
//                         Scientific Calculator
//                     </Button>
//                     <Button
//                         onClick={() =>
//                             setActiveCalculator("derivative-integral")
//                         }
//                     >
//                         Derivative & Integral
//                     </Button>
//                     <Button onClick={() => setActiveCalculator("math-graph")}>
//                         Math Graph
//                     </Button>
//                     <Button onClick={() => setActiveCalculator("matrix")}>
//                         Matrix Calculator
//                     </Button>
//                     <Button
//                         onClick={() => setActiveCalculator("probability-rules")}
//                     >
//                         Probability Rules
//                     </Button>
//                     <Button
//                         onClick={() =>
//                             setActiveCalculator("probability-simulator")
//                         }
//                     >
//                         Probability Simulator
//                     </Button>
//                     <Button onClick={() => setActiveCalculator("unit-circle")}>
//                         Unit Circle
//                     </Button>
//                 </DropDown>
//             </DropDownList>

//             {activeCalculator === "scientific" && (
//                 <ScientificCalculator onClose={closeActiveCalculator} />
//             )}
//             {activeCalculator === "derivative-integral" && (
//                 <DerivativeIntegralCalculator onClose={closeActiveCalculator} />
//             )}
//             {activeCalculator === "math-graph" && (
//                 <MathGraphWidget onClose={closeActiveCalculator} />
//             )}
//             {activeCalculator === "matrix" && (
//                 <MatrixCalculator onClose={closeActiveCalculator} />
//             )}
//             {activeCalculator === "probability-rules" && (
//                 <ProbabilityRulesExplorer onClose={closeActiveCalculator} />
//             )}
//             {activeCalculator === "probability-simulator" && (
//                 <ProbabilitySimulator onClose={closeActiveCalculator} />
//             )}
//             {activeCalculator === "unit-circle" && (
//                 <UnitCircleWidget onClose={closeActiveCalculator} />
//             )}
//         </>
//     );
// };
