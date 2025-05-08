import { launchCamera, launchImageLibrary  } from 'react-native-image-picker';
import { useState } from 'react';

export type DocumentType = 'profile' | 'cover' | 'document';

export const useUploadDocument = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [docType, setDocType] = useState<DocumentType>('profile');

  const openUploadModal = (type: DocumentType) => {
    setDocType(type);
    setModalVisible(true);
  };

  const uploadDocument = async (
    fromCamera: boolean,
    onResult: (uri: string) => void
  ) => {
    setModalVisible(false);

    const options = {
      mediaType: 'photo' as const,
      quality: 0.8,
      includeBase64: false,
      saveToPhotos: true,
    };

    try {
      const result = fromCamera
        ? await launchCamera(options)
        : await launchImageLibrary(options);

      const asset = result.assets?.[0];
      if (asset?.uri) {
        onResult(asset.uri);
      }
    } catch (error) {
      console.error('Image picking failed:', error);
    }
  };

  return {
    isModalVisible,
    docType,
    openUploadModal,
    uploadDocument,
    setModalVisible,
  };
};
