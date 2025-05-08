import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { replace } from "@/utils/navigationService";
import { scaleWidth, scaleHeight, scaleFont } from "@/constants/scaling";
import customColors from "@/constants/styles";
import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/context/AuthProvider";


const { width } = Dimensions.get("window");

interface InterestChipProps {
  label: string;
  isSelected: boolean;
  onSelect: () => void;
}

const InterestChip: React.FC<InterestChipProps> = React.memo(({ label, isSelected, onSelect }) => {
  return (
    <TouchableOpacity
      style={[styles.chip, isSelected && styles.chipSelected]}
      onPress={onSelect}
      accessibilityLabel={`Select ${label} interest`}
    >
      <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
});

export default function Interests() {
  const interests = [
    "Music",
    "Sports",
    "Gaming",
    "Technology",
    "Movies",
    "Travel",
    "Fitness",
    "Food",
    "Fashion",
    "Books",
  ];
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const { toggleCheckAuthentication } = useAuth()

  const toggleInterest = useCallback((interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  }, []);

  const handleDone = useCallback(() => {
    toggleCheckAuthentication()
    console.log('hitting skip')
  }, []);

  const getToken = async () => {
    const token = await AsyncStorage.getItem('userTokenSetup');
    console.log(token, 'token on interest page')
  }

  useEffect(() => {
    getToken()
  }, [])

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Select your interests"
        rightLabel="Skip"
        rightAction={handleDone}
      />

      <Text style={styles.description}>Enhance your video recommendations.</Text>

      <View style={styles.chipsContainer}>
        {interests.map((interest) => (
          <InterestChip
            key={interest}
            label={interest}
            isSelected={selectedInterests.includes(interest)}
            onSelect={() => toggleInterest(interest)}
          />
        ))}
      </View>

      {selectedInterests.length !== 0 && (
        <TouchableOpacity style={styles.submitButton} onPress={handleDone}>
          <Text style={styles.submitText}>Done</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const CustomHeader = ({
  title,
  rightLabel,
  rightAction,
}: {
  title: string;
  rightLabel?: string;
  rightAction?: () => void;
}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {rightLabel && rightAction && (
        <TouchableOpacity
          onPress={rightAction}
          style={styles.skipButton}
          accessibilityLabel="Skip interests selection"
        >
          <Text style={styles.skipText}>{rightLabel}</Text>
          <Feather name="chevrons-right" size={scaleFont(18)} color={customColors.gray800} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customColors.white,
    paddingHorizontal: scaleWidth(20),
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scaleHeight(10),
    marginTop: scaleHeight(10)
  },
  title: {
    color: customColors.gray800,
    fontFamily: "DM Sans",
    fontSize: scaleFont(24),
    fontWeight: "700",
    lineHeight: scaleHeight(30),
  },
  skipButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  skipText: {
    color: customColors.gray800,
    fontFamily: "DM Sans",
    fontSize: scaleFont(16),
    fontWeight: "500",
    lineHeight: scaleHeight(20),
    marginRight: scaleWidth(2),
  },
  description: {
    color: customColors.gray600,
    fontFamily: "DM Sans",
    fontSize: scaleFont(16),
    fontWeight: "400",
    lineHeight: scaleHeight(22),
    marginTop: scaleHeight(10),
    marginBottom: scaleHeight(20),
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: width < 360 ? scaleWidth(10) : scaleWidth(12),
  },
  chip: {
    paddingVertical: width < 360 ? scaleHeight(5) : scaleHeight(6),
    paddingHorizontal: width < 360 ? scaleWidth(10) : scaleWidth(13),
    alignItems: "center",
    borderRadius: scaleWidth(18),
    borderWidth: 1,
    borderColor: customColors.gray200,
  },
  chipSelected: {
    borderColor: customColors.primary,
  },
  chipText: {
    color: customColors.gray600,
    fontFamily: "DM Sans",
    fontSize: width < 360 ? scaleFont(14) : scaleFont(16),
    fontWeight: "400",
    lineHeight: scaleHeight(18),
  },
  chipTextSelected: {
    color: customColors.primary,
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
    fontFamily: "DM Sans",
    fontSize: scaleFont(16),
    fontWeight: "700",
  },
});