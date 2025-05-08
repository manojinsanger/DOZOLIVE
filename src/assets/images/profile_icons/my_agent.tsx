import * as React from "react";
import Svg, { Path } from "react-native-svg";
const MyAgentIcon = (props: any) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M14.6203 4.08543C16.0675 5.53267 16.0675 7.8791 14.6203 9.32634C13.173 10.7736 10.8266 10.7736 9.37938 9.32634C7.93213 7.8791 7.93213 5.53267 9.37938 4.08543C10.8266 2.63819 13.173 2.63819 14.6203 4.08543"
      stroke="#323232"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.5293 18.8823V19.9412C3.5293 20.5256 4.00365 21 4.58812 21H19.4117C19.9961 21 20.4705 20.5256 20.4705 19.9412V18.8823C20.4705 15.6783 16.286 13.5967 11.9999 13.5967C7.71377 13.5967 3.5293 15.6783 3.5293 18.8823Z"
      stroke="#323232"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 17.5L9.5 19.5V15.5L12 17.5L14.5 15.5V19.5L12 17.5Z"
      fill="#8287FF"
    />
  </Svg>
);
export default MyAgentIcon;
