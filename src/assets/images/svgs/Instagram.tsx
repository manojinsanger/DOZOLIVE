import { SvgProps } from '@/types/types';
import * as React from 'react';
import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';



const Instagram: React.FC<SvgProps> = ({ width = 38, height = 38 }) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 39 38" fill="none">
            <Circle cx="19.259" cy="19" r="19" fill="url(#paint0_linear_3963_63013)" />
            <Rect x="9.00006" y="8" width="21" height="21" rx="5" stroke="white" stroke-width="2" />
            <Rect x="15.0001" y="14" width="9" height="9" rx="4.5" stroke="white" stroke-width="2" />
            <Rect x="25.0001" y="12" width="1" height="1" rx="0.5" stroke="white" stroke-width="2" />
            <Defs>
                <LinearGradient id="gradient" x1="20.171" y1="45.372" x2="45.859" y2="18.316" gradientUnits="userSpaceOnUse">
                    <Stop offset="0" stopColor="#F7934A" />
                    <Stop offset="0.482" stopColor="#BC3080" />
                    <Stop offset="1" stopColor="#814AAA" />
                </LinearGradient>
            </Defs>
        </Svg>

    );
};

export default Instagram;

