import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import ThemedText from '@/components/ThemedText';
import {StatsCardProps} from '@/types/types';
import customColors from '@/constants/styles';

export const StatsCard: React.FC<StatsCardProps> = ({
  name,
  value,
  icon,
  onPress,
  iconWidth = 24,
  iconHeight = 24,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.cardContainer,
        {
          backgroundColor: customColors.white,
          shadowColor: customColors.gray200,
        },
      ]}>
      <View style={styles.textContainer}>
        <ThemedText style={[styles.statName, {color: customColors.gray900}]}>
          {name}
        </ThemedText>
        <View style={styles.valueContainer}>
          <Image
            source={icon}
            style={[styles.icon, {width: iconWidth, height: iconHeight}]}
          />
          <ThemedText style={[styles.statValue, {color: customColors.gray800}]}>
            {value}
          </ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 12,
    paddingVertical: 10,
    borderRadius: 7,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    flex: 1,
  },
  textContainer: {
    flex: 1,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
    resizeMode: 'contain',
  },
  statName: {
    fontSize: 14,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 700,
  },
});

export default StatsCard;
