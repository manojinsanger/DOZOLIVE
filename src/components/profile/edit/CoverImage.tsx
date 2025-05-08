// components/CoverImage.tsx
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
interface CoverImageProps {
    coverImage: string | null;
    onPress: () => void;
}

const CoverImage: React.FC<CoverImageProps> = ({ coverImage }) => {
    return (
        <View style={styles.coverPhotoContainer}>
            <Image
                source={{ uri: coverImage || 'https://via.placeholder.com/500x200' }}
                style={styles.coverPhoto}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    coverPhotoContainer: {
        height: 280,
        position: "relative",
    },
    coverPhoto: {
        width: "100%",
        backgroundColor:'lightgray',
        height: "100%",
    },
});


export default CoverImage;
