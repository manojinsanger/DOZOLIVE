import { StyleSheet, Text, TouchableOpacity } from "react-native";

const TagChips: React.FC<InterestChipProps> = ({
  label,
  isSelected,
  onSelect,
}) => {
  return (
    <TouchableOpacity
      style={[styles.chip, isSelected && styles.chipSelected]}
      onPress={onSelect}
    >
      <Text
        style={[styles.chipText, isSelected && styles.chipTextSelected]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default TagChips;

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 13,
    alignItems: "center",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#F1F1F1",
  },
  chipSelected: {
    borderColor: "#F1567D",
  },
  chipText: {
    color: "#777",
    fontFamily: "DM Sans",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 18,
    maxWidth: "100%", // Ensure text does not overflow
  },
  chipTextSelected: {
    color: "#F1567D",
  },
});
