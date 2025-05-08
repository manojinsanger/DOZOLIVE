import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scaleFont, scaleWidth } from '@/constants/scaling';
import ThemedText from '../ThemedText';

interface CountryProps {
    onVisible: () => void,
    name: string,
    color?: string,
    size?: number,
    code?: string,
}

const getFlagUrl = (code: string) =>
    `https://flagcdn.com/w40/${code.toLowerCase()}.png`;

const SelectCountryButton: React.FC<CountryProps> = ({ onVisible, name, color = "#000", size = 16, code }) => {
    return (
        <TouchableOpacity
            style={styles.countrySelector}
            onPress={onVisible}
        >
             <View style={styles.countryRow}>
                    {code ? (
                        <Image source={{ uri: getFlagUrl(code) }} style={styles.flagIcon} />
                    ) : null}
                    <ThemedText style={[styles.iconText, {color}]}>{name}</ThemedText>
                  </View>
            <Ionicons name="chevron-down" size={16} color={color} />
        </TouchableOpacity>
    )
}

export default SelectCountryButton

const styles = StyleSheet.create({
    countrySelector: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    countrySelectorText: {
        fontSize: scaleFont(16),
        fontWeight: '500',
        color: '#000000',
        marginRight: scaleWidth(4),
    },
    countrySelectorIcon: {
        fontSize: scaleFont(12),
        color: '#000000',
    },
  iconText: {
   color: 'white',
   marginRight:3
  },
      flagIcon: {
        width: scaleWidth(20),
        height: scaleWidth(20),
        borderRadius: scaleWidth(12.5),
        marginRight: scaleWidth(5),
      },
   
      modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },

      countryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
      },
   
})