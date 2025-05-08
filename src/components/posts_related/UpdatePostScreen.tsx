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
  Modal,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import { scaleWidth, scaleHeight, scaleFont } from '@/constants/scaling';
import customColors from '@/constants/styles';
import { updatePost } from '@/store/features/Post_related/createPostServices';
import CustomHeader from '../profile/CustomHeader';

interface ImageData {
  uri: string;
  isNew: boolean; // true for local images, false for server images
}

const UpdatePostScreen = ({ route }: any) => {
  const navigation = useNavigation();
  const post = route?.params?.post;
  const [description, setDescription] = useState(post?.description || '');
  const [tags, setTags] = useState(post?.tags?.join(', ') || '');
  const [images, setImages] = useState<ImageData[]>(
    post?.files?.map((uri: string) => ({ uri, isNew: false })) || []
  );
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!post) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: Invalid post data</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
        setImages([...images, { uri: newImage, isNew: true }]);
      }
    });
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index);
    setModalVisible(true);
  };

  const getImageUri = (uri: string, isNew: boolean) => {
    return isNew ? uri : `https://dozoapi.com${uri}`;
  };

  const validateInputs = () => {
    if (description.length > 5000) {
      Alert.alert('Error', 'Description must be less than 5000 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) {
      return;
    }

    setLoading(true);
    try {
      const newFiles = images.filter(img => img.isNew).map(img => img.uri);
      const existingFiles = images.filter(img => !img.isNew).map(img => img.uri);
      const postData = {
        description: description || undefined,
        tags: tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : undefined,
        files: newFiles.length > 0 ? newFiles : undefined,
        existingFiles: existingFiles.length > 0 ? existingFiles : undefined,
      };

      await updatePost(parseInt(post.id, 10), postData);
      Alert.alert('Success', 'Post updated successfully');
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to update post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.containerWrapper}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <CustomHeader title="Update Post" />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
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
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={tags}
            onChangeText={setTags}
            placeholder="Tags (comma separated)"
            placeholderTextColor={customColors.gray600}
          />
        </View>
        <Text style={styles.label}>Images (Max 5)</Text>
        <View style={styles.imageUploaderContainer}>
          <View style={styles.imageRow}>
            {images.map((img, index) => (
              <View key={index} style={styles.imageUploader}>
                <View style={styles.imageWrapper}>
                  <TouchableOpacity onPress={() => openImageModal(index)}>
                    <Image
                      source={{ uri: getImageUri(img.uri, img.isNew) }}
                      style={styles.imageIcon}
                    />
                  </TouchableOpacity>
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
              </View>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Update Post</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
      {/* Image Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
              accessibilityLabel="Close image modal"
            >
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <Carousel
            width={scaleWidth(375)}
            height={scaleHeight(500)}
            data={images}
            defaultIndex={selectedImageIndex}
            renderItem={({ item: img }) => (
              <Image
                source={{ uri: getImageUri(img.uri, img.isNew) }}
                style={styles.carouselImage}
                resizeMode="contain"
              />
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: scaleWidth(26),
  },
  contentContainer: {
    paddingBottom: scaleHeight(32),
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: scaleFont(16),
    color: customColors.error,
    marginBottom: scaleHeight(20),
  },
  backButton: {
    backgroundColor: '#22c55e',
    paddingVertical: scaleHeight(10),
    paddingHorizontal: scaleWidth(20),
    borderRadius: 10,
  },
  backButtonText: {
    fontSize: scaleFont(16),
    color: '#fff',
    fontWeight: '600',
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
    marginTop: scaleHeight(16),
  },
  input: {
    flex: 1,
    height: scaleHeight(48),
    fontSize: scaleFont(16),
    color: '#333',
    borderWidth: 1,
    borderColor: customColors.gray200,
    borderRadius: scaleWidth(10),
    paddingHorizontal: scaleWidth(12),
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
  },
  uploadButton: {
    backgroundColor: customColors.gray200,
    padding: scaleWidth(20),
    borderRadius: scaleWidth(5),
    width: scaleWidth(80),
    height: scaleHeight(80),
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
  submitButton: {
    backgroundColor: '#22c55e',
    paddingVertical: scaleHeight(16),
    borderRadius: scaleWidth(10),
    alignItems: 'center',
    marginTop: scaleHeight(16),
  },
  submitButtonDisabled: {
    backgroundColor: customColors.gray500,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: scaleFont(18),
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeader: {
    position: 'absolute',
    top: scaleHeight(40),
    left: scaleWidth(20),
    zIndex: 1,
  },
  closeButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    padding: scaleWidth(10),
  },
  carouselImage: {
    width: scaleWidth(375),
    height: scaleHeight(500),
  },
});

export default UpdatePostScreen;