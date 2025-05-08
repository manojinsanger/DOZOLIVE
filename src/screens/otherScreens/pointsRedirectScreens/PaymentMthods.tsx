import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { scaleWidth, scaleHeight, scaleFont } from '@/constants/scaling';
import epaylogo from '@/assets/images/profile_assets/epay_logo.png';
import usdtIcon from '@/assets/images/profile_assets/usdt.png';
import cashTransfer from '@/assets/images/profile_assets/cash-flow.png';
import upiIcon from '@/assets/images/profile_assets/upi.png';
import esewaIcon from '@/assets/images/profile_assets/esewa.png';
import payoneer from '@/assets/images/profile_assets/payoneer.jpeg';
import khalti from '@/assets/images/profile_assets/khalti.png';
import imepay from '@/assets/images/profile_assets/imepay.png';
import moru from '@/assets/images/profile_assets/moru.png';
import jazzcash from '@/assets/images/profile_assets/jazz.jpeg';
import easypaisa from '@/assets/images/profile_assets/easypaisa.jpeg';
import bkash from '@/assets/images/profile_assets/bkash.png';
import nagad from '@/assets/images/profile_assets/nagad.jpeg';
import rocket from '@/assets/images/profile_assets/rocket.png';
import gopay from '@/assets/images/profile_assets/gopay.jpeg';
import seapay from '@/assets/images/profile_assets/sea.jpeg';
import etisalat from '@/assets/images/profile_assets/etisalat.jpeg';
import orangeCashPay from '@/assets/images/profile_assets/orange.png';
import wepay from '@/assets/images/profile_assets/wepay.png';
import instapay from '@/assets/images/profile_assets/instapay.png';
import vodaphone from '@/assets/images/profile_assets/vodaphone.jpeg';
import CustomHeader from '@/components/profile/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PaymentMethod } from '@/types/types';
import { redirect } from '@/utils/navigationService';
import CountrySelector, { Country } from '@/components/profile/SelectCountry';
import SelectCountryButton from '@/components/profile/SelectCountryButton';

const countries: Country[] = [
  { name: 'India', code: 'IN' },
  { name: 'Bangladesh', code: 'BD' },
  { name: 'Pakistan', code: 'PK' },
  { name: 'Nepal', code: 'NP' },
  { name: 'Indonesia', code: 'ID' },
  { name: 'United Kingdom', code: 'GB' },
  { name: 'Egypt', code: 'EG' },
];

