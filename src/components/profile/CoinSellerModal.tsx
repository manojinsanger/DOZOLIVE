import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-picker'; // Updated import
import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';
import customColors from '@/constants/styles';

interface CoinSellerModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
}

const CoinSellerModal: React.FC<CoinSellerModalProps> = ({ visible, onClose, onSave }) => {
  const [autoReply, setAutoReply] = useState(
    'Hello i am Ueco\n\nIF YOU NEED CHEAP PRICE COINS CONTACT ME\n91 729107777\n24 HOURS SERVICE'
  );
  const [whatsAppNumber, setWhatsAppNumber] = useState('729107777');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Function to pick an image using react-native-image-picker
  const pickImage = () => {
    const options = {
      title: 'Select Coin Price Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      mediaType: 'photo' as const, // Specify media type
      allowsEditing: true,
      quality: 1,
    };

    ImagePicker.showImagePicker(options, (response:any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        Alert.alert('Error', `ImagePicker Error: ${response.error}`);
      } else if (response.uri) {
        setSelectedImage(response.uri);
      }
    });
  };

  // Handle save action
  const handleSave = () => {
    console.log('Saving settings:', { autoReply, whatsAppNumber, selectedImage });
    onSave();
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>CoinSeller Setting</Text>

          {/* Auto-reply Section */}
          <Text style={styles.label}>AUTO-REPLY</Text>
          <TextInput
            style={styles.textArea}
            multiline
            value={autoReply}
            onChangeText={setAutoReply}
            placeholder="Enter auto-reply message"
          />

          {/* WhatsApp Number Section */}
          <Text style={styles.label}>WhatsApp number</Text>
          <TextInput
            style={styles.input}
            value={whatsAppNumber}
            onChangeText={setWhatsAppNumber}
            placeholder="Enter WhatsApp number"
            keyboardType="numeric"
          />

          {/* Upload Coin Price Image Section */}
          <Text style={styles.label}>Upload coin price IMAGE</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.previewImage} />
            ) : (
              <Text style={styles.uploadText}>+</Text>
            )}
          </TouchableOpacity>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CoinSellerModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end', // Align to bottom to take half screen
    // marginBottom: scaleHeight(100),
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: scaleWidth(20),
    borderTopRightRadius: scaleWidth(20),
    padding: scaleWidth(20),
    // height: '60%', // Take half the screen height
  },
  title: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    marginBottom: scaleHeight(15),
    color: customColors.backgroundDark,
    textAlign: 'left',
  },
  label: {
    fontSize: scaleFont(14),
    color: '#666',
    marginBottom: scaleHeight(5),
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: scaleWidth(10),
    padding: scaleWidth(10),
    fontSize: scaleFont(14),
    height: scaleHeight(130),
    marginBottom: scaleHeight(15),
    textAlignVertical: 'top',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: scaleWidth(10),
    padding: scaleWidth(10),
    fontSize: scaleFont(14),
    marginBottom: scaleHeight(15),
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: scaleWidth(10),
    width: scaleWidth(80),
    height: scaleWidth(80),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scaleHeight(15),
    overflow: 'hidden',
  },
  uploadText: {
    fontSize: scaleFont(20),
    color: '#666',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: scaleWidth(10),
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: scaleHeight(12),
    borderRadius: scaleWidth(25),
  },
  saveText: {
    color: '#fff',
    fontSize: scaleFont(16),
    textAlign: 'center',
    fontWeight: '600',
  },
});