import * as React from "react";
import Svg, { Path, Rect } from "react-native-svg";
const PayRoleIcon = (props: any) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M5 8H4.5C3.11929 8 2 9.11929 2 10.5V17.5C2 18.8807 3.11929 20 4.5 20H15.5C16.8807 20 18 18.8807 18 17.5V17"
      stroke="#323232"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Rect
      x={5}
      y={4}
      width={17}
      height={13}
      rx={2.5}
      stroke="#323232"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.5002 7V7.77778"
      stroke="#8287FF"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.5002 13.9999V13.2222"
      stroke="#8287FF"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.2054 8.88312C14.9421 8.17953 14.2498 7.73081 13.5 7.7778C12.6294 7.69521 11.8522 8.32305 11.75 9.19156C11.75 9.74886 12.1434 10.2287 12.6899 10.338L14.3101 10.6621C14.8566 10.7714 15.25 11.2512 15.25 11.8085C15.1478 12.677 14.3706 13.3048 13.5 13.2222C12.7502 13.2692 12.0579 12.8205 11.7946 12.1169"
      stroke="#8287FF"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default PayRoleIcon;
