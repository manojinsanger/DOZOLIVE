import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import customColors from '@/constants/styles';
import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';

// Define the props interface
interface TabSelectorProps {
  tabs: string[]; // Array of tab labels
  onTabPress?: (tab: string) => void; // Optional callback for external state management
  activeTab?: string | null; // Updated to accept string | null
  containerStyle?: object; // Optional custom container style
}

// Reusable TabSelector component
const TabSelector: React.FC<TabSelectorProps> = ({
  tabs,
  onTabPress,
  activeTab: externalActiveTab,
  containerStyle,
}) => {
  // Internal state for active tab if no external state is provided
  const [internalActiveTab, setInternalActiveTab] = useState<string | null>(null);
  const activeTab = externalActiveTab !== undefined ? externalActiveTab : internalActiveTab;

  // Handle tab press
  const handleTabPress = (tab: string) => {
    if (onTabPress) {
      onTabPress(tab);
    } else {
      setInternalActiveTab(tab);
    }
  };

  return (
    <View style={[styles.monthTabs, containerStyle]}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.monthTabContainer,
            activeTab === tab && styles.monthTabActive,
          ]}
          onPress={() => handleTabPress(tab)}
        >
          <Text style={styles.monthTab}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  monthTabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaleHeight(8),
    borderWidth: 1,
    borderColor: customColors.textLightTertiary,
    borderRadius: scaleWidth(4),
    padding: scaleWidth(4),
    backgroundColor: '#fff',
  },
  monthTabContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: scaleHeight(4),
    paddingHorizontal: scaleWidth(8),
  },
  monthTabActive: {
    borderWidth: 1,
    borderColor: '#ff9800', // Highlight color (matches notice color in attachment)
    borderRadius: scaleWidth(4),
    backgroundColor: '#fff3e0', // Light background for active state
    elevation: 4, // Adds a shadow effect for highlight
  },
  monthTab: {
    fontSize: scaleFont(14),
    color: customColors.textLightPrimary,
    fontWeight: 'bold',
  },
});

export default TabSelector;