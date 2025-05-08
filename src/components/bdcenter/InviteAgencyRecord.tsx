import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
  } from 'react-native';
  import React from 'react';
  import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';
  import userIcon from '@/assets/images/icon/user-profile.png';
  
  interface AgencyRecord {
    id: string;
    name: string;
    status: string;
    date: string;
  }
  
  const mockAgencyData: AgencyRecord[] = [
    {
      id: 'AG123456',
      name: 'John Doe',
      status: 'Wait for confirmation',
      date: '2025-04-03',
    },
    {
      id: 'AG654321',
      name: 'Jane Smith',
      status: 'Wait for confirmation',
      date: '2025-04-02',
    },
    {
      id: 'AG789012',
      name: 'Robert Lee',
      status: 'Wait for confirmation',
      date: '2025-04-01',
    },
  ];
  
  const InviteAgencyrecord = () => {
    return (
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {mockAgencyData.map((agency, index) => (
          <View key={index} style={styles.agencyCard}>
            <View style={styles.userRow}>
              <Image source={userIcon} style={styles.userImage} />
  
              <View style={styles.userDetails}>
                <Text style={styles.userName}>{agency.name}</Text>
                <Text style={styles.userId}>ID: {agency.id}</Text>
              </View>
  
              <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{agency.status}</Text>
                <Text style={styles.dateText}>{agency.date}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  };
  
  export default InviteAgencyrecord;
  
  const styles = StyleSheet.create({
    scrollContent: {
      padding: scaleWidth(12),
    },
    agencyCard: {
      marginVertical: scaleHeight(10),
      borderWidth: 1,
      borderColor: '#e0e0e0',
      backgroundColor: '#fff',
      borderRadius: scaleWidth(12),
      padding: scaleWidth(12),
    },
    userRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    userImage: {
      width: scaleWidth(50),
      height: scaleWidth(50),
      borderRadius: scaleWidth(25),
      marginRight: scaleWidth(12),
    },
    userDetails: {
      flex: 1,
    },
    userName: {
      fontSize: scaleFont(16),
      fontWeight: '600',
      color: '#000',
    },
    userId: {
      fontSize: scaleFont(14),
      color: '#555',
    },
    timeContainer: {
      alignItems: 'flex-end',
    },
    timeText: {
      fontSize: scaleFont(14),
      fontWeight: '500',
    },
    dateText: {
      fontSize: scaleFont(13),
      color: '#666',
    },
  });
  