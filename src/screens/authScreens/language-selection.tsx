import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    StyleSheet,
    Alert,
    StatusBar,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateLanguage } from "@/services/userProfile";
import LoadingScreen from "@/components/common/Loading";
import { goBack, redirect } from "@/utils/navigationService";
import { scaleFont, scaleHeight, scaleWidth } from "@/constants/scaling";
import customColors from "@/constants/styles";
import ThemedText from "@/components/ThemedText";

export default function LanguageSelection() {
    const [countries, setCountries] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [selectLanguage, setSelectLanguage] = useState<string | null>(null);

    useEffect(() => {
        const fetchCountries = async () => {
            setLoading(true);
            try {
                const response = await fetch("https://restcountries.com/v3.1/all");
                const data = await response.json();
                const countryMap = new Map();
                data.forEach((item: any) => {
                    if (ALLOWED_COUNTRIES.includes(item.cca2) && !countryMap.has(item.cca2)) {
                        countryMap.set(item.cca2, item);
                    }
                });
                const uniqueSortedCountries = Array.from(countryMap.values()).sort((a: any, b: any) =>
                    a.name.common.localeCompare(b.name.common)
                );
                setCountries(uniqueSortedCountries);
            } catch (error) {
                console.error("Error fetching countries:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCountries();
    }, []);

    const handleSelectLanguage = async () => {
        if (!selectLanguage) {
            Alert.alert("Error", "Please select a language.");
            return;
        }

        setLoading(true);
        try {
            const response = await updateLanguage({ language: selectLanguage });

            console.log(response,'onLangauage')

            if (response?.success) {
                await AsyncStorage.setItem("fbUser", JSON.stringify(response.data));
                redirect("broadcasters");
            } else {
                Alert.alert("Error", response?.message || "Failed to update language.");
            }
        } catch (error) {
            console.error("Error updating language:", error);
            Alert.alert("Error", "Something went wrong while updating language.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => goBack()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={scaleFont(24)} color="#000" />
                </TouchableOpacity>
                <ThemedText style={styles.headerTitle}>Language</ThemedText>
            </View>

            {/* Loading Overlay */}
            {loading && <LoadingScreen />}

            {/* Main UI (only shows when not loading) */}
            {!loading && (
                <>
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search Language"
                            placeholderTextColor={customColors.gray600}
                            value={search}
                            onChangeText={(text) => setSearch(text.replace(/[^a-zA-Z]/g, ""))}
                            maxLength={20}
                        />
                        <MaterialIcons
                            name="search"
                            size={scaleFont(20)}
                            color={customColors.gray700}
                            style={styles.searchIcon}
                        />
                    </View>

                    <ScrollView contentContainerStyle={styles.listContainer}>
                        {countries.map((item) => {
                            if (!item.languages) return null;

                            let displayLanguage = "";

                            if (item.cca2 === "IN") {
                                displayLanguage = "Hindi";
                            } else {
                                const countryLanguages = Object.values(item.languages) as string[];
                                const filteredLanguages = countryLanguages.filter((lang) =>
                                    MAJOR_LANGUAGES.includes(lang)
                                );
                                if (filteredLanguages.length > 0) {
                                    displayLanguage = filteredLanguages.join(", ");
                                }
                            }

                            if (!displayLanguage || !displayLanguage.toLowerCase().includes(search.toLowerCase())) {
                                return null;
                            }

                            return (
                                <TouchableOpacity
                                    key={item.cca2}
                                    style={styles.countryItem}
                                    onPress={() => setSelectLanguage(displayLanguage)}
                                >
                                    <Image source={{ uri: item.flags.png }} style={styles.flag} />
                                    <View style={styles.dataContainer}>
                                        <ThemedText style={styles.language}>{displayLanguage}</ThemedText>
                                        {selectLanguage === displayLanguage && (
                                            <MaterialIcons
                                                name="check-circle"
                                                size={scaleFont(20)}
                                                color="green"
                                                style={styles.tickIcon}
                                            />
                                        )}
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>

                    {selectLanguage && (
                        <TouchableOpacity style={styles.submitButton} onPress={handleSelectLanguage}>
                            <Text style={styles.submitText}>Done</Text>
                        </TouchableOpacity>
                    )}
                </>
            )}
        </View>
    );
}

const MAJOR_LANGUAGES = [
    "English",
    "Hindi",
    "Spanish",
    "French",
    "Chinese",
    "Arabic",
    "Bengali",
    "Portuguese",
    "Russian",
    "Japanese",
];
const ALLOWED_COUNTRIES = ["US", "IN", "BD", "JP", "CN", "RU", "ID", "FR", "ES", "PT", "VN"];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: customColors.white,
        paddingHorizontal: scaleWidth(20),
        paddingTop: StatusBar.currentHeight,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: scaleHeight(10),
        paddingBottom: scaleHeight(5),
    },
    backButton: {
        paddingRight: scaleWidth(10),
    },
    headerTitle: {
        fontSize: scaleFont(20),
        fontWeight: "bold",
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: customColors.inputBg,
        borderRadius: scaleWidth(20),
        paddingVertical: scaleHeight(2),
        paddingHorizontal: scaleWidth(15),
        marginVertical: scaleHeight(20),
    },
    searchInput: {
        flex: 1,
        fontSize: scaleFont(16),
        color: customColors.gray800,
    },
    searchIcon: {
        marginLeft: scaleWidth(10),
    },
    listContainer: {
        paddingTop: scaleHeight(10),
        paddingBottom: scaleHeight(100),
    },
    countryItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: scaleHeight(15),
        borderBottomWidth: 1,
        borderBottomColor: customColors.gray200,
    },
    flag: {
        width: scaleWidth(24),
        height: scaleHeight(14),
        marginRight: scaleWidth(10),
    },
    dataContainer: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
    },
    language: {
        fontSize: scaleFont(15),
        fontWeight:600,
    },
    tickIcon: {
        marginLeft: scaleWidth(10),
    },
    submitButton: {
        position: "absolute",
        bottom: scaleHeight(30),
        alignSelf: "center",
        width: scaleWidth(327),
        height: scaleHeight(48),
        backgroundColor: customColors.primary,
        borderRadius: scaleWidth(24),
        justifyContent: "center",
        alignItems: "center",
    },
    submitText: {
        color: customColors.white,
        fontSize: scaleFont(16),
        fontWeight: "bold",
    },
});
