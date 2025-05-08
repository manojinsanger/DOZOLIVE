import React from "react";
import { View, StyleSheet, useWindowDimensions, ViewStyle } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from "react-native-reanimated";


interface SkeletonCardProps {
    style?: ViewStyle;
}


const SkeletonCard: React.FC<SkeletonCardProps> = ({ style }) => {
    const { width } = useWindowDimensions();
    const cardWidth = Math.min(210, width / 2 - 20);

    const shimmerValue = useSharedValue(0);

    React.useEffect(() => {
        shimmerValue.value = withRepeat(withTiming(1, { duration: 1000 }), -1, true);
    }, []);

    const shimmerStyle = useAnimatedStyle(() => ({
        opacity: shimmerValue.value,
    }));

    return (
        <View style={[styles.cardContainer, style, { width: cardWidth, height: cardWidth }]}>
            {/* Skeleton Image */}
            <Animated.View style={[styles.skeletonImage, shimmerStyle]} />

            {/* Skeleton Tag */}
            <View style={styles.skeletonTag} />

            {/* Skeleton Name & Flag */}
            <View style={styles.nameContainer}>
                <View style={styles.skeletonFlag} />
                <View style={styles.skeletonText} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        position: "relative",
        width: "100%",
        height: 200,
        margin: 5,
        borderRadius: 10,
        backgroundColor: "#f0f0f0",
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    skeletonImage: {
        width: "100%",
        height: "100%",
        backgroundColor: "#e0e0e0",
    },
    skeletonTag: {
        position: "absolute",
        top: 10,
        left: 10,
        width: 40,
        height: 15,
        backgroundColor: "#d4d4d4",
        borderRadius: 8,
    },
    nameContainer: {
        position: "absolute",
        bottom: 10,
        left: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    skeletonFlag: {
        width: 20,
        height: 15,
        backgroundColor: "#d4d4d4",
        borderRadius: 3,
    },
    skeletonText: {
        width: 80,
        height: 12,
        backgroundColor: "#d4d4d4",
        marginLeft: 8,
        borderRadius: 5,
    },
});

export default SkeletonCard;
