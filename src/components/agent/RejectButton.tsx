import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import customColors from '@/constants/styles';
import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';

const RejectButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity style={styles.rejectButton} onPress={onPress}>
      <Text style={styles.rejectButtonText}>Reject</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rejectButton: {
    backgroundColor: "red",
    borderRadius: scaleWidth(20),
    paddingHorizontal: scaleWidth(12),
    paddingVertical: scaleHeight(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  rejectButtonText: {
    fontSize: scaleFont(12),
    color: customColors.white,
  },
});

export default RejectButton;