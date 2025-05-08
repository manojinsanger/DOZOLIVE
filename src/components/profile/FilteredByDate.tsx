
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useState } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Modal,
    Pressable,
    Platform
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import ThemedText from "../ThemedText";

const FilterButton = ({
    title,
    onPress,
    hasDropdown = false,
    hasIcon = false,
    isActive = false
}: {
    title: string;
    onPress: () => void;
    hasDropdown?: boolean;
    hasIcon?: boolean;
    isActive?: boolean;
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.filterButton,
                isActive && styles.activeFilterButton
            ]}
            onPress={onPress}
        >
            {hasIcon && (
                <Ionicons
                    name="calendar-outline"
                    size={18}
                    color="#666"
                    style={styles.filterIcon}
                />
            )}
            <Text
                style={[
                    styles.filterButtonText,
                    isActive && styles.activeFilterText
                ]}
            >
                {title}
            </Text>
            {hasDropdown && (
                <FontAwesome
                    name="angle-down"
                    size={16}
                    color="#666"
                    style={styles.filterDropdown}
                />
            )}
        </TouchableOpacity>
    );
};

const FilteredByDate = ({
    showPeriodFilter = true,
    showDateFilter = true,
    showTypeFilter = true
}: {
    showPeriodFilter?: boolean;
    showDateFilter?: boolean;
    showTypeFilter?: boolean;
}) => {
    const [selectedPeriod, setSelectedPeriod] = useState("Last 30 days");
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedType, setSelectedType] = useState("All");

    const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);
    const [showTypeDropdown, setShowTypeDropdown] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const timePeriods = [
        "Last 30 days",
        "Last 7 days",
        "Today",
        "Last month",
        "This month",
        "Last week",
        "Current week"
    ];

    const typeOptions = [
        "All",
        "Topup",
        "Gift",
        "Platform",
        "Rewards",
        "Others"
    ];

    const onDateChange = (event: any, date?: Date) => {
        if (event.type === "dismissed") {
            setShowDatePicker(false);
            return;
        }
        if (date) {
            setSelectedDate(date);
            setShowDatePicker(Platform.OS === "ios");
        }
    };

    const getFormattedDate = (date: Date) =>
        date.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric"
        });

    return (
        <View style={styles.filterBar}>
            {showPeriodFilter && (
                <>
                    <FilterButton
                        title={selectedPeriod}
                        hasDropdown
                        isActive={true}
                        onPress={() => {
                            setShowPeriodDropdown(!showPeriodDropdown);
                            setShowTypeDropdown(false);
                        }}
                    />
                    {(showDateFilter || showTypeFilter) && (
                        <View style={styles.filterDivider} />
                    )}
                </>
            )}

            {showDateFilter && (
                <>
                    <FilterButton
                        title={
                            selectedDate
                                ? getFormattedDate(selectedDate)
                                : "Select date"
                        }
                        hasIcon
                        isActive={!!selectedDate}
                        onPress={() => {
                            setShowDatePicker(true);
                            setShowPeriodDropdown(false);
                            setShowTypeDropdown(false);
                        }}
                    />
                    {showTypeFilter && <View style={styles.filterDivider} />}
                </>
            )}

            {showTypeFilter && (
                <FilterButton
                    title={selectedType}
                    hasDropdown
                    isActive={selectedType !== "All"}
                    onPress={() => {
                        setShowTypeDropdown(!showTypeDropdown);
                        setShowPeriodDropdown(false);
                    }}
                />
            )}

            {/* Period Dropdown */}
            {showPeriodFilter && showPeriodDropdown && (
                <Modal visible transparent animationType="fade">
                    <Pressable
                        style={styles.modalOverlay}
                        onPress={() => setShowPeriodDropdown(false)}
                    >
                        <View style={styles.dropdown}>
                            {timePeriods.map((period, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        setSelectedPeriod(period);
                                        setShowPeriodDropdown(false);
                                    }}
                                    style={styles.dropdownItem}
                                >
                                    <ThemedText style={styles.dropdownText}>
                                        {period}
                                    </ThemedText>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </Pressable>
                </Modal>
            )}

            {/* Type Dropdown */}
            {showTypeFilter && showTypeDropdown && (
                <Modal visible transparent animationType="fade">
                    <Pressable
                        style={styles.modalOverlay}
                        onPress={() => setShowTypeDropdown(false)}
                    >
                        <View style={styles.dropdown}>
                            {typeOptions.map((type, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        setSelectedType(type);
                                        setShowTypeDropdown(false);
                                    }}
                                    style={styles.dropdownItem}
                                >
                                    <Text style={styles.dropdownText}>
                                        {type}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </Pressable>
                </Modal>
            )}

            {/* Date Picker */}
            {showDateFilter && showDatePicker && (
                <DateTimePicker
                    value={selectedDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    filterBar: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#EEEEEE",
        justifyContent: "space-between",
        flexWrap: "nowrap",
    },
    filterButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
    },
    activeFilterButton: {
        borderRadius: 20,
        alignItems: "center"
    },
    filterButtonText: {
        fontSize: 16,
        color: "#666666"
    },
    activeFilterText: {
        fontWeight: "500"
    },
    filterDropdown: {
        marginLeft: 4
    },
    filterIcon: {
        marginRight: 8
    },
    filterDivider: {
        width: 1,
        height: 24,
        backgroundColor: "#DDDDDD",
        marginHorizontal: 16
    },
    dropdown: {
        backgroundColor: "white",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        position: "absolute",
        top: 100,
        left: 20,
        right: 20
    },
    dropdownItem: {
        paddingVertical: 8
    },
    dropdownText: {
        fontSize: 16,
        color: "#333"
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.2)",
        justifyContent: "flex-start",
        
    }
});

export default FilteredByDate;
