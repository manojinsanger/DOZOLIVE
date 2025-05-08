import * as React from "react";
import Svg, { Path } from "react-native-svg";
const AddHost = (props: any) => (
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
      d="M21 8.0011C21 5.23959 18.7609 3 16 3C13.2391 3 11.0022 5.23959 11 7.9989L13.5 10.4994L16 13C18.7609 13 21 10.7626 21 8.0011Z"
      stroke="#323232"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11 8.5L6.82845 14.1846L5.23745 16.2889C4.88365 16.7571 4.93014 17.4124 5.34405 17.8273L6.173 18.6561C6.58691 19.0711 7.2435 19.1153 7.71184 18.7627L9.81654 17.172L15.5 12.5"
      stroke="#323232"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5.5 18.5L3 21"
      stroke="#323232"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 18.5H21"
      stroke="#8287FF"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18.5 16L18.5 21"
      stroke="#8287FF"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default AddHost;
