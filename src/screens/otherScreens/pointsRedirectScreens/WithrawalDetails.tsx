import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeader from '@/components/profile/CustomHeader';
import { scaleHeight, scaleWidth } from '@/constants/scaling';
import { redirect } from '@/utils/navigationService';
import ThemedText from '@/components/ThemedText';

// Define types for our payment data
interface PaymentData {
  amount: string;
  cryptoAmount: string;
  localCurrency: {
    code: string;
    symbol: string;
    amount: string;
  };
  actualAmountReceived: string;
  paymentMethod: {
    name: string;
    icon: string;
  };
  account: string;
  orderNumber: string;
  orderTime: string;
  paymentTime: string;
  platformId: string;
  timeTaken: string;
}

const WithdrawalDetails: React.FC = () => {
  // Sample data matching the screenshot
  const paymentData: PaymentData = {
    amount: '80',
    cryptoAmount: '8.00000',
    localCurrency: {
      code: 'INR',
      symbol: '₹',
      amount: '7040.00',
    },
    actualAmountReceived: '80.00',
    paymentMethod: {
      name: 'Epay',
      icon: 'circle',
    },
    account: 'ueccentertainment@gmail.com',
    orderNumber: '250323174272194362117254386',
    orderTime: '2025-03-23 17:25:43',
    paymentTime: '2025-03-23 17:27:13',
    platformId: '254344',
    timeTaken: '1min',
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Details" />

      {/* Payment Amount */}
      <View style={styles.amountContainer}>
        <ThemedText style={styles.amountText}>${paymentData.amount}</ThemedText>
        <ThemedText style={styles.successText}>
          Withdrawal Successful - Time Taken {paymentData.timeTaken}
        </ThemedText>
      </View>

      {/* Payment Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.paymentDetails}>
          <View style={styles.detailRow}>
            <ThemedText style={styles.detailLabel}>Platform ID:</ThemedText>
            <ThemedText style={styles.detailValue}>{paymentData.platformId}</ThemedText>
          </View>

          <View style={styles.detailRow}>
            <ThemedText style={styles.detailLabel}>Amount details:</ThemedText>
            <View style={styles.amountDetailsRow}>
              <ThemedText style={styles.detailValue}>${paymentData.amount}</ThemedText>
              <ThemedText style={styles.cryptoAmount}>
                ≈ {paymentData.cryptoAmount}
              </ThemedText>
            </View>
          </View>

          <View style={styles.detailRow}>
            <ThemedText style={styles.detailLabel}>Local currency:</ThemedText>
            <View style={styles.currencyContainer}>
              <View style={styles.flagContainer}>
                <ThemedText>🇮🇳</ThemedText>
              </View>
              <ThemedText style={styles.detailValue}>
                {paymentData.localCurrency.symbol}
                {paymentData.localCurrency.amount}
              </ThemedText>
            </View>
          </View>

          <View style={styles.detailRow}>
            <ThemedText style={styles.detailLabel}>Actual amount received:</ThemedText>
            <ThemedText style={styles.detailValue}>
              ${paymentData.actualAmountReceived}
            </ThemedText>
          </View>

        </View>
        <View style={styles.paymentDetails}>
          <View style={styles.detailRow}>
            <ThemedText style={styles.detailLabel}>Payment Method:</ThemedText>
            <View style={styles.paymentMethodContainer}>
              <View style={styles.paymentMethodIcon}>
                <View style={styles.epayCircle}>
                  <ThemedText style={styles.epayText}>E</ThemedText>
                </View>
              </View>
              <ThemedText style={styles.detailValue}>
                {paymentData.paymentMethod.name}
              </ThemedText>
            </View>
          </View>

          {/* Fixed Account row with proper truncation */}
          <View style={styles.detailRow}>
            <ThemedText style={styles.detailLabel}>Account:</ThemedText>
            <View style={styles.accountContainer}>
              <ThemedText
                style={styles.detailValue}
                numberOfLines={1}
                ellipsizeMode="middle">
                {paymentData.account}
              </ThemedText>
              <TouchableOpacity style={styles.copyButton}>
                <Ionicons name="copy-outline" size={14} color="#888" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.paymentDetails}>
          {/* Fixed Order number row with proper truncation */}
          <View style={styles.detailRow}>
            <ThemedText style={styles.detailLabel}>Order number:</ThemedText>
            <View style={styles.accountContainer}>
              <ThemedText
                style={styles.detailValue}
                numberOfLines={1}
                ellipsizeMode="middle">
                {paymentData.orderNumber}
              </ThemedText>
              <TouchableOpacity style={styles.copyButton}>
                <Ionicons name="copy-outline" size={14} color="#888" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.detailRow}>
            <ThemedText style={styles.detailLabel}>Order time:</ThemedText>
            <ThemedText style={styles.detailValue}>{paymentData.orderTime}</ThemedText>
          </View>

          <View style={styles.detailRow}>
            <ThemedText style={styles.detailLabel}>Payment time:</ThemedText>
            <ThemedText style={styles.detailValue}>{paymentData.paymentTime}</ThemedText>
          </View>
        </View>
      </View>

      {/* Auto Confirmation Message */}
      <ThemedText style={styles.confirmationMessage}>
        Since no questions has been raised within 2 hours, system has
        automatically confirmed the payment.
      </ThemedText>

      {/* Questions Button */}
      <TouchableOpacity style={styles.questionsButton} onPress={() => redirect("askHelpPage")}>
        <ThemedText style={styles.questionsButtonText}>Questions ?</ThemedText>
      </TouchableOpacity>

      {/* Bottom Home Indicator */}
      <View style={styles.homeIndicator} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: StatusBar.currentHeight,
  },
  paymentDetails: {
    backgroundColor: "#cccccc2d",
    padding: scaleWidth(10),
    borderRadius: 10,
    marginTop: scaleHeight(10)
  },
  placeholder: {
    width: 40,
  },
  amountContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  amountText: {
    fontSize: 36,
    fontWeight: '600',
  },
  successText: {
    color: '#6366F1',
    marginTop: 8,
    fontSize: 16,
  },
  detailsContainer: {
    paddingHorizontal: scaleWidth(20),
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: '#E5E5E5',
    alignItems: 'center', // Ensure vertical alignment
  },
  detailLabel: {
    color: '#888888',
    fontSize: 12,
    flex: 0.6, // Fixed width for labels
  },
  detailValue: {
    fontSize: 12,
    color: '#333',
    fontWeight: '400',
  },
  amountDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cryptoAmount: {
    marginLeft: 8,
    color: '#888888',
    fontSize: 14,
  },
  currencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagContainer: {
    marginRight: 6,
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodIcon: {
    marginRight: 8,
  },
  epayCircle: {
    width: 20,
    height: 20,
    borderRadius: 12,
    backgroundColor: '#0047AB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  epayText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  accountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.65, // Take up remaining space
    justifyContent: 'flex-end',
  },
  copyButton: {
    marginLeft: 8,
    padding: 2,
    width: 20, // Fixed width for the button
    height: 20, // Fixed height for the button
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain'
  },
  confirmationMessage: {
    textAlign: 'center',
    color: '#888888',
    fontSize: 12,
    marginTop: 20,
    marginHorizontal: 20,
    lineHeight: 20,
  },
  questionsButton: {
    marginTop: 20,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 24,
    paddingVertical: 10,
    alignItems: 'center',
  },
  questionsButtonText: {
    color: '#6366F1',
    fontSize: 14,
  },
  homeIndicator: {
    alignSelf: 'center',
    width: 50,
    height: 5,
    backgroundColor: '#D1D1D1',
    borderRadius: 2.5,
    marginTop: 'auto',
    marginBottom: 10,
  },
});

export default WithdrawalDetails;