// Define all payment methods with country codes where they're available
const allPaymentMethods: PaymentMethod[] = [
  {
    id: 'epay',
    name: 'Epay',
    icon: epaylogo,
    fee: '10,000points',
    arrival: '1 hour',
    color: '#1137AF',
    identifier: 'uecoentertainment@gmail.com',
    withdrawalAmount: '',
    withdrawalPoints: '',
    country: ['IN', 'BD', 'PK', 'NP', 'ID', 'GB', 'EG'], // Available in all countries
    rules: {
      exchangeRate: '',
      minWithdrawal: '',
      maxWithdrawal: null,
      serviceFeeRates: [],
      withdrawalFrequency: null,
    },
  },
  {
    id: 'usdt',
    name: 'USDT-TRC20',
    icon: usdtIcon,
    fee: '1.5%',
    arrival: '1 hour',
    color: 'white',
    identifier: 'TRLACokJpEZCJS8HDDjRpTyBTbNtK...',
    withdrawalAmount: '',
    withdrawalPoints: '',
    country: ['IN', 'PK', 'ID', 'BD', 'GB', 'NP', 'EG'], // Available in India and Pakistan
    rules: {
      exchangeRate: '',
      minWithdrawal: '',
      maxWithdrawal: null,
      serviceFeeRates: [],
      withdrawalFrequency: null,
    },
  },
  {
    id: 'bank_india',
    name: 'India Bank Transfer',
    icon: cashTransfer,
    fee: '3%',
    arrival: '24 hours',
    color: 'white',
    identifier: '50200052760212',
    withdrawalAmount: '',
    withdrawalPoints: '',
    country: ['IN'], // Available only in India
    rules: {
      exchangeRate: '',
      minWithdrawal: '',
      maxWithdrawal: null,
      serviceFeeRates: [],
      withdrawalFrequency: null,
    },
  },
  {
    id: 'upi',
    name: 'UPI',
    icon: upiIcon,
    fee: '3%',
    arrival: '24 hours',
    color: 'white',
    identifier: '50200052760212',
    withdrawalAmount: '',
    withdrawalPoints: '',
    country: ['IN'], // Available only in India
    rules: {
      exchangeRate: '',
      minWithdrawal: '',
      maxWithdrawal: null,
      serviceFeeRates: [],
      withdrawalFrequency: null,
    },
  },
  // Bangladesh specific methods
  {
    id: 'bkash',
    name: 'Bkash',
    icon: bkash, // Add these images to your assets
    fee: '3%',
    arrival: '24 hours',
    color: 'white',
    identifier: '',
    withdrawalAmount: '',
    withdrawalPoints: '',
    country: ['BD'], // Available only in Bangladesh
    rules: {
      exchangeRate: '',
      minWithdrawal: '',
      maxWithdrawal: null,
      serviceFeeRates: [],
      withdrawalFrequency: null,
    },
  },
  {
    id: 'nagad',
    name: 'NAGAD',
    icon: nagad, // Add these images
    fee: '3%',
    arrival: '24 hours',
    color: 'white',
    identifier: '',
    withdrawalAmount: '',
    withdrawalPoints: '',
    country: ['BD'], // Available only in Bangladesh
    rules: {
      exchangeRate: '',
      minWithdrawal: '',
      maxWithdrawal: null,
      serviceFeeRates: [],
      withdrawalFrequency: null,
    },
  },
  {
    id: 'rocket',
    name: 'Rocket',
    icon: rocket, // Add these images
    fee: '3%',
    arrival: '24 hours',
    color: 'white',
    identifier: '',
    withdrawalAmount: '',
    withdrawalPoints: '',
    country: ['BD'], // Available only in Bangladesh
    rules: {
      exchangeRate: '',
      minWithdrawal: '',
      maxWithdrawal: null,
      serviceFeeRates: [],
      withdrawalFrequency: null,
    },
  },
  // Nepal specific methods
  {
    id: 'esewa',
    name: 'Esewa',
    icon: esewaIcon,
    fee: '3%',
    arrival: '24 hours',
    color: 'white',
    identifier: '',
    withdrawalAmount: '',
    withdrawalPoints: '',
    country: ['NP'], // Available only in Nepal
    rules: {
      exchangeRate: '',
      minWithdrawal: '',
      maxWithdrawal: null,
      serviceFeeRates: [],
      withdrawalFrequency: null,
    },
  },
  {
    id: 'nepal_bank',
    name: 'Nepal Bank Transfer',
    icon: cashTransfer,
    fee: '3%',
    arrival: '24 hours',
    color: 'white',
    identifier: '',
    withdrawalAmount: '',
    withdrawalPoints: '',
    country: ['NP'], // Available only in Nepal
    rules: {
      exchangeRate: '',
      minWithdrawal: '',
      maxWithdrawal: null,
      serviceFeeRates: [],
      withdrawalFrequency: null,
    },
  },
  {
    id: 'payoneer',
    name: 'Payoneer fast (USD)',
    icon: payoneer,
    fee: '10,000 Points',
    arrival: '24 hours',
    color: 'white',
    identifier: '',
    withdrawalAmount: '',
    withdrawalPoints: '',
    country: ['NP', 'GB'], // Available only in Nepal
    rules: {
      exchangeRate: '',
      minWithdrawal: '',
      maxWithdrawal: null,
      serviceFeeRates: [],
      withdrawalFrequency: null,
    },
  },
  {
    id: 'khalti',
    name: 'Khalti',
    icon: khalti,
    fee: '3%',
    arrival: '24 hours',
    color: 'white',
    identifier: '',
    withdrawalAmount: '',
    withdrawalPoints: '',
    country: ['NP'], // Available only in Nepal
    rules: {
      exchangeRate: '',
      minWithdrawal: '',
      maxWithdrawal: null,
      serviceFeeRates: [],
      withdrawalFrequency: null,
    },
  },
  {
    id: 'imepay',
    name: 'Imepay',
    icon: imepay,
    fee: '3%',
    arrival: '24 hours',
    color: 'white',
    identifier: '',
    withdrawalAmount: '',
    withdrawalPoints: '',
    country: ['NP'], // Available only in Nepal
    rules: {
      exchangeRate: '',
      minWithdrawal: '',
      maxWithdrawal: null,
      serviceFeeRates: [],
      withdrawalFrequency: null,
    },
  },
  {
    id: 'moru',
    name: 'Moru',
    icon: moru,
    fee: '3%',
    arrival: '24 hours',
    color: 'white',
    identifier: '',
    withdrawalAmount: '',
    withdrawalPoints: '',
    country: ['NP'], // Available only in Nepal
    rules: {
      exchangeRate: '',
      minWithdrawal: '',
      maxWithdrawal: null,
      serviceFeeRates: [],
      withdrawalFrequency: null,
    },
  },
  // Pakistan specific methods
  {
    id: 'pakistan_bank',
    name: 'Pakistan Bank Transfer',
    icon: cashTransfer,
    fee: '3%',
    arrival: '24 hours',
    color: 'white',
    identifier: '',
    withdrawalAmount: '',
    withdrawalPoints: '',
    country: ['PK'], // Available only in Pakistan
    rules: {
      exchangeRate: '',
      minWithdrawal: '',
      maxWithdrawal: null,
      serviceFeeRates: [],
      withdrawalFrequency: null,
    },
  },
  {
    id: 'uk_bank',
    name: 'Bank transfer(GBD)',
    icon: cashTransfer,
    fee: '3%',
    arrival: '24 hours',
    color: 'white',
    identifier: '',
    withdrawalAmount: '',
    withdrawalPoints: '',
    country: ['GB'], // Available only in Pakistan
    rules: {
      exchangeRate: '',
      minWithdrawal: '',
      maxWithdrawal: null,
      serviceFeeRates: [],
      withdrawalFrequency: null,
    },
  },
  {
    id: 'jazzcash',
    name: 'Jazzcash',
    icon: jazzcash,
    fee: '3%',
    arrival: '24 hours',
    color: 'white',
    identifier: '',
    withdrawalAmount: '',
    withdrawalPoints: '',
    country: ['PK'], // Available only in Pakistan
    rules: {
      exchangeRate: '',
      minWithdrawal: '',
      maxWithdrawal: null,
      serviceFeeRates: [],
      withdrawalFrequency: null,
    },
  },
  {
    id: 'easypaisa',
    name: 'Easypaisa',
    icon: easypaisa,
    fee: '3%',
    arrival: '24 hours',
    color: 'white',
    identifier: '',
    withdrawalAmount: '',
    withdrawalPoints: '',
    country: ['PK'], // Available only in Pakistan
    rules: {
      exchangeRate: '',
      minWithdrawal: '',
      maxWithdrawal: null,
      serviceFeeRates: [],
      withdrawalFrequency: null,
    },
  },
  {
    id: 'gopay',
    name: 'DANA/GoPay/OVO/Shopee',
    icon: gopay,
    fee: '2%',
    arrival: '24 hours',
    color: 'white',
    identifier: '',
    withdrawalAmount: '',
    withdrawalPoints: '',
    country: ['ID'], // Available only in Pakistan
    rules: {
      exchangeRate: '',
      minWithdrawal: '',
      maxWithdrawal: null,
      serviceFeeRates: [],
      withdrawalFrequency: null,
    },
  },
  {
    id: 'sea_bank',
    name: 'Sea Bank',
    icon: seapay,
    fee: '2%',
    arrival: '24 hours',
    color: 'white',
    identifier: '',
    withdrawalAmount: '',
    withdrawalPoints: '',
    country: ['ID'], // Available only in Pakistan
    rules: {
      exchangeRate: '',
      minWithdrawal: '',
      maxWithdrawal: null,
      serviceFeeRates: [],
      withdrawalFrequency: null,
    },
  },
  {
    id: 'egypt_bank',
    name: 'Egypt Bank Transfer',
    icon: cashTransfer,
    fee: '3~8%',
    arrival: '24 hours',
    color: 'white',
    identifier: '',
    withdrawalAmount: '',
    withdrawalPoints: '',
    country: ['EG'],
    rules: {
      exchangeRate: '',
      minWithdrawal: '',
      maxWithdrawal: null,
      serviceFeeRates: [],
      withdrawalFrequency: null,
    },
  },
  {
    id: 'etisalat_cash',
    name: 'Etisalat Cash',
    icon: etisalat,
    fee: '3~8%',
    arrival: '24 hours',
    color: 'white',
    identifier: '',
    withdrawalAmount: '',
    withdrawalPoints: '',
    country: ['EG'],
    rules: {
      exchangeRate: '',
      minWithdrawal: '',
      maxWithdrawal: null,
      serviceFeeRates: [],
      withdrawalFrequency: null,
    },
  },
  {
    id: 'orange_cash',
    name: 'Orange Cash',
    icon: orangeCashPay,
    fee: '3~8%',
    arrival: '24 hours',
    color: 'white',
    identifier: '',
    withdrawalAmount: '',
    withdrawalPoints: '',
    country: ['EG'],
    rules: {
      exchangeRate: '',
      minWithdrawal: '',
      maxWithdrawal: null,
      serviceFeeRates: [],
      withdrawalFrequency: null,
    },
  },
  {
    id: 'wecash',
    name: 'Wecash',
    icon: wepay,
    fee: '3~8%',
    arrival: '24 hours',
    color: 'white',
    identifier: '',
    withdrawalAmount: '',
    withdrawalPoints: '',
    country: ['EG'],
    rules: {
      exchangeRate: '',
      minWithdrawal: '',
      maxWithdrawal: null,
      serviceFeeRates: [],
      withdrawalFrequency: null,
    },
  },
  {
    id: 'instapay',
    name: 'Instapay',
    icon: instapay,
    fee: '3~8%',
    arrival: '24 hours',
    color: 'white',
    identifier: '',
    withdrawalAmount: '',
    withdrawalPoints: '',
    country: ['EG'],
    rules: {
      exchangeRate: '',
      minWithdrawal: '',
      maxWithdrawal: null,
      serviceFeeRates: [],
      withdrawalFrequency: null,
    },
  },
  {
    id: 'vodafone_cash',
    name: 'Vodafone cash-EGP',
    icon: vodaphone,
    fee: '3~8%',
    arrival: '24 hours',
    color: 'white',
    identifier: '',
    withdrawalAmount: '',
    withdrawalPoints: '',
    country: ['EG'],
    rules: {
      exchangeRate: '',
      minWithdrawal: '',
      maxWithdrawal: null,
      serviceFeeRates: [],
      withdrawalFrequency: null,
    },
  },

];

