import { StatusBar } from 'react-native'
import React from 'react'

const LightContentStatusBar = () => {
    return (
        <StatusBar
            backgroundColor="transparent"
            barStyle={"light-content"}
            translucent={true} 
        />
    )
}

export default LightContentStatusBar