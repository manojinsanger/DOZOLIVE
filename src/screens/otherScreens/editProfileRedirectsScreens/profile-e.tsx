import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  View,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import CoverImage from '@/components/profile/edit/CoverImage';
import ProfileImage from '@/components/profile/edit/ProfileImage';
import BioModal from '@/components/profile/edit/BioModal';
import EducationModal from './edu';
import CareerModal from '../../../components/profile/edit/career';
import LoadingScreen from '@/components/common/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateProfile } from '@/services/userProfile';
import { useUploadDocument } from '@/components/profile/useUploadDoument';
import { goBack } from '@/utils/navigationService';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import UploadDocumentModal from '@/components/profile/UploadDocumentModal';
import customColors from '@/constants/styles';
import LinnerGradientCard from '@/components/common/gradientCards/LinnearGradientCard';
import LinearGradient from 'react-native-linear-gradient';
import { useToast} from '@/context/CustomToastContext';
import ThemedText from '@/components/ThemedText';
import { current } from '@reduxjs/toolkit';

interface Career {
  position: string;
  company: string;
  fromYear: string;
  toYear: string;
}

interface Profile {
  image?:any,
  profileImage?: string | null;
  coverImage: string | null;
  name: string;
  gender: string;
  dateOfBirth: string;
  homeCountry: string;
  bio: string;
  interests: string[];
  skills: string[];
  educationList: { education: string; educationYear: string }[];
  careerList: Career[];
}

