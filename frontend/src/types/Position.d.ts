type Alignment = "start" | "center" | "end";
type Direction = "top" | "right" | "bottom" | "left";

type Position = `${Direction}-${Alignment}`;
type PositionClassNames = Record<Position, string>;

type Orientation = "landscape" | "portrait";
