import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface Product {
    id: number;
    imageUrl: string;
    title: string;
    price: string;
}

const ProductCard: React.FC<{ item: Product }> = ({ item }) => (
    <TouchableOpacity style={styles.card}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <View style={styles.content}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>{item.price} / week</Text>
        </View>
    </TouchableOpacity>
);
export default ProductCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        elevation: 5,
        flex: 1,
        alignItems: 'center',
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 10,
    },
    content: {
        marginTop: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    price: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
});