export default function ProfileEdit() {
  const [loading, setLoading] = useState(false);
  const [liveID, setLiveID] = useState('');
  const [selectedEducation, setSelectedEducation] = useState<{
    education: string;
    educationYear: string;
  } | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [editCareerIndex, setEditCareerIndex] = useState<number | null>(null);
  const [showBioModal, setShowBioModal] = useState(false);
  const [eduModalVisible, setEduModalVisible] = useState(false);
  const [careerModalVisible, setCareerModalVisible] = useState(false);
  const [showCareerEditDeleteModal, setShowCareerEditDeleteModal] = useState(false);
  const [showEditDeleteModal, setShowEditDeleteModal] = useState(false);
  const [inputText, setInputText] = useState('');
  const [inputInterestText, setInputInterestText] = useState('');
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  // API Data for post
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setBirthday] = useState('');
  const [homeCountry, setHometown] = useState('');
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [educationList, setEducationList] = useState<
    { education: string; educationYear: string }[]
  >([]);
  const [careerList, setCareerList] = useState<Career[]>([]);
  const {showToast} = useToast();

  // Date Picker State
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const { isModalVisible, docType, openUploadModal, uploadDocument, setModalVisible } =
    useUploadDocument();

  const initialStateRef = useRef<Profile>({
    profileImage: null,
    coverImage: null,
    name: '',
    gender: '',
    dateOfBirth: '',
    homeCountry: '',
    bio: '',
    interests: [],
    skills: [],
    educationList: [],
    careerList: [],
  });

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const userDataString = await AsyncStorage.getItem('fbUser');
      const userData = userDataString ? JSON.parse(userDataString) : {};

      setName(userData.name || '');
      setGender(userData.gender || '');
      setBirthday(userData.dateOfBirth || '');
      setHometown(userData.homeCountry || '');
      setLiveID(userData.liveId || '');
      setCoverImage(userData.coverImage || null);
      setProfileImage(userData.profileImage || null);
      setBio(userData.bio || '');
      setInterests(Array.isArray(userData.interests) ? userData.interests : []);
      setSkills(Array.isArray(userData.skills) ? userData.skills : []);
      setEducationList(
        Array.isArray(userData.educationList) ? userData.educationList : []
      );
      setCareerList(
        Array.isArray(userData.careerList) ? userData.careerList : []
      );
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfileData = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Name cannot be empty', [{ text: 'OK' }]);
      return;
    }
  
    const currentState: Profile = {
      image:profileImage,
      coverImage,
      name,
      gender,
      dateOfBirth,
      homeCountry,
      bio,
      interests,
      skills,
      educationList,
      careerList,
    };
  
    const hasChanged = Object.keys(initialStateRef.current).some(
      (key) =>
        JSON.stringify(initialStateRef.current[key as keyof Profile]) !==
        JSON.stringify(currentState[key as keyof Profile])
    );
  
    if (hasChanged) {
      setLoading(true);
      try {
        console.log(currentState,'current State ')
        const res = await updateProfile(currentState);
        await AsyncStorage.setItem('fbUser', JSON.stringify(res.data));
        initialStateRef.current = currentState;
        showToast('success', 'Updated profile successfully!');
      } catch (error) {
        showToast('error', 'Something went wrong!');
        console.error('Error updating profile:', error);
      } finally {
        setLoading(false);
      }
    } else {
      showToast('info', "You don't have any changes");
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const scrollY = useRef(new Animated.Value(0)).current;

  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: ['rgba(0, 0, 0, 0.5)', customColors.primary],
    extrapolate: 'clamp',
  });

  const headerIconColor = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [customColors.white, customColors.white],
    extrapolate: 'clamp',
  });

  const openAddEducationModal = () => {
    setSelectedEducation(null);
    setEditIndex(null);
    setEduModalVisible(true);
  };

  const handleEditDelete = (index: number) => {
    setSelectedEducation(educationList[index] || null);
    setEditIndex(index);
    setShowEditDeleteModal(true);
  };

  const handleSaveEducation = (
    educationData: { education: string; educationYear: string },
    editIndex: number | null
  ) => {
    if (editIndex !== null) {
      const updatedList = [...educationList];
      updatedList[editIndex] = educationData;
      setEducationList(updatedList);
    } else {
      setEducationList([...educationList, educationData]);
    }
  };

  const handleDelete = () => {
    if (editIndex !== null) {
      setEducationList((prevList) => prevList.filter((_, i) => i !== editIndex));
    }
    setShowEditDeleteModal(false);
  };

  const handleEdit = () => {
    setShowEditDeleteModal(false);
    setEduModalVisible(true);
  };

  const openAddCareerModal = () => {
    setSelectedCareer(null);
    setEditCareerIndex(null);
    setCareerModalVisible(true);
  };

  const handleCareerEditDelete = (career: Career | null = null, index: number | null = null) => {
    setSelectedCareer(career);
    setEditCareerIndex(index);
    setShowCareerEditDeleteModal(true);
  };

  const handleCareerDelete = () => {
    if (editCareerIndex !== null) {
      setCareerList((prevList) => prevList.filter((_, i) => i !== editCareerIndex));
    }
    setShowCareerEditDeleteModal(false);
  };

  const handleCareerEdit = () => {
    setShowCareerEditDeleteModal(false);
    setCareerModalVisible(true);
  };

  const handleSaveCareer = (careerData: Career, index: number | null): void => {
    setCareerList((prevList) => {
      if (index !== null) {
        const updatedList = [...prevList];
        updatedList[index] = careerData;
        return updatedList;
      } else {
        return [...prevList, careerData];
      }
    });
    setCareerModalVisible(false);
  };

  const handleAddSkills = () => {
    if (!inputText.trim()) return;

    const newSkills = inputText
      .split(',')
      .map((skill) => skill.trim())
      .filter((skill) => skill !== '' && !skills.includes(skill));

    setSkills([...skills, ...newSkills]);
    setInputText('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleAddInterests = () => {
    if (!inputInterestText.trim()) return;

    const newInterests = inputInterestText
      .split(',')
      .map((interest) => interest.trim())
      .filter((interest) => interest !== '' && !interests.includes(interest));

    setInterests([...interests, ...newInterests]);
    setInputInterestText('');
  };

  const handleRemoveInterests = (interestToRemove: string) => {
    setInterests(interests.filter((interest) => interest !== interestToRemove));
  };

  const handleDateConfirm = (date: Date) => {
    setSelectedDate(date);
    const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
    setBirthday(formattedDate);
    setShowDatePicker(false);
  };

  const handleOpenDatePicker = () => {
    console.log('Opening date picker');
    setShowDatePicker(true);
  };

  const renderTags = (items: string[] = [], onRemove?: (item: string) => void) => {
    if (!items || items.length === 0) return null;

    return (
      <View style={styles.tagsSection}>
        <View style={styles.tagsContainer}>
          {items.map((item) => (
            <TouchableOpacity key={item} activeOpacity={0.8}>
              <LinnerGradientCard customStyles={styles.tag}>
                <ThemedText style={styles.tagText}>{item}</ThemedText>
                {onRemove && (
                  <TouchableOpacity
                    style={styles.closeTagBtn}
                    onPress={() => onRemove(item)}
                  >
                    <Ionicons name="close" size={16} color={customColors.gray800} />
                  </TouchableOpacity>
                )}
              </LinnerGradientCard>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={[customColors.gray100, customColors.gray200]}
      style={styles.container}
    >
      {loading && <LoadingScreen />}
      <Animated.View
        style={[styles.header, { backgroundColor: headerBackgroundColor }]}
      >
        <View style={styles.headerContent}>
          <View style={styles.backButtonContainer}>
            <TouchableOpacity  style={styles.cameraIcon} activeOpacity={0.7} onPress={() => goBack()}>
              <MaterialIcons
                name="arrow-back"
                size={20}
                // style={styles.icon}
                color={customColors.gray100}
              />
            </TouchableOpacity>
            <Animated.Text style={[styles.headerTitle, { color: headerIconColor }]}>
              Edit Profile
            </Animated.Text>
          </View>
          <TouchableOpacity
            style={styles.cameraIcon}
            onPress={() => openUploadModal('cover')}
            activeOpacity={0.7}
          >
            <Ionicons name="camera" size={20} color={customColors.gray100} />
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Animated.ScrollView
        style={styles.scrollContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <CoverImage coverImage={coverImage} onPress={() => {}} />
        <ProfileImage
          profileImage={profileImage}
          onPress={() => openUploadModal('profile')}
        />
        <View style={styles.quotesContainer}>
          <ThemedText style={styles.text}>
            Click to change or delete photo, Drag photo to change order.
          </ThemedText>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.fieldContainer}>
            <ThemedText style={styles.fieldLabel}>Name:</ThemedText>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="person-outline"
                size={20}
                color={customColors.gray700}
                style={styles.inputIcon}
              />
              <TextInput
                style={[
                  styles.input,
                  styles.inputField,
                  focusedInput === 'name' && styles.inputFieldFocused,
                ]}
                value={name}
                onChangeText={(text) => setName(text)}
                placeholder="Enter your name"
                placeholderTextColor={customColors.gray600}
                onFocus={() => setFocusedInput('name')}
                onBlur={() => setFocusedInput(null)}
                accessibilityLabel="Enter your name"
              />
            </View>
          </View>
          <View style={styles.fieldContainer}>
            <ThemedText style={styles.fieldLabel}>Gender:</ThemedText>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="male-female-outline"
                size={20}
                color={customColors.gray700}
                style={styles.inputIcon}
              />
              <TextInput
                style={[
                  styles.input,
                  styles.inputField,
                  focusedInput === 'gender' && styles.inputFieldFocused,
                ]}
                value={gender}
                onChangeText={(text) => setGender(text)}
                placeholder="Enter your gender"
                placeholderTextColor={customColors.gray600}
                onFocus={() => setFocusedInput('gender')}
                onBlur={() => setFocusedInput(null)}
                accessibilityLabel="Enter your gender"
              />
            </View>
          </View>
          <View style={styles.fieldContainer}>
            <ThemedText style={styles.fieldLabel}>Birthday:</ThemedText>
            <TouchableOpacity
              onPress={handleOpenDatePicker}
              style={styles.inputWrapper}
              activeOpacity={0.7}
              accessibilityLabel="Select your birthday"
            >
              <Ionicons
                name="calendar-outline"
                size={20}
                color={customColors.gray700}
                style={styles.inputIcon}
              />
              <TextInput
                style={[
                  styles.input,
                  styles.inputField,
                  focusedInput === 'birthday' && styles.inputFieldFocused,
                ]}
                value={dateOfBirth}
                placeholder="Select your birthday"
                placeholderTextColor={customColors.gray600}
                editable={false}
                onFocus={() => setFocusedInput('birthday')}
                onBlur={() => setFocusedInput(null)}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.fieldContainer}>
            <ThemedText style={styles.fieldLabel}>Home town:</ThemedText>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="home-outline"
                size={20}
                color={customColors.gray700}
                style={styles.inputIcon}
              />
              <TextInput
                style={[
                  styles.input,
                  styles.inputField,
                  focusedInput === 'hometown' && styles.inputFieldFocused,
                ]}
                value={homeCountry}
                onChangeText={(text) => setHometown(text)}
                placeholder="Enter your home town"
                placeholderTextColor={customColors.gray600}
                onFocus={() => setFocusedInput('hometown')}
                onBlur={() => setFocusedInput(null)}
                accessibilityLabel="Enter your home town"
              />
            </View>
          </View>
          <View style={styles.fieldContainer}>
            <ThemedText style={styles.fieldLabel}>Live ID:</ThemedText>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="id-card-outline"
                size={20}
                color={customColors.gray700}
                style={styles.inputIcon}
              />
              <TextInput
                style={[
                  styles.input,
                  styles.inputField,
                  focusedInput === 'liveID' && styles.inputFieldFocused,
                ]}
                value={liveID}
                onChangeText={(text) => setLiveID(text)}
                placeholder="Enter your Live ID"
                placeholderTextColor={customColors.gray600}
                onFocus={() => setFocusedInput('liveID')}
                onBlur={() => setFocusedInput(null)}
                accessibilityLabel="Enter your Live ID"
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.fieldContainer}
            onPress={() => setShowBioModal(true)}
            activeOpacity={0.7}
          >
            <ThemedText style={styles.fieldLabel}>Bio:</ThemedText>
            <ThemedText style={styles.fieldValue}>{bio || 'Add a bio'}</ThemedText>
          </TouchableOpacity>
        </View>
        <View style={styles.tagInputContainer}>
          <View style={styles.sectionContainer}>
            <ThemedText style={styles.sectionTitle}>Interests</ThemedText>
            <View style={styles.fieldInputContainer}>
              <TextInput
                style={[
                  styles.input,
                  styles.inputField,
                  focusedInput === 'interests' && styles.inputFieldFocused,
                ]}
                placeholder="Enter Interests (comma separated)..."
                placeholderTextColor={customColors.gray600}
                value={inputInterestText}
                onChangeText={setInputInterestText}
                onSubmitEditing={handleAddInterests}
                onFocus={() => setFocusedInput('interests')}
                onBlur={() => setFocusedInput(null)}
                accessibilityLabel="Enter interests"
              />
            </View>
            {renderTags(interests, handleRemoveInterests)}
          </View>
          <View style={styles.sectionContainer}>
            <ThemedText style={styles.sectionTitle}>Skills</ThemedText>
            <View style={styles.fieldInputContainer}>
              <TextInput
                style={[
                  styles.input,
                  styles.inputField,
                  focusedInput === 'skills' && styles.inputFieldFocused,
                ]}
                placeholder="Enter skills (comma separated)..."
                placeholderTextColor={customColors.gray600}
                value={inputText}
                onChangeText={setInputText}
                onSubmitEditing={handleAddSkills}
                onFocus={() => setFocusedInput('skills')}
                onBlur={() => setFocusedInput(null)}
                accessibilityLabel="Enter skills"
              />
            </View>
            {renderTags(skills, handleRemoveSkill)}
          </View>
          <View style={styles.sectionContainer}>
            <ThemedText style={styles.sectionTitle}>Education</ThemedText>
            {educationList?.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.educationContainer}
                onPress={() => handleEditDelete(index)}
                activeOpacity={0.7}
              >
                <ThemedText style={styles.educationName}>{item.education}</ThemedText>
                <View style={styles.educationDetails}>
                  <ThemedText style={styles.educationYear}>{item.educationYear}</ThemedText>
                </View>
              </TouchableOpacity>
            ))}
            <View style={styles.divider} />
            <TouchableOpacity
              style={styles.addButton}
              onPress={openAddEducationModal}
              activeOpacity={0.7}
            >
              <LinnerGradientCard customStyles={styles.addButtonInner}>
                <Ionicons name="add" size={18} color={customColors.gray100} />
                <ThemedText style={styles.addButtonText}>Add Education</ThemedText>
              </LinnerGradientCard>
            </TouchableOpacity>
          </View>
          <View style={styles.sectionContainer}>
            <ThemedText style={styles.sectionTitle}>Career</ThemedText>
            {careerList.map((career, index) => (
              <TouchableOpacity
                key={index}
                style={styles.careerContainer}
                onPress={() => handleCareerEditDelete(career, index)}
                activeOpacity={0.7}
              >
                <View style={styles.detailsContainer}>
                  <ThemedText style={styles.careerTitle}>{career.position}</ThemedText>
                  <ThemedText style={styles.companyName}>{career.company}</ThemedText>
                </View>
                <View style={styles.dateContainer}>
                  <ThemedText style={styles.dateRange}>
                    {career.fromYear} - {career.toYear}
                  </ThemedText>
                </View>
              </TouchableOpacity>
            ))}
            <View style={styles.divider} />
            <TouchableOpacity
              style={styles.addButton}
              onPress={openAddCareerModal}
              activeOpacity={0.7}
            >
              <LinnerGradientCard customStyles={styles.addButtonInner}>
                <Ionicons name="add" size={18} color={customColors.gray100} />
                <ThemedText style={styles.addButtonText}>Add Career</ThemedText>
              </LinnerGradientCard>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={updateProfileData}
            disabled={loading}
            activeOpacity={0.7}
            style={styles.saveButtonContainer}
            accessibilityLabel="Save profile changes"
          >
            <LinnerGradientCard customStyles={styles.saveButton}>
              <ThemedText style={styles.saveButtonText}>Save Changes</ThemedText>
            </LinnerGradientCard>
          </TouchableOpacity>
          <View style={styles.bottomPadding} />
        </View>
      </Animated.ScrollView>
      <Modal
        visible={showDatePicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={styles.datePickerContainer}>
          <View style={styles.datePickerContent}>
            <DatePicker
              date={selectedDate || new Date()}
              onDateChange={setSelectedDate}
              mode="date"
              maximumDate={new Date()}
              theme="light"
            />
            <View style={styles.datePickerButtons}>
              <TouchableOpacity
                onPress={() => setShowDatePicker(false)}
                style={styles.datePickerButton}
                activeOpacity={0.7}
              >
                <ThemedText style={styles.datePickerButtonText}>Cancel</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDateConfirm(selectedDate || new Date())}
                style={styles.datePickerButton}
                activeOpacity={0.7}
              >
                <ThemedText style={[styles.datePickerButtonText, { color: customColors.primary }]}>
                  Confirm
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <BioModal
        visible={showBioModal}
        bio={bio}
        setTempBio={setBio}
        onClose={() => setShowBioModal(false)}
      />
      <UploadDocumentModal
        visible={isModalVisible}
        imageType={docType}
        onClose={() => setModalVisible(false)}
        onPickImage={(fromCamera, type) =>
          uploadDocument(fromCamera, (uri) => {
            if (type === 'profile') {
              setProfileImage(uri);
            } else {
              setCoverImage(uri);
            }
          })
        }
      />
      <Modal visible={showEditDeleteModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={handleEdit} style={styles.modalOption} activeOpacity={0.7}>
              <ThemedText style={styles.modalText}>Edit</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete} style={styles.modalOption} activeOpacity={0.7}>
              <ThemedText style={styles.modalText}>Delete</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowEditDeleteModal(false)}
              style={[styles.modalOption, styles.cancelButton]}
              activeOpacity={0.7}
            >
              <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={showCareerEditDeleteModal}
        transparent
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={handleCareerEdit}
              style={styles.modalOption}
              activeOpacity={0.7}
            >
              <ThemedText style={styles.modalText}>Edit</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCareerDelete}
              style={styles.modalOption}
              activeOpacity={0.7}
            >
              <ThemedText style={styles.modalText}>Delete</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowCareerEditDeleteModal(false)}
              style={[styles.modalOption, styles.cancelButton]}
              activeOpacity={0.7}
            >
              <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <EducationModal
        visible={eduModalVisible}
        onClose={() => setEduModalVisible(false)}
        onSave={handleSaveEducation}
        selectedEducation={selectedEducation}
        editIndex={editIndex}
      />
      <CareerModal
        visible={careerModalVisible}
        onClose={() => setCareerModalVisible(false)}
        onSave={handleSaveCareer}
        selectedCareer={selectedCareer}
        editIndex={editCareerIndex}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:customColors.white
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    zIndex: 10,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerContent: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginLeft: 12,
  },
  icon: {
    paddingHorizontal: 8,
  },
  cameraIcon: {
    backgroundColor: customColors.primary,
    padding: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  scrollContent: {
    marginTop: 0,
  },
  quotesContainer: {
    marginTop: 24,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: customColors.gray700,
    fontFamily: 'DM Sans',
    fontSize: 14,
    fontStyle: 'italic',
    fontWeight: '400',
    lineHeight: 20,
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor:customColors.inputBg,
    padding: 24,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 20,
    shadowColor: customColors.gray200,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  fieldLabel: {
    width: '30%',
    color: customColors.gray700,
    fontFamily: 'DM Sans',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
    marginRight: 1,
  },
  fieldValue: {
    flex: 1,
    padding: 14,
    fontSize: 16,
    fontFamily: 'DM Sans',
    color: customColors.gray900,
    backgroundColor: customColors.gray100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: customColors.gray300,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: customColors.gray100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: customColors.gray300,
  },
  inputIcon: {
    marginLeft: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: customColors.gray800,
    paddingVertical: 4,
    // paddingHorizontal: 10,
  },
  inputField: {
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  inputFieldFocused: {
    // borderColor: customColors.primary,
    // borderWidth: 2,
    // margin: -1, // Adjust for border width
  },
  tagInputContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  sectionContainer: {
    backgroundColor:customColors.inputBg,
    marginTop: 5,
    padding: 15,
    borderRadius: 10,
    shadowColor: customColors.gray200,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    color: customColors.gray700,
  },
  fieldInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tagsSection: {
    marginTop: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 15,
    color: customColors.gray100,
    marginRight: 8,
  },
  closeTagBtn: {
    padding: 4,
  },
  educationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: customColors.gray300,
  },
  educationName: {
    fontSize: 17,
    color: customColors.gray900,
    fontWeight: '600',
  },
  educationDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  educationYear: {
    fontSize: 15,
    color: customColors.gray700,
    marginRight: 8,
  },
  careerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: customColors.gray300,
  },
  careerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: customColors.gray900,
  },
  companyName: {
    fontSize: 15,
    color: customColors.gray700,
    marginTop: 4,
  },
  dateContainer: {
    marginRight: 12,
    alignItems: 'flex-end',
  },
  dateRange: {
    color: customColors.gray700,
    fontFamily: 'DM Sans',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 20,
  },
  detailsContainer: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: customColors.gray300,
    marginVertical: 12,
  },
  addButton: {
    marginTop: 12,
    borderRadius: 10,
  },
  addButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
  },
  addButtonText: {
    color: customColors.gray100,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  saveButtonContainer: {
    marginTop: 24,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
  },
  saveButton: {
    paddingVertical: 18,
    borderRadius: 100,
    alignItems: 'center',
  },
  saveButtonText: {
    color: customColors.gray100,
    fontSize: 18,
    fontWeight: '700',
  },
  bottomPadding: {
    height: 40,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: customColors.gray100,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 20,
  },
  modalOption: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: customColors.gray300,
  },
  modalText: {
    fontSize: 17,
    color: customColors.gray900,
    textAlign: 'center',
  },
  cancelButton: {
    marginTop: 12,
    borderBottomWidth: 0,
  },
  cancelButtonText: {
    color: customColors.res500,
    fontSize: 17,
    textAlign: 'center',
  },
  datePickerContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  datePickerContent: {
    backgroundColor: customColors.gray100,
    borderRadius: 16,
    marginHorizontal: 20,
    padding: 20,
    alignItems: 'center',
  },
  datePickerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  datePickerButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  datePickerButtonText: {
    fontSize: 16,
    color: customColors.gray700,
    fontWeight: '600',
  },
});
// import React, { useState, useEffect, useRef } from 'react';
// import {
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Animated,
//   View,
//   Modal,
//   TextInput,
// } from 'react-native';
// import CoverImage from '@/components/profile/edit/CoverImage';
// import ProfileImage from '@/components/profile/edit/ProfileImage';
// import InputField from '@/components/profile/edit/InputField';
// import BioModal from '@/components/profile/edit/BioModal';
// import EducationModal from './edu';
// import CareerModal from '../../../components/profile/edit/career';
// import LoadingScreen from '@/components/common/Loading';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { updateProfile } from '@/services/userProfile';
// import { useUploadDocument } from '@/components/profile/useUploadDoument';
// import { goBack } from '@/utils/navigationService';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import UploadDocumentModal from '@/components/profile/UploadDocumentModal';

