import ThemedText from '@/components/ThemedText';
import React, { useEffect, useState } from 'react';
import { Modal, TextInput, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";

interface BioModalProps {
    visible: boolean;
    bio: string;
    setTempBio: (bio: string) => void;
    // onSave: () => void;
    onClose: () => void;
}

const BioModal: React.FC<BioModalProps> = ({ visible, bio, setTempBio, onClose }) => {
    const [internalValue, setInternalValue] = useState(bio);

    useEffect(() => {
        setInternalValue(bio);
    }, [bio]);

    const handleTextChange = (text: string) => {
        setInternalValue(text);
    };

    const handleFinalChange = () => {
        if (internalValue.length <= 80) {
            setTempBio(internalValue);
            onClose()
        }
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.bioModalContent}>
                    <View style={styles.bioModalHeader}>
                        <ThemedText style={styles.modalTitle}>Edit Bio</ThemedText>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Ionicons name="close" size={24} color="#333" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bioInputContainer}>
                        <TextInput
                            style={styles.bioTextInput}
                            value={internalValue}
                            onChangeText={handleTextChange}
                            // onBlur={handleFinalChange}
                            // onSubmitEditing={handleFinalChange}
                            multiline
                            maxLength={80}
                            placeholder="Input your bio"
                            placeholderTextColor="#999"
                        />
                        <Text
                            style={[
                                styles.charCount,
                                internalValue.length > 80 && styles.charCountError,
                            ]}
                        >
                            {internalValue.length}/80 characters
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={[styles.saveButton, internalValue.length > 80 && styles.disabledButton]}
                        onPress={handleFinalChange}
                        disabled={bio.length > 80}
                    >
                        <ThemedText style={styles.saveButtonText}>Save</ThemedText>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
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
        color: "#F1567D",
        marginTop: 8,
        fontSize: 12,
    },
    charCountError: {
        color: "#ff3b30",
    },
    saveButton: {
        backgroundColor: "#F1567D",
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


export default BioModal;