const PaymentMethodScreen = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    code: "IN",
    name: "India"
  });
  const [activeMethod, setActiveMethod] = useState('epay');
  const [isCountryModalVisible, setCountryModalVisible] = useState(false);

  // Filter payment methods based on the selected country
  const filteredPaymentMethods = allPaymentMethods.filter(method =>
    (method.country ?? []).includes(selectedCountry.code)
  );

  // Method to render payment method items
  const renderPaymentMethod = (method: PaymentMethod) => {
    // Determine if button should be "View" or "Bind"
    const isView = false;

    return (
      <TouchableOpacity
        onPress={() => {
          redirect('withdrawnow', { id: method.id });
          setActiveMethod(method.id);
        }}
        key={method.id}
        style={[
          styles.paymentMethodItem,
          {
            borderColor: activeMethod === method.id ? '#304FFE' : 'white',
            backgroundColor:
              activeMethod === method.id ? 'transparent' : 'white',
          },
        ]}>
        <View style={styles.paymentMethodLeft}>
          <View style={[styles.logoContainer, { backgroundColor: method.color }]}>
            <Image
              source={method.icon}
              style={[styles.logo]}
              resizeMode="contain"
            />
          </View>

          <View style={styles.methodInfoContainer}>
            <Text style={styles.methodName}>{method.name}</Text>
            <View style={styles.methodDetails}>
              <View style={styles.methodTag}>
                <Text style={styles.methodTagText}>Fee: {method.fee}</Text>
              </View>

              <View style={styles.methodTag}>
                <Text style={styles.methodTagText}>
                  Arrival: {method.arrival}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() =>
            redirect('viewpaymentdetails', { method: method.id })
          }
          style={[
            styles.actionButton,
            isView ? styles.viewButton : styles.bindButton,
          ]}>
          <Text
            style={[
              styles.actionButtonText,
              isView ? styles.viewButtonText : styles.bindButtonText,
            ]}>
            {isView ? 'View' : 'Bind'}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  // Handle country change
  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country);
    // Reset active method when country changes
    if (filteredPaymentMethods.length > 0) {
      setActiveMethod(filteredPaymentMethods[0].id);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <View style={styles.header}>
        <CustomHeader
          title="Methods"
          rightHeader={
            <SelectCountryButton
              onVisible={() => setCountryModalVisible(true)}
              name={selectedCountry.name}

            />
          }
        />
      </View>

      {/* Payment Methods List */}
      <View style={styles.paymentMethodsContainer}>
        {filteredPaymentMethods.map(method => renderPaymentMethod(method))}
      </View>

      {/* Preferred payment note */}
      <TouchableOpacity style={styles.preferredNote}>
        <Text style={styles.preferredNoteText}>
          My most preferred way to receive payment
        </Text>
        <Ionicons name="chevron-forward" size={20} color="#304FFE" />
      </TouchableOpacity>

      <CountrySelector
        onCountryChange={handleCountryChange}
        selectedCountry={selectedCountry}
        countries={countries}
        isVisible={isCountryModalVisible}
        onClose={() => setCountryModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    backgroundColor: '#ffffff',
  },
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
  paymentMethodsContainer: {
    paddingHorizontal: scaleWidth(18),
    paddingTop: scaleHeight(16),
  },
  paymentMethodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scaleHeight(8),
    paddingHorizontal: scaleWidth(16),
    borderWidth: 2,
    borderRadius: scaleWidth(12),
    marginBottom: scaleHeight(12),
    backgroundColor: 'white',
  },
  paymentMethodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    width: scaleWidth(30),
    height: scaleWidth(30),
    borderRadius: scaleWidth(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scaleWidth(12),
  },
  logo: {
    width: scaleWidth(24),
    height: scaleWidth(24),
  },
  logoText: {
    fontSize: scaleFont(14),
    fontWeight: '700',
  },
  creditCardIcon: {
    width: scaleWidth(24),
    height: scaleWidth(18),
    backgroundColor: '#000000',
    borderRadius: scaleWidth(3),
    justifyContent: 'center',
    padding: scaleWidth(2),
  },
  creditCardStripe: {
    height: scaleHeight(4),
    backgroundColor: '#FFFFFF',
    borderRadius: scaleWidth(1),
  },
  methodInfoContainer: {
    flexDirection: 'column',
  },
  methodName: {
    fontSize: scaleFont(14),
    fontWeight: '500',
    color: '#000000',
    marginBottom: scaleHeight(4),
  },
  methodDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodDetailsSeparator: {
    fontSize: scaleFont(12),
    color: '#757575',
    marginHorizontal: scaleWidth(4),
  },
  actionButton: {
    paddingHorizontal: scaleWidth(12),
    paddingVertical: scaleHeight(6),
    borderRadius: scaleWidth(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewButton: {
    backgroundColor: 'rgba(134, 152, 252, 0.1)',
  },
  bindButton: {
    backgroundColor: '#304FFE',
    fontSize: scaleFont(12),
  },
  actionButtonText: {
    fontSize: scaleFont(14),
    fontWeight: '500',
  },
  viewButtonText: {
    color: '#304FFE',
    fontSize: scaleFont(12),
  },
  bindButtonText: {
    color: '#FFFFFF',
  },
  preferredNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleWidth(16),
    paddingVertical: scaleHeight(16),
  },
  preferredNoteText: {
    fontSize: scaleFont(14),
    color: '#304FFE',
  },
  methodDetails: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  methodTag: {
    backgroundColor: '#EEEEF5',
    paddingHorizontal: scaleWidth(6),
    paddingVertical: scaleHeight(2),
    borderRadius: 6,
    marginRight: 8,
  },
  methodTagText: {
    fontSize: scaleFont(10),
    color: '#5C6BC0',
  },
});

export default PaymentMethodScreen;