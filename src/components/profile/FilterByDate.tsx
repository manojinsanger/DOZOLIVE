import  Ionicons  from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
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

const FilterButton = ({
    title,
    hasDropdown = false,
    hasIcon = false,
    isActive = false,
    onPress
}: {
    title: string;
    hasDropdown?: boolean;
    hasIcon?: boolean;
    isActive?: boolean;
    onPress?: () => void;
}) => {
    return (
        <TouchableOpacity style={[styles.filterButton, isActive && styles.activeFilterButton]} onPress={onPress}>
            {hasIcon && (
                <FontAwesome name="calendar" size={18} color="#333" style={styles.filterIcon} />
            )}
            <Text style={[styles.filterButtonText, isActive && styles.activeFilterText]}>{title}</Text>
            {hasDropdown && (
                <Ionicons
                    name="chevron-down"
                    size={16}
                    color={isActive ? "#5C73FF" : "#666"}
                    style={styles.filterDropdown}
                />
            )}
        </TouchableOpacity>
    );
};

const FilteredByDate = () => {
    const [selectedPeriod, setSelectedPeriod] = useState("Last 30 days");
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);
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
            <FilterButton
                title={selectedPeriod}
                hasDropdown
                isActive={true}
                onPress={() => setShowPeriodDropdown(!showPeriodDropdown)}
            />
            <View style={styles.filterDivider} />
            <FilterButton
                title={selectedDate ? getFormattedDate(selectedDate) : "Select date"}
                hasIcon
                isActive={!!selectedDate}
                onPress={() => setShowDatePicker(true)}
            />

            {/* Period Dropdown */}
            <Modal visible={showPeriodDropdown} transparent animationType="fade">
                <Pressable style={styles.modalOverlay} onPress={() => setShowPeriodDropdown(false)}>
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
                                <Text style={styles.dropdownText}>{period}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </Pressable>
            </Modal>

            {/* Date Picker */}
            {showDatePicker && (
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
        justifyContent: "space-evenly"
    },
    filterButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 12,
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
        // color: "#5C73FF",
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
        justifyContent: "flex-start"
    }
});

export default FilteredByDate;
