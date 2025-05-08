import * as React from "react";
import Svg, { Path } from "react-native-svg";
const LevelIcon = (props: any) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.0416 7.63069L16.272 8.1857L13.1583 5.06592C12.8513 4.75831 12.4345 4.58545 11.9999 4.58545C11.5653 4.58545 11.1485 4.75831 10.8415 5.06592L7.72784 8.1857L4.95818 7.63069C4.40461 7.51977 3.83296 7.702 3.44571 8.11283C3.05846 8.52366 2.9103 9.10507 3.05371 9.65113L5.27117 18.0939C5.46008 18.8133 6.11031 19.3148 6.85407 19.3148H17.1457C17.8895 19.3148 18.5397 18.8133 18.7286 18.0939L20.9461 9.65108C21.0895 9.10503 20.9413 8.52363 20.5541 8.11282C20.1668 7.702 19.5952 7.51978 19.0416 7.63069Z"
      stroke="#323232"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11.5907 13.6696V13.6686C11.591 13.4433 11.7738 13.2607 11.9992 13.2609C12.2246 13.261 12.4072 13.4438 12.4072 13.6691C12.4072 13.8945 12.2246 14.0773 11.9992 14.0774C11.7738 14.0775 11.591 13.895 11.5907 13.6696"
      stroke="#8287FF"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default LevelIcon;