// interface Career {
//   position: string;
//   company: string;
//   fromYear: string;
//   toYear: string;
// }

// interface Profile {
//   profileImage: string | null;
//   coverImage: string | null;
//   name: string;
//   gender: string;
//   dateOfBirth: string;
//   homeCountry: string;
//   bio: string;
//   interests: string[];
//   skills: string[];
//   educationList: { education: string; educationYear: string }[];
//   careerList: Career[];
// }

// export default function ProfileEdit() {
//   const [loading, setLoading] = useState(false);
//   const [liveID, setLiveID] = useState('');
//   const [selectedEducation, setSelectedEducation] = useState<{
//     education: string;
//     educationYear: string;
//   } | null>(null);
//   const [editIndex, setEditIndex] = useState<number | null>(null);
//   const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
//   const [editCareerIndex, setEditCareerIndex] = useState<number | null>(null);
//   const [showBioModal, setShowBioModal] = useState(false);
//   const [eduModalVisible, setEduModalVisible] = useState(false);
//   const [careerModalVisible, setCareerModalVisible] = useState(false);
//   const [showCareerEditDeleteModal, setShowCareerEditDeleteModal] =
//     useState(false);
//   const [showEditDeleteModal, setShowEditDeleteModal] = useState(false);
//   const [inputText, setInputText] = useState('');
//   const [inputInterestText, setInputInterestText] = useState('');

