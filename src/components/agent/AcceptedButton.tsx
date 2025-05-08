import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import customColors from '@/constants/styles';
import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';

const AcceptedButton = () => {
  return (
    <TouchableOpacity
      style={[styles.acceptedButton, styles.acceptedButtonAccepted]}
      disabled={true}
    >
      <Text style={[styles.acceptedButtonText, styles.acceptedButtonTextAccepted]}>
        Accepted
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  acceptedButton: {
    backgroundColor: customColors.textLightTertiary,
    borderRadius: scaleWidth(20),
    paddingHorizontal: scaleWidth(16),
    paddingVertical: scaleHeight(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptedButtonAccepted: {
    backgroundColor: customColors.gray500,
    borderWidth: 1,
    borderColor: customColors.white,
  },
  acceptedButtonText: {
    fontSize: scaleFont(14),
    color: customColors.white,
  },
  acceptedButtonTextAccepted: {
    fontWeight: 'bold',
  },
});

export default AcceptedButton;