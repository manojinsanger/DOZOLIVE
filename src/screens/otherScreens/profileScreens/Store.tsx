import React, { useState } from 'react';
import { StyleSheet, View, Animated, FlatList, TouchableOpacity, ScrollView, Text, Platform, StatusBar } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProductCard from '@/components/topup/ProductCard';
import { scaleWidth, scaleHeight, scaleFont } from '@/constants/scaling';
import customColors from '@/constants/styles';
// Assuming goBack is correctly set up; fallback if undefined
import { goBack } from '@/utils/navigationService';

interface StorePageProps {}

interface Product {
    id: number;
    imageUrl: string;
    title: string;
    price: string;
}

const products: Product[] = [
    { id: 1, imageUrl: 'https://cdn.pixabay.com/photo/2021/08/08/08/12/frame-6530200_1280.png', title: 'Frame 1', price: '$199' },
    { id: 2, imageUrl: 'https://cdn.pixabay.com/photo/2019/10/16/19/22/watercolour-flowers-4555243_1280.png', title: 'Frame 2', price: '$299' },
    { id: 3, imageUrl: 'https://cdn.pixabay.com/photo/2018/06/07/19/20/wreath-3460744_1280.png', title: 'Frame 3', price: '$999' },
    { id: 4, imageUrl: 'https://cdn.pixabay.com/photo/2021/09/12/16/44/frame-6618829_1280.png', title: 'Frame 4', price: '$699' },
    { id: 5, imageUrl: 'https://source.unsplash.com/120x120/?gift,necklace', title: 'Elegant Necklace', price: '$150' },
    { id: 6, imageUrl: 'https://source.unsplash.com/120x120/?gift,perfume', title: 'Designer Perfume', price: '$89' },
    { id: 7, imageUrl: 'https://source.unsplash.com/120x120/?gift,book', title: 'Inspirational Book', price: '$25' },
    { id: 8, imageUrl: 'https://source.unsplash.com/120x120/?gift,coffee', title: 'Gourmet Coffee Set', price: '$45' },
    { id: 9, imageUrl: 'https://source.unsplash.com/120x120/?gift,flower', title: 'Flower Bouquet', price: '$60' },
    { id: 10, imageUrl: 'https://source.unsplash.com/120x120/?gift,shoes', title: 'Stylish Sneakers', price: '$120' },
    { id: 11, imageUrl: 'https://source.unsplash.com/120x120/?gift,candle', title: 'Scented Candle Set', price: '$35' },
    { id: 12, imageUrl: 'https://source.unsplash.com/120x120/?gift,teddy', title: 'Soft Teddy Bear', price: '$40' },
    { id: 13, imageUrl: 'https://source.unsplash.com/120x120/?gift,guitar', title: 'Acoustic Guitar', price: '$250' },
    { id: 14, imageUrl: 'https://source.unsplash.com/120x120/?gift,pen', title: 'Luxury Pen Set', price: '$70' },
    { id: 15, imageUrl: 'https://source.unsplash.com/120x120/?gift,jewelry', title: 'Gold Bracelet', price: '$350' },
    { id: 16, imageUrl: 'https://source.unsplash.com/120x120/?gift,paint', title: 'Art Painting Kit', price: '$80' },
    { id: 17, imageUrl: 'https://source.unsplash.com/120x120/?gift,chocolates', title: 'Premium Chocolate Box', price: '$55' },
    { id: 18, imageUrl: 'https://source.unsplash.com/120x120/?gift,wine', title: 'Vintage Wine Set', price: '$180' },
    { id: 19, imageUrl: 'https://source.unsplash.com/120x120/?gift,speaker', title: 'Portable Bluetooth Speaker', price: '$95' },
    { id: 20, imageUrl: 'https://source.unsplash.com/120x120/?gift,backpack', title: 'Travel Backpack', price: '$85' },
];

const subcategories = ['Entry', 'Frame', 'Special Id', 'Chat Bubble', 'Theme'];

const StorePage = (props: StorePageProps) => {
    const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);

    const handleBackPress = () => {
        try {
            goBack();
        } catch (error) {
            console.warn('Navigation failed:', error);
        }
    };

    return (
        <View style={styles.container}>
            {/* Custom Header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <TouchableOpacity
                        style={styles.backButtonContainer}
                        onPress={handleBackPress}
                        activeOpacity={0.7}
                    >
                        <MaterialIcons
                            name="arrow-back"
                            size={scaleFont(24)}
                            color={customColors.white || '#fff'}
                            style={styles.icon}
                        />
                        <Animated.Text style={styles.headerTitle}>
                            Store
                        </Animated.Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Subcategory Scroll */}
            <View style={styles.subContainer}>
                {subcategories?.length > 0 && (
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.subCategoryList}
                    >
                        {subcategories.map((subCategory) => (
                            <TouchableOpacity
                                key={subCategory}
                                style={[
                                    styles.subCategoryItem,
                                    activeSubCategory === subCategory && styles.subCategoryItemActive,
                                ]}
                                onPress={() => setActiveSubCategory(subCategory)}
                                activeOpacity={0.7}
                            >
                                <Text
                                    style={[
                                        styles.subCategoryText,
                                        activeSubCategory === subCategory && styles.subCategoryTextActive,
                                    ]}
                                >
                                    {subCategory}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}
            </View>

            {/* Product Grid */}
            <FlatList
                data={products}
                renderItem={({ item }) => <ProductCard item={item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.flatListContent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default StorePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: customColors.white || '#fff',
    },
    header: {
        backgroundColor: '#F1567D',
        paddingHorizontal: scaleWidth(15),
        paddingVertical: scaleHeight(10),
        paddingTop: Platform.OS === 'android' ? scaleHeight(StatusBar.currentHeight || 20) : scaleHeight(40),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: scaleHeight(2) },
        shadowOpacity: 0.1,
        shadowRadius: scaleWidth(4),
        elevation: 3,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    backButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: scaleHeight(5),
    },
    headerTitle: {
        fontSize: scaleFont(18),
        fontWeight: '600',
        color: customColors.white || '#fff',
        marginLeft: scaleWidth(8),
    },
    icon: {
        paddingHorizontal: scaleWidth(5),
    },
    subContainer: {
        backgroundColor: '#F1567D',
        paddingHorizontal: scaleWidth(15),
        paddingVertical: scaleHeight(8),
    },
    subCategoryList: {
        flexDirection: 'row',
        gap: scaleWidth(8),
        paddingHorizontal: scaleWidth(5),
    },
    subCategoryItem: {
        paddingVertical: scaleHeight(6),
        paddingHorizontal: scaleWidth(12),
        borderRadius: scaleWidth(16),
        backgroundColor: 'transparent',
    },
    subCategoryItemActive: {
        backgroundColor: customColors.white || '#fff',
    },
    subCategoryText: {
        fontSize: scaleFont(13),
        color: customColors.white || '#fff',
        fontWeight: '500',
    },
    subCategoryTextActive: {
        color: '#F1567D',
        fontWeight: '600',
    },
    row: {
        justifyContent: 'space-between',
        paddingHorizontal: scaleWidth(10),
        marginBottom: scaleHeight(8),
    },
    flatListContent: {
        paddingBottom: scaleHeight(20),
        paddingTop: scaleHeight(10),
    },
});