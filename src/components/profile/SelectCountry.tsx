import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal, Image, Platform } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import customColors from '@/constants/styles';
import { scaleFont, scaleWidth, scaleHeight } from '@/constants/scaling';
import ThemedText from '../ThemedText';
import { Dimensions } from 'react-native';
import countries from '@/utils/countries';
export interface Country {
  name: string;
  code: string;
}

interface CountrySelectorProps {
  selectedCountry: Country;
  onCountryChange: (country: Country) => void;
  countries?: Country[];
  isVisible: boolean;
  onClose: () => void;
}


const defaultCountries: Country[] = [
  { name: 'India', code: 'IN' },
  { name: 'USA', code: 'US' },
  { name: 'UK', code: 'GB' },
  { name: 'Canada', code: 'CA' },
  { name: 'Germany', code: 'DE' },
  { name: 'France', code: 'FR' },
  { name: 'Japan', code: 'JP' },
  { name: 'Australia', code: 'AU' },
  { name: 'China', code: 'CN' },
];

const getFlagUrl = (code: string) => `https://flagcdn.com/w40/${code.toLowerCase()}.png`;


const CountrySelector: React.FC<CountrySelectorProps> = ({
  selectedCountry,
  onCountryChange,
  countries = defaultCountries,
  onClose,
  isVisible
}) => {

  countries = countries.length === 0 ? defaultCountries : countries;

  return (
    <>
      <Modal
        transparent={true}
        visible={isVisible}
        animationType="slide"
        onRequestClose={onClose}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={onClose}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modalContainer}
            onPress={() => { }} // Prevents propagation to outer TouchableOpacity
          >
            <ThemedText style={styles.modalTitle}>Select Country</ThemedText>
            <FlatList
              data={countries}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.countryItem}
                  onPress={() => {
                    onCountryChange(item);
                    onClose(); // 👈 Make sure you call onClose here too!
                  }}
                >
                  <View style={styles.countryRow}>
                    <Image source={{ uri: getFlagUrl(item.code) }} style={styles.flagIcon} />
                    <ThemedText style={styles.countryText}>{item.name}</ThemedText>
                  </View>
                  <MaterialIcons name="chevron-right" size={24} color={customColors.textLightSecondary} />
                </TouchableOpacity>
              )}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(5),
    paddingVertical: scaleHeight(5),
    backgroundColor: customColors.gray100,
    borderRadius: scaleWidth(20),
  },
  flagIcon: {
    width: scaleWidth(20),
    height: scaleWidth(20),
    borderRadius: scaleWidth(12.5),
    marginRight: scaleWidth(5),
  },
  headerText: {
    fontSize: scaleFont(14),
    fontWeight: '500',
    color: customColors.textLightPrimary,
    marginRight: scaleWidth(5),
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: customColors.white,
    borderTopLeftRadius: scaleWidth(20),
    borderTopRightRadius: scaleWidth(20),
    paddingBottom: scaleHeight(20),
    paddingHorizontal: scaleWidth(15),
    paddingTop: scaleHeight(10),
    maxHeight: countries.length * scaleHeight(50) + scaleHeight(30), // Adjust based on item height
  },
  modalTitle: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    marginBottom: scaleHeight(10),
    textAlign: 'center',
    color: customColors.textLightPrimary,
  },
  countryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scaleHeight(12),
    paddingHorizontal: scaleWidth(15),
    borderBottomWidth: 1,
    borderBottomColor: customColors.gray200,
  },
  countryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryText: {
    fontSize: scaleFont(14),
    marginLeft: scaleWidth(10),
    color: customColors.textLightPrimary,
    fontWeight: '500',
  },
});

export default CountrySelector;