import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Platform,
    Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Tropy from '../../assets/images/icon/trophy.png';
import { scaleHeight, scaleWidth, scaleFont } from '../../constants/scaling';
import customColors from '../../constants/styles';
import { redirect } from '@/utils/navigationService';

interface HeaderProps {
    appName: string;
    onSearchPress?: () => void;
}

type Subcategories = Record<string, string[]>;

const categories: string[] = ['New', 'Popular', 'Multi Guest', 'PK'];
const subcategories: Subcategories = {
    Popular: ['All', 'Nearby', 'Game', 'Fun Entertainment'],
    'Multi Guest': ['Follow', 'All', 'Play', 'Chat', 'Draw'],
    PK: ['Gaming', 'Music', 'Talk Shows'],
};

const Header: React.FC<HeaderProps> = ({ appName, onSearchPress }: HeaderProps) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('Popular');
    const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);

    useEffect(() => {
        const firstSubCategory = subcategories[selectedCategory]?.[0] || null;
        setActiveSubCategory(firstSubCategory);
      }, [selectedCategory]);


    const shouldHideFilterButton = selectedCategory === 'New' || !activeSubCategory;

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoryList}
                >
                    {categories.map((category) => (
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
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={onSearchPress || (() => console.log("Search"))}>
                        <Ionicons name="search-outline" size={20} color="#ffffff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton} onPress={() => redirect("ranking")}>
                        <Image
                            source={Tropy}
                            style={styles.trophyIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {selectedCategory && subcategories[selectedCategory] && (
                <View style={styles.subContainer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.subCategoryList}
                    >
                        {subcategories[selectedCategory].map((subCategory) => (
                            <TouchableOpacity
                                key={subCategory}
                                style={[
                                    styles.subCategoryItem,
                                    activeSubCategory === subCategory && styles.subCategoryItemActive,
                                ]}
                                onPress={() => setActiveSubCategory(subCategory)}
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
                    {!shouldHideFilterButton && (
                        <TouchableOpacity
                            style={styles.filterButton}
                            onPress={() => console.log("Filter")}
                        >
                            <Ionicons name="filter" size={24} color="#ffffff" />
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: scaleHeight(8),
        zIndex: 10,
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: scaleWidth(15),
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
});

export default Header;