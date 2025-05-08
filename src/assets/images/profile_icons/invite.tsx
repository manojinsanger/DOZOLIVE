import * as React from "react";
import Svg, { Rect, Path, Defs, LinearGradient, Stop } from "react-native-svg";
const InviteIcon = (props: any) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect width={24} height={24} rx={6} fill="#FDE8E7" />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 3C5.89543 3 5 3.89543 5 5V10.6812C5 11.4813 5.47679 12.2043 6.21216 12.5195L11.2122 14.6624C11.7153 14.878 12.2847 14.878 12.7878 14.6624L17.7878 12.5195C18.5232 12.2043 19 11.4813 19 10.6812V5C19 3.89543 18.1046 3 17 3H7ZM3 18.1579C3 19.7277 4.343 21 6 21H18C19.657 21 21 19.7277 21 18.1579V12L13.1913 15.4599C12.4152 15.8037 11.5297 15.8027 10.7544 15.4571L3 12V18.1579Z"
      fill="url(#paint0_linear_2043_94362)"
    />
    <Path
      d="M12.0264 6.32895V5.61842"
      stroke="white"
      strokeWidth={1.42105}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.0264 10.5921V11.3026"
      stroke="white"
      strokeWidth={1.42105}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.793 10.0842C10.9768 10.3855 11.2914 10.5939 11.6713 10.5939H12.0265H12.45C13.0014 10.5939 13.4476 10.1467 13.4476 9.5963C13.4476 9.13872 13.1359 8.73988 12.6925 8.62809L11.3605 8.29367C10.9172 8.18188 10.6055 7.78304 10.6055 7.32546C10.6055 6.77409 11.0526 6.32788 11.603 6.32788H12.0265H12.3818C12.7607 6.32788 13.0743 6.53535 13.2581 6.83567"
      stroke="white"
      strokeWidth={1.42105}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_2043_94362"
        x1={5}
        y1={3}
        x2={18.5}
        y2={21}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FE9A9D" />
        <Stop offset={1} stopColor="#FF5657" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default InviteIcon;
