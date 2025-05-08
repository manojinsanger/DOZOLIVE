import { View, Text } from 'react-native'
import React from 'react'

const MainContainerC = ({ children }: { children: any }) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#F0F8FF', }}>
            <View style={{ width: "40%", height: "20%", position: "absolute", top: 0, left: 0, backgroundColor: "#007BFF",borderRadius:"100%" }}></View>
            {children}
        </View>
    )
}

export default MainContainerC