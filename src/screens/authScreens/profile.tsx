// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableWithoutFeedback,
//   Keyboard,
//   Alert,
//   StatusBar,
// } from "react-native";
// import { launchImageLibrary } from "react-native-image-picker";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { RadioButton } from "react-native-paper";
// import { Dimensions } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { updateProfile } from "@/services/userProfile";
// import LoadingScreen from "@/components/common/Loading";
// import { applyRefer } from "@/services/referrals";
// import { redirect } from "@/utils/navigationService";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import { scaleFont, scaleHeight, scaleWidth } from "@/constants/scaling";
// import customColors from "@/constants/styles";


// const Tick = () => (
//   <View style={styles.tickContainer}>
//     <Text style={styles.tickText}>✔</Text>
//   </View>
// );

// export default function ProfileSetup() {
//   const [image, setImage] = useState<string | null>(null);
//   const [gender, setGender] = useState<"Male" | "Female">("Male");
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [countries, setCountries] = useState<{ name: string; flag: string }[]>([]);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [isKeyboardVisible, setKeyboardVisible] = useState(false);
//   const [refCode, setRefCode] = useState<string | null>(null);
//   const [inputReferralCode, setInputReferralCode] = useState<string>("");
//   const [formData, setFormData] = useState({
//     name: "",
//     homeCountry: "",
//     homeTown: "",
//     dateOfBirth: "",
//     gender: "Male",
//     profileImage: "",
//   });
//   const [filteredCountries, setFilteredCountries] = useState<
//     { name: string; flag: string }[]
//   >([]);
//   const [selectedFlag, setSelectedFlag] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const userData = await AsyncStorage.getItem("fbUser");
//         if (userData) {
//           const parsedUser = JSON.parse(userData);
//           if (parsedUser) {
//             setUser(parsedUser);
//             setImage(parsedUser?.profileImage || "");
//             setFormData((prev:any) => ({
//               ...prev,
//               name: parsedUser.name || "",
//               homeCountry: parsedUser?.homeCountry || "",
//               homeTown: parsedUser?.homeTown || "",
//               dateOfBirth: parsedUser?.dateOfBirth || "",
//               gender: parsedUser?.gender || "Male",
//               profileImage: parsedUser?.profileImage || "",
//             }));
//             setRefCode(parsedUser?.referredBy?.referralCode);
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };
//     fetchUser();
//   }, []);

//   useEffect(() => {
//     const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
//       setKeyboardVisible(true);
//     });
//     const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
//       setKeyboardVisible(false);
//     });
//     return () => {
//       keyboardDidShowListener.remove();
//       keyboardDidHideListener.remove();
//     };
//   }, []);

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await fetch("https://restcountries.com/v3.1/all");
//         const data = await response.json();
//         const countryList = data.map((country: any) => ({
//           name: country.name.common,
//           flag: country.flags.png,
//         }));
//         setCountries(countryList);
//       } catch (error) {
//         console.error("Error fetching countries:", error);
//       }
//     };
//     fetchCountries();
//   }, []);

//   const pickImage = () => {
//     launchImageLibrary(
//       {
//         mediaType: "photo",
//         quality: 1,
//         includeBase64: false,
//       },
//       (response:any) => {
//         if (response.didCancel) {
//           console.log("User cancelled image picker");
//         } else if (response.errorCode) {
//           console.error("ImagePicker Error: ", response.errorMessage);
//         } else if (response.assets && response.assets.length > 0) {
//           const selectedAsset = response.assets[0];
//           setImage(selectedAsset.uri || "");
//           setFormData((prev:any) => ({
//             ...prev,
//             profileImage: selectedAsset.uri || "",
//           }));
//         }
//       }
//     );
//   };

//   const handleCountryChange = (text: string) => {
//     setFormData((prev:any) => ({ ...prev, homeCountry: text }));
//     if (text.length >= 3) {
//       const matches = countries.filter((country:any) =>
//         country.name.toLowerCase().includes(text.toLowerCase().replace(/[^a-z]/g, ""))
//       );
//       setFilteredCountries(matches);
//     } else {
//       setFilteredCountries([]);
//     }
//   };

