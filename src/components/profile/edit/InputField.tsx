import React, { useState, useCallback, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Modal,
    FlatList,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "react-native-vector-icons/Ionicons";

interface InputFieldProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    inputType: "text" | "date" | "country" | "gender";
}

const genderOptions = ["Male", "Female", "Other"];

const InputField: React.FC<InputFieldProps> = ({
    label,
    value,
    onChangeText,
    inputType,
}) => {
    const [showHometownPicker, setShowHometownPicker] = useState(false);
    const [countries, setCountries] = useState<any[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [showGenderPicker, setShowGenderPicker] = useState(false);
    const [selectedGender, setSelectedGender] = useState<string>(value);

    const [selectedDate, setSelectedDate] = useState<Date | null>(
        value ? new Date(value) : null
    );


    const [internalValue, setInternalValue] = useState(value);

    useEffect(() => {
        setInternalValue(value);
    }, [value]);

    const handleTextChange = (text: string) => {
        setInternalValue(text);
    };

    const handleTextSubmit = () => {
        onChangeText(internalValue);
    };


    const fetchCountries = useCallback(async () => {
        const storedCountries = await AsyncStorage.getItem("countries");
        if (storedCountries) {
            setCountries(JSON.parse(storedCountries));
        } else {
            setLoading(true);
            try {
                const response = await axios.get("https://restcountries.com/v3.1/all");
                const sortedCountries = response.data.sort((a: any, b: any) =>
                    a.name.common.localeCompare(b.name.common)
                );
                await AsyncStorage.setItem("countries", JSON.stringify(sortedCountries));
                setCountries(sortedCountries);
            } catch (error) {
                console.error("Error fetching countries", error);
            } finally {
                setLoading(false);
            }
        }
    }, []);


    useEffect(() => {
        setSelectedGender(value);
        setSelectedDate(value ? new Date(value) : null);
        if (inputType === "country" && value) {
            const foundCountry = countries.find((c) => c.name.common === value);
            if (foundCountry) {
                setSelectedCountry(foundCountry);
            }
        }
    }, [value]);

    useEffect(() => {
        if (inputType === "country") {
            fetchCountries();
        }
    }, [inputType, fetchCountries]);

    const handleCountrySelect = async (country: any) => {
        setSelectedCountry(country);
        await AsyncStorage.setItem("selectedCountry", JSON.stringify(country));
        setShowHometownPicker(false);
        onChangeText(country.name.common);
    };

    const handleConfirmDate = (event: any, selectedDate: Date | undefined) => {
        if (selectedDate) {
            setSelectedDate(selectedDate);
            onChangeText(selectedDate.toISOString());
        }
        setShowDatePicker(false);
    };

    const renderCountryItem = ({ item }: { item: any }) => {
        const isSelected = selectedCountry?.cca3 === item.cca3;
        return (
            <TouchableOpacity
                style={[
                    styles.countryOption,
                    isSelected && styles.selectedCountryOption,
                ]}
                onPress={() => handleCountrySelect(item)}
            >
                <Image source={{ uri: item.flags[0] }} style={styles.countryFlag} />
                <Text style={[styles.countryName, isSelected && styles.selectedOption]}>
                    {item.name.common}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>{label}</Text>

            {inputType === "text" && (
                <TextInput
                    style={styles.fieldValue}
                    value={`${internalValue}`}
                    onChangeText={handleTextChange}
                    onBlur={handleTextSubmit}
                    onSubmitEditing={handleTextSubmit}
                    placeholder="Enter text..."
                    editable={label !== "Live ID"}
                    placeholderTextColor="#B0B0B0"
                    returnKeyType="done"
                />
            )}

            {inputType === "date" && (
                <TouchableOpacity
                    onPress={() => setShowDatePicker(true)}
                    style={styles.fieldValue}
                >
                    <Text style={styles.dateText}>
                        {selectedDate ? selectedDate.toLocaleDateString() : "Select Date"}
                    </Text>
                </TouchableOpacity>
            )}

            {inputType === "country" && (
                <TouchableOpacity
                    onPress={() => setShowHometownPicker(true)}
                    style={styles.fieldValue}
                >
                    <Text style={styles.dateText}>
                        {selectedCountry ? selectedCountry.name.common : "Select Country"}
                    </Text>
                </TouchableOpacity>
            )}

            {inputType === "gender" && (
                <TouchableOpacity
                    onPress={() => setShowGenderPicker(true)}
                    style={styles.fieldValue}
                >
                    <Text style={styles.dateText}>
                        {selectedGender || "Select Gender"}
                    </Text>
                </TouchableOpacity>
            )}

            {/* Date Picker for Birthday */}
            {showDatePicker && (
                <DateTimePicker
                    value={selectedDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={handleConfirmDate}
                />
            )}

            {/* Country Selection Modal */}
            <Modal visible={showHometownPicker} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={[styles.modalContent, styles.hometownModalContent]}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Select Country</Text>
                            <TouchableOpacity
                                onPress={() => setShowHometownPicker(false)}
                                style={styles.closeButton}
                            >
                                <Ionicons name="close" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>

                        {loading ? (
                            <ActivityIndicator size="large" color="#0066cc" style={styles.loader} />
                        ) : (
                            <FlatList
                                data={countries}
                                keyExtractor={(item) => item.name.common}
                                renderItem={renderCountryItem}
                            />
                        )}
                    </View>
                </View>
            </Modal>

            {/* Gender Picker Modal */}
            <Modal visible={showGenderPicker} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {genderOptions.map((option) => (
                            <TouchableOpacity
                                key={option}
                                style={styles.modalOption}
                                onPress={() => {
                                    setSelectedGender(option);
                                    setShowGenderPicker(false);
                                    onChangeText(option);
                                }}
                            >
                                <Text
                                    style={[
                                        styles.modalText,
                                        selectedGender === option && styles.selectedOption,
                                    ]}
                                >
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            onPress={() => setShowGenderPicker(false)}
                            style={[styles.modalOption, styles.cancelButton]}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};


const styles = StyleSheet.create({
    fieldContainer: {
        marginBottom: 20,
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
    },
    fieldLabel: {
        width: "20%",
        color: "#777",
        fontFamily: "DM Sans",
        fontSize: 14,
        fontWeight: "500",
        lineHeight: 18,
        marginRight: 10,
        textAlign: "left",
    },
    fieldValue: {
        width: "80%",
        height: 45,
        paddingLeft: 12,
        paddingRight: 12,
        borderBottomWidth: 1,
        fontSize: 14,
        fontFamily: "DM Sans",
        color: "#1F1F1F",
        borderColor: "#E0E0E0",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        justifyContent: "center",
    },
    dateText: {
        fontSize: 14,
        color: "#1F1F1F",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 20,
    },
    modalHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "600",
    },
    closeButton: {
        padding: 4,
    },
    loader: {
        padding: 20,
    },
    countryOption: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    selectedCountryOption: {
        backgroundColor: "#f8f8f8",
    },
    countryFlag: {
        width: 30,
        height: 20,
        marginRight: 12,
        borderRadius: 2,
    },
    countryName: {
        fontSize: 16,
        color: "#333",
    },
    selectedOption: {
        color: "#F1567D",
        fontWeight: "500",
    },
    hometownModalContent: {
        height: "80%",
    },
    modalOption: {
        padding: 10,
        borderBottomColor: "#eee",
    },
    cancelButton: {
        marginTop: 10,
    },
    cancelButtonText: {
        fontSize: 16,
        color: "#FF3B30",
        textAlign: "center",
        fontWeight: "bold",
    },
    modalText: {
        fontSize: 16,
        color: "#333",
        textAlign: "center",
        paddingVertical: 10,
    },
});

export default InputField;
