import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Svg, { Path, SvgProps } from 'react-native-svg';


const Facebook: React.FC<SvgProps> = ({ width = 20, height = 20 }) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 10 21" fill="none">
            <Path d="M9.30095 10.0793H6.54295V20.1793H2.36495V10.0793H0.376953V6.52832H2.36495V4.22832C2.27409 3.08473 2.68901 1.95876 3.5002 1.14757C4.31139 0.336378 5.43736 -0.0785366 6.58095 0.0123222L9.68095 0.0253222V3.47232H7.42895C7.17542 3.45942 6.92937 3.56039 6.75797 3.74765C6.58657 3.93491 6.50772 4.18892 6.54295 4.44032V6.53032H9.66495L9.30095 10.0793Z" fill="#33589D" />
        </Svg>
    );
};

export default Facebook;
