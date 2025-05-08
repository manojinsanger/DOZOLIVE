import { StatusBar } from 'react-native';
import React from 'react';

const DarkContentStatusBar = () => {
    return (
        <StatusBar
            backgroundColor="transparent"
            barStyle="dark-content"
            translucent={true} 
        />
    );
};

export default DarkContentStatusBar;
