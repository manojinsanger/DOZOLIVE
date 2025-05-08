import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';
import customColors from '@/constants/styles';

interface LiveDataDescriptionModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const LiveDataDescriptionModal: React.FC<LiveDataDescriptionModalProps> = ({ visible, onClose, children }) => {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}> Rules</Text>
          <View style={styles.content}>
            {children}
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default LiveDataDescriptionModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: scaleWidth(20),
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: scaleWidth(20),
    padding: scaleWidth(20),
    width: '100%',
  },
  title: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    marginBottom: scaleHeight(10),
    color: customColors.backgroundDark,
    textAlign: 'center',
  },
  content: {
    marginBottom: scaleHeight(20),
  },
  closeButton: {
    backgroundColor: customColors.secondary,
    paddingVertical: scaleHeight(10),
    borderRadius: scaleWidth(10),
  },
  closeText: {
    color: '#fff',
    fontSize: scaleFont(16),
    textAlign: 'center',
  },
});
