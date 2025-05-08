import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from 'react-native';
import   MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomHeader from '@/components/profile/CustomHeader';
import { scaleHeight, scaleWidth } from '@/constants/scaling';

const AbandonmentOfOrdersScreen = () => {
  const [selectedMyReason, setSelectedMyReason] = useState<string | null>(null);
  const [selectedPayeeReason, setSelectedPayeeReason] = useState<string | null>(null);
  const [remarks, setRemarks] = useState('');

  const myReasons = [
    'I forfeit the transaction',
    'My account has been restricted',
    'Bank network is not working'
  ];

  const payeeReasons = [
    'The payee\'s account exceed limit',
    'Bank name does not match/is incorrect',
    'Account does not exist/is inactive',
    'Wrong IFSC Code(IN ONLY)'
  ];

  const handleMyReasonSelect = (reason: string) => {
    setSelectedMyReason(reason === selectedMyReason ? null : reason);
  };

  const handlePayeeReasonSelect = (reason: string) => {
    setSelectedPayeeReason(reason === selectedPayeeReason ? null : reason);
  };

  return (
    <SafeAreaView style={styles.container}>
        <CustomHeader title='Abandonment of Orders'/>
      
      <ScrollView style={styles.content}>
        <View style={styles.warningContainer}>
          <MaterialIcons name="info-outline" size={24} color="#e67e22" style={styles.infoIcon} />
          <Text style={styles.warningText}>*Reason (My Reason or The payee's Reason Required)</Text>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>My reasons:</Text>
          
          {myReasons.map((reason, index) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.reasonButton, 
                selectedMyReason === reason && styles.selectedReasonButton
              ]}
              onPress={() => handleMyReasonSelect(reason)}
            >
              <Text style={styles.reasonText}>{reason}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Payee Reasons:</Text>
          
          {payeeReasons.map((reason, index) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.reasonButton, 
                selectedPayeeReason === reason && styles.selectedReasonButton
              ]}
              onPress={() => handlePayeeReasonSelect(reason)}
            >
              <Text style={styles.reasonText}>{reason}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Remarks/Message:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Other reasons: Optional"
            placeholderTextColor="#aaa"
            multiline
            numberOfLines={5}
            value={remarks}
            onChangeText={setRemarks}
          />
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.confirmButton}
          disabled={!selectedMyReason && !selectedPayeeReason}
        >
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: StatusBar.currentHeight || 0,
  },
  content: {
    flex: 1,
  },
  warningContainer: {
    backgroundColor: '#FFF9E6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scaleHeight(10),
    paddingHorizontal: scaleWidth(14),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoIcon: {
    marginRight: 8,
  },
  warningText: {
    color: '#e67e22',
    fontSize: 16,
    flex: 1,
  },
  sectionContainer: {
    padding: 16,
    paddingBottom: 0
  },
  sectionTitle: {
    fontSize: 16,
    color: '#999',
    marginBottom:  scaleHeight(10),
  },
  reasonButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding:  scaleHeight(12),
    marginBottom: scaleHeight(10),
    alignItems: 'center',
  },
  selectedReasonButton: {
    borderColor: '#5b6af0',
    backgroundColor: '#f0f2ff',
  },
  reasonText: {
    fontSize: 16,
    color: '#333',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    height: 120,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 24,
    padding: 14,
    alignItems: 'center',
    marginRight: 8,
  },
  cancelButtonText: {
    color: '#5b6af0',
    fontSize: 16,
    fontWeight: '500',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#5b6af0',
    borderRadius: 24,
    padding: 14,
    alignItems: 'center',
    marginLeft: 8,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default AbandonmentOfOrdersScreen;