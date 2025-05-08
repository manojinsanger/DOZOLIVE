import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';


const Tick: React.FC<SvgProps> = ({ width = 18, height = 18 }) => {
    return (
        <Svg
            width={width}
            height={height} viewBox="0 0 18 18" fill="none">
            <Path fill-rule="evenodd" clip-rule="evenodd" d="M0 9C0 4.02944 4.02944 0 9 0C11.3869 0 13.6761 0.948212 15.364 2.63604C17.0518 4.32387 18 6.61305 18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9ZM3.386 9.66L7.349 13.623L14.614 6.359L13.293 5.038L7.349 10.982L4.707 8.34L3.386 9.66Z" fill="#3AAF69" />
        </Svg>
    );
};

export default Tick;

