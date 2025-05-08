import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeader from '@/components/profile/CustomHeader';
import {redirect} from '@/utils/navigationService';
import ThemedText from '@/components/ThemedText';

const WithdrawalRecord = () => {
  const withdrawalData = [
    {amount: 80.0, date: '2025-03-23', time: '17:25:43'},
    {amount: 50.0, date: '2025-03-10', time: '20:29:13'},
    {amount: 250.0, date: '2025-03-07', time: '20:29:16'},
    {amount: 90.0, date: '2025-03-03', time: '15:21:25'},
    {amount: 70.0, date: '2025-03-03', time: '14:51:11'},
    {amount: 180.0, date: '2025-02-17', time: '15:41:55'},
    {amount: 189.78, date: '2025-02-15', time: '18:27:14'},
    {amount: 140.0, date: '2025-02-12', time: '14:46:55'},
  ];

  return (
    <View style={styles.container}>
      <CustomHeader title="Record" />

      {/* Withdrawal Records */}
      <ScrollView style={styles.recordsContainer}>
        {withdrawalData.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.recordItem}
            onPress={() => redirect('withdrawalDetails')}>
            <View style={styles.leftContent}>
              <ThemedText style={styles.withdrawalText}>Withdrawal</ThemedText>
              <ThemedText style={styles.amountText}>
                Amount:${item.amount.toFixed(2)}
              </ThemedText>
              <ThemedText style={styles.dateText}>
                {item.date} {item.time}
              </ThemedText>
            </View>

            <View style={styles.rightContent}>
              <ThemedText style={styles.successText}>Successful withdrawal</ThemedText>
              <Ionicons name="chevron-forward" size={18} color="#8e8e93" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  placeholder: {
    width: 18,
  },
  recordsContainer: {
    flex: 1,
  },
  recordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  leftContent: {
    flex: 1,
  },
  withdrawalText: {
    fontSize: 14,
    fontWeight: '500',
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  dateText: {
    fontSize: 14,
    color: '#8e8e93',
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  successText: {
    color: '#6979f8',
    marginRight: 5,
  },
});

export default WithdrawalRecord;
