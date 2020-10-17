/** @jsx jsx */
import { jsx } from "theme-ui";

import * as React from "react";
import styled from "@emotion/styled";

// type VerticalAlignment = "top" | "middle" | "bottom" | "between" | "around" | "evenly" | "baseline" | "stretch" | "";
// type HorizontalAlignment = "left" | "center" | "right" | "between" | "around" | "evenly" | "baseline" | "stretch" |  "";
// type FlexDirection = "vertical" | "horizontal";

// VStack

// const getDirection = (direction?: FlexDirection) => {
//     if (direction && direction === "vertical") {
//         return {
//             flexDirection: "column"
//         };
//     }
// };

// const getStretch = (stretch?: boolean) => {
//     if (stretch) {
//         return {
//             "> div": {
//                 flexBasis: "stretch",
//                 flexGrow: 1
//             }
//         };
//     }
// };

// const getShrink = (shrink?: boolean) => {
//     if (shrink) {
//         return {
//             flex: "0 0 auto !important",
//             flexGrow: "0 !important"
//         };
//     }
// };

// const getGap = (gap: GapSizes, direction?: FlexDirection) => {
//     if (gap) {
//         if (direction && direction === "vertical") {
//             return {
//                 "> * + *": {
//                     marginTop: getGapValue(gap)
//                 }
//             };
//         } else {
//             return {
//                 "> * + *": {
//                     marginLeft: getGapValue(gap)
//                 }
//             };
//         }
//     }
// };

// const getAxis = (hAlignment: HorizontalAlignment, vAlignment: VerticalAlignment, direction: FlexDirection ) => {

//     let primaryAxis = '';
//     let secondaryAxis = '';

//     switch (hAlignment) {
//         case 'left':
//             primaryAxis = 'flex-start';
//             break
//         case 'center':
//             primaryAxis = 'center';
//             break
//         case 'right':
//             primaryAxis = 'flex-end';
//             break
//         case 'between':
//             primaryAxis = 'space-between';
//             break
//         case 'around':
//             primaryAxis = 'space-around';
//             break
//         case 'evenly':
//             primaryAxis = 'space-evenly';
//             break
//     }
//     if (direction === 'horizontal') {

//         switch (vAlignment) {
//             case 'top':
//                 secondaryAxis = 'flex-start';
//                 break
//             case 'middle':
//                 secondaryAxis = 'center';
//                 break
//             case 'bottom':
//                 secondaryAxis = 'flex-end';
//                 break

//         }
//     }
//     // if vertical flip it
//     if (direction === 'vertical') {
//         switch (hAlignment) {
//             case 'left':
//                 secondaryAxis = 'flex-start';
//                 break
//             case 'center':
//                 secondaryAxis = 'center';
//                 break
//             case 'right':
//                 secondaryAxis = 'flex-end';
//                 break

//         }
//         switch (vAlignment) {
//             case 'top':
//                 primaryAxis = 'flex-start';
//                 break
//             case 'middle':
//                 primaryAxis = 'center';
//                 break
//             case 'bottom':
//                 primaryAxis = 'flex-end';
//                 break
//             case 'between':
//                 primaryAxis = 'space-between';
//                 break
//             case 'around':
//                 primaryAxis = 'space-around';
//                 break
//             case 'evenly':
//                 primaryAxis = 'space-evenly';
//                     break
//         }
//     }

//     return {
//         alignItems: secondaryAxis,
//         justifyContent: primaryAxis
//     }
// }

// const getCss = (props: VStackProps): any => {
//     const { gap = '', direction = "horizontal", stretch, shrink, hAlignment = "", vAlignment = "" } = props;
//     return {
//         ...getDirection(direction),
//         ...getGap(gap, direction),
//         ...getStretch(stretch),
//         ...getShrink(shrink),
//         ...getAxis(hAlignment,vAlignment, direction)
//     };
// };

// const getGapValue = (gap: GapSizes): number => {
//     switch (gap) {
//         case "small":
//             return 2;
//         case "medium":
//             return 4;
//         case "large":
//             return 5;
//         default:
//             break;
//     }
//     return 0;
// };

type GapSizes = "none" | "s" | "m" | "l" | "xl";

export type VStackProps = {
  children: React.ReactNode;
  gap?: GapSizes;
  pad?: GapSizes;
  grow?: boolean;
  shrink?: boolean[];
  fill?: string;
  style?: any;
  onClick?: () => void;
  yAlign?: YAlign;
};

const StyledVStack = styled.div<any>`
  display: grid;
`;
type YAlign =
  | "top"
  | "middle"
  | "bottom"
  | "between"
  | "between"
  | "around"
  | "evenly";

const getGapSize = (gap: GapSizes): number => {
  switch (gap) {
    case "none":
      return 0;
    case "s":
      return 1;
    case "m":
      return 2;
    case "l":
      return 3;
    case "xl":
      return 4;
  }
};
const getYAlign = (yAlign: YAlign): string => {
  switch (yAlign) {
    case "top":
      return "start";
    case "middle":
      return "center";
    case "bottom":
      return "end";
    case "between":
      return "space-between";
    case "around":
      return "space-around";
    case "evenly":
      return "space-evenly";
  }
};
const VStack: React.FC<VStackProps> = ({
  children,
  grow = true,
  yAlign = "top",
  pad,
  gap,
  style,
  onClick,
  shrink
}) => {
  const columnCount = !Array.isArray(children) ? 1 : children.length;

  const data = shrink || new Array(columnCount).fill(false);
  const steps = data.map(item => (!!item ? "min-content" : "1fr")).join(" ");

  const gapSize = getGapSize(gap);
  return (
    <StyledVStack
      sx={{
        color: "background",
        gridGap: gapSize,
        gridTemplateRows: `${steps}`,
        height: grow ? "100%" : "auto",
        alignContent: getYAlign(yAlign)
      }}
      onClick={!!onClick ? onClick : undefined}
      style={style}
    >
      {children && children}
    </StyledVStack>
  );
};

export default VStack;