//   const handleCountrySelect = (country: { name: string; flag: string }) => {
//     setFormData((prev:any) => ({ ...prev, homeCountry: country.name }));
//     setSelectedFlag(country.flag);
//     setFilteredCountries([]);
//   };

//   const handleGenderChange = (value: "Male" | "Female") => {
//     setGender(value);
//     setFormData((prev:any) => ({ ...prev, gender: value }));
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       const res = await updateProfile(formData);
//       if (res?.success) {
//         await AsyncStorage.setItem("fbUser", JSON.stringify(res.data));
//         redirect("languageSelection");
//       } else {
//         Alert.alert("Error", res?.message || "Failed to update profile");
//       }
//     } catch (error: any) {
//       Alert.alert("Error", error.message || "An unexpected error occurred");
//       console.error("Error updating profile:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleApplyReferral = async () => {
//     if (!inputReferralCode.trim()) {
//       Alert.alert("Invalid Code", "Referral code cannot be empty.");
//       return;
//     }
//     if (inputReferralCode.length > 8) {
//       Alert.alert("Invalid Code", "Referral code must not exceed 8 characters.");
//       return;
//     }
//     try {
//       setLoading(true);
//       const response = await applyRefer(inputReferralCode);
//       if (response?.success) {
//         setRefCode(inputReferralCode);
//         Alert.alert("Success", response?.message || "Referral code applied successfully!");
//       } else {
//         Alert.alert("Error", response?.message || "Failed to apply referral code.");
//       }
//     } catch (error) {
//       console.error("Referral Application Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={styles.container}
//     >
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <View style={styles.innerContainer}>
//           {loading && <LoadingScreen />}
//           <ScrollView
//             contentContainerStyle={styles.scrollContent}
//             keyboardShouldPersistTaps="handled"
//           >
//             <View style={styles.headerContainer}>
//               <Text style={styles.title}>Welcome {formData.name || "User"}!</Text>
//               <Text style={styles.description}>Improve the profile, win more attention</Text>
//             </View>

//             <TouchableOpacity style={styles.imageUploader} onPress={pickImage}>
//               {image ? (
//                 <Image source={{ uri: image }} style={styles.uploadedImage} />
//               ) : (
//                 <Icon name="camera" size={scaleFont(32)} color="white" />
//               )}
//             </TouchableOpacity>

//             <RadioButton.Group
//               onValueChange={(value) => handleGenderChange(value as "Male" | "Female")}
//               value={gender}
//             >
//               <View style={styles.genderContainer}>
//                 <TouchableOpacity
//                   style={styles.genderOption}
//                   onPress={() => handleGenderChange("Male")}
//                 >
//                   <RadioButton value="Male" color={customColors.primary} />
//                   <Text style={styles.genderText}>Male</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.genderOption}
//                   onPress={() => handleGenderChange("Female")}
//                 >
//                   <RadioButton value="Female" color={customColors.primary} />
//                   <Text style={styles.genderText}>Female</Text>
//                 </TouchableOpacity>
//               </View>
//             </RadioButton.Group>

