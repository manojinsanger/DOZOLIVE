import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Platform,
  ImageSourcePropType,
  Image,
} from "react-native";
import ProgressBar from "./ProgressBar";
import { formatNumber, getLivestreamLevelBadget, getLivestreamLevelBg } from "@/utils/helper";
import ThemedText from "@/components/ThemedText";
import { scaleFont, scaleHeight, scaleWidth, defaultPadding } from "@/constants/scaling";

// Define the type for level data
type LiveSessionData = {
  level: number;
  pointsRequired: number;
};

// Props type for the component
type livestreamProps = {
  data?: LiveSessionData[];
  title?: string;
  pointsTitle?: string;
};

const LivestreamTable: React.FC<livestreamProps> = ({
  data,
  title = "Level",
  pointsTitle = "Beans required to upgrade",
}) => {
  // Updated points data to match the screenshot
  const pointsRequired = [
    0, 10000, 70000, 250000, 630000, 1410000, 3010000, 5710000, 10310000, 18110000, 31010000,
    52010000, 85010000, 137010000, 214010000, 323010000, 492010000, 741010000, 1100010000,
    1689010000, 2528010000, 3637010000, 5137010000, 7337010000, 10137010000, 14137010000,
    19137010000, 30000000000, 45000000000, 60000000000, 80000000000, 100000000000, 130000000000,
    160000000000, 200000000000, 250000000000, 300000000000, 360000000000, 430000000000,
    510000000000, 600000000000, 700000000000, 810000000000, 930000000000, 1060000000000,
    1200000000000, 1350000000000, 1510000000000, 1680000000000, 1860000000000, 2050000000000,
    2250000000000, 2460000000000, 2680000000000, 2910000000000, 3150000000000, 3400000000000,
    3660000000000, 3930000000000, 4210000000000, 4500000000000, 4800000000000, 5110000000000,
    5430000000000, 5760000000000, 6100000000000, 6450000000000, 6810000000000, 7180000000000,
    7560000000000, 7950000000000, 8350000000000, 8760000000000, 9180000000000, 9610000000000,
    10050000000000, 10500000000000, 10960000000000, 11430000000000, 11910000000000,
    12400000000000, 12900000000000, 13410000000000, 13930000000000, 14460000000000,
    15000000000000, 15550000000000, 16110000000000, 16680000000000, 17260000000000,
    17850000000000, 18450000000000, 19060000000000, 19680000000000, 20310000000000,
    20950000000000, 21600000000000, 22260000000000, 22930000000000, 23610000000000,
    24300000000000, 25000000000000
  ];

  const defaultData = pointsRequired.map((points, index) => ({
    level: index + 1,
    pointsRequired: points,
  }));

  const currentCoins = 1395681522357;
  const upgradeDistance = 293328478;
  const totalRequired = currentCoins + upgradeDistance;

  const renderLevelItem = ({ item }: { item: LiveSessionData }) => (
    <View style={styles.row}>
      <View style={styles.levelCol}>
        <View style={styles.levelBadgeContainer}>
          <Image source={getLivestreamLevelBg(item.level)} style={styles.levelBadge} />
          <Image
            source={getLivestreamLevelBadget(item.level)}
            style={styles.levelIcon}
            resizeMode="contain"
          />
          <ThemedText style={styles.levelText}>{item.level - 1}</ThemedText>
        </View>
      </View>
      <View style={styles.columnDivider} />
      <View style={styles.pointsCol}>
        <ThemedText style={styles.pointsText}>
          {formatNumber(item.pointsRequired)}
        </ThemedText>
      </View>
    </View>
  );

  return (
    <>
      <ProgressBar
        currentPoints={currentCoins}
        totalPoints={totalRequired}
        activeTab={'livestreamLevel'}
      />
      <View style={styles.tableContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <ThemedText style={styles.headerText}>{title}</ThemedText>
            <ThemedText style={[styles.headerText, styles.pointsHeaderText]}>
              {pointsTitle}
            </ThemedText>
          </View>
          <FlatList
            data={data || defaultData}
            renderItem={renderLevelItem}
            keyExtractor={(item) => `livestream-level-${item.level}`}
            showsVerticalScrollIndicator={Platform.OS === "web"}
            style={styles.list}
            contentContainerStyle={styles.listContent}
            ListFooterComponent={<View style={{ height: scaleHeight(650) }} />}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    borderRadius: scaleWidth(20),
    overflow: "hidden",
  },
  container: {
    backgroundColor: "white",
    borderRadius: scaleWidth(10),
    overflow: "hidden",
    width: "100%",
  },
  levelBadge: {
    position: "absolute",
    width: scaleWidth(46),
    resizeMode: 'contain',
    transform: [{ rotate: "360deg" }],
    left: 0,
  },
  levelIcon: {
    position: "absolute",
    width: scaleWidth(24),
    zIndex: 3,
    left: scaleWidth(-6),
    resizeMode: 'contain',
  },
  levelText: {
    color: "white",
    fontWeight: "bold",
    fontSize: scaleFont(12),
    position: "absolute",
    zIndex: 4,
    left: scaleWidth(24),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: scaleHeight(12),
    paddingHorizontal: 0,
    borderBottomWidth: scaleWidth(1),
    borderBottomColor: "#f0f0f0",
  },
  levelCol: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  columnDivider: {
    width: scaleWidth(1),
    height: "100%",
    backgroundColor: "#f0f0f0",
  },
  pointsCol: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    paddingVertical: scaleHeight(15),
    paddingHorizontal: 0,
    borderBottomWidth: scaleWidth(1),
    borderBottomColor: "#f0f0f0",
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: scaleFont(14),
    fontWeight: "600",
    color: "#333",
    flex: 1,
    textAlign: "center",
    paddingHorizontal: scaleWidth(10),
  },
  pointsHeaderText: {
    textAlign: "center",
  },
  pointsText: {
    fontSize: scaleFont(12),
    color: "#333",
    textAlign: "center",
  },
  levelBadgeContainer: {
    position: "relative",
    width: scaleWidth(48),
    height: scaleHeight(20),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  separator: {
    height: scaleHeight(1),
    backgroundColor: "#f0f0f0",
    marginLeft: scaleWidth(20),
  },
  list: {},
  listContent: {
    paddingBottom: scaleHeight(20), // or even 0
  },

});

export default LivestreamTable;