import { Dimensions } from "react-native";

let { width, height } = Dimensions.get("window");

Dimensions.addEventListener("change", ({ window }) => {
  width = window.width;
  height = window.height;
});

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const scaleWidth = (size: number) => (width / guidelineBaseWidth) * size;
export const scaleHeight = (size: number) =>
  (height / guidelineBaseHeight) * size;
export const scaleFont = (size: number) =>
  Math.round((size * width) / guidelineBaseWidth);
export const fullWidth = (percentage: number = 100) =>
  (width * percentage) / 100;
export const fullHeight = (percentage: number = 100) =>
  (height * percentage) / 100;

export const defaultPadding = scaleWidth(20);
