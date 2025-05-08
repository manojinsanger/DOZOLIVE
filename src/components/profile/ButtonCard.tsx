import { } from "react-native";
import { TouchableOpacity, StyleSheet, Image } from "react-native";
import ThemedText from "../ThemedText";
import { redirect } from "@/utils/navigationService";
import customColors from "@/constants/styles";


const ButtonCard: React.FC<{ label: string; icon: any; routePath: string }> = ({ label, icon, routePath }) => {
    return (
        <TouchableOpacity style={styles.buttonCard} onPress={() => redirect(routePath as any)}>
            {
                icon
            }
            <ThemedText style={[styles.buttonLabel, { color: customColors.gray600 }]}>
                {label}
            </ThemedText>
        </TouchableOpacity>
    )
};


const styles = StyleSheet.create({
    buttonCard: {
        width: '25%',
        alignItems: 'center',
        marginVertical: 8,
        borderRadius: 7,
    },
    buttonIcon: {
        width: 35,
        height: 35,
        marginBottom: 12,
        resizeMode: 'contain',
    },
    buttonLabel: {
        fontSize: 12,
        textAlign: 'center',
        color: customColors.gray800
    },
});

export default ButtonCard;