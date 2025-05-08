import React from 'react';
import { StyleSheet, View } from 'react-native';
import ThemedText from '../ThemedText';
import { StatItemProps } from '@/types/types';
import customColors from '@/constants/styles';

const StatItem: React.FC<StatItemProps> = ({ label, value, color = customColors.gray800 }) => {
  return (
    <View style={styles.statItem}>
      <ThemedText style={[styles.statValue, { color }]}>
        {value}
      </ThemedText>
      <ThemedText style={[styles.statLabel, { color }]}>
        {label}
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
  },
});

export default StatItem;
