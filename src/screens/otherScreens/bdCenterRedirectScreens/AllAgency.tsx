import {
    View,
    Text,
    Image,
    StyleSheet,
    StatusBar,
    ScrollView,
  } from 'react-native';
  import React from 'react';
  import CustomHeader from '@/components/profile/CustomHeader';
  import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';
  import userIcon from '@/assets/images/icon/user-profile.png';
  import UnderlinedTabSelector from '@/components/profile/UnderlinedTabSelector';
import ThemedText from '@/components/ThemedText';
  
  interface UserInfoProps {
    id: string;
    daysWithUs: number;
    loginTime: string;
    loginDate: string;
    name: string;
  }
  
  const agencyData: UserInfoProps[] = [
    {
      id: 'AG123456',
      name: 'John Doe',
      daysWithUs: 0,
      loginTime: '14:30',
      loginDate: '2025-04-03',
    },
    {
      id: 'AG654321',
      name: 'Jane Smith',
      daysWithUs: 1,
      loginTime: '10:00',
      loginDate: '2025-04-02',
    },
    {
      id: 'AG789012',
      name: 'Mark Taylor',
      daysWithUs: 3,
      loginTime: '09:15',
      loginDate: '2025-04-01',
    },
  ];
  
  const AllAgency = () => {
    const [activeTab, setActiveTab] = React.useState<string | null>('All Agency');
  
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content"/>
        <CustomHeader title="Agency List" />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <UnderlinedTabSelector
            tabs={['All Agency', 'New Agency']}
            activeTab={activeTab}
            onTabPress={setActiveTab}
          />
  
          {agencyData.map((agency, index) => (
            <View key={index} style={styles.agencyCard}>
              <View style={styles.userRow}>
                <Image source={userIcon} style={styles.userImage} />
  
                <View style={styles.userDetails}>
                  <ThemedText style={styles.userName}>{agency.name}</ThemedText>
                  <ThemedText style={styles.userId}>ID: {agency.id}</ThemedText>
                  <ThemedText style={styles.loginInfo}>Login for {agency.daysWithUs} days</ThemedText>
                </View>
  
                <View style={styles.timeContainer}>
                  <ThemedText style={styles.timeText}>{agency.loginTime}</ThemedText>
                  <ThemedText style={styles.dateText}>{agency.loginDate}</ThemedText>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };
  
  export default AllAgency;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      color: '#FF0000',
      paddingTop: StatusBar.currentHeight,
    },
    scrollContent: {
      padding: scaleWidth(12),
    },
    agencyCard: {
      marginVertical: scaleHeight(10),
      borderWidth: 1,
      borderColor: '#fff', 
      backgroundColor:'#fff', 
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
    loginInfo: {
      fontSize: scaleFont(13),
      color: '#888',
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
  