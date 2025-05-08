import * as React from "react";
import Svg, { Path } from "react-native-svg";
const GuardianIcon = (props: any) => (
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
      d="M20 11.1821C20 15.7231 16.587 19.9691 12 21.0001C7.413 19.9691 4 15.7231 4 11.1821V7.61506C4 6.80306 4.491 6.07106 5.243 5.76406L10.243 3.71806C11.369 3.25706 12.631 3.25706 13.757 3.71806L18.757 5.76406C19.509 6.07206 20 6.80306 20 7.61506V11.1821V11.1821Z"
      stroke="#323232"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.25 10.125L11.5 13.875L9.25 11.625"
      stroke="#8287FF"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default GuardianIcon;
