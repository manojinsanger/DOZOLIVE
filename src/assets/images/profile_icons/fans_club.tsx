import * as React from "react";
import Svg, {
  Rect,
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const FansClubIcon = (props: any) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect width={24} height={24} rx={6} fill="#FFE9F2" />
    <Rect
      x={14.3013}
      y={7}
      width={8.19907}
      height={3.9213}
      rx={1.96065}
      fill="url(#paint0_linear_2040_94065)"
    />
    <Rect
      x={13.2007}
      y={9.85181}
      width={8.19907}
      height={3.9213}
      rx={1.96065}
      fill="#D9D9D9"
    />
    <Rect
      x={13.2007}
      y={9.85181}
      width={8.19907}
      height={3.9213}
      rx={1.96065}
      fill="url(#paint1_linear_2040_94065)"
    />
    <Rect
      width={8.19907}
      height={3.9213}
      rx={1.96065}
      transform="matrix(-1 0 0 1 9.69971 7)"
      fill="url(#paint2_linear_2040_94065)"
    />
    <Rect
      width={8.19907}
      height={3.9213}
      rx={1.96065}
      transform="matrix(-1 0 0 1 10.8003 9.85181)"
      fill="#D9D9D9"
    />
    <Rect
      width={8.19907}
      height={3.9213}
      rx={1.96065}
      transform="matrix(-1 0 0 1 10.8003 9.85181)"
      fill="url(#paint3_linear_2040_94065)"
    />
    <G filter="url(#filter0_i_2040_94065)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.238 5C18.0117 5 19.8755 7.6075 19.8755 10.04C19.8755 14.9663 12.1405 19 12.0005 19C11.8605 19 4.12549 14.9663 4.12549 10.04C4.12549 7.6075 5.98924 5 8.76299 5C10.3555 5 11.3967 5.79625 12.0005 6.49625C12.6042 5.79625 13.6455 5 15.238 5Z"
        fill="#FE3EA5"
      />
    </G>
    <Path
      opacity={0.2}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.5654 18.7154C13.4697 17.0954 14 15.1251 14 13C14 10.4933 13.2621 8.20199 12.0431 6.44697C12.0285 6.46344 12.0141 6.47987 12 6.49625C11.3962 5.79625 10.355 5 8.7625 5C5.98875 5 4.125 7.6075 4.125 10.04C4.125 14.9663 11.86 19 12 19C12.0219 19 12.23 18.9011 12.5654 18.7154Z"
      fill="url(#paint4_linear_2040_94065)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_2040_94065"
        x1={19.5005}
        y1={8.625}
        x2={22.5005}
        y2={8.625}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FFB0DB" />
        <Stop offset={1} stopColor="#FE3EA5" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_2040_94065"
        x1={18.3999}
        y1={11.4768}
        x2={21.3999}
        y2={11.4768}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FFB0DB" />
        <Stop offset={1} stopColor="#FE3EA5" />
      </LinearGradient>
      <LinearGradient
        id="paint2_linear_2040_94065"
        x1={5.19922}
        y1={1.625}
        x2={8.19922}
        y2={1.625}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FFB0DB" />
        <Stop offset={1} stopColor="#FE3EA5" />
      </LinearGradient>
      <LinearGradient
        id="paint3_linear_2040_94065"
        x1={5.19922}
        y1={1.625}
        x2={8.19922}
        y2={1.625}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FFB0DB" />
        <Stop offset={1} stopColor="#FE3EA5" />
      </LinearGradient>
      <LinearGradient
        id="paint4_linear_2040_94065"
        x1={14}
        y1={12}
        x2={3}
        y2={12.5}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="white" />
        <Stop offset={1} stopColor="white" stopOpacity={0} />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default FansClubIcon;
