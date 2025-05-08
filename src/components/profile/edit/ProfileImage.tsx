import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";

interface ProfileImageProps {
    profileImage: string | null;
    onPress: () => void;
}



const ProfileImage: React.FC<ProfileImageProps> = ({ profileImage, onPress }) => {
    return (
        <View style={styles.profileImageContainer}>
            <Image
                source={{ uri: profileImage || 'https://via.placeholder.com/100' }}
                style={styles.profileImage}
            />
            <TouchableOpacity style={styles.cameraIconSmall} onPress={onPress}>
                <Ionicons name="camera" size={16} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    profileImageContainer: {
        alignItems: "center",
        marginTop: -65,
        position: "relative",
    },
    profileImage: {
        width: 91,
        height: 91,
        backgroundColor:'lightgray',
        borderRadius: 50,
        borderWidth: 3,
        borderColor: "#fff",
    },
    cameraIconSmall: {
        position: "absolute",
        right: "50%",
        bottom: 0,
        marginRight: -50,
        backgroundColor: "#57AAFF",
        padding: 5,
        borderRadius: 15,
    },
});


export default ProfileImage;