//   // API Data for post
//   const [profileImage, setProfileImage] = useState<string | null>(null);
//   const [coverImage, setCoverImage] = useState<string | null>(null);
//   const [name, setName] = useState('');
//   const [gender, setGender] = useState('');
//   const [dateOfBirth, setBirthday] = useState('');
//   const [homeCountry, setHometown] = useState('');
//   const [bio, setBio] = useState('');
//   const [interests, setInterests] = useState<string[]>([]);
//   const [skills, setSkills] = useState<string[]>([]);
//   const [educationList, setEducationList] = useState<
//     { education: string; educationYear: string }[]
//   >([]);
//   const [careerList, setCareerList] = useState<Career[]>([]);

//   const { isModalVisible, docType, openUploadModal, uploadDocument, setModalVisible } =
//     useUploadDocument();

//   const initialStateRef = useRef<Profile>({
//     profileImage: null,
//     coverImage: null,
//     name: '',
//     gender: '',
//     dateOfBirth: '',
//     homeCountry: '',
//     bio: '',
//     interests: [],
//     skills: [],
//     educationList: [],
//     careerList: [],
//   });

//   const fetchUserData = async () => {
//     setLoading(true);
//     try {
//       const userDataString = await AsyncStorage.getItem('fbUser');
//       const userData = userDataString ? JSON.parse(userDataString) : {};

