import { SvgProps } from '@/types/types';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';



const ListIcon: React.FC<SvgProps> = ({ width = 24, height = 24 }) => {
    return (
            <Svg width={width} height={height} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#fff" className="size-6">
                <Path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </Svg>
    );
};

export default ListIcon;
