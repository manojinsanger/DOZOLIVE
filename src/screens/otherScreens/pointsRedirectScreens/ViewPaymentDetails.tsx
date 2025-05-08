import React, { useState, useEffect, useRef, JSX } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/profile/CustomHeader';
import { useRoute, RouteProp } from '@react-navigation/native';
import { goBack } from '@/utils/navigationService';
import ThemedText from '@/components/ThemedText';

const { width } = Dimensions.get('window');

// Define route param types
type RouteParams = {
  method: PaymentMethod;
};

// Define all payment methods as a union type
type PaymentMethod =
  | 'usdt' | 'bank_india' | "easypaisa" | 'epay' | 'upi' | 'pakistan_bank'
  | 'jazzcash' | 'easypaisa' | 'bkash' | 'rocket' | 'nepal_bank'
  | 'payoneer' | 'khalti' | 'imepay' | 'moru' | 'gopay'
  | 'sea_bank' | 'uk_bank' | 'egypt_bank' | 'etisalat_cash'
  | 'orange_cash' | 'wecash' | 'instapay' | 'vodafone_cash' | 'esewa' | 'nagad';

// Define form field types
interface FormState {
  [key: string]: string;
}

// Types for field configuration
type FieldConfig = {
  label: string;
  field: string;
  placeholder: string;
};

type NoticeConfig = {
  notice: string;
};

type ConfigItem = FieldConfig | NoticeConfig;

// Type guard to check if a config item is a field
const isField = (item: ConfigItem): item is FieldConfig => {
  return 'field' in item;
};

// Type guard to check if a config item is a notice
const isNotice = (item: ConfigItem): item is NoticeConfig => {
  return 'notice' in item;
};

// Type for method configuration map
type MethodConfigMap = {
  [key in PaymentMethod]?: ConfigItem[];
};

