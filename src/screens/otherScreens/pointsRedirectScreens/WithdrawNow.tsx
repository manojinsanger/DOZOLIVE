import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PointButton from '@/components/profile/PointButton';
import CustomHeader from '@/components/profile/CustomHeader';
import BeanIcon from '@/assets/images/profile_assets/pointsIcon.png';
import epay from '@/assets/images/profile_assets/epay_logo.png';
import usdt from '@/assets/images/profile_assets/usdt.png';
import bankTransfer from '@/assets/images/profile_assets/cash-flow.png';
import upi from '@/assets/images/profile_assets/upi.png';
import {PaymentMethod, PaymentMethodKey} from '@/types/types';
import dataTransferIcon from '@/assets/images/icon/datatransfer.png';
import {useRoute} from '@react-navigation/native';
import {redirect} from '@/utils/navigationService';


// Update the default payment methods to include all rules
const defaultPaymentMethods = {
  epay: {
    name: 'Epay',
    icon: epay,
    fee: '10,000points',
    arrival: '1 hour',
    identifier: 'uecoentertainment@gmail.com',
    id: 'epay',
    withdrawalAmount: '$27.01',
    withdrawalPoints: '0',
    rules: {
      exchangeRate: '10,000 = ₹88.00',
      minWithdrawal: '$10',
      maxWithdrawal: null,
      serviceFeeRates: [
        {range: '0 ≤ Points ≤ 4,294,967,295', fee: '10000.00 Points'},
      ],
      withdrawalFrequency: null,
    },
  },
  usdt: {
    name: 'USDT-TRC20',
    icon: usdt,
    fee: '1.5%',
    arrival: '1 hour',
    identifier: 'TRLACokJpEZCJS8HDDjRpTyBTbNtK...',
    id: 'usdt',
    withdrawalAmount: '$27.01',
    withdrawalPoints: '0',
    rules: {
      exchangeRate: '10,000 = ₹88.00',
      minWithdrawal: 'Subject to specific tip',
      maxWithdrawal: null,
      serviceFeeRates: [{range: '0 ≤ Points ≤ 4,294,967,295', fee: '1.50%'}],
      withdrawalFrequency: {
        range: '3 ≤ Times ≤ 4,294,967,295',
        fee: '10000.00 Points',
      } as {range: string; fee: string},
    },
  },
  bank: {
    name: 'India Bank Transfer',
    icon: bankTransfer,
    fee: '3%',
    arrival: '24 hours',
    identifier: '50200052760212',
    id: 'bank',
    withdrawalAmount: '$27.01',
    withdrawalPoints: '0',
    rules: {
      exchangeRate: '10,000 = ₹88.00',
      minWithdrawal: '$10',
      maxWithdrawal: '$2,000',
      serviceFeeRates: [
        {range: '0 ≤ Points ≤ 200,000', fee: '10.00%'},
        {range: '200,001 ≤ Points ≤ 500,000', fee: '8.00%'},
        {range: '500,001 ≤ Points ≤ 2,000,000', fee: '5.00%'},
        {range: '2,000,001 ≤ Points ≤ 4,294,967,295', fee: '3.00%'},
      ],
      withdrawalFrequency: null as {range: string; fee: string} | null, // Not shown in the Bank Transfer screenshot
    },
  },
  upi: {
    name: 'UPI',
    icon: upi,
    fee: '3%',
    arrival: '24 hours',
    identifier: '50200052760212',
    id: 'bank',
    withdrawalAmount: '$27.01',
    withdrawalPoints: '0',
    rules: {
      exchangeRate: '10,000 = ₹88.00',
      minWithdrawal: '$10',
      maxWithdrawal: '$2,000',
      serviceFeeRates: [
        {range: '0 ≤ Points ≤ 200,000', fee: '10.00%'},
        {range: '200,001 ≤ Points ≤ 500,000', fee: '8.00%'},
        {range: '500,001 ≤ Points ≤ 2,000,000', fee: '5.00%'},
        {range: '2,000,001 ≤ Points ≤ 4,294,967,295', fee: '3.00%'},
      ],
      withdrawalFrequency: null as {range: string; fee: string} | null, // Not shown in the Bank Transfer screenshot
    },
  },
};

