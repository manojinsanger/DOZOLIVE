import ThemedText from "@/components/ThemedText";
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";



export default function EducationModal({
  visible,
  onClose,
  onSave,
  selectedEducation,
  editIndex,
}: EducationModalProps) {
  const [education, setEducation] = useState("");
  const [educationYear, setEducationYear] = useState("");

  const slideAnim = useRef(new Animated.Value(600)).current;

  // Populate the modal with existing values if editing
  useEffect(() => {
    if (selectedEducation) {
      setEducation(selectedEducation.education);
      setEducationYear(selectedEducation.educationYear);
    } else {
      setEducation("");
      setEducationYear("");
    }
  }, [selectedEducation, visible]);

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 600,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleSave = () => {
    onSave({ education, educationYear }, editIndex);
    onClose();
  };

  const renderClearButton = (value: string, setValue: (text: string) => void) =>
    value ? (
      <TouchableOpacity onPress={() => setValue("")} style={styles.clearButton}>
        <Ionicons name="close-circle" size={20} color="#999" />
      </TouchableOpacity>
    ) : null;

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <Animated.View style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }]}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="arrow-back" size={24} color="#ffffff" />
            </TouchableOpacity>
            <ThemedText style={styles.headerTitle}>{editIndex !== null ? "Edit Education" : "Add Education"}</ThemedText>
            <TouchableOpacity onPress={handleSave} style={styles.checkButton}>
              <Ionicons name="checkmark" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.fieldContainer}>
              <ThemedText style={styles.label}>School</ThemedText>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={education}
                  onChangeText={setEducation}
                  placeholder="Enter your school"
                />
                {renderClearButton(education, setEducation)}
              </View>
            </View>
            <View style={styles.fieldContainer}>
              <ThemedText style={styles.label}>Time</ThemedText>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={educationYear}
                  onChangeText={setEducationYear}
                  placeholder="Tell us when you graduated"
                />
                {renderClearButton(educationYear, setEducationYear)}
              </View>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F1567D",
    padding: 16,
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  form: {
    padding: 16,
  },
  fieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    flex: 1,
  },
  inputContainer: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  clearButton: {
    padding: 4,
  },
  checkButton: {
    padding: 4,
  },
});