const ViewPaymentDetails: React.FC = () => {
  const [form, setForm] = useState<FormState>({});
  const scrollAnim = useRef(new Animated.Value(0)).current;
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const { method } = route.params;

  const handleChange = (field: string, value: string): void => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    // Animation for the disclaimer text
    Animated.loop(
      Animated.sequence([
        Animated.timing(scrollAnim, {
          toValue: -width,
          duration: 12000,
          useNativeDriver: true,
        }),
        Animated.timing(scrollAnim, {
          toValue: width,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    return () => scrollAnim.stopAnimation();
  }, [scrollAnim]);

  // Define field configurations for different payment methods
  const methodConfigs: MethodConfigMap = {
    usdt: [
      { label: 'Contract address', field: 'contractAddress', placeholder: 'Enter address' },
      { notice: "Please make sure that your Epay account has been authenticated before withdrawing money, otherwise the withdrawal will not be successful,starting from Februray 26, 2024, when you cash out funds from Epay, a handling fee of US$1 will be charged for each withdrawal order." }
    ],
    bank_india: [
      { label: 'Full Name', field: 'fullName', placeholder: "Please Input Payee's Full Name" },
      { label: 'Bank', field: 'bank', placeholder: 'HDFC' },
      { label: 'Bank IFSC Code', field: 'ifscCode', placeholder: 'Please enter' },
      { label: 'Bank Account Number', field: 'accountNumber', placeholder: "Payee's Bank Account Number" },
      { label: 'UPI number', field: 'upi', placeholder: 'opinion B for withdrawal' }
    ],
    epay: [
      { label: 'Account ID', field: 'accountId', placeholder: 'Enter Account ID' }
    ],
    upi: [
      { label: 'UPI Number', field: 'upi', placeholder: 'Enter UPI Number' }
    ],
    pakistan_bank: [
      { label: 'Full Name', field: 'fullName', placeholder: "Please Input Payee's Full Name" },
      { label: 'Bank', field: 'bank', placeholder: "Payee's Account Registered Bank" },
      { label: 'Bank Account Number', field: 'accountNumber', placeholder: "Payee's Bank Account Number" },
      { label: 'IBAN', field: 'iban', placeholder: 'Please enter' }
    ],
    jazzcash: [
      { label: 'Phone Number', field: 'phoneNumber', placeholder: "Please Input Payee's Full Name" },
      { label: "Payee's Account Registered Phone Number", field: 'registeredPhone', placeholder: "Payee's Bank Account Number" },
      { notice: "Please note that Phone Number should be 11 digits." }
    ],
    easypaisa: [
      { label: 'Phone Number', field: 'phoneNumber', placeholder: "Please Input Payee's Full Name" },
      { label: "Payee's Account Registered Phone Number", field: 'registeredPhone', placeholder: "Payee's Bank Account Number" },
      { notice: "Please note that Phone Number should be 11 digits." }
    ],
    esewa: [
      { label: "First Name/Given Name", field: "firstName", placeholder: "Payee's First Name/Given Name" },
      { label: "Last Name/Surname", field: "lastName", placeholder: "Payee's Last Name/Surname" },
      { label: 'Account Information', field: 'accountInfo', placeholder: "9xxxxxxxx" }
    ],
    bkash: [
      { label: 'Bkash ID', field: 'bkashId', placeholder: "Payee's Account Information" },
      { notice: "Bkash ID should be 11 digits. (01xxxxxxxx)" }
    ],
    nagad: [
      { label: 'NAGAD ID', field: 'nagadId', placeholder: "Please enter" },
    ],
    rocket: [
      { label: 'Rocket ID', field: 'rocketId', placeholder: "Please enter" }
    ],
    nepal_bank: [
      { label: 'Bank', field: 'bank', placeholder: "Payee's Account Registered Bank" },
      { label: 'Full Name', field: 'fullName', placeholder: "Please Input Payee's Full Name" },
      { label: 'Phone Number', field: 'phoneNumber', placeholder: "Please Input Payee's Full Name" },
      { label: 'Branch', field: 'branch', placeholder: "Please enter" },
      { label: 'Bank Account Number', field: 'accountNumber', placeholder: "Payee's Bank Account Number" },
      { notice: "Tips: Laxmi Sunrise bank is suggested to use for better Experience" }
    ],
    payoneer: [
      { label: 'First Name/Given Name', field: 'firstName', placeholder: "Please enter" },
      { label: 'Account', field: 'account', placeholder: "Eg:xxxx@gmail.com" },
      { notice: "No Payoneer account register>>" }
    ],
    khalti: [
      { label: 'First Name', field: 'firstName', placeholder: "Please enter" },
      { label: 'Account Information', field: 'accountInfo', placeholder: "9xxxxxxxx" }
    ],
    imepay: [
      { label: 'First Name', field: 'firstName', placeholder: "Please enter" },
      { label: 'Account Information', field: 'accountInfo', placeholder: "9xxxxxxxx" }
    ],
    moru: [
      { label: 'First Name', field: 'firstName', placeholder: "Please enter" },
      { label: 'Account Information', field: 'accountInfo', placeholder: "9xxxxxxxx" }
    ],
    gopay: [
      { label: 'DANA/GoPay/OVO/Shopee', field: 'paymentType', placeholder: "DANA/GoPay/OVO/Shopee" },
      { label: 'Full Name', field: 'fullName', placeholder: "Please Input Payee's Full Name" },
      { label: 'Account Information', field: 'accountInfo', placeholder: "9xxxxxxxx" }
    ],
    sea_bank: [
      { label: 'Full Name', field: 'fullName', placeholder: "Please Input Payee's Full Name" },
      { label: "Payee's Account Number", field: 'accountNumber', placeholder: "Payee's Bank Account Number" },
      { notice: "1. The first letter of full name should be capitalized, like Dewi Kartika, Adi Santoso, etc.\n2. Bank Account Number should be 12 digits." }
    ],
    uk_bank: [
      { label: 'Name', field: 'name', placeholder: "Company name not available" },
      { label: 'Account number', field: 'accountNumber', placeholder: "GBxxxxxxxxxxxxxxxx" },
      { label: 'Bank code', field: 'bankCode', placeholder: "SWIFT code" },
      { label: 'PayeePostCode', field: 'postCode', placeholder: "Post Code" },
      { label: 'Contact address', field: 'contactAddress', placeholder: "Payee's Account Registered Address" }
    ],
    egypt_bank: [
      { label: "First Name/Given Name", field: "firstName", placeholder: "Payee's First Name/Given Name" },
      { label: "Last Name/Surname", field: "lastName", placeholder: "Payee's Last Name/Surname" },
      { label: "Bank", field: "bank", placeholder: "Payee's Account Registered Bank" },
      { label: 'Account number', field: 'accountNumber', placeholder: "GBxxxxxxxxxxxxxxxx" },
      { label: 'Bank code', field: 'bankCode', placeholder: "SWIFT code" },
    ],
    etisalat_cash: [
      { label: 'Full Name', field: 'fullName', placeholder: "Please Input Payee's Full Name" },
      { label: 'Phone Number', field: 'phoneNumber', placeholder: "Payee's Account Registered Phone Number" },
      { notice: "Please note that Phone Number should be 11 digits starting with 01XXXXXXXXX." },
      { 
        notice: "Refer to The Template:\nFull Name: السيد محمود محمد أحمد\nPhone Number: 01XXXXXXXXX\n\nThe above information is only for reference" 
      }
    ],
    wecash: [
      { label: 'Full Name', field: 'fullName', placeholder: "Please enter" },
      { label: 'Phone Number', field: "phoneNumber", placeholder: "Payee's account Registerd Phone Number" },
    ],
    instapay: [
      { label: 'Full Name', field: 'fullName', placeholder: "Please Input Payee's Full Name" },
      { label: 'Account Information', field: "accountInformation", placeholder: "Payee's Account information" },
    ],
    vodafone_cash: [
      { label: 'Full Name', field: 'fullName', placeholder: "Please Input Payee's Full Name" },
      { label: 'Phone Number', field: 'phoneNumber', placeholder: "Payee's Account Registered Phone Number" },
      { 
        notice: "\nFull Name: السيد محمود محمد أحمد\nPhone Number: 01XXXXXXXXX\n\nThe above information is only for reference" 
      }
    ]
  };

  const renderForm = (): JSX.Element => {
    const config = methodConfigs[method as PaymentMethod] || [];

    if (config.length === 0) {
      return <ThemedText>Invalid method</ThemedText>;
    }

    return (
      <View>
        {config.map((item, index) => {
          if (isNotice(item)) {
            return (
              <View key={`notice-${index}`} style={styles.notice}>
                <ThemedText style={{ color: 'black', fontWeight: 'bold' }}>Notice:</ThemedText>
                <ThemedText>{item.notice}</ThemedText>
              </View>
            );
          } else if (isField(item)) {
            return (
              <View key={`field-${item.field}`} style={styles.inputRow}>
                <ThemedText style={styles.label} >
                  {item.label}
                </ThemedText>
                <TextInput
                  style={styles.inputField}
                  value={form[item.field] || ''}
                  onChangeText={text => handleChange(item.field, text)}
                  placeholder={item.placeholder}
                />
              </View>
            );
          }
          return null;
        })}
      </View>
    );
  };

  const handleSubmit = (): void => {
    console.log('Bind Data:', form);
    goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Bind" />

      <View style={styles.disclaimerContainer}>
        <Animated.Text
          style={[
            styles.disclaimerText,
            { transform: [{ translateX: scrollAnim }] },
          ]}>
          Fill in the correct account information, or your withdrawal will be affected.
        </Animated.Text>
      </View>

      <View style={styles.formContainer}>
        {renderForm()}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <ThemedText style={styles.buttonText}>Submit</ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ViewPaymentDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  disclaimerContainer: {
    backgroundColor: '#FFF3CD',
    paddingVertical: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  disclaimerText: {
    color: '#856404',
    fontSize: 14,
    fontWeight: '400',
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  label: {
    fontWeight: '400',
    color: '#333333',
    flex: 1,
    fontSize: 14,
  },
  inputField: {
    flex: 2,
    fontSize: 14,
    textAlign: 'right',
    color: '#888888',
  },
  notice: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  button: {
    marginTop: 40,
    backgroundColor: '#6750FF',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});