const WithdrawNowScreen: React.FC = () => {
  const [paymentMethodData, setPaymentMethodData] = useState<PaymentMethod>(
    defaultPaymentMethods.epay,
  );

  const route = useRoute();
  const {id} = route.params as {id: string};

  useEffect(() => {
    if (id && typeof id === 'string') {
      const method = defaultPaymentMethods[id as PaymentMethodKey];
      if (!method) {
        setPaymentMethodData(defaultPaymentMethods.epay);
      } else {
        setPaymentMethodData(method);
      }
    }
  }, [id]);

  // Render service fee rates table rows
  const renderServiceFeeRows = () => {
    return paymentMethodData.rules?.serviceFeeRates.map((rate, index) => (
      <View style={styles.tableRow} key={`fee-rate-${index}`}>
        <View style={styles.tableCell}>
          <Text style={styles.tableCellText}>
            {rate.range.split('Points').map((part, index) => (
              <React.Fragment key={index}>
                {part}
                {index < rate.range.split('Points').length - 1 && (
                  <Image style={styles.pointIcon} source={BeanIcon} />
                )}
              </React.Fragment>
            ))}
          </Text>
        </View>
        <View style={[styles.tableCell, styles.tableCellRight]}>
          <Text style={styles.tableCellText}>{rate.fee}</Text>
        </View>
      </View>
    ));
  };

  // Render withdrawal frequency table if available
  const renderWithdrawalFrequency = () => {
    if (!paymentMethodData.rules?.withdrawalFrequency) {
      return null;
    }

    return (
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCell}>
            <Text style={styles.tableCellText}>Number of withdrawals</Text>
          </View>
          <View style={[styles.tableCell, styles.tableCellRight]}>
            <Text style={styles.tableCellText}>Service fee</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCell}>
            <Text style={styles.tableCellText}>
              {paymentMethodData.rules?.withdrawalFrequency.range}
            </Text>
          </View>
          <View style={[styles.tableCell, styles.tableCellRight]}>
            <Text style={styles.tableCellText}>
              {paymentMethodData.rules?.withdrawalFrequency.fee}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title="Withdraw"
        rightHeader="Record"
        onPressHandle={() => redirect('withdrawalRecord')}
      />

      <ScrollView style={styles.content}>
        {/* Scam Prevention Alert */}
        <TouchableOpacity
          style={styles.alertContainer}
          onPress={() => redirect('scamAlert')}>
          <Ionicons name="alert-circle" size={20} color="#FF8C00" />
          <Text style={styles.alertText}>Scam Prevention Alert</Text>
          <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
        </TouchableOpacity>

        {/* Amount Card */}
        <View style={styles.amountCard}>
          <View style={styles.amountHeader}>
            <Text style={styles.amountHeaderText}>
              Total Amount for Withdraw
            </Text>
            <Ionicons name="eye-outline" size={24} color="white" />
          </View>

          <Text style={styles.totalAmount}>
            {paymentMethodData.withdrawalAmount}
          </Text>

          <View style={styles.amountDetails}>
            <View style={styles.amountDetailItem}>
              <Text style={styles.amountDetailLabel}>Withdrawal Amount</Text>
              <Text style={styles.amountDetailValue}>
                {paymentMethodData.withdrawalAmount}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => redirect('pointsToBeConfirmed')}
              style={styles.amountDetailItem}>
              <Text style={styles.amountDetailLabel}>
                Points to be confirmed{' '}
                <Ionicons
                  name="information-circle-outline"
                  size={16}
                  color="white"
                />
              </Text>
              <View style={styles.pointsContainer}>
                <Image style={styles.pointIcon} source={BeanIcon} />
                <Text style={styles.amountDetailValue}>
                  {paymentMethodData.withdrawalPoints}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Method Section */}
        <View style={styles.methodSection}>
          <Text style={styles.sectionTitle}>Method</Text>

          <View style={styles.methodCard}>
            <View style={styles.methodHeader}>
              <View style={styles.methodInfo}>
                <Image
                  source={paymentMethodData.icon}
                  style={[
                    styles.methodIcon,
                    {
                      backgroundColor:
                        paymentMethodData.id == 'epay' ? 'blue' : 'white',
                    },
                  ]}
                />
                <Text style={styles.methodName}>{paymentMethodData.name}</Text>
              </View>

              <TouchableOpacity onPress={() => redirect('paymentMethods')}>
                <Image
                  style={[styles.pointIcon,{}]}
                  source={dataTransferIcon}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.methodDetails}>
              <View style={styles.methodTag}>
                <Text style={styles.methodTagText}>
                  Fee: {paymentMethodData.fee}
                </Text>
              </View>

              <View style={styles.methodTag}>
                <Text style={styles.methodTagText}>
                  Arrival: {paymentMethodData.arrival}
                </Text>
              </View>
            </View>

            <Text style={styles.methodEmail}>
              {paymentMethodData.identifier}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <PointButton
            text="Withdraw now"
            onPress={() => {}}
            backgroundColor="#6B74F7"
            textColor="white"
            borderColor="white"
          />
          <PointButton text='Exchange Points for Coins' onPress={() => redirect("exchangecoins")} />
          <PointButton text='Transfer' onPress={() => redirect("transfer")} />
        </View>

        {/* Withdrawal Rules - Now Dynamic based on payment method */}
        <View style={styles.rulesSection}>
          <Text style={styles.sectionTitle}>Withdrawal Rules</Text>

          {/* Exchange ratio, minimum and maximum withdrawal table */}
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>Exchange ratio</Text>
              </View>
              <View style={[styles.tableCell, styles.tableCellRight]}>
                <View style={styles.exchangeRateContainer}>
                  <Image style={styles.pointIcon} source={BeanIcon} />
                  <Text style={styles.tableCellText}>
                    {paymentMethodData.rules?.exchangeRate}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>
                  Minimum withdrawal amount
                </Text>
              </View>
              <View style={[styles.tableCell, styles.tableCellRight]}>
                <Text style={styles.tableCellText}>
                  {paymentMethodData.rules?.minWithdrawal}
                </Text>
              </View>
            </View>

            {/* Only show maximum withdrawal row if it exists */}
            {paymentMethodData.rules?.maxWithdrawal && (
              <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text style={styles.tableCellText}>
                    Maximum withdrawal amount of a single transaction
                  </Text>
                </View>
                <View style={[styles.tableCell, styles.tableCellRight]}>
                  <Text style={styles.tableCellText}>
                    {paymentMethodData.rules?.maxWithdrawal}
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* General rules */}
          <Text style={styles.rulesText}>1. Coins can not be withdrawn.</Text>
          <Text style={styles.rulesText}>
            2. Different payment method, service charge might vary, Please
            select the appropriate payment method.
          </Text>

          {/* Service fee table - method specific */}
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>Withdrawal Amount</Text>
              </View>
              <View style={[styles.tableCell, styles.tableCellRight]}>
                <Text style={styles.tableCellText}>Service fee</Text>
              </View>
            </View>

            {renderServiceFeeRows()}
          </View>

          {/* Withdrawal frequency table - conditionally rendered */}
          {renderWithdrawalFrequency()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingBottom: 50,
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  recordText: {
    fontSize: 16,
    color: '#333333',
  },
  content: {
    flex: 1,
  },
  alertContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5EC',
    padding: 12,
    justifyContent: 'space-between',
  },
  alertText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#FF8C00',
  },
  amountCard: {
    backgroundColor: '#6B74F7',
    borderRadius: 12,
    margin: 16,
    padding: 16,
  },
  amountHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountHeaderText: {
    color: 'white',
    fontSize: 16,
  },
  totalAmount: {
    color: 'white',
    fontSize: 38,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  amountDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amountDetailItem: {
    flex: 1,
  },
  amountDetailLabel: {
    color: 'white',
    fontSize: 14,
    opacity: 0.8,
  },
  amountDetailValue: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 4,
  },
  methodSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 12,
  },
  methodCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 10,
  },
  methodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  methodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    borderRadius: 20,
  },
  pointIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    marginTop: 5,
    marginRight: 5,
  },
  methodName: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 12,
  },
  methodDetails: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  methodTag: {
    backgroundColor: '#EEEEF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  methodTagText: {
    fontSize: 12,
    color: '#5C6BC0',
  },
  methodEmail: {
    fontSize: 14,
    color: '#888888',
  },
  actionButtons: {
    paddingHorizontal: 16,
    margin: 24,
    gap: 10,
  },
  rulesSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  table: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 12,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tableCell: {
    flex: 1,
    padding: 12,
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
  },
  tableCellRight: {
    borderRightWidth: 0,
  },
  tableCellText: {
    fontSize: 14,
    color: '#333333',
  },
  rulesText: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 8,
    lineHeight: 20,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exchangeRateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default WithdrawNowScreen;
