import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import customColors from '@/constants/styles';
import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';

const AcceptButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity style={styles.acceptButton} onPress={onPress}>
      <Text style={styles.acceptButtonText}>Accept</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  acceptButton: {
    backgroundColor: customColors.secondary,
    borderRadius: scaleWidth(20),
    paddingHorizontal: scaleWidth(12),
    paddingVertical: scaleHeight(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptButtonText: {
    fontSize: scaleFont(12),
    color: customColors.white,
  },
});

export default AcceptButton;