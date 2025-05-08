import React, { useEffect, useRef } from "react";
import { View, Text, Image, StyleSheet, Animated, Easing } from "react-native";

interface UserInfoProps {
    profileImage?: string;
    name?: string;
    followers?: number;
    isLoading: boolean;
}

const UserInfo: React.FC<UserInfoProps> = ({ profileImage, name, followers, isLoading }) => {
    const shimmerAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(shimmerAnim, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }),
                Animated.timing(shimmerAnim, {
                    toValue: 0,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }),
            ])
        ).start();
    }, []);

    if (isLoading) {
        return (
            <View style={styles.container}>
                {/* Skeleton Profile Image */}
                <Animated.View style={[styles.profileImage, { opacity: shimmerAnim }]} />
                
                {/* Skeleton User Details */}
                <View style={styles.userInfo}>
                    <Animated.View style={[styles.skeletonText, { width: 100, opacity: shimmerAnim }]} />
                    <Animated.View style={[styles.skeletonText, { width: 80, marginTop: 5, opacity: shimmerAnim }]} />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Profile Image */}
            <Image source={{ uri: profileImage }} style={styles.profileImage} />

            {/* User Details */}
            <View style={styles.userInfo}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.followers}>{formatFollowers(followers || 0)} Followers</Text>
            </View>
        </View>
    );
};

// Function to format follower count (1K, 10K, 1M)
const formatFollowers = (count: number): string => {
    if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
    if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
    return count.toString();
};

export default UserInfo;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: "#FFF",
        backgroundColor: "#333", // Skeleton Background
    },
    userInfo: {
        marginLeft: 10,
    },
    name: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    followers: {
        color: "#FFF",
        fontSize: 12,
        opacity: 0.8,
    },
    skeletonText: {
        height: 14,
        backgroundColor: "#444",
        borderRadius: 4,
    },
});
