import React, { FC } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';

interface Card {
    imageUrl: string;
    id: number;
    size: 'small' | 'big';
}

interface ExploreCardsProps {
    cards: Card[];
}

const windowWidth = Dimensions.get('window').width;

const CardComponent: FC<{ card: Card }> = ({ card }) => {
    const { imageUrl, size } = card;
    return (
        <View
            style={[
                styles.card,
                // size === 'big' ? styles.bigCard :
                styles.smallCard,
            ]}
        >
            <Image
                source={{ uri: imageUrl }}
                style={styles.cardImage}
                onError={(e) => console.error("Error loading image: ", e.nativeEvent.error)}
            />
        </View>
    );
};

const ExploreCards: FC<ExploreCardsProps> = ({ cards }) => {
    return (
        <View style={styles.container}>
            <View style={styles.gridContainer}>
                {cards.map((card) => (
                    <CardComponent key={card.id} card={card} />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        width: '100%',

    },
    gridContainer: {
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
        gap: 3,
        marginHorizontal: 'auto',
    },
    card: {
        // overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bigCard: {
        width: windowWidth * 0.6,
        height: windowWidth * 0.6,
    },
    smallCard: {
        width: windowWidth * 0.3,
        height: windowWidth * 0.3,
    },
    cardImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});

export default ExploreCards;
