import * as React from "react";
import Svg, { Path, Rect } from "react-native-svg";
const LiveDataIcon = (props: any) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M16 10.2924L19.4752 8.15023C19.7837 7.96003 20.171 7.95165 20.4875 8.12832C20.8039 8.30499 21 8.63906 21 9.00149V15.9983C21 16.3607 20.8039 16.6948 20.4875 16.8714C20.171 17.0481 19.7838 17.0397 19.4753 16.8496L16 14.7074"
      stroke="#323232"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Rect
      x={3}
      y={6}
      width={13}
      height={13}
      rx={3}
      stroke="#323232"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13 10L10 13L8.5 11L6 14"
      stroke="#8287FF"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default LiveDataIcon;
