import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Modal,
  SectionList,
  SectionListData,
  Animated,
  Platform,
  Image,
  StatusBar,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initiateOTP } from "@/services/userAuth";
import { goBack, redirect } from "@/utils/navigationService";
import { scaleWidth, scaleHeight, scaleFont } from "@/constants/scaling";
import customColors from "@/constants/styles";
import countriesDetails from "@/utils/countries";
import { SafeAreaView } from "react-native-safe-area-context";

interface Country {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
}

interface CountrySection {
  title: string;
  data: Country[];
}

export default function PhoneAuth() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [showCountryList, setShowCountryList] = useState(false);
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const sectionListRef = useRef<SectionList<Country, CountrySection>>(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setCountries(countriesDetails);
    setFilteredCountries(countriesDetails);
    const india = countriesDetails.find((country) => country.code === "IN");
    if (india) {
      setSelectedCountry(india);
    }
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = countries.filter((country) =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countries);
    }
  }, [searchQuery, countries]);

  // Memoize sectioned countries for performance
  const sectionedCountries: CountrySection[] = useMemo(() => {
    return Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
      .map((letter) => {
        const data = filteredCountries.filter((country) =>
          country.name.toUpperCase().startsWith(letter)
        );
        return { title: letter, data };
      })
      .filter((section) => section.data.length > 0);
  }, [filteredCountries]);

  const isValidPhoneNumber = useCallback((number: string) => /^[0-9]{10}$/.test(number), []);

  const handleSendOTP = useCallback(async () => {
    if (!phoneNumber || !selectedCountry) {
      Alert.alert("Error", "Please enter a phone number and select a country");
      return;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      Alert.alert("Error", "Please enter a valid 10-digit phone number");
      return;
    }

    setIsSendingOTP(true);
    try {
      const fullPhoneNumber = `${selectedCountry.dialCode}${phoneNumber}`;
      await AsyncStorage.setItem("verifyPhone", selectedCountry.code === "IN" ? phoneNumber : fullPhoneNumber);
      await AsyncStorage.setItem("verifyDialCode", selectedCountry.dialCode);

      const res = await initiateOTP(Number(phoneNumber));
      if (res?.success) {
        // router.push("/onboard/otp-auth");
        redirect('otpAuth');
      } else {
        Alert.alert("Error", res?.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      Alert.alert("Error", "Failed to send OTP");
    } finally {
      setIsSendingOTP(false);
    }
  }, [phoneNumber, selectedCountry, isValidPhoneNumber]);

  const getItemLayout = useCallback(
    (data: SectionListData<Country, CountrySection>[] | null, index: number) => {
      const itemHeight = scaleHeight(48); // Adjusted for new padding
      const headerHeight = scaleHeight(36); // Adjusted for new styling

      let offset = scaleHeight(100); // Account for search bar and header
      let currentIndex = 0;

      if (!data) {
        return { length: itemHeight, offset, index };
      }

      for (let section of data) {
        if (currentIndex <= index) {
          offset += headerHeight;
          currentIndex += 1;
        }

        for (let i = 0; i < section.data.length; i++) {
          if (currentIndex === index) {
            return { length: itemHeight, offset, index };
          }
          offset += itemHeight;
          currentIndex += 1;
        }
      }

      return { length: itemHeight, offset, index };
    },
    []
  );

  const scrollToSection = useCallback(
    (letter: string) => {
      const sectionIndex = sectionedCountries.findIndex((section) => section.title === letter);
      if (sectionIndex !== -1 && sectionListRef.current) {
        setActiveLetter(letter);
        Animated.timing(scrollY, {
          toValue: sectionIndex,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          try {
            sectionListRef.current?.scrollToLocation({
              sectionIndex,
              itemIndex: 0,
              animated: true,
              viewOffset: scaleHeight(100), // Offset for header and search
            });
          } catch (error) {
            console.warn("Scroll to section failed:", error);
          }
          setTimeout(() => setActiveLetter(null), 500); // Reset active letter
        });
      }
    },
    [sectionedCountries, scrollY]
  );

  const onScrollToIndexFailed = useCallback(
    (info: { index: number; highestMeasuredFrameIndex: number; averageItemLength: number }) => {
      console.warn("Scroll to index failed:", info);
      if (sectionListRef.current) {
        sectionListRef.current.scrollToLocation({
          sectionIndex: Math.max(0, Math.floor(info.index / 10)),
          itemIndex: 0,
          animated: true,
        });
      }
    },
    []
  );

  const renderCountryItem = useCallback(
    ({ item }: { item: Country }) => (
      <TouchableOpacity
        style={styles.countryItem}
        onPress={() => {
          setSelectedCountry(item);
          setShowCountryList(false);
          setSearchQuery("");
        }}
        accessibilityLabel={`Select ${item.name}`}
      >
        <Image source={{ uri: item.flag }} style={styles.flag} />
        <Text style={styles.countryName}>
          {item.name} ({item.dialCode})
        </Text>
      </TouchableOpacity>
    ),
    []
  );

  const renderSectionHeader = useCallback(
    ({ section }: { section: SectionListData<Country, CountrySection> }) => (
      <Text style={styles.sectionHeader}>{section.title}</Text>
    ),
    []
  );

  return (

    <View style={styles.container}>
      
      <CustomHeader title="Phone Number" onBack={goBack} />

      <Text style={styles.label}>Country</Text>
      <TouchableOpacity
        style={styles.countrySelector}
        onPress={() => setShowCountryList(true)}
        accessibilityLabel="Select country"
      >
        {selectedCountry ? (
          <Image source={{ uri: selectedCountry.flag }} style={styles.selectedFlag} />
        ) : (
          <Feather
            name="globe"
            size={scaleFont(18)}
            color={customColors.gray600}
            style={styles.icon}
          />
        )}
        <Text style={styles.countryText}>
          {selectedCountry?.name || "Select Country"}
        </Text>
        <Feather name="chevron-down" size={scaleFont(20)} color={customColors.gray600} />
      </TouchableOpacity>

      <Text style={styles.label}>Phone Number</Text>
      <View style={styles.phoneInputContainer}>
        <Text style={styles.dialCode}>{selectedCountry?.dialCode}</Text>
        <TextInput
          style={styles.input}
          placeholder="0123456789"
          placeholderTextColor={customColors.gray600}
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text.replace(/[^0-9]/g, ""))}
          maxLength={10}
          accessibilityLabel="Enter phone number"
        />
        {isValidPhoneNumber(phoneNumber) && (
          <FontAwesome name="check-circle" size={scaleFont(20)} color={"green"} />
        )}
      </View>

      <TouchableOpacity
        style={[styles.button, isSendingOTP && styles.buttonDisabled]}
        onPress={handleSendOTP}
        disabled={isSendingOTP}
        accessibilityLabel="Sign up or login with phone"
      >
        {isSendingOTP ? (
          <ActivityIndicator size="small" color={customColors.white} />
        ) : (
          <Text style={styles.buttonText}>Next</Text>
        )}
      </TouchableOpacity>

      <Modal visible={showCountryList} animationType="slide" transparent={true}>
        <View style={styles.modalWrapper}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                onPress={() => setShowCountryList(false)}
                style={styles.closeButton}
              >
                <Feather name="x" size={scaleFont(24)} color={customColors.gray800} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Select Country</Text>
            </View>

            <TextInput
              style={styles.searchInput}
              placeholder="Search countries..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={customColors.gray600}
              autoFocus={true}
            />

            <View style={styles.modalContent}>
              {sectionedCountries.length === 0 ? (
                <Text style={styles.noResults}>No countries found</Text>
              ) : (
                <>
                  <SectionList<Country, CountrySection>
                    ref={sectionListRef}
                    sections={sectionedCountries}
                    renderItem={renderCountryItem}
                    renderSectionHeader={renderSectionHeader}
                    keyExtractor={(item) => item.code}
                    initialNumToRender={15}
                    contentContainerStyle={styles.modalList}
                    stickySectionHeadersEnabled={true}
                    getItemLayout={getItemLayout}
                    onScrollToIndexFailed={onScrollToIndexFailed}
                    showsVerticalScrollIndicator={false}
                  />
                  <View style={styles.sideNavigator}>
                    {Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ").map((letter) => (
                      <TouchableOpacity
                        key={letter}
                        onPress={() => scrollToSection(letter)}
                        style={[
                          styles.letterButton,
                          activeLetter === letter && styles.activeLetterButton,
                        ]}
                      >
                        <Text
                          style={[
                            styles.letterText,
                            activeLetter === letter && styles.activeLetterText,
                          ]}
                        >
                          {letter}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>

  );
}

const CustomHeader = ({ title, onBack }: { title: string; onBack: () => void }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} style={styles.backButton} accessibilityLabel="Go back">
        <Feather name="arrow-left" size={scaleFont(24)} color={customColors.gray800} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customColors.white,
    paddingHorizontal: scaleWidth(20),
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: scaleHeight(15),
    marginBottom: scaleHeight(20),
    marginTop:scaleHeight(20)
  },
  backButton: {
    paddingRight: scaleWidth(15),
  },
  headerTitle: {
    fontFamily: "DMSans",
    fontSize: scaleFont(20),
    fontWeight: "700",
    color: customColors.gray800,
  },
  label: {
    fontFamily: "DMSans",
    fontSize: scaleFont(15),
    color: customColors.gray600,
    marginBottom: scaleHeight(10),
    marginLeft: scaleWidth(10),
  },
  countrySelector: {
    flexDirection: "row",
    alignItems: "center",
    padding: scaleHeight(12),
    borderBottomWidth: 1,
    borderBottomColor: customColors.gray200,
    marginBottom: scaleHeight(20),
  },
  selectedFlag: {
    width: scaleWidth(28),
    height: scaleHeight(18),
    marginRight: scaleWidth(10),
    borderRadius: scaleWidth(2),
  },
  countryText: {
    flex: 1,
    fontFamily: "DMSans",
    fontSize: scaleFont(16),
    color: customColors.gray800,
  },
  icon: {
    marginRight: scaleWidth(10),
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: customColors.gray200,
    paddingVertical: scaleHeight(12),
    marginBottom: scaleHeight(30),
  },
  dialCode: {
    fontFamily: "DMSans",
    fontSize: scaleFont(18),
    color: customColors.gray800,
    marginRight: scaleWidth(10),
  },
  input: {
    flex: 1,
    fontFamily: "DMSans",
    fontSize: scaleFont(18),
    color: customColors.gray800,
    fontWeight: "500",
  },
  button: {
    backgroundColor: customColors.primary,
    paddingVertical: scaleHeight(15),
    borderRadius: scaleWidth(24),
    alignItems: "center",
    marginTop: scaleHeight(15),
  },
  buttonDisabled: {
    backgroundColor: customColors.gray800,
  },
  buttonText: {
    fontFamily: "DMSans",
    fontSize: scaleFont(18),
    fontWeight: "700",
    color: customColors.white,
  },
  modalWrapper: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Subtle overlay
  },
  modalContainer: {
    flex: 1,
    backgroundColor: customColors.white,
    marginTop: Platform.OS === "ios" ? scaleHeight(40) : scaleHeight(20),
    // marginHorizontal: scaleWidth(16),
    borderTopLeftRadius: scaleWidth(26),
    borderTopRightRadius: scaleWidth(26),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scaleWidth(20),
    paddingVertical: scaleHeight(16),
    borderBottomWidth: 1,
    borderBottomColor: customColors.gray100,
  },
  closeButton: {
    paddingRight: scaleWidth(15),
  },
  modalTitle: {
    fontFamily: "DMSans",
    fontSize: scaleFont(20),
    fontWeight: "700",
    color: customColors.gray800,
    flex: 1,
  },
  searchInput: {
    margin: scaleWidth(20),
    padding: scaleHeight(12),
    borderWidth: 1,
    borderColor: customColors.gray200,
    borderRadius: scaleWidth(12),
    fontFamily: "DMSans",
    fontSize: scaleFont(16),
    color: customColors.gray800,
    backgroundColor: customColors.gray100,
  },
  modalContent: {
    flex: 1,
    flexDirection: "row",
  },
  modalList: {
    paddingHorizontal: scaleWidth(20),
    paddingBottom: scaleHeight(50), // Prevent clipping at bottom
    flexGrow: 1,
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: scaleHeight(12),
    borderBottomWidth: 1,
    borderBottomColor: customColors.gray100,
    height: scaleHeight(48),
  },
  flag: {
    width: scaleWidth(22),
    height: scaleHeight(16),
    marginRight: scaleWidth(12),
    borderRadius: scaleWidth(2),
  },
  countryName: {
    fontFamily: "DMSans",
    fontSize: scaleFont(13),
    fontWeight:700,
    color: customColors.gray800,
    flex: 1,
  },
  sideNavigator: {
    width: scaleWidth(36),
    paddingVertical: scaleHeight(12),
    alignItems: "center",
    backgroundColor: customColors.gray100,
    borderTopLeftRadius: scaleWidth(22),
    borderBottomLeftRadius: scaleWidth(22),
    display:'flex',
    flexDirection:'column',
    justifyContent:'center'
  },
  letterButton: {
    paddingVertical: scaleHeight(2),
    paddingHorizontal: scaleWidth(8),
    borderRadius: scaleWidth(4),
  },
  activeLetterButton: {
    backgroundColor: customColors.accent,
  },
  letterText: {
    fontFamily: "DMSans",
    fontSize: scaleFont(12),
    color: customColors.gray600,
    fontWeight: 700,
  },
  activeLetterText: {
    color: customColors.white,
    fontWeight: "700",
  },
  sectionHeader: {
    fontFamily: "DMSans",
    fontSize: scaleFont(18),
    fontWeight: "700",
    color: customColors.gray800,
    backgroundColor: customColors.white,
    paddingVertical: scaleHeight(9),
    height: scaleHeight(36),
  },
  noResults: {
    fontFamily: "DMSans",
    fontSize: scaleFont(16),
    color: customColors.gray600,
    textAlign: "center",
    marginTop: scaleHeight(20),
    flex: 1,
  },
});