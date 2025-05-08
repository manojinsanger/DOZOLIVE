import CustomHeader from '@/components/profile/CustomHeader';
import customColors from '@/constants/styles';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  StatusBar,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AskHelp = () => {
  const [description, setDescription] = useState('');
  const [mediaUri, setMediaUri] = useState<string | null>(null);

  const handleSaveDraft = () => {
    Alert.alert(
      'Draft saved!',
      'Your information has been temporarily stored.',
    );
    // You can persist to AsyncStorage or backend later
  };

  const handleImagePick = () => {
    launchImageLibrary(
      {
        mediaType: 'mixed', // allows both images and videos
        selectionLimit: 1,
      },
      response => {
        if (response.didCancel) return;
        if (response.errorMessage) {
          Alert.alert('Error', response.errorMessage);
          return;
        }

        const asset = response.assets?.[0];
        if (asset?.uri) {
          setMediaUri(asset.uri);
        }
      },
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Contact customer service"
        rightHeader={
          <TouchableOpacity onPress={handleSaveDraft}>
            <Text style={styles.saveDraft}>Save Draft</Text>
          </TouchableOpacity>
        }
      />

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled">
        {/* Order Number */}
        <Text style={styles.label}>* Order Number</Text>
        <TextInput
          style={[styles.input, styles.disabledInput]}
          editable={false}
          value="2503231742721943621172543846"
        />

        {/* Description */}
        <Text style={styles.label}>* Please describe your issue</Text>
        <TextInput
          style={styles.textArea}
          multiline
          maxLength={250}
          value={description}
          onChangeText={setDescription}
          placeholder="Please describe your problem in detail so that we can help you ASAP~~"
          placeholderTextColor="#aaa"
        />
        <Text style={styles.charCount}>{description.length}/250</Text>

        {/* Upload Section */}
        <View style={styles.uploadSection}>
          <TouchableOpacity
            style={styles.imageUpload}
            onPress={handleImagePick}>
            {mediaUri ? (
              <Image
                source={{uri: mediaUri}}
                style={styles.previewMedia}
                resizeMode="cover"
              />
            ) : (
              <MaterialIcons name="photo-camera" size={24} color={customColors.gray500} />
            )}
          </TouchableOpacity>
          <Text style={styles.uploadNote}>
            If you have photos/videos, please provide it to us so that we can
            assist better on your problems
          </Text>
        </View>
      </ScrollView>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AskHelp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: StatusBar.currentHeight,
  },
  saveDraft: {
    color: '#5c6ef8',
    fontSize: 14,
    marginRight: 12,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#f5f7f8',
    padding: 14,
    borderRadius: 10,
    fontSize: 15,
    marginBottom: 16,
    color: '#333',
  },
  disabledInput: {
    color: '#aaa',
  },
  textArea: {
    backgroundColor: '#f5f7f8',
    padding: 14,
    borderRadius: 10,
    height: 190,
    textAlignVertical: 'top',
    fontSize: 15,
    color: '#333',
  },
  charCount: {
    alignSelf: 'flex-end',
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    marginBottom: 16,
  },
  uploadSection: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  imageUpload: {
    width: 80,
    height: 80,
    backgroundColor: '#f5f7f8',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  cameraIcon: {
    width: 32,
    height: 32,
    tintColor: '#999',
  },
  previewMedia: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  uploadNote: {
    fontSize: 13,
    color: '#888',
    marginRight: 20,
  },
  submitButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#5C6EF8',
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 50,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
