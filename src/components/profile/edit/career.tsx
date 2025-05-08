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


export default function CareerModal({
  visible,
  onClose,
  onSave,
  selectedCareer,
  editIndex,
}: CareerModalProps) {
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [fromYear, setFromYear] = useState("");
  const [toYear, setToYear] = useState("");

  const slideAnim = useRef(new Animated.Value(600)).current;

  useEffect(() => {
    if (selectedCareer) {
      setPosition(selectedCareer.position);
      setCompany(selectedCareer.company);
      setFromYear(selectedCareer.fromYear);
      setToYear(selectedCareer.toYear);
    } else {
      setPosition("");
      setCompany("");
      setFromYear("");
      setToYear("");
    }
  }, [selectedCareer, visible]);

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
    onSave({ position, company, fromYear, toYear }, editIndex);
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
            <ThemedText style={styles.headerTitle}>{editIndex !== null ? "Edit Career" : "Add Career"}</ThemedText>
            <TouchableOpacity onPress={handleSave} style={styles.checkButton}>
              <Ionicons name="checkmark" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.fieldContainer}>
              <ThemedText style={styles.label}>Position</ThemedText>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={position}
                  onChangeText={setPosition}
                  placeholder="Enter your position"
                />
                {renderClearButton(position, setPosition)}
              </View>
            </View>
            <View style={styles.fieldContainer}>
              <ThemedText style={styles.label}>Company</ThemedText>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={company}
                  onChangeText={setCompany}
                  placeholder="Enter company name"
                />
                {renderClearButton(company, setCompany)}
              </View>
            </View>
            <View style={styles.fieldContainer}>
              <ThemedText style={styles.label}>From</ThemedText>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={fromYear}
                  onChangeText={setFromYear}
                  placeholder="Start year"
                  keyboardType="numeric"
                />
                {renderClearButton(fromYear, setFromYear)}
              </View>
            </View>
            <View style={styles.fieldContainer}>
              <ThemedText style={styles.label}>To</ThemedText>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={toYear}
                  onChangeText={setToYear}
                  placeholder="End year (or Present)"
                  keyboardType="numeric"
                />
                {renderClearButton(toYear, setToYear)}
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
