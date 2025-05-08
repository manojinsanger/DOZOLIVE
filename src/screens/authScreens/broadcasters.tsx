import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { replace } from "../../utils/navigationService";
import { scaleWidth, scaleHeight, scaleFont } from "@/constants/scaling";
import customColors from "@/constants/styles";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

interface Broadcaster {
  login: { uuid: string };
  name: { first: string; last: string };
  picture: { large: string };
}

const Tick = () => (
  <View style={styles.tickContainer}>
    <Text style={styles.tickText}>✔</Text>
  </View>
);

export default function Broadcasters() {
  const [broadcasters, setBroadcasters] = useState<Broadcaster[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBroadcasters = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=20&nat=in");
        const data = await response.json();
        setBroadcasters(data.results);
      } catch (error) {
        console.error("Error fetching broadcasters:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBroadcasters();
  }, []);

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]
    );
  };

  const handleDone = () => {
    replace("interests");
  };

  return (
      <View style={styles.container}>
        <CustomHeader
          title="Top Trending Broadcasters"
          rightAction={() => replace("interests")}
          rightLabel="Skip"
        />

        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={customColors.primary} />
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.gridContainer}>
              {broadcasters.map((item) => (
                <TrendingBroadcasterCard
                  key={item.login.uuid}
                  broadcaster={item}
                  isSelected={selectedIds.includes(item.login.uuid)}
                  onSelect={() => toggleSelection(item.login.uuid)}
                />
              ))}
            </View>
          </ScrollView>
        )}

        {selectedIds.length !== 0 && (
          <TouchableOpacity onPress={handleDone} style={styles.submitButton}>
            <Text style={styles.submitText}>Done</Text>
          </TouchableOpacity>
        )}
      </View>
  );
}

interface BroadcasterCardProps {
  broadcaster: Broadcaster;
  isSelected: boolean;
  onSelect: () => void;
}

const TrendingBroadcasterCard: React.FC<BroadcasterCardProps> = ({
  broadcaster,
  isSelected,
  onSelect,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onSelect}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: broadcaster.picture.large }} style={styles.image} />
        {isSelected && <Tick />}
      </View>
      <View>
        <Text style={styles.name}>
          {broadcaster.name.first} {broadcaster.name.last}
        </Text>
        <View style={styles.followerContainer}>
          <Ionicons name="person" size={scaleFont(14)} color={customColors.gray500} />
          <Text style={styles.followers}>{Math.floor(Math.random() * 5000)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const CustomHeader = ({
  title,
  rightAction,
  rightLabel,
}: {
  title: string;
  rightAction?: () => void;
  rightLabel?: string;
}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
      {rightAction && rightLabel && (
        <TouchableOpacity onPress={rightAction} style={styles.headerRight}>
          <Text style={styles.headerRightText}>{rightLabel}</Text>
          <Feather name="chevrons-right" size={scaleFont(20)} color={customColors.gray800} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customColors.white,
    paddingTop:StatusBar.currentHeight,
  },
  submitButton: {
    position: "absolute",
    bottom: scaleHeight(30),
    alignSelf: "center",
    width: scaleWidth(327),
    height: scaleHeight(48),
    backgroundColor: customColors.primary,
    borderRadius: scaleWidth(24),
    justifyContent: "center",
    alignItems: "center",
  },
  submitText: {
    color: customColors.white,
    fontSize: scaleFont(16),
    fontWeight: "bold",
    fontFamily: "DM Sans",
  },
  card: {
    width: (width - scaleWidth(40)) / 3, // 3 cards per row with padding
    alignItems: "center",
    marginBottom: scaleHeight(20),
    paddingHorizontal: scaleWidth(5),
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: width < 360 ? scaleWidth(70) : scaleWidth(86),
    height: width < 360 ? scaleWidth(70) : scaleWidth(86),
    borderRadius: width < 360 ? scaleWidth(70) : scaleWidth(86),
    backgroundColor: customColors.gray300,
  },
  tickContainer: {
    position: "absolute",
    right: scaleWidth(5),
    bottom: scaleHeight(5),
    width: scaleWidth(24),
    height: scaleHeight(24),
    borderRadius: scaleWidth(12),
    backgroundColor: customColors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  tickText: {
    color: customColors.white,
    fontSize: scaleFont(14),
    fontWeight: "bold",
  },
  name: {
    color: customColors.gray800,
    textAlign: "center",
    fontFamily: "DM Sans",
    fontSize: width < 360 ? scaleFont(13) : scaleFont(15),
    fontWeight: "500",
    lineHeight: scaleHeight(18),
  },
  followerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scaleWidth(5),
  },
  followers: {
    color: customColors.gray500,
    fontFamily: "DM Sans",
    fontSize: width < 360 ? scaleFont(10) : scaleFont(12),
    fontWeight: "400",
    lineHeight: scaleHeight(16),
  },
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: customColors.white,
    alignItems: "center",
    paddingTop: scaleHeight(30),
    paddingBottom: scaleHeight(80),
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: scaleWidth(10),
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    height: scaleHeight(60),
    backgroundColor: customColors.white,
    paddingHorizontal: scaleWidth(15),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: customColors.gray200,
  },
  headerTitle: {
    fontSize: scaleFont(18),
    fontWeight: "600",
    color: customColors.gray800,
    fontFamily: "DM Sans",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerRightText: {
    marginRight: scaleWidth(5),
    fontSize: scaleFont(16),
    color: customColors.gray800,
    fontWeight: "500",
    fontFamily: "DM Sans",
  },
});