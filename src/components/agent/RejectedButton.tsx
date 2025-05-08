import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import customColors from '@/constants/styles';
import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';

const RejectedButton = () => {
  return (
    <TouchableOpacity
      style={[styles.rejectedButton, styles.rejectedButtonRejected]}
      disabled={true}
    >
      <Text style={[styles.rejectedButtonText, styles.rejectedButtonTextRejected]}>
        Rejected
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rejectedButton: {
    backgroundColor: customColors.textLightTertiary,
    borderRadius: scaleWidth(20),
      paddingHorizontal: scaleWidth(16),
      paddingVertical: scaleHeight(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  rejectedButtonRejected: {
    backgroundColor: customColors.gray500,
    borderWidth: 1,
    borderColor: customColors.white,
  },
  rejectedButtonText: {
    fontSize: scaleFont(14),
    color: customColors.white,
  },
  rejectedButtonTextRejected: {
    fontWeight: 'bold',
  },
});

export default RejectedButton;