//             <View style={styles.formContainer}>
//               {Object.keys(formData)
//                 .filter((key) => key !== "profileImage" && key !== "gender")
//                 .map((key) =>
//                   key === "homeCountry" ? (
//                     <View key={key} style={styles.inputContainer}>
//                       <Text style={styles.label}>Home Country</Text>
//                       <View style={styles.inputWrapper}>
//                         <TextInput
//                           style={styles.countryInput}
//                           value={formData.homeCountry}
//                           onChangeText={handleCountryChange}
//                           placeholder="Enter Home Country"
//                         />
//                         {selectedFlag && (
//                           <Image source={{ uri: selectedFlag }} style={styles.flagIcon} />
//                         )}
//                       </View>
//                       {filteredCountries.length > 0 && (
//                         <View style={styles.suggestionsList}>
//                           <ScrollView keyboardShouldPersistTaps="handled">
//                             {filteredCountries.map((item:any) => (
//                               <TouchableOpacity
//                                 key={item.name}
//                                 style={styles.suggestionItem}
//                                 onPress={() => handleCountrySelect(item)}
//                               >
//                                 <Image source={{ uri: item.flag }} style={styles.flagIcon} />
//                                 <Text style={styles.suggestionText}>{item.name}</Text>
//                               </TouchableOpacity>
//                             ))}
//                           </ScrollView>
//                         </View>
//                       )}
//                     </View>
//                   ) : key === "dateOfBirth" ? (
//                     <View key={key} style={styles.inputContainer}>
//                       <Text style={styles.label}>Date of Birth</Text>
//                       <TouchableOpacity onPress={() => setShowDatePicker(true)}>
//                         <TextInput
//                           style={styles.input}
//                           value={
//                             formData.dateOfBirth
//                               ? new Date(formData.dateOfBirth).toDateString()
//                               : ""
//                           }
//                           placeholder="Select Date of Birth"
//                           editable={false}
//                         />
//                       </TouchableOpacity>
//                       {showDatePicker && (
//                         <DateTimePicker
//                           value={
//                             formData.dateOfBirth ? new Date(formData.dateOfBirth) : new Date()
//                           }
//                           mode="date"
//                           display={Platform.OS === "ios" ? "spinner" : "default"}
//                           onChange={(event:any, selectedDate:any) => {
//                             setShowDatePicker(false);
//                             if (selectedDate) {
//                               setFormData((prev:any) => ({
//                                 ...prev,
//                                 dateOfBirth: selectedDate.toISOString(),
//                               }));
//                             }
//                           }}
//                         />
//                       )}
//                     </View>
//                   ) : (
//                     <View key={key} style={styles.inputContainer}>
//                       <Text style={styles.label}>
//                         {key
//                           .replace(/([A-Z])/g, " $1")
//                           .trim()
//                           .replace(/^./, (str) => str.toUpperCase())}
//                       </Text>
//                       <TextInput
//                         style={styles.input}
//                         value={formData[key as keyof typeof formData]?.toString() || ""}
//                         onChangeText={(text:string) =>
//                           setFormData((prev:any) => ({
//                             ...prev,
//                             [key]: text,
//                           }))
//                         }
//                         placeholder={`Enter ${key
//                           .replace(/([A-Z])/g, " $1")
//                           .trim()
//                           .replace(/^./, (str) => str.toUpperCase())}`}
//                       />
//                     </View>
//                   )
//                 )}
//               <View style={styles.inputContainer}>
//                 <Text style={styles.label}>Referral Code</Text>
//                 <View style={styles.inputWrapper}>
//                   <TextInput
//                     style={[styles.input, refCode ? styles.disabledInput : {}]}
//                     value={refCode ?? inputReferralCode}
//                     onChangeText={(text:string) => {
//                       if (!refCode && text.length <= 8) {
//                         setInputReferralCode(text);
//                       }
//                     }}
//                     placeholder="Enter Referral Code"
//                     editable={!refCode}
//                   />
//                   {refCode ? (
//                     <Tick />
//                   ) : (
//                     <TouchableOpacity style={styles.applyButton} onPress={handleApplyReferral}>
//                       <Text style={styles.applyButtonText}>Apply</Text>
//                     </TouchableOpacity>
//                   )}
//                 </View>
//               </View>
//             </View>
//           </ScrollView>
//           {!isKeyboardVisible && (
//             <View style={styles.footer}>
//               <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//                 <Text style={styles.buttonText}>Next</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>
//       </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   innerContainer: {
//     flex: 1,
//   },
//   scrollContent: {
//     paddingHorizontal: scaleWidth(20),
//     paddingTop: StatusBar.currentHeight,
//     paddingBottom: scaleHeight(80), // Extra padding for footer
//   },
//   headerContainer: {
//     alignItems: "center",
//     marginBottom: scaleHeight(20),
//   },
//   title: {
//     color: "#1F1F1F",
//     fontFamily: "DM Sans",
//     fontSize: scaleFont(24),
//     fontWeight: "700",
//     lineHeight: scaleHeight(30),
//   },
//   description: {
//     color: "#777",
//     fontFamily: "DM Sans",
//     fontSize: scaleFont(16),
//     fontWeight: "400",
//     lineHeight: scaleHeight(22),
//     marginTop: scaleHeight(8),
//   },
//   imageUploader: {
//     width: scaleWidth(86),
//     height: scaleHeight(86),
//     backgroundColor: "#F1567D",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: scaleWidth(100),
//     alignSelf: "center",
//     marginVertical: scaleHeight(20),
//   },
//   uploadedImage: {
//     width: "100%",
//     height: "100%",
//     borderRadius: scaleWidth(100),
//   },
//   genderContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: scaleHeight(24),
//   },
//   genderOption: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginHorizontal: scaleWidth(20),
//   },
//   genderText: {
//     color: "#1F1F1F",
//     fontFamily: "DM Sans",
//     fontSize: scaleFont(14),
//     fontWeight: "400",
//     lineHeight: scaleHeight(18),
//   },
//   formContainer: {
//     gap: scaleHeight(24),
//   },
//   inputContainer: {
//     gap: scaleHeight(8),
//   },
//   label: {
//     color: "#9E9E9E",
//     fontFamily: "DM Sans",
//     fontSize: scaleFont(13),
//     fontWeight: "500",
//     lineHeight: scaleHeight(16),
//   },
//   input: {
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//     paddingVertical: scaleHeight(8),
//     color: "#1F1F1F",
//     fontFamily: "DM Sans",
//     fontSize: scaleFont(16),
//     fontWeight: "500",
//     lineHeight: scaleHeight(22),
//   },
//   countryInput: {
//     flex: 1,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//     paddingVertical: scaleHeight(8),
//     color: "#1F1F1F",
//     fontFamily: "DM Sans",
//     fontSize: scaleFont(16),
//     fontWeight: "500",
//     lineHeight: scaleHeight(22),
//   },
//   disabledInput: {
//     color: "#888",
//   },
//   tickContainer: {
//     width: scaleWidth(24),
//     height: scaleHeight(24),
//     borderRadius: scaleWidth(12),
//     backgroundColor: "#F1567D",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   tickText: {
//     color: "#fff",
//     fontSize: scaleFont(14),
//     fontWeight: "bold",
//   },
//   inputWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   flagIcon: {
//     width: scaleWidth(24),
//     height: scaleHeight(16),
//     marginLeft: scaleWidth(8),
//   },
//   suggestionsList: {
//     backgroundColor: "#fff",
//     borderRadius: scaleWidth(8),
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: scaleHeight(2) },
//     shadowOpacity: 0.1,
//     shadowRadius: scaleWidth(4),
//     elevation: 3,
//     maxHeight: scaleHeight(180),
//     marginTop: scaleHeight(8),
//   },
//   suggestionItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: scaleHeight(12),
//     paddingHorizontal: scaleWidth(16),
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   suggestionText: {
//     marginLeft: scaleWidth(8),
//     fontSize: scaleFont(16),
//     color: "#1F1F1F",
//   },
//   applyButton: {
//     backgroundColor: customColors.primary,
//     paddingVertical: scaleHeight(8),
//     paddingHorizontal: scaleWidth(16),
//     borderRadius: scaleWidth(6),
//     marginLeft: scaleWidth(8),
//   },
//   applyButtonText: {
//     color: "#fff",
//     fontSize: scaleFont(14),
//     fontWeight: "700",
//   },
//   footer: {
//     paddingVertical: scaleHeight(16),
//     paddingHorizontal: scaleWidth(20),
//     backgroundColor: "#fff",
//     alignItems: "center",
//   },
//   button: {
//     width: "100%",
//     maxWidth: scaleWidth(327),
//     height: scaleHeight(48),
//     backgroundColor: customColors.primary,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: scaleWidth(24),
//   },
//   buttonText: {
//     color: "#fff",
//     fontFamily: "DM Sans",
//     fontSize: scaleFont(16),
//     fontWeight: "700",
//     lineHeight: scaleHeight(22),
//   },
// });


import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  StatusBar,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RadioButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateProfile } from "@/services/userProfile";
import LoadingScreen from "@/components/common/Loading";
import { applyRefer } from "@/services/referrals";
import { redirect } from "@/utils/navigationService";
import Icon from "react-native-vector-icons/MaterialIcons";
import { scaleFont, scaleHeight, scaleWidth } from "@/constants/scaling";
import customColors from "@/constants/styles";

