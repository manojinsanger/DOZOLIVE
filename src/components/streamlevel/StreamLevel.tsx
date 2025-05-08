import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { getLivestreamLevelBadget, getLivestreamLevelBg } from '@/utils/helper'

const StreamLevel = () => {
    const [level, setLevel] = useState(10)
    const levelContainerWidth = level < 11 ? 28 : 35
    return (
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Image source={getLivestreamLevelBadget(level)} style={{ width: 20, height: 20, resizeMode: 'contain', zIndex: 10 }} />
            <Image source={getLivestreamLevelBg(level)} style={{ width: 35, height: 20, resizeMode: 'contain', marginLeft: -10 }} />
            <Text style={{ position: 'absolute', zIndex: 20, left: 23, fontSize: 11 , color: 'white'}}>
                {level}
            </Text>
        </View>
    )
}

export default StreamLevel