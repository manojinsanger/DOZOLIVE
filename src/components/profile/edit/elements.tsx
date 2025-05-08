import Ionicons from "react-native-vector-icons/Ionicons";
import {  Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";


export const renderGenderField: React.FC<RenderGenderFieldProps> = ({
    setShowGenderPicker,
    showGenderPicker,
    gender,
    genderOptions,
    setGender
}) => (
    <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Gender</Text>
        <TouchableOpacity
            style={styles.fieldValueContainer}
            onPress={() => setShowGenderPicker(true)}
        >
            <Text style={styles.fieldValue}>{gender || 'Select Gender'}</Text>
        </TouchableOpacity>

        <Modal visible={showGenderPicker} transparent animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {genderOptions.map((option) => (
                        <TouchableOpacity
                            key={option}
                            style={styles.modalOption}
                            onPress={() => {
                                setGender(option);
                                setShowGenderPicker(false);
                            }}
                        >
                            <Text
                                style={[
                                    styles.modalText,
                                    gender === option && styles.selectedOption,
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




// export const renderBirthdayField = (setShowDatePicker, formatDate, showDatePicker, birthday, onDateChange) => (
//     <View style={styles.fieldContainer}>
//         <Text style={styles.fieldLabel}>Birthday</Text>
//         <TouchableOpacity
//             style={styles.fieldValueContainer}
//             onPress={() => setShowDatePicker(true)}
//         >
//             <Text style={styles.fieldValue}>{formatDate(birthday)}</Text>
//         </TouchableOpacity>

//         {showDatePicker && (
//             <DateTimePicker
//                 value={birthday}
//                 mode="date"
//                 display="default"
//                 onChange={onDateChange}
//             />
//         )}
//     </View>
// );

// export const renderHometownField = (setShowHometownPicker, showHometownPicker, selectedCountryFlag, hometown, loading, countries, handleCountrySelect) => (
//     <View style={styles.fieldContainer}>
//         <Text style={styles.fieldLabel}>Home town</Text>
//         <TouchableOpacity
//             style={styles.fieldValueContainer}
//             onPress={() => setShowHometownPicker(true)}
//         >
//             <View style={styles.hometownValueContainer}>
//                 {selectedCountryFlag ? (
//                     <Image
//                         source={{ uri: selectedCountryFlag }}
//                         style={styles.selectedCountryFlag}
//                     />
//                 ) : null}
//                 <Text style={styles.fieldValue}>{hometown}</Text>
//             </View>
//         </TouchableOpacity>

//         <Modal visible={showHometownPicker} transparent animationType="slide">
//             <View style={styles.modalContainer}>
//                 <View style={[styles.modalContent, styles.hometownModalContent]}>
//                     <View style={styles.modalHeader}>
//                         <Text style={styles.modalTitle}>Select Country</Text>
//                         <TouchableOpacity
//                             onPress={() => setShowHometownPicker(false)}
//                             style={styles.closeButton}
//                         >
//                             <Ionicons name="close" size={24} color="#333" />
//                         </TouchableOpacity>
//                     </View>

//                     {loading ? (
//                         <ActivityIndicator
//                             size="large"
//                             color="#0066cc"
//                             style={styles.loader}
//                         />
//                     ) : (
//                         <FlatList
//                             data={countries}
//                             keyExtractor={(item) => item.name.common}
//                             renderItem={({ item }) => (
//                                 <TouchableOpacity
//                                     style={[
//                                         styles.countryOption,
//                                         hometown === item.name.common &&
//                                         styles.selectedCountryOption,
//                                     ]}
//                                     onPress={() => handleCountrySelect(item)}
//                                 >
//                                     <Image
//                                         source={{ uri: item.flags.png }}
//                                         style={styles.countryFlag}
//                                     />
//                                     <Text
//                                         style={[
//                                             styles.countryName,
//                                             hometown === item.name.common && styles.selectedOption,
//                                         ]}
//                                     >
//                                         {item.name.common}
//                                     </Text>
//                                 </TouchableOpacity>
//                             )}
//                             initialScrollIndex={countries.findIndex(
//                                 (c) => c.name.common === "India"
//                             )}
//                             getItemLayout={(data, index) => ({
//                                 length: 56,
//                                 offset: 56 * index,
//                                 index,
//                             })}
//                         />
//                     )}
//                 </View>
//             </View>
//         </Modal>
//     </View>
// );



export const renderBioField: React.FC<RenderBioFieldProps> = ({
    setTempBio,
    setShowBioModal,
    bio
}) => (
    <TouchableOpacity
        style={styles.fieldContainer}
        onPress={() => {
            setTempBio(bio);
            setShowBioModal(true);
        }}
    >
        <Text style={styles.fieldLabel}>Bio</Text>
        <View style={styles.fieldValueContainer}>
            <Text style={styles.fieldValue}>{bio || "Input your bio"}</Text>
        </View>
    </TouchableOpacity>
);

export const renderField = (
    label: string,
    value: string,
    onChangeText?: ((text: string) => void) | null
) => (
    <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <View style={styles.fieldValueContainer}>
            {onChangeText ? (
                <TextInput
                    style={styles.fieldValue}
                    value={value}
                    onChangeText={onChangeText}
                />
            ) : (
                <Text style={styles.fieldValue}>{value}</Text>
            )}
        </View>
    </View>
);

export const renderTags = (
    items: { id: number; label: string; selected: boolean }[],
    _p0: string
) => {
    const selectedItems = items.filter((item) => item.selected);

    return (
        <View style={styles.tagsSection}>
            {selectedItems.length > 0 && (
                <Text style={styles.tagsCaptionText}>
                    {selectedItems
                        .slice(0, 2)
                        .map((i) => i.label)
                        .join(", ")}
                </Text>
            )}
            <View style={styles.tagsContainer}>
                {selectedItems.slice(2, 4).map((item) => (
                    <View key={item.id} style={styles.tag}>
                        <Text style={styles.tagText}>{item.label}</Text>
                        <TouchableOpacity style={styles.closeTagBtn}>
                            <Ionicons name="close" size={16} color="#555" />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    );
};






const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "500",
        right: 340,
    },
    coverPhotoContainer: {
        height: 180,
        position: "relative",
    },
    coverPhoto: {
        width: "100%",
        height: "100%",
    },
    cameraIcon: {
        position: "absolute",
        right: 20,
        top: 20,
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: 4,
        borderRadius: 20,
    },
    profileImageContainer: {
        alignItems: "center",
        marginTop: -40,
        position: "relative",
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: "#fff",
    },
    cameraIconSmall: {
        position: "absolute",
        right: "50%",
        bottom: 0,
        marginRight: -50,
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: 5,
        borderRadius: 15,
    },
    photoInstruction: {
        textAlign: "center",
        fontSize: 14,
        color: "#777",
        marginTop: 8,
        marginBottom: 16,
    },
    infoContainer: {
        padding: 16,
    },
    bioModalContent: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: "50%",
    },
    bioModalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    bioInputContainer: {
        marginBottom: 20,
    },
    bioTextInput: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        minHeight: 100,
        textAlignVertical: "top",
    },
    charCount: {
        textAlign: "right",
        color: "#666",
        marginTop: 8,
        fontSize: 12,
    },
    charCountError: {
        color: "#ff3b30",
    },
    saveButton: {
        backgroundColor: "#0066cc",
        padding: 16,
        borderRadius: 8,
        alignItems: "center",
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    disabledButton: {
        backgroundColor: "#ccc",
    },
    fieldContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    fieldLabel: {
        fontSize: 15,
        color: "#777777",
        flex: 1,
    },
    fieldValueContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    fieldValue: {
        fontSize: 15,
        color: "#333",
        textAlign: "right",
    },
    hometownValueContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        marginRight: 8,
    },
    selectedCountryFlag: {
        width: 24,
        height: 16,
        marginRight: 8,
        borderRadius: 2,
    },
    sectionContainer: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 12,
    },
    tagsSection: {
        marginTop: 8,
    },
    tagsCaptionText: {
        fontSize: 14,
        color: "#666",
        marginBottom: 8,
    },
    tagsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    tag: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
    },
    tagText: {
        fontSize: 14,
        marginRight: 4,
    },
    closeTagBtn: {
        padding: 2,
    },
    preferenceSetting: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    preferenceText: {
        fontSize: 15,
        color: "#333",
    },
    educationContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    educationName: {
        fontSize: 15,
        color: "#333",
    },
    educationDetails: {
        flexDirection: "row",
        alignItems: "center",
    },
    educationYear: {
        fontSize: 14,
        color: "#666",
        marginRight: 4,
    },
    addButton: {
        flexDirection: "column",
        alignItems: "center",
        marginTop: 12,
    },
    addButtonText: {
        color: "#0066cc",
        fontSize: 15,
        marginLeft: 4,
    },
    careerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
    },
    careerTitle: {
        fontSize: 15,
        color: "#333",
    },
    companyName: {
        fontSize: 14,
        color: "#666",
        marginTop: 4,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
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
    modalOption: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    modalText: {
        fontSize: 16,
        color: "#333",
        textAlign: "center",
    },
    cancelButton: {
        marginTop: 8,
        borderBottomWidth: 0,
    },
    cancelButtonText: {
        color: "#ff3b30",
        fontSize: 16,
        textAlign: "center",
    },
    selectedOption: {
        color: "#0066cc",
        fontWeight: "500",
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
    hometownModalContent: {
        height: "80%",
    },
});
