// src/components/common/ExitConfirmationModal.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import LinnerGradientCard2 from '@/components/common/gradientCards/LinnearGradientCard2';
import { scaleFont, scaleWidth } from '@/constants/scaling';
import customColors from '@/constants/styles';

interface ExitConfirmationModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const LiveSetupExitModal: React.FC<ExitConfirmationModalProps> = ({
  visible,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <LinnerGradientCard2 customStyles={styles.modalContainer}>
          <Text style={styles.modalTitle}>Exit Live Setup?</Text>
          <Text style={styles.modalMessage}>
            Are you sure you want to exit? Your live stream setup will be discarded.
          </Text>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={styles.modalButton} onPress={onCancel}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButtonConfirm} onPress={onConfirm}>
              <Text style={[styles.modalButtonText, { color: customColors.secondary }]}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </LinnerGradientCard2>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: scaleWidth(300),
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  modalTitle: {
    color: customColors.white,
    fontSize: scaleFont(20),
    fontWeight: '600',
    marginBottom: 10,
  },
  modalMessage: {
    color: customColors.white,
    fontSize: scaleFont(14),
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 5,
  },
  modalButtonConfirm: {
    flex: 1,
    backgroundColor: customColors.white,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 5,
  },
  modalButtonText: {
    color: customColors.white,
    fontSize: scaleFont(16),
    fontWeight: '600',
  },
});

export default LiveSetupExitModal;