import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { scaleFont, scaleHeight, scaleWidth } from "@/constants/scaling"; 
import customColors from "@/constants/styles";

interface TopUpCardProps {
    value: number;
    price: number;
    onPress: () => void;
    activeTab?: string;
}

const TopUpCard: React.FC<TopUpCardProps> = ({ value, price, onPress, activeTab }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View
                // colors={[customColors.accent, "rgba(255, 0, 144, 0)"]}
                style={styles.container}
            >
                {activeTab !== "googlePay" && (
                    <View style={styles.upiTag}>
                        <Text style={styles.upiText}>UPI</Text>
                    </View>
                )}

                <View style={styles.centerContent}>
                    <Image
                        source={require("../../assets/images/profile_assets/dollar.png")}
                        style={styles.coinIcon}
                    />
                    <Text style={styles.valueText}>{value}</Text>
                </View>

                <Text style={styles.priceText}>₹{price}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default TopUpCard;

const styles = StyleSheet.create({
    container: {
        width: scaleWidth(100), 
        height: scaleHeight(75), 
        borderTopLeftRadius: scaleWidth(10), 
        borderBottomRightRadius: scaleWidth(10), 
        overflow: "hidden",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:customColors.secondary
    },
    upiTag: {
        position: "absolute",
        top: 0,
        right: 0,
        backgroundColor: "#ff5722",
        paddingHorizontal: scaleWidth(8), 
        paddingVertical: scaleHeight(2), 
        borderBottomLeftRadius: scaleWidth(5), 
    },
    upiText: {
        fontSize: scaleFont(10), 
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
    },
    centerContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        marginBottom: scaleHeight(13), 
    },
    coinIcon: {
        width: scaleWidth(20), 
        height: scaleHeight(20), 
        marginRight: scaleWidth(5), 
        marginBottom: scaleHeight(5), 
    },
    valueText: {
        fontSize: scaleFont(14), 
        fontWeight: "500",
        color: customColors.white,
        marginBottom: scaleHeight(5), 
    },
    priceText: {
        position: "absolute",
        bottom: scaleHeight(15), 
        width: "100%",
        textAlign: "center",
        fontSize: scaleFont(12), 
        fontWeight: "700",
        color: customColors.white,
        paddingVertical: scaleHeight(2), 
    },
});