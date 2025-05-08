import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";
const OfficialServiceIcon = (props: any) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M16.7058 19.9999V19.1175C16.7058 17.1683 15.1256 15.5881 13.1764 15.5881H10"
      stroke="#323232"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
      cx={10.5294}
      cy={8.52941}
      r={3.52941}
      stroke="#323232"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22.0001 19.9999V19.1175C22.0001 17.1683 20.4199 15.5881 18.4707 15.5881V15.5881"
      stroke="#323232"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.8237 5C17.773 5 19.3531 6.58017 19.3531 8.52941C19.3531 10.4787 17.773 12.0588 15.8237 12.0588"
      stroke="#323232"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.5 17.6582C7.5 19.2039 6.32678 20.6491 4.75 21C3.17322 20.6491 2 19.2039 2 17.6582V16.4441C2 16.1677 2.16878 15.9186 2.42728 15.8141L4.14603 15.1177C4.53309 14.9608 4.96691 14.9608 5.35397 15.1177L7.07272 15.8141C7.33122 15.9189 7.5 16.1677 7.5 16.4441V17.6582V17.6582Z"
      fill="#8287FF"
      stroke="#8287FF"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5.91236 17L4.5917 18.3207L3.7998 17.5279"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default OfficialServiceIcon;
