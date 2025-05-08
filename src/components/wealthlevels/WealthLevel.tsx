import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { getWealthLevelBadget } from '@/utils/helper'

const WealthLevel = ({ wealthLevel }: { wealthLevel: number }) => {
    return (
        <View style={styles.row}>
            <View style={styles.levelCol}>
                <View style={styles.levelBadgeContainer}>
                    <View style={{
                        position: "absolute",
                        width: 45,
                        height: 16,
                        transform: [{ rotate: "360deg" }],
                        left: 0,
                    }}>

                        <Image source={getWealthLevelBadget(wealthLevel)} style={styles.levelBadge} />
                    </View>
                    <Text style={styles.levelText}>{wealthLevel}</Text>
                </View>
            </View>
        </View>
    )
}

export default WealthLevel

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        // paddingVertical: 12,
        // paddingHorizontal: 0,
    },
    levelCol: {
        alignItems: "center",
        justifyContent: "center",
    },
    levelBadge: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    levelIcon: {
        position: "absolute",
        width: 24,
        height: 26,
        zIndex: 3,
        left: -6,
    },
    levelText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 9,
        position: "absolute",
        zIndex: 4,
        left: 20,
    },
    pointsCol: {
        flex: 1,
        alignItems: "center", // Center the content horizontally
        justifyContent: "center", // Center vertically
    },

    levelBadgeContainer: {
        position: "relative",
        width: 45,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },


})