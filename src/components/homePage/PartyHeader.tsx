import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Tropy from '../../assets/images/icon/trophy.png';
import { scaleHeight, scaleWidth, scaleFont } from '../../constants/scaling';
import customColors from '../../constants/styles';
import { redirect } from '@/utils/navigationService';
type Subcategories = Record<string, string[]>;

const categories: string[] = ['Follow', 'Party'];
const subcategories: Subcategories = {
    Popular: ['All', 'Nearby', 'Game', 'Fun Entertainment'],
    'Multi Guest': ['Follow', 'All', 'Play', 'Chat', 'Draw'],
    PK: ['Gaming', 'Music', 'Talk Shows'],
};

const PartyHeader = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('Follow');
    const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);

    useEffect(() => {
        const firstSubCategory = subcategories[selectedCategory]?.[0] || null;
        setActiveSubCategory(firstSubCategory);
    }, [selectedCategory]);

    const shouldHideFilterButton = selectedCategory === 'New' || !activeSubCategory;

    return (
        <View style={styles.topContainer}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryList}
            >
                {categories.map((category: any) => (
                    <TouchableOpacity
                        key={category}
                        style={[
                            styles.categoryItem,
                            selectedCategory === category && styles.categoryItemActive,
                        ]}
                        onPress={() => setSelectedCategory(category)}
                    >
                        <Text
                            style={[
                                styles.categoryText,
                                selectedCategory === category && styles.categoryTextActive,
                            ]}
                        >
                            {category}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View style={styles.iconsContainer}>
                <TouchableOpacity style={styles.iconButton} onPress={() => console.log("Search")}>
                    <Ionicons name="search-outline" size={24} color="#ffffff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={() => redirect("ranking")}>
                    <Image
                        source={Tropy}
                        style={styles.trophyIcon}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PartyHeader


const styles = StyleSheet.create({
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: scaleWidth(15),
        // paddingTop: Platform.OS === 'ios' ? scaleHeight(40) : scaleHeight(35),
        paddingBottom: scaleHeight(8),
        zIndex: 10,
    },
    subContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scaleWidth(15),
        marginTop: scaleHeight(10),
    },
    categoryList: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    categoryItem: {
        paddingVertical: scaleHeight(8),
        paddingHorizontal: scaleWidth(15),
    },
    categoryItemActive: {
        borderBottomWidth: scaleWidth(2),
        borderBottomColor: customColors.white,
    },
    categoryText: {
        fontSize: scaleFont(14),
        color: customColors.white,
    },
    categoryTextActive: {
        fontWeight: 'bold',
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scaleWidth(10),
    },
    iconButton: {
        padding: scaleWidth(5),
    },
    trophyIcon: {
        width: scaleWidth(20),
        height: scaleHeight(20),
    },
    subCategoryList: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scaleWidth(10),
    },
    subCategoryItem: {
        paddingVertical: scaleHeight(6),
        paddingHorizontal: scaleWidth(12),
        borderRadius: scaleWidth(20),
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    subCategoryItemActive: {
        backgroundColor: '#fff',
    },
    subCategoryText: {
        fontSize: scaleFont(13),
        color: '#fff',
    },
    subCategoryTextActive: {
        color: '#f1567d',
        fontWeight: '600',
    },
    filterButton: {
        padding: scaleWidth(5),
        marginLeft: scaleWidth(10),
    },
})