import * as React from "react";
import Svg, { Rect, Path, Defs, LinearGradient, Stop } from "react-native-svg";
const AuthIcon = (props: any) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect width={24} height={24} rx={6} fill="#E2EDF9" />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.1257 18.9383H7.02441C5.94091 18.9383 5.0617 18.06 5.0617 16.9756V15.687C5.0617 15.1668 4.85472 14.6674 4.48666 14.2993L3.57504 13.3877C2.80832 12.621 2.80832 11.3791 3.57504 10.6124L4.48666 9.70075C4.85472 9.33268 5.0617 8.83413 5.0617 8.31308V7.02441C5.0617 5.94091 5.94001 5.0617 7.02441 5.0617H8.31308C8.83323 5.0617 9.33268 4.85472 9.70075 4.48666L10.6124 3.57504C11.3791 2.80832 12.621 2.80832 13.3877 3.57504L14.2993 4.48666C14.6674 4.85472 15.1668 5.0617 15.687 5.0617H16.9756C18.0591 5.0617 18.9383 5.94001 18.9383 7.02441V8.31308C18.9383 8.83323 19.1453 9.33268 19.5134 9.70075L20.425 10.6124C21.1917 11.3791 21.1917 12.621 20.425 13.3877L19.5134 14.2993C19.1453 14.6674 18.9383 15.1668 18.9383 15.687V16.9756C18.9383 18.0591 18.06 18.9383 16.9756 18.9383H15.687C15.1668 18.9383 14.6674 19.1453 14.2993 19.5134L13.3877 20.425C12.621 21.1917 11.3791 21.1917 10.6124 20.425L9.1257 18.9383Z"
      fill="url(#paint0_linear_2043_94284)"
    />
    <Path
      d="M11.1001 13.7998L9.30029 12"
      stroke="white"
      strokeWidth={1.34987}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14.6997 10.2002L11.1001 13.7998"
      stroke="white"
      strokeWidth={1.34987}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_2043_94284"
        x1={12}
        y1={3}
        x2={12}
        y2={21}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#48D4FB" />
        <Stop offset={1} stopColor="#0F82F7" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default AuthIcon;