const Tick = () => (
  <View style={styles.tickContainer}>
    <Text style={styles.tickText}>✔</Text>
  </View>
);

export default function ProfileSetup() {
  const [image, setImage] = useState<string | null>(null);
  const [gender, setGender] = useState<"Male" | "Female">("Male");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [countries, setCountries] = useState<{ name: string; flag: string }[]>([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refCode, setRefCode] = useState<string | null>(null);
  const [inputReferralCode, setInputReferralCode] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    homeCountry: "",
    homeTown: "",
    dateOfBirth: "",
    gender: "Male",
    profileImage: "",
  });
  const [filteredCountries, setFilteredCountries] = useState<
    { name: string; flag: string }[]
  >([]);
  const [selectedFlag, setSelectedFlag] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("fbUser");

        console.log(userData, 'old one')

        if (userData) {
          const parsedUser = JSON.parse(userData);
          if (parsedUser) {
            setUser(parsedUser);
            setImage(parsedUser?.profileImage || "");
            setFormData((prev: any) => ({
              ...prev,
              name: parsedUser.name || "",
              homeCountry: parsedUser?.homeCountry || "",
              homeTown: parsedUser?.homeTown || "",
              dateOfBirth: parsedUser?.dateOfBirth || "",
              gender: parsedUser?.gender || "Male",
              // profileImage: parsedUser?.profileImage || "",
            }));
            setRefCode(parsedUser?.referredBy?.referralCode);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryList = data.map((country: any) => ({
          name: country.name.common,
          flag: country.flags.png,
        }));
        setCountries(countryList);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        quality: 1,
        includeBase64: false,
      },
      (response: any) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.errorCode) {
          console.error("ImagePicker Error: ", response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const selectedAsset = response.assets[0];
          setImage(selectedAsset.uri || "");
          setFormData((prev: any) => ({
            ...prev,
            image: selectedAsset.uri || "",
          }));
        }
      }
    );
  };

  console.log(formData,'formData on profile ')

  const handleCountryChange = (text: string) => {
    setFormData((prev: any) => ({ ...prev, homeCountry: text }));
    if (text.length >= 3) {
      const matches = countries.filter((country: any) =>
        country.name.toLowerCase().includes(text.toLowerCase().replace(/[^a-z]/g, ""))
      );
      setFilteredCountries(matches);
    } else {
      setFilteredCountries([]);
    }
  };

  const handleCountrySelect = (country: { name: string; flag: string }) => {
    setFormData((prev: any) => ({ ...prev, homeCountry: country.name }));
    setSelectedFlag(country.flag);
    setFilteredCountries([]);
  };

  const handleGenderChange = (value: "Male" | "Female") => {
    setGender(value);
    setFormData((prev: any) => ({ ...prev, gender: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await updateProfile(formData);
      if (res?.success) {
        await AsyncStorage.setItem("fbUser", JSON.stringify(res.data));
        redirect("languageSelection");
      } else {
        Alert.alert("Error", res?.message || "Failed to update profile");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "An unexpected error occurred");
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyReferral = async () => {
    if (!inputReferralCode.trim()) {
      Alert.alert("Invalid Code", "Referral code cannot be empty.");
      return;
    }
    if (inputReferralCode.length > 8) {
      Alert.alert("Invalid Code", "Referral code must not exceed 8 characters.");
      return;
    }
    try {
      setLoading(true);
      const response = await applyRefer(inputReferralCode);
      if (response?.success) {
        setRefCode(inputReferralCode);
        Alert.alert("Success", response?.message || "Referral code applied successfully!");
      } else {
        Alert.alert("Error", response?.message || "Failed to apply referral code.");
      }
    } catch (error) {
      console.error("Referral Application Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? scaleHeight(40) : scaleHeight(20)}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          {loading && <LoadingScreen />}
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.headerContainer}>
              <Text style={styles.title}>Welcome {formData.name || "User"}!</Text>
              <Text style={styles.description}>Improve the profile, win more attention</Text>
            </View>

            <TouchableOpacity style={styles.imageUploader} onPress={pickImage}>
              {image ? (
                <Image source={{ uri: image }} style={styles.uploadedImage} />
              ) : (
                <Icon name="camera" size={scaleFont(32)} color="white" />
              )}
            </TouchableOpacity>

            <RadioButton.Group
              onValueChange={(value) => handleGenderChange(value as "Male" | "Female")}
              value={gender}
            >
              <View style={styles.genderContainer}>
                <TouchableOpacity
                  style={styles.genderOption}
                  onPress={() => handleGenderChange("Male")}
                >
                  <RadioButton value="Male" color={customColors.primary} />
                  <Text style={styles.genderText}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.genderOption}
                  onPress={() => handleGenderChange("Female")}
                >
                  <RadioButton value="Female" color={customColors.primary} />
                  <Text style={styles.genderText}>Female</Text>
                </TouchableOpacity>
              </View>
            </RadioButton.Group>

            <View style={styles.formContainer}>
              {Object.keys(formData)
                .filter((key) => key !== "profileImage" && key !== "gender")
                .map((key) =>
                  key === "homeCountry" ? (
                    <View key={key} style={styles.inputContainer}>
                      <Text style={styles.label}>Home Country</Text>
                      <View style={styles.inputWrapper}>
                        <TextInput
                          style={styles.countryInput}
                          value={formData.homeCountry}
                          onChangeText={handleCountryChange}
                          placeholder="Enter Home Country"
                        />
                        {selectedFlag && (
                          <Image source={{ uri: selectedFlag }} style={styles.flagIcon} />
                        )}
                      </View>
                      {filteredCountries.length > 0 && (
                        <View style={styles.suggestionsList}>
                          <ScrollView keyboardShouldPersistTaps="handled">
                            {filteredCountries.map((item: any) => (
                              <TouchableOpacity
                                key={item.name}
                                style={styles.suggestionItem}
                                onPress={() => handleCountrySelect(item)}
                              >
                                <Image source={{ uri: item.flag }} style={styles.flagIcon} />
                                <Text style={styles.suggestionText}>{item.name}</Text>
                              </TouchableOpacity>
                            ))}
                          </ScrollView>
                        </View>
                      )}
                    </View>
                  ) : key === "dateOfBirth" ? (
                    <View key={key} style={styles.inputContainer}>
                      <Text style={styles.label}>Date of Birth</Text>
                      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                        <TextInput
                          style={styles.input}
                          value={
                            formData.dateOfBirth
                              ? new Date(formData.dateOfBirth).toDateString()
                              : ""
                          }
                          placeholder="Select Date of Birth"
                          editable={false}
                        />
                      </TouchableOpacity>
                      {showDatePicker && (
                        <DateTimePicker
                          value={
                            formData.dateOfBirth ? new Date(formData.dateOfBirth) : new Date()
                          }
                          mode="date"
                          display={Platform.OS === "ios" ? "spinner" : "default"}
                          onChange={(event: any, selectedDate: any) => {
                            setShowDatePicker(false);
                            if (selectedDate) {
                              setFormData((prev: any) => ({
                                ...prev,
                                dateOfBirth: selectedDate.toISOString(),
                              }));
                            }
                          }}
                        />
                      )}
                    </View>
                  ) : (
                    <View key={key} style={styles.inputContainer}>
                      <Text style={styles.label}>
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .trim()
                          .replace(/^./, (str) => str.toUpperCase())}
                      </Text>
                      <TextInput
                        style={styles.input}
                        value={formData[key as keyof typeof formData]?.toString() || ""}
                        onChangeText={(text: string) =>
                          setFormData((prev: any) => ({
                            ...prev,
                            [key]: text,
                          }))
                        }
                        placeholder={`Enter ${key
                          .replace(/([A-Z])/g, " $1")
                          .trim()
                          .replace(/^./, (str) => str.toUpperCase())}`}
                      />
                    </View>
                  )
                )}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Referral Code</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={[styles.input, refCode ? styles.disabledInput : {}]}
                    value={refCode ?? inputReferralCode}
                    onChangeText={(text: string) => {
                      if (!refCode && text.length <= 8) {
                        setInputReferralCode(text);
                      }
                    }}
                    placeholder="Enter Referral Code"
                    editable={!refCode}
                  />
                  {refCode ? (
                    <Tick />
                  ) : (
                    <TouchableOpacity style={styles.applyButton} onPress={handleApplyReferral}>
                      <Text style={styles.applyButtonText}>Apply</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: scaleWidth(20),
    paddingTop: StatusBar.currentHeight,
    paddingBottom: scaleHeight(80),
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: scaleHeight(20),
  },
  title: {
    color: "#1F1F1F",
    fontFamily: "DM Sans",
    fontSize: scaleFont(24),
    fontWeight: "700",
    lineHeight: scaleHeight(30),
  },
  description: {
    color: "#777",
    fontFamily: "DM Sans",
    fontSize: scaleFont(16),
    fontWeight: "400",
    lineHeight: scaleHeight(22),
    marginTop: scaleHeight(8),
  },
  imageUploader: {
    width: scaleWidth(86),
    height: scaleHeight(86),
    backgroundColor: "#F1567D",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scaleWidth(100),
    alignSelf: "center",
    marginVertical: scaleHeight(20),
  },
  uploadedImage: {
    width: "100%",
    height: "100%",
    borderRadius: scaleWidth(100),
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: scaleHeight(24),
  },
  genderOption: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: scaleWidth(20),
  },
  genderText: {
    color: "#1F1F1F",
    fontFamily: "DM Sans",
    fontSize: scaleFont(14),
    fontWeight: "400",
    lineHeight: scaleHeight(18),
  },
  formContainer: {
    gap: scaleHeight(24),
  },
  inputContainer: {
    gap: scaleHeight(8),
  },
  label: {
    color: "#9E9E9E",
    fontFamily: "DM Sans",
    fontSize: scaleFont(13),
    fontWeight: "500",
    lineHeight: scaleHeight(16),
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: scaleHeight(8),
    color: "#1F1F1F",
    fontFamily: "DM Sans",
    fontSize: scaleFont(16),
    fontWeight: "500",
    lineHeight: scaleHeight(22),
  },
  countryInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: scaleHeight(8),
    color: "#1F1F1F",
    fontFamily: "DM Sans",
    fontSize: scaleFont(16),
    fontWeight: "500",
    lineHeight: scaleHeight(22),
  },
  disabledInput: {
    color: "#888",
  },
  tickContainer: {
    width: scaleWidth(24),
    height: scaleHeight(24),
    borderRadius: scaleWidth(12),
    backgroundColor: "#F1567D",
    justifyContent: "center",
    alignItems: "center",
  },
  tickText: {
    color: "#fff",
    fontSize: scaleFont(14),
    fontWeight: "bold",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  flagIcon: {
    width: scaleWidth(24),
    height: scaleHeight(16),
    marginLeft: scaleWidth(8),
  },
  suggestionsList: {
    backgroundColor: "#fff",
    borderRadius: scaleWidth(8),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: scaleHeight(2) },
    shadowOpacity: 0.1,
    shadowRadius: scaleWidth(4),
    elevation: 3,
    maxHeight: scaleHeight(180),
    marginTop: scaleHeight(8),
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: scaleHeight(12),
    paddingHorizontal: scaleWidth(16),
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  suggestionText: {
    marginLeft: scaleWidth(8),
    fontSize: scaleFont(16),
    color: "#1F1F1F",
  },
  applyButton: {
    backgroundColor: customColors.primary,
    paddingVertical: scaleHeight(8),
    paddingHorizontal: scaleWidth(16),
    borderRadius: scaleWidth(6),
    marginLeft: scaleWidth(8),
  },
  applyButtonText: {
    color: "#fff",
    fontSize: scaleFont(14),
    fontWeight: "700",
  },
  footer: {
    paddingVertical: scaleHeight(16),
    paddingHorizontal: scaleWidth(20),
    backgroundColor: "#fff",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    width: "100%",
    maxWidth: scaleWidth(327),
    height: scaleHeight(48),
    backgroundColor: customColors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scaleWidth(24),
  },
  buttonText: {
    color: "#fff",
    fontFamily: "DM Sans",
    fontSize: scaleFont(16),
    fontWeight: "700",
    lineHeight: scaleHeight(22),
  },
});