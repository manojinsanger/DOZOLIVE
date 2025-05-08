import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scaleWidth, scaleHeight, scaleFont } from '@/constants/scaling';
import customColors from '@/constants/styles';
import { createPost, getPosts } from '@/store/features/Post_related/createPostServices';
import CustomHeader from '../profile/CustomHeader';
import { goBack } from '@/utils/navigationService';
import { SafeAreaContext, SafeAreaView } from 'react-native-safe-area-context';
import LinnerGradientCard from '../common/gradientCards/LinnearGradientCard';

const CreatePostScreen = () => {
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Pick images using react-native-image-picker
  const pickImage = async () => {
    const options = {
      mediaType: 'photo',
      quality: 0.7,
    };

    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
        return;
      }
      if (response.errorCode) {
        Alert.alert('Error', 'Failed to access photos');
        return;
      }

      const newImage = response.assets?.[0]?.uri || '';
      if (newImage) {
        if (images.length >= 5) {
          Alert.alert('Limit reached', 'You can only upload up to 5 images');
          return;
        }
        setImages([...images, newImage]);
      }
    });
  };

  // Remove image from selection
  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // Validate inputs before submission
  const validateInputs = () => {
    if (description.length > 5000) {
      Alert.alert('Error', 'Description must be less than 5000 characters');
      return false;
    }
    return true;
  };

  // Handle post submission
  const handleSubmit = async () => {
    if (!validateInputs()) {
      return;
    }

    setLoading(true);
    try {
      const postData = {
        description: description || undefined,
        tags: tags || undefined,
        files: images,
      };

      await createPost(postData);
      await getPosts()
      Alert.alert('Success', 'Post created successfully');
      goBack();
      setDescription('');
      setTags('');
      setImages([]);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        <CustomHeader title="Post moments" />
      <ScrollView style={styles.container}>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            value={description}
            onChangeText={setDescription}
            placeholder="Say something to record this moment"
            placeholderTextColor={customColors.gray600}
            multiline
            maxLength={5000}
          />
        </View>

        <Text style={styles.label}>Images (Max 5)</Text>
        <View style={styles.imageUploaderContainer}>
          <View style={styles.imageRow}>
            {images.map((uri, index) => (
              <View key={index} style={styles.imageUploader}>
                <View style={styles.imageWrapper}>
                  <Image source={{ uri }} style={styles.imageIcon} />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeImage(index)}
                  >
                    <Ionicons
                      name="close-circle"
                      size={scaleFont(20)}
                      color={customColors.error}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            {images.length < 5 && (
              <View style={styles.imageUploader}>
                <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                  <Ionicons
                    name="camera-outline"
                    size={scaleFont(24)}
                    color={customColors.gray600}
                  />
                </TouchableOpacity>
                {/* <Text style={styles.uploadText}>
                If you have photos/videos, please provide it to us
              </Text> */}
              </View>
            )}
          </View>
        </View>

        <TouchableOpacity
          style={{}}
          onPress={handleSubmit}
          disabled={loading}
        >
          <LinnerGradientCard customStyles={[styles.submitButton, loading && styles.submitButtonDisabled]}>

            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>Create Post</Text>
            )}
          </LinnerGradientCard>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scaleWidth(26),

  },
  label: {
    fontSize: scaleFont(16),
    fontWeight: '600',
    color: '#333',
    marginBottom: scaleHeight(8),
    marginTop: scaleHeight(16),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scaleWidth(10),
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: scaleFont(16),
    color: '#333',
  },
  multilineInput: {
    height: scaleHeight(120),
    textAlignVertical: 'top',
    paddingTop: scaleHeight(12),
  },
  imageUploaderContainer: {
    marginBottom: scaleHeight(20),
  },
  imageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  imageUploader: {
    marginRight: scaleWidth(10),
    marginBottom: scaleHeight(10),
    alignItems: 'center',
    width: scaleWidth(80),
  },
  uploadButton: {
    backgroundColor: customColors.gray200,
    padding: scaleWidth(20),
    borderRadius: scaleWidth(5),
    width: scaleWidth(100),
    height: scaleHeight(120),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    position: 'relative',
  },
  imageIcon: {
    width: scaleWidth(80),
    height: scaleHeight(80),
    borderRadius: scaleWidth(5),
  },
  removeButton: {
    position: 'absolute',
    top: -scaleHeight(8),
    right: -scaleWidth(8),
  },
  uploadText: {
    fontSize: scaleFont(12),
    color: '#666',
    textAlign: 'center',
    marginTop: scaleHeight(5),
    width: scaleWidth(80),
  },
  submitButton: {
    backgroundColor: '#22c55e',
    paddingVertical: scaleHeight(16),
    borderRadius: scaleWidth(10),
    alignItems: 'center',
    marginBottom: scaleHeight(32),
  },
  submitButtonDisabled: {
    backgroundColor: customColors.gray500,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: scaleFont(18),
    fontWeight: '600',
  },
});

export default CreatePostScreen;