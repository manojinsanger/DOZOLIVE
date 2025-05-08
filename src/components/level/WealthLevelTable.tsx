import { formatNumber, getWealthLevelBadget } from "@/utils/helper";
import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Platform,
  Image,
} from "react-native";
import ProgressBar from "./ProgressBar";
import ThemedText from "@/components/ThemedText";
import { scaleWidth, scaleHeight, scaleFont, defaultPadding } from "@/constants/scaling";

type wealthLevelData = {
  level: number;
  pointsRequired: number;
};

type wealthTableProps = {
  data?: wealthLevelData[];
  title?: string;
  pointsTitle?: string;
};

const WealthLevelTable: React.FC<wealthTableProps> = ({
  data,
  title = "Level",
  pointsTitle = "Points required to upgrade",
}) => {
  // Points data
  const pointsData = [
    0, 3000, 6000, 16000, 66000, 166000, 330000, 500000, 700000, 1000000, 1100000, 1300000, 1600000, 2000000, 2600000, 3400000, 4400000, 5600000, 7000000, 10000000, 10500000, 11500000, 13000000, 15000000, 18000000, 22000000, 27000000, 33000000, 40000000, 50000000, 52000000, 55000000, 60000000, 68000000, 79000000, 95000000, 114000000, 137000000, 163000000, 200000000, 204000000, 210000000, 220000000, 236000000, 258000000, 290000000, 328000000, 375000000, 428000000, 500000000, 506000000, 516000000, 535000000, 560000000, 598000000, 648000000, 710000000, 785000000, 870000000, 1000000000, 1020000000, 1060000000, 1120000000, 1220000000, 1360000000, 1560000000, 1800000000, 2100000000, 2440000000, 3000000000, 3020000000, 3060000000, 3120000000, 3220000000, 3360000000, 3560000000, 3800000000, 4100000000, 4440000000, 5000000000, 5050000000, 5150000000, 5300000000, 5550000000, 5900000000, 6400000000, 7000000000, 7750000000, 8600000000, 10000000000, 10100000000, 10300000000, 10600000000, 11100000000, 11800000000, 12800000000, 14000000000, 15500000000, 17200000000, 20600000000, 20710000000, 20930000000, 21260000000, 21810000000, 22580000000, 23680000000, 25000000000, 26650000000, 28520000000, 30200000000, 30320000000, 30560000000, 30920000000, 31520000000, 32360000000, 33560000000, 35000000000, 36800000000, 38840000000, 40688000000, 40820000000, 41084000000, 41480000000, 42140000000, 43064000000, 44384000000, 45968000000, 47948000000, 50192000000, 52208000000, 52352000000, 52640000000, 53072000000, 53792000000, 54800000000, 56240000000, 57968000000, 60128000000, 62576000000, 64793600000, 64952000000, 65268800000, 65744000000, 66536000000, 67644800000, 69228800000, 71129600000, 73505600000, 76198400000, 78617600000, 78790400000, 79136000000, 79654400000, 80518400000, 81728000000, 83456000000, 85529600000, 88121600000, 91059200000, 93720320000, 93910400000, 94290560000, 94860800000, 95811200000, 97141760000, 99042560000, 101324000000, 104174720000, 107406080000, 110309120000, 110516480000, 110931200000, 111553280000, 112590080000, 114041600000, 116115200000, 118603520000, 121713920000, 125239040000, 128432384000, 128660480000, 129116672000, 129800960000, 130941440000, 132538112000, 134819072000, 137556224000, 140977664000, 144855296000, 148338944000, 148587776000, 149085440000, 149831936000, 151076096000, 152817920000, 155306240000, 158292224000, 162024704000, 166254848000, 170086860800, 172539700800, 176354541824, 180622682624, 185388845568, 190706908672, 196602071552, 203022785024, 209980016640, 217476027648, 225507657728, 234086706432, 243212871936, 252888416256, 263120849152, 273917351936, 285290568192, 297218848128, 309716667904, 322783292416, 336394451968, 350597946624, 365351492352, 380658868992, 396416905728, 412635558656, 429326995712, 446484563328, 464109032192, 482202249728, 500766149120, 519802780672, 539314497792, 559303852544, 579773486848, 600726159104, 622164676608, 644090812416, 666506524416, 689413947648, 712814389248, 736709369472, 761100579840, 786000831232, 810000000000, 840000000000, 875000000000, 900000000000, 930000000000, 950000000000, 1000000000000, 1050000000000, 1100000000000, 1200000000000, 1300000000000, 1400000000000, 1500000000000, 1600000000000, 1700000000000, 1800000000000, 1900000000000, 2000000000000, 2100000000000, 2200000000000, 2300000000000, 2400000000000, 2500000000000, 2600000000000, 2700000000000, 2800000000000, 2900000000000, 3000000000000, 3100000000000, 3200000000000, 3300000000000, 3400000000000, 3500000000000, 3600000000000, 3700000000000, 3800000000000, 3900000000000, 4000000000000, 4100000000000, 4200000000000, 4300000000000, 4400000000000, 4500000000000, 4600000000000, 4700000000000, 4800000000000, 4900000000000, 5000000000000, 5100000000000, 5200000000000, 5300000000000, 5400000000000, 5500000000000, 5600000000000, 5700000000000, 5800000000000, 5900000000000
  ];

  // Create the wealth level data based on the provided points
  const defaultData = pointsData.map((points, index) => ({
    level: index + 1,
    pointsRequired: points,
  }));

  const currentCoins = 98577093;
  const upgradeDistance = 293328478;
  const totalRequired = currentCoins + upgradeDistance;

  const renderLevelItem = ({ item }: { item: wealthLevelData }) => {

    return (

      <View style={styles.row}>
        <View style={styles.levelCol}>
          <View style={styles.levelBadgeContainer}>
            <Image source={getWealthLevelBadget(item.level)} style={styles.levelBadge} />
            <ThemedText style={styles.levelText}>{item.level}</ThemedText>
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
  }
  return (
    <>
      <ProgressBar
        currentPoints={currentCoins}
        totalPoints={totalRequired}
        activeTab={'wealthLevel'}
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
            keyExtractor={(item) => `wealth-level-${item.level}`}
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
  container: {
    backgroundColor: "white",
    borderRadius: scaleWidth(10),
    overflow: "hidden",
    width: "100%",
  },
  tableContainer: {
    borderRadius: scaleWidth(20),
    overflow: "hidden",
  },
  levelBadge: {
    position: "absolute",
    width: scaleWidth(55),
    height: scaleHeight(22),
    resizeMode: 'contain',
    transform: [{ rotate: "360deg" }],
    left: 0,
  },
  levelIcon: {
    position: "absolute",
    width: scaleWidth(28),
    height: scaleHeight(30),
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
    left: scaleWidth(25),
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
    width: scaleWidth(50),
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
  list: {
    // maxHeight: scaleHeight(500),
  },
  listContent: {
    paddingBottom: scaleHeight(10),
  },
});

export default WealthLevelTable;