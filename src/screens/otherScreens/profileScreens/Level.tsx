import MainContainer from "@/components/common/mainContainers/MainContainer";
import LevelHeader from "@/components/level/LevelHeader";
import LivestreamTable from "@/components/level/livestreamLevelTable";
import WealthLevelTable from "@/components/level/WealthLevelTable";
import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { scaleWidth, scaleHeight, scaleFont, fullWidth, fullHeight, defaultPadding } from "@/constants/scaling"

const Level = () => {
  const [activeTab, setActiveTab] = React.useState("wealthLevel");

  const data = [{ key: "content" }];

  return (
    <MainContainer >
      <View style={styles.container}>
        <LevelHeader
          activeTab={activeTab}
          handleSetActiveTab={() =>
            setActiveTab(
              activeTab === "wealthLevel"
                ? "livestreamLevel"
                : "wealthLevel"
            )
          }
        />
        <View>
          {activeTab === "wealthLevel" ? (
            <WealthLevelTable />
          ) : (
            <LivestreamTable />
          )}
        </View>
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: defaultPadding,
  },
  scrollViewContent: {
    paddingBottom: defaultPadding,
  },
  coinsContainer: {
    alignItems: "center",
    paddingVertical: scaleHeight(30),
  },
  waveBackground: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: scaleHeight(160),
  },
  waveSvg: {
    position: "absolute",
    bottom: 0,
  },
  currentCoinsText: {
    color: "white",
    fontSize: scaleFont(24),
    fontWeight: "bold",
  },
  upgradeDistanceText: {
    color: "white",
    fontSize: scaleFont(14),
    marginTop: scaleHeight(5),
  },
  weathHeader: {},
  livestreamHeader: {},
});

export default Level;