//       setName(userData.name || '');
//       setGender(userData.gender || '');
//       setBirthday(userData.dateOfBirth || '');
//       setHometown(userData.homeCountry || '');
//       setLiveID(userData.liveId || '');
//       setCoverImage(userData.coverImage || null);
//       setProfileImage(userData.profileImage || null);
//       setBio(userData.bio || '');
//       setInterests(Array.isArray(userData.interests) ? userData.interests : []);
//       setSkills(Array.isArray(userData.skills) ? userData.skills : []);
//       setEducationList(
//         Array.isArray(userData.educationList) ? userData.educationList : []
//       );
//       setCareerList(
//         Array.isArray(userData.careerList) ? userData.careerList : []
//       );
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateProfileData = async () => {
//     const currentState: Profile = {
//       profileImage,
//       coverImage,
//       name,
//       gender,
//       dateOfBirth,
//       homeCountry,
//       bio,
//       interests,
//       skills,
//       educationList,
//       careerList,
//     };

//     console.log('hitted this api ')

//     const hasChanged = Object.keys(initialStateRef.current).some(
//       (key) =>
//         initialStateRef.current[key as keyof Profile] !==
//         currentState[key as keyof Profile]
//     );

//     if (hasChanged) {
//       setLoading(true);
//       try {
//         const res = await updateProfile(currentState);

//         console.log(res.data)
//         await AsyncStorage.setItem('fbUser', JSON.stringify(res.data));
//         initialStateRef.current = currentState;
//       } catch (error) {
//         console.error('Error updating profile:', error);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   useEffect(() => {
//     updateProfileData();
//   }, [
//     profileImage,
//     coverImage,
//     name,
//     gender,
//     dateOfBirth,
//     homeCountry,
//     bio,
//     interests,
//     skills,
//     educationList,
//     careerList,
//   ]);

//   const scrollY = useRef(new Animated.Value(0)).current;

//   const headerBackgroundColor = scrollY.interpolate({
//     inputRange: [0, 200],
//     outputRange: ['transparent', '#F1567D'],
//     extrapolate: 'clamp',
//   });

//   const headerIconColor = scrollY.interpolate({
//     inputRange: [0, 200],
//     outputRange: ['white', 'white'],
//     extrapolate: 'clamp',
//   });

//   const openAddEducationModal = () => {
//     setSelectedEducation(null);
//     setEditIndex(null);
//     setEduModalVisible(true);
//   };

//   const handleEditDelete = (index: number) => {
//     setSelectedEducation(educationList[index] || null);
//     setEditIndex(index);
//     setShowEditDeleteModal(true);
//   };

//   const handleSaveEducation = (
//     educationData: { education: string; educationYear: string },
//     editIndex: number | null
//   ) => {
//     if (editIndex !== null) {
//       const updatedList = [...educationList];
//       updatedList[editIndex] = educationData;
//       setEducationList(updatedList);
//     } else {
//       setEducationList([...educationList, educationData]);
//     }
//   };

//   const handleDelete = () => {
//     if (editIndex !== null) {
//       setEducationList((prevList) => prevList.filter((_, i) => i !== editIndex));
//     }
//     setShowEditDeleteModal(false);
//   };

//   const handleEdit = () => {
//     setShowEditDeleteModal(false);
//     setEduModalVisible(true);
//   };

//   const openAddCareerModal = () => {
//     setSelectedCareer(null);
//     setEditCareerIndex(null);
//     setCareerModalVisible(true);
//   };

//   const handleCareerEditDelete = (career: Career | null = null, index: number | null = null) => {
//     setSelectedCareer(career);
//     setEditCareerIndex(index);
//     setShowCareerEditDeleteModal(true);
//   };

//   const handleCareerDelete = () => {
//     if (editCareerIndex !== null) {
//       setCareerList((prevList) => prevList.filter((_, i) => i !== editCareerIndex));
//     }
//     setShowCareerEditDeleteModal(false);
//   };

//   const handleCareerEdit = () => {
//     setShowCareerEditDeleteModal(false);
//     setCareerModalVisible(true);
//   };

//   const handleSaveCareer = (careerData: Career, index: number | null): void => {
//     setCareerList((prevList) => {
//       if (index !== null) {
//         const updatedList = [...prevList];
//         updatedList[index] = careerData;
//         return updatedList;
//       } else {
//         return [...prevList, careerData];
//       }
//     });
//     setCareerModalVisible(false);
//   };

//   const handleAddSkills = () => {
//     if (!inputText.trim()) return;

//     const newSkills = inputText
//       .split(',')
//       .map((skill) => skill.trim())
//       .filter((skill) => skill !== '' && !skills.includes(skill));

//     setSkills([...skills, ...newSkills]);
//     setInputText('');
//   };

//   const handleRemoveSkill = (skillToRemove: string) => {
//     setSkills(skills.filter((skill) => skill !== skillToRemove));
//   };

//   const handleAddInterests = () => {
//     if (!inputInterestText.trim()) return;

//     const newInterests = inputInterestText
//       .split(',')
//       .map((interest) => interest.trim())
//       .filter((interest) => interest !== '' && !interests.includes(interest));

//     setInterests([...interests, ...newInterests]);
//     setInputInterestText('');
//   };

//   const handleRemoveInterests = (interestToRemove: string) => {
//     setInterests(interests.filter((interest) => interest !== interestToRemove));
//   };

//   const renderTags = (items: string[] = [], onRemove?: (item: string) => void) => {
//     if (!items || items.length === 0) return null;

//     return (
//       <View style={styles.tagsSection}>
//         <View style={styles.tagsContainer}>
//           {items.map((item) => (
//             <View key={item} style={styles.tag}>
//               <ThemedText style={styles.tagText}>{item}</ThemedText>
//               {onRemove && (
//                 <TouchableOpacity
//                   style={styles.closeTagBtn}
//                   onPress={() => onRemove(item)}
//                 >
//                   <Ionicons name="close" size={16} color="#555" />
//                 </TouchableOpacity>
//               )}
//             </View>
//           ))}
//         </View>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       {loading && <LoadingScreen />}
//       <Animated.View
//         style={[styles.header, { backgroundColor: headerBackgroundColor }]}
//       >
//         <View style={styles.headerContent}>
//           <View style={styles.backButtonContainer}>
//             <MaterialIcons
//               name="arrow-back"
//               size={24}
//               style={styles.icon}
//               onPress={() => goBack()}
//               color="#fff"
//             />
//             <Animated.Text style={[styles.headerTitle, { color: headerIconColor }]}>
//               User Profile
//             </Animated.Text>
//           </View>
//           <TouchableOpacity
//             style={styles.cameraIcon}
//             onPress={() => openUploadModal('cover')}
//           >
//             <Ionicons name="camera" size={18} color="#fff" />
//           </TouchableOpacity>
//         </View>
//       </Animated.View>
//       <Animated.ScrollView
//         style={styles.scrollContent}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//           { useNativeDriver: false }
//         )}
//         scrollEventThrottle={16}
//       >
//         <CoverImage coverImage={coverImage} onPress={() => {}} />
//         <ProfileImage
//           profileImage={profileImage}
//           onPress={() => openUploadModal('profile')}
//         />
//         <View style={styles.quotesContainer}>
//           <ThemedText style={styles.text}>
//             Click to change or delete photo, Drag photo to change order.
//           </ThemedText>
//         </View>
//         <View style={styles.inputContainer}>
//           <InputField
//             label="Name"
//             value={name}
//             onChangeText={(text) => setName(text)}
//             inputType="text"
//           />
//           <InputField
//             label="Gender"
//             value={gender}
//             onChangeText={(text) => setGender(text)}
//             inputType="gender"
//           />
//           <InputField
//             label="Birthday"
//             value={dateOfBirth}
//             onChangeText={(text) => setBirthday(text)}
//             inputType="date"
//           />
//           <InputField
//             label="Home town"
//             value={homeCountry}
//             onChangeText={(text) => setHometown(text)}
//             inputType="country"
//           />
//           <InputField
//             label="Live ID"
//             value={liveID}
//             onChangeText={(text) => setLiveID(text)}
//             inputType="text"
//           />
//           <TouchableOpacity
//             style={styles.fieldContainer}
//             onPress={() => setShowBioModal(true)}
//           >
//             <ThemedText style={styles.fieldLabel}>Bio:</ThemedText>
//             <ThemedText style={styles.fieldValue}>{bio || 'No bio available'}</ThemedText>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.tagInputContainer}>
//           <View style={styles.sectionContainer}>
//             <ThemedText style={styles.sectionTitle}>Interest</ThemedText>
//             <View style={styles.fieldInputContainer}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter Interests (comma separated)..."
//                 value={inputInterestText}
//                 onChangeText={setInputInterestText}
//                 onSubmitEditing={handleAddInterests}
//               />
//             </View>
//             {renderTags(interests, handleRemoveInterests)}
//           </View>
//           <View style={styles.sectionContainer}>
//             <ThemedText style={styles.sectionTitle}>Skills</ThemedText>
//             <View style={styles.fieldInputContainer}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter skills (comma separated)..."
//                 value={inputText}
//                 onChangeText={setInputText}
//                 onSubmitEditing={handleAddSkills}
//               />
//             </View>
//             {renderTags(skills, handleRemoveSkill)}
//           </View>
//           <View style={styles.sectionContainer}>
//             <ThemedText style={styles.sectionTitle}>Education</ThemedText>
//             {educationList?.map((item, index) => (
//               <TouchableOpacity
//                 key={index}
//                 style={styles.educationContainer}
//                 onPress={() => handleEditDelete(index)}
//               >
//                 <ThemedText style={styles.educationName}>{item.education}</ThemedText>
//                 <View style={styles.educationDetails}>
//                   <ThemedText style={styles.educationYear}>{item.educationYear}</ThemedText>
//                 </View>
//               </TouchableOpacity>
//             ))}
//             <View style={styles.divider} />
//             <TouchableOpacity
//               style={styles.addButton}
//               onPress={openAddEducationModal}
//             >
//               <Ionicons name="add" size={16} color="#0066cc" />
//               <ThemedText style={styles.addButtonText}>Add</ThemedText>
//             </TouchableOpacity>
//           </View>
//           <View style={styles.sectionContainer}>
//             <ThemedText style={styles.sectionTitle}>Career</ThemedText>
//             {careerList.map((career, index) => (
//               <TouchableOpacity
//                 key={index}
//                 style={styles.careerContainer}
//                 onPress={() => handleCareerEditDelete(career, index)}
//               >
//                 <View style={styles.detailsContainer}>
//                   <ThemedText style={styles.careerTitle}>{career.position}</ThemedText>
//                   <ThemedText style={styles.companyName}>{career.company}</ThemedText>
//                 </View>
//                 <View style={styles.dateContainer}>
//                   <ThemedText style={styles.dateRange}>
//                     {career.fromYear} - {career.toYear}
//                   </ThemedText>
//                 </View>
//               </TouchableOpacity>
//             ))}
//             <View style={styles.divider} />
//             <TouchableOpacity
//               style={styles.addButton}
//               onPress={() => openAddCareerModal()}
//             >
//               <Ionicons name="add" size={16} color="#0066cc" />
//               <ThemedText style={styles.addButtonText}>Add</ThemedText>
//             </TouchableOpacity>
//           </View>
//         </View>
//         <BioModal
//           visible={showBioModal}
//           bio={bio}
//           setTempBio={setBio}
//           onClose={() => setShowBioModal(false)}
//         />
//         <UploadDocumentModal
//           visible={isModalVisible}
//           imageType={docType}
//           onClose={() => setModalVisible(false)}
//           onPickImage={(fromCamera, type) =>
//             uploadDocument(fromCamera, (uri) => {
//               if (type === 'profile') {
//                 setProfileImage(uri);
//               } else {
//                 setCoverImage(uri);
//               }
//             })
//           }
//         />
//         <Modal visible={showEditDeleteModal} transparent animationType="slide">
//           <View style={styles.modalContainer}>
//             <View style={styles.modalContent}>
//               <TouchableOpacity onPress={handleEdit} style={styles.modalOption}>
//                 <ThemedText style={styles.modalText}>Edit</ThemedText>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={handleDelete} style={styles.modalOption}>
//                 <ThemedText style={styles.modalText}>Delete</ThemedText>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => setShowEditDeleteModal(false)}
//                 style={[styles.modalOption, styles.cancelButton]}
//               >
//                 <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>
//         <Modal
//           visible={showCareerEditDeleteModal}
//           transparent
//           animationType="slide"
//         >
//           <View style={styles.modalContainer}>
//             <View style={styles.modalContent}>
//               <TouchableOpacity
//                 onPress={handleCareerEdit}
//                 style={styles.modalOption}
//               >
//                 <ThemedText style={styles.modalText}>Edit</ThemedText>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={handleCareerDelete}
//                 style={styles.modalOption}
//               >
//                 <ThemedText style={styles.modalText}>Delete</ThemedText>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => setShowCareerEditDeleteModal(false)}
//                 style={[styles.modalOption, styles.cancelButton]}
//               >
//                 <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>
//         <EducationModal
//           visible={eduModalVisible}
//           onClose={() => setEduModalVisible(false)}
//           onSave={handleSaveEducation}
//           selectedEducation={selectedEducation}
//           editIndex={editIndex}
//         />
//         <CareerModal
//           visible={careerModalVisible}
//           onClose={() => setCareerModalVisible(false)}
//           onSave={handleSaveCareer}
//           selectedCareer={selectedCareer}
//           editIndex={editCareerIndex}
//         />
//       </Animated.ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   quotesContainer: {
//     marginTop: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//     flex: 1,
//   },
//   text: {
//     color: '#777',
//     fontFamily: 'DM Sans',
//     fontSize: 12,
//     fontStyle: 'normal',
//     fontWeight: '400',
//     lineHeight: 16,
//     textAlign: 'center',
//   },
//   fieldContainer: {
//     flexDirection: 'row',
//     width: '100%',
//   },
//   fieldLabel: {
//     width: '20%',
//     color: '#777',
//     fontFamily: 'DM Sans',
//     fontSize: 14,
//     fontWeight: '500',
//     lineHeight: 18,
//     marginRight: 10,
//     textAlign: 'left',
//   },
//   fieldValue: {
//     width: '80%',
//     height: 45,
//     paddingLeft: 12,
//     paddingRight: 12,
//     borderBottomWidth: 1,
//     fontSize: 14,
//     fontFamily: 'DM Sans',
//     color: '#1F1F1F',
//     borderColor: '#E0E0E0',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     justifyContent: 'center',
//   },
//   inputContainer: {
//     flex: 1,
//     padding: 15,
//     justifyContent: 'center',
//   },
//   input: {
//     flex: 1,
//     borderBottomWidth: 1,
//     borderColor: '#eee',
//     paddingBottom: 15,
//     fontSize: 14,
//   },
//   fieldInputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   tagInputContainer: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//     justifyContent: 'center',
//   },
//   header: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     height: 105,
//     zIndex: 10,
//     justifyContent: 'center',
//     paddingHorizontal: 10,
//   },
//   icon: {
//     paddingHorizontal: 10,
//   },
//   cameraIcon: {
//     marginHorizontal: 10,
//     backgroundColor: '#57AAFF',
//     position: 'absolute',
//     right: '0%',
//     bottom: -5,
//     padding: 5,
//     borderRadius: 15,
//   },
//   headerContent: {
//     marginTop: 50,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   scrollContent: {
//     marginTop: 0,
//   },
//   backButtonContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginLeft: 10,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     paddingBottom: 20,
//   },
//   modalOption: {
//     paddingVertical: 16,
//     paddingHorizontal: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   modalText: {
//     fontSize: 16,
//     color: '#333',
//     textAlign: 'center',
//   },
//   cancelButton: {
//     marginTop: 8,
//     borderBottomWidth: 0,
//   },
//   cancelButtonText: {
//     color: '#ff3b30',
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   sectionContainer: {
//     marginTop: 20,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 12,
//   },
//   tagsSection: {
//     marginTop: 8,
//   },
//   tagsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 8,
//   },
//   tag: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0',
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 16,
//   },
//   tagText: {
//     fontSize: 14,
//     marginRight: 4,
//   },
//   closeTagBtn: {
//     padding: 2,
//   },
//   educationContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   educationName: {
//     fontSize: 15,
//     color: '#333',
//   },
//   educationDetails: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   educationYear: {
//     fontSize: 14,
//     color: '#666',
//     marginRight: 4,
//   },
//   addButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 12,
//   },
//   addButtonText: {
//     color: '#000',
//     fontSize: 16,
//     fontWeight: '700',
//     marginLeft: 4,
//   },
//   careerTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#333',
//   },
//   companyName: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 4,
//     paddingBottom: 12,
//     borderBottomColor: '#eee',
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#eee',
//   },
//   careerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     borderColor: '#eee',
//     paddingVertical: 12,
//   },
//   dateContainer: {
//     marginRight: 12,
//     alignItems: 'center',
//   },
//   dateRange: {
//     color: '#777',
//     fontFamily: 'DM Sans',
//     fontSize: 14,
//     fontWeight: '400',
//     lineHeight: 18,
//   },
//   detailsContainer: {
//     flex: 1,
//   },
// });