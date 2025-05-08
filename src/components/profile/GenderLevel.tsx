import { Image, StyleSheet, View } from "react-native";
import ThemedText from "../ThemedText";
import { scaleFont, scaleHeight, scaleWidth } from "@/constants/scaling";
import femaleIcon from '@/assets/images/icon/femaleIcon.png';
import maleIcon from '@/assets/images/icon/manIcon.png';
import customColors from "@/constants/styles";


interface Profile {
    gender: 'Male' | 'Female';
    age?: number;
}


// Gender Chip
const GenderProfile = ({ gender, age }: Profile) => {

    const isFemale = gender === 'Female';
    const genderIcon = isFemale ? femaleIcon : maleIcon;
    const genderColor = isFemale ? '#f1567d' : '#49ADF5';

    return (
        <View style={[styles.chip, styles.genderChip, { backgroundColor: genderColor }]}>
            <Image source={genderIcon} style={styles.icon} resizeMode="contain" />
            <ThemedText style={[styles.chipText, { paddingLeft: scaleWidth(4) }]}>
                {age || 0}
            </ThemedText>
        </View>
    );
};


const styles = StyleSheet.create({

    // Common chip
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: scaleWidth(5),
        paddingVertical: scaleHeight(1),
        borderRadius: scaleWidth(15),
        marginBottom: scaleHeight(-6),
    },

    chipText: {
        fontSize: scaleFont(9),
        fontWeight: '600',
        color: customColors.white,
    },

    genderChip: {
        minWidth: scaleWidth(35),
    },

    icon: {
        width: scaleWidth(8),
        height: scaleHeight(8),
    },



});

export default GenderProfile;