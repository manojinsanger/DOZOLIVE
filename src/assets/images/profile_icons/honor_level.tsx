import * as React from "react";
import Svg, { Rect, Path, Defs, LinearGradient, Stop } from "react-native-svg";
const HonorLevelIcon = (props: any) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect width={24} height={24} rx={6} fill="#ECE1FF" />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.69189 9.41874V14.5813C3.69189 15.9523 4.42331 18.3145 5.61062 19L7.5 20.4859L9 21L10.0815 21.5C11.2688 22.1855 14.3127 21.6855 15.5 21L18.5 19C19.5 17.5 20.3086 15.9523 20.3086 14.5813V9.41874C20.3086 8.04774 19.5772 6.78089 18.3899 6.09539L13.919 3.51413C12.7317 2.82862 11.2688 2.82862 10.0815 3.51413L5.61062 6.09539C4.42331 6.78089 3.69189 8.04774 3.69189 9.41874Z"
      fill="url(#paint0_linear_2043_94339)"
    />
    <Path
      opacity={0.8}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22.701 9C14.0838 9.29714 11.3105 17.7905 11.001 22C15.0478 21.7977 17.6739 20.0276 19.3863 17.8553L20.844 17.543C21.0131 16.8667 20.9497 16.1583 20.818 15.5821C20.8915 15.4353 20.9621 15.2884 21.0297 15.1418L21.9583 14.9429C22.1423 14.2069 22.051 13.433 21.8959 12.8327C21.946 12.6652 21.9927 12.5006 22.0364 12.3394L22.8865 12.1572C23.1449 11.1239 22.8604 10.0157 22.619 9.41838C22.6579 9.15022 22.6806 9 22.701 9Z"
      fill="url(#paint1_linear_2043_94339)"
    />
    <Path
      opacity={0.8}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.07437 9C9.69151 9.29714 12.4648 17.7905 12.7744 22C8.72749 21.7977 6.10137 20.0276 4.38892 17.8552L2.93179 17.543C2.76278 16.8669 2.82608 16.1589 2.95766 15.5828C2.88399 15.4357 2.81333 15.2886 2.74555 15.1417L1.81753 14.9429C1.63364 14.2073 1.72478 13.4338 1.87966 12.8336C1.8295 12.6658 1.78268 12.5009 1.73895 12.3394L0.888822 12.1572C0.630485 11.1239 0.914929 10.0157 1.15635 9.41838C1.11742 9.15022 1.09477 9 1.07437 9Z"
      fill="url(#paint2_linear_2043_94339)"
    />
    <Path
      d="M10.4438 11.9714L11.7438 16.4286L14.5296 11.9714"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_2043_94339"
        x1={12.0002}
        y1={3}
        x2={12.0002}
        y2={21}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#DEC7FF" />
        <Stop offset={1} stopColor="#8B64FE" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_2043_94339"
        x1={16.9949}
        y1={9}
        x2={16.9949}
        y2={22}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#DFD3FF" />
        <Stop offset={1} stopColor="#B89AFE" />
      </LinearGradient>
      <LinearGradient
        id="paint2_linear_2043_94339"
        x1={6.78049}
        y1={9}
        x2={6.78049}
        y2={22}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#DFD3FF" />
        <Stop offset={1} stopColor="#B89AFE" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default HonorLevelIcon;
