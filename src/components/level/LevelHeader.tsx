import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image, Animated, StatusBar } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userImg from "../../assets/images/icon/user-profile.png";
import { goBack } from "../../utils/navigationService";
import { scaleHeight, scaleWidth, scaleFont } from "../../constants/scaling";
import defaultUser from "@/assets/images/icon/userProfile.png";
import ThemedText from "../ThemedText";

const LevelHeader = ({
  activeTab,
  handleSetActiveTab,
}: {
  activeTab: string;
  handleSetActiveTab: (tab: string) => void;
}) => {
  const [user, setUser] = useState<any | null>(null);
  const [tabAnimation] = useState(new Animated.Value(activeTab === "wealthLevel" ? 0 : 1));

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = await AsyncStorage.getItem("fbUser");
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      setUser(parsedUser);
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    Animated.timing(tabAnimation, {
      toValue: activeTab === "wealthLevel" ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [activeTab, tabAnimation]);

  const handleTabPress = (tab: string) => {
    if (tab !== activeTab) {
      handleSetActiveTab(tab);
    }
  };

  // Calculate the position based on the container and tab widths
  const tabWidth = scaleWidth(140);
  const indicatorWidth = scaleWidth(70); // Reduced indicator width
  // Adjust the starting position to center the indicator under each tab
  const leftOffset = (tabWidth - indicatorWidth) / 2;

  const tabIndicatorPosition = tabAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [leftOffset, tabWidth + leftOffset],
  });

  return (
    <View style={styles.headerContainer}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <MaterialIcons
            name="arrow-back"
            size={scaleFont(22)}
            color="#fff"
          />
        </TouchableOpacity>

        <View style={styles.tabContainer}>
          <View style={styles.tabsWrapper}>
            <TouchableOpacity
              onPress={() => handleTabPress("wealthLevel")}
              style={styles.tabButton}
              activeOpacity={0.8}
            >
              <ThemedText style={[
                styles.tabText,
                activeTab === "wealthLevel" && styles.activeTabText
              ]}>
                Wealth Level
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleTabPress("livestreamLevel")}
              style={styles.tabButton}
              activeOpacity={0.8}
            >
              <ThemedText style={[
                styles.tabText,
                activeTab === "livestreamLevel" && styles.activeTabText,
                styles.noWrap
              ]}>
                Livestream Level
              </ThemedText>
            </TouchableOpacity>

            {/* Animated indicator positioned under tabs */}
            <Animated.View
              style={[
                styles.tabIndicator,
                {
                  width: indicatorWidth,
                  transform: [{ translateX: tabIndicatorPosition }]
                }
              ]}
            />
          </View>
        </View>
      </View>

      <View style={styles.headerContentContainer}>
        <View style={styles.headerCircle}>
          <Image
            source={
              user?.profileImage != null
                ? { uri: user.profileImage }
                : defaultUser
            }
            style={styles.profileImage}
          />
        </View>
      </View>
    </View>
  );
};

export default LevelHeader;

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: scaleWidth(20),
  },
  headerContentContainer: {
    alignItems: "center",
    marginTop: scaleHeight(40),
  },
  navBar: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    padding: scaleWidth(5),
  },
  tabContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabsWrapper: {
    flexDirection: "row",
    height: scaleHeight(40),
    position: "relative",
  },
  tabButton: {
    width: scaleWidth(140),
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  tabText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: scaleFont(16),
    fontWeight: "500",
    textAlign: "center",
  },
  activeTabText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  noWrap: {
    flexShrink: 1,
    flexWrap: "nowrap",
  },
  tabIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: scaleHeight(2),
    backgroundColor: "#FFFFFF",
    borderRadius: scaleHeight(1),
  },
  headerCircle: {
    borderRadius: scaleWidth(65),
    backgroundColor: "#52ACF1",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: scaleWidth(90),
    height: scaleWidth(90),
    borderRadius: scaleWidth(45),
    resizeMode: "cover",
  },
});