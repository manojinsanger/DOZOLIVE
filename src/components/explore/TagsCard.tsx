import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface TagsCardProps {
    imageUrl: string;
    topic: string;
    onPress?: () => void;
}

const TagsCard: React.FC<TagsCardProps> = ({ imageUrl, topic, onPress }) => {
    const firstLetter = topic.replace(/^[^a-zA-Z0-9]+/, '').charAt(0);

    return (
        <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: imageUrl }} style={styles.cardImage} />
            </View>


            <View style={styles.textContainer}>
                <Text style={styles.topic}>{topic}</Text>
                <Text style={styles.firstLetter}>{firstLetter}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: 105,
        height: 105,
        // backgroundColor: '#F1567D',
        borderRadius: 12,
        margin: 10,
        marginBottom:5,
        overflow: 'hidden',
        position: 'relative',
    },
    imageContainer: {
        flex: 1,
        // padding: 12,
    },
    cardImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        resizeMode: 'cover',
    },
    textContainer: {
        position: 'absolute',
        bottom: 5,
        left: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    firstLetter: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        fontSize: 58,
        opacity: 0.4,
        fontWeight: '700',
        color: '#fff',
    },
    topic: {
        fontSize: 12,
        lineHeight:16,
        fontWeight: '500',
        color: '#fff',
        marginLeft: 5,
    },
});

export default TagsCard;
