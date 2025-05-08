import React from 'react';
import { Text, View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import RecordCard from '@/components/topup/RecordCard';
import { goBack } from '@/utils/navigationService'; // adjust path if needed

const RecordPage = () => {
  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButtonContainer} onPress={goBack}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
          <Animated.Text style={styles.headerTitle}>Store</Animated.Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <RecordCard title="Recharge" date="Jan 28, 2025" amount={+50} />
        <RecordCard title="Party" date="Jan 25, 2025" amount={-20} />
        <RecordCard title="Live" date="Jan 22, 2025" amount={+100} />
      </View>
    </View>
  );
};

export default RecordPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#F1567D',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
});
