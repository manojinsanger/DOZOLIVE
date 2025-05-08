import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  Modal,
} from "react-native";

// Reusable props interface
export interface Country {
  name: string;
  flag: string;
}

export interface FlagDropdownProps {
  countries: Country[];
  selected: Country;
  onSelect: (country: Country) => void;
  containerStyle?: object;      // Optional custom styling
  showLabel?: boolean;  
  label?:object;        // Optional to hide label text
}

// Reusable dropdown component
const FlagDropdown: React.FC<FlagDropdownProps> = ({
  countries,
  selected,
  onSelect,
  containerStyle = {},
  showLabel = true,
  label = {},
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <TouchableOpacity onPress={() => setVisible(true)} style={styles.dropdown}>
        <Image source={{ uri: selected.flag }} style={styles.avatar} />
        {showLabel && <Text style={styles.label}>{selected.name}</Text>}
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPressOut={() => setVisible(false)}
        >
          <View style={styles.dropdownContainer}>
            <FlatList
              data={countries}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onSelect(item);
                    setVisible(false);
                  }}
                >
                  <Image source={{ uri: item.flag }} style={styles.optionAvatar} />
                  <Text style={styles.optionText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(241, 86, 125, 0.1)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderColor: "#F1567D",
    borderWidth: 1,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  label: {
    fontSize: 14,
    color: "white",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    padding: 20,
  },
  dropdownContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    maxHeight: 300,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  optionAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 10,
  },
  optionText: {
    fontSize: 14,
  },
});

export default FlagDropdown;
