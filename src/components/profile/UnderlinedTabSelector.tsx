import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import customColors from '@/constants/styles';
import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';
import ThemedText from '../ThemedText';

// Define the props interface
interface UnderlinedTabSelectorProps {
  tabs: string[];
  onTabPress?: (tab: string) => void;
  activeTab?: string | null;
  containerStyle?: object;
  tabContainerStyle?: object;
  tabTextStyle?: object;
  activeTabTextStyle?: object;
  underlineStyle?: object;
}


// Reusable UnderlinedTabSelector component
const UnderlinedTabSelector: React.FC<UnderlinedTabSelectorProps> = ({
  tabs,
  onTabPress,
  activeTab: externalActiveTab,
  containerStyle,
  tabContainerStyle,
  tabTextStyle,
  activeTabTextStyle,
  underlineStyle,
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState<string | null>(null);
  const activeTab = externalActiveTab !== undefined ? externalActiveTab : internalActiveTab;

  const handleTabPress = (tab: string) => {
    if (onTabPress) {
      onTabPress(tab);
    } else {
      setInternalActiveTab(tab);
    }
  };

  return (
    <View style={[styles.monthTabs, containerStyle]}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <TouchableOpacity
            key={tab}
            style={[styles.monthTabContainer, tabContainerStyle]}
            onPress={() => handleTabPress(tab)}
          >
            <View style={styles.tabContent}>
              <ThemedText
               style={[
                styles.monthTab,
                tabTextStyle,
                isActive && activeTabTextStyle,
              ]}
              
              >
                {tab}
              </ThemedText>
              {isActive && (
                <View style={[styles.customUnderline, underlineStyle]} />
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};


// Styles
const styles = StyleSheet.create({
  monthTabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaleHeight(10),
    borderRadius: scaleWidth(4),
    padding: scaleWidth(7),
backgroundColor: customColors.backgroundLight, 
  },
  monthTabContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: scaleHeight(4),
    paddingHorizontal: scaleWidth(8),
  },
  tabContent: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  customUnderline: {
    position: 'absolute',
    bottom: -5, // Slightly below the text
    width: '20%', // Slightly shorter than before (reduced from 60%)
    height: 4, // Bold underline thickness
    backgroundColor: customColors.accent, // Highlight color
    borderRadius: 3,
  },
  monthTab: {
    fontSize: scaleFont(14),
    // color: customColors.textLightPrimary,
    fontWeight: 'bold',
  },
  activeText: {
    color: customColors.accent, // or whatever you want
  },
  
});

export default UnderlinedTabSelector;
// customColors.backgroundLight,