import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import customColors from '@/constants/styles';
import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';

const ReceiveButton = () => {
  const [isReceived, setIsReceived] = useState(false);

  const handlePress = () => {
    setIsReceived(true);
  };

  return (
    <TouchableOpacity
      style={[styles.receiveButton, isReceived ? styles.receiveButtonReceived : null]}
      onPress={handlePress}
      disabled={isReceived}
    >
      <Text style={[styles.receiveButtonText, isReceived ? styles.receiveButtonTextReceived : null]}>
        {isReceived ? 'Received' : 'Unreceived'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  receiveButton: {
    backgroundColor:  customColors.secondary,
    borderRadius: scaleWidth(20),
    paddingHorizontal: scaleWidth(16),
    paddingVertical: scaleHeight(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  receiveButtonReceived: {
    backgroundColor: customColors.gray400,
    borderWidth: 1,
    borderColor: customColors.white,
  },
  receiveButtonText: {
    fontSize: scaleFont(14),
    color: customColors.backgroundDark,
  },
  receiveButtonTextReceived: {
    fontWeight: 'bold',
  },
});

export default ReceiveButton;