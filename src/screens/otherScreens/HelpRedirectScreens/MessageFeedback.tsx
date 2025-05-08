import CustomHeader from '@/components/profile/CustomHeader';
import { scaleWidth, scaleHeight, scaleFont } from '@/constants/scaling';
import customColors from '@/constants/styles';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
  Dimensions,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Define a type for the issues object keys
type IssueCategory = 'Report Complaints' | 'Consult' | 'Feedback' | 'Business Cooperation';

// Define a custom type for the image picker response
interface ImagePickerResponse {
  didCancel?: boolean;
  errorCode?: string;
  errorMessage?: string;
  assets?: Array<{
    uri?: string;
    width?: number;
    height?: number;
    fileName?: string;
    type?: string;
  }>;
}

const MessageFeedback = () => {
  const [selectedCategory, setSelectedCategory] = useState<IssueCategory | null>(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState<{ [key in IssueCategory]: boolean }>({
    'Report Complaints': false,
    Consult: false,
    Feedback: false,
    'Business Cooperation': false,
  });
  const [selectedIssue, setSelectedIssue] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null); // State to store the selected image URI

  const categories: IssueCategory[] = ['Consult', 'Report Complaints', 'Feedback', 'Business Cooperation'];
  const issues: Record<IssueCategory, string[]> = {
    'Report Complaints': [
      'Abuse/Harassment',
      'Gift Fraud',
      'Identity Impersonation',
      'Multiple account',
      'Top-up Fraud',
      'Withdrawal Fraud',
      'External Site Advertisement',
      'Live broadcast violation',
      'Violation of child safety',
      'Report Others',
    ],
    'Consult': ['Top up', 'Withdraw', 'Host tasks/Rank Rewards', 'Face Authentication','Change of Gender/country','Appeal of account Suspenson','Account and Security','Account Exception Handling','Account Exception Handling','Invitation Reward','Platform Event','Others'],
    'Feedback': ['Software defect', 'Feature requests','Spot Errors and Get Coins'],
    'Business Cooperation': [
     'Agency Application','Agency & Host','Base Salary Host'
    ],
  };

  const toggleCategory = (category: IssueCategory) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
    setIsCategoryOpen((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Function to request permissions on Android
  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'This app needs access to your storage to pick images.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // iOS permissions are handled via Info.plist
  };

  // Function to pick an image from the device
  const pickImage = async () => {
    // Request storage permission for Android
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Storage permission is required to pick images.');
      return;
    }

    // Launch image picker
    const options = {
      mediaType: 'photo',
      quality: 1,
      allowsEditing: true,
      aspect: [4, 3],
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        Alert.alert('Error', `Image picker error: ${response.errorMessage}`);
      } else if (response.assets && response.assets.length > 0) {
        // Handle undefined uri by setting to null
        setImageUri(response.assets[0].uri ?? null);
      }
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        <CustomHeader title="Contact customer service " />
        <Text style={styles.hint}>Choose the right category to triple your response speed</Text>

        <Text style={styles.categoryLabel}>Please select category of the question</Text>
        <View style={styles.categoryContainer}>
          <View style={styles.row}>
            {categories.slice(0, 2).map((category) => (
              <TouchableOpacity
                key={category}
                style={[styles.categoryButton, selectedCategory === category && styles.selectedCategory]}
                onPress={() => toggleCategory(category)}
              >
                <Text style={[styles.categoryText, selectedCategory === category && { color: customColors.secondary }]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.row}>
            {categories.slice(2).map((category) => (
              <TouchableOpacity
                key={category}
                style={[styles.categoryButton, selectedCategory === category && styles.selectedCategory]}
                onPress={() => toggleCategory(category)}
              >
                <Text style={[styles.categoryText, selectedCategory === category && { color: customColors.secondary }]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {selectedCategory && isCategoryOpen[selectedCategory] && (
          <View style={styles.issueContainer}>
            {issues[selectedCategory].map((issue) => (
              <TouchableOpacity
                key={issue}
                style={[styles.issueButton, selectedIssue === issue && styles.selectedIssue]}
                onPress={() => setSelectedIssue(issue)}
              >
                <Text style={styles.issueText}>{issue}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Text style={styles.descriptionLabel}>Please describe your issue</Text>
        <TextInput
          style={styles.descriptionInput}
          placeholder="Please describe your problem in detail so that we can help you ASAP..."
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <View style={styles.imageUploader}>
          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <Icon name="camera-alt" size={scaleFont(24)} color={customColors.gray600} />
          </TouchableOpacity>
          {imageUri && <Image source={{ uri: imageUri }} style={styles.imageIcon} />}
          <Text style={styles.uploadText}>
            If you have photos/videos, please provide it to us so that we can assist better on your problems
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight,
    marginBottom: scaleHeight(20)

  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: scaleWidth(10),
    paddingBottom: scaleHeight(Dimensions.get('window').height * 0.1), // Extra padding to avoid content hiding under footer
  },
  hint: {
    color: '#ff9800',
    fontSize: scaleFont(12),
    marginBottom: scaleHeight(10),
  },
  categoryLabel: {
    fontSize: scaleFont(14),
  },
  categoryContainer: {
    marginBottom: scaleHeight(15),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaleHeight(5),
    marginTop: scaleHeight(10),
  },
  categoryButton: {
    flex: 1,
    padding: scaleHeight(10),
    width: scaleWidth(60),
    borderWidth: 1,
    borderColor: customColors.secondary,
    borderRadius: scaleWidth(8),
    marginHorizontal: scaleWidth(5),
    alignItems: 'center',
  },
  selectedCategory: {
    // No background or color here, keeping it for potential button styling
  },
  categoryText: {
    fontSize: scaleFont(14),
    color: customColors.backgroundDark
  },
  issueContainer: {
    marginBottom: scaleHeight(10),
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  issueButton: {
    padding: scaleWidth(8),
    backgroundColor: 'rgba(215, 230, 250, 0.926)',
    borderRadius: scaleWidth(20),
    marginVertical: scaleHeight(5),
    alignItems: 'center',
    marginHorizontal: '2%',
  },
  selectedIssue: {
    backgroundColor: '#d3d3fa',
  },
  issueText: {
    fontSize: scaleFont(12),
    color: customColors.backgroundDark
  },
  descriptionLabel: {
    color: customColors.gray400,
    fontSize: scaleFont(14),
    marginVertical: scaleHeight(5),
  },
  descriptionInput: {
    height: scaleHeight(200),
    backgroundColor: customColors.gray100,
    borderRadius: scaleWidth(10),
    padding: scaleWidth(10),
    marginBottom: scaleHeight(10),
    textAlignVertical: 'top',
  },
  imageUploader: {
    marginBottom: scaleHeight(20),
  },
  uploadButton: {
    backgroundColor: customColors.gray200,
    padding: scaleWidth(40),
    borderRadius: scaleWidth(5),
    marginVertical: scaleHeight(8),
    width: scaleWidth(110),
    height: scaleHeight(120),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageIcon: {
    width: scaleWidth(50),
    height: scaleHeight(50),
    marginRight: scaleWidth(10),
    marginBottom: scaleHeight(10),
  },
  uploadText: {
    fontSize: scaleFont(12),
    color: '#666',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: scaleWidth(10),
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: customColors.gray300,
  },
  submitButton: {
    backgroundColor: '#4169e1',
    padding: scaleHeight(15),
    borderRadius: scaleWidth(25),
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: scaleFont(16),
    fontWeight: '600',
  },
});

export default MessageFeedback;