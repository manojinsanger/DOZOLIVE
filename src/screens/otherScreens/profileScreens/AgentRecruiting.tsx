import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { scaleWidth, scaleHeight, scaleFont } from '@/constants/scaling';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/profile/CustomHeader';
import MainContainer from '@/components/common/mainContainers/MainContainer';
import ThemedText from '@/components/ThemedText';

const AgentRecruiting = () => {
  const openWhatsApp = () => {
    // const phoneNumber = '+447853078105';
    const url = `https://wa.me/${phoneNumber.replace(/\D/g, '')}`;
    Linking.openURL(url).catch(() => {
      alert('Make sure WhatsApp is installed on your device');
    });
  };

  const openEmail = () => {
    const email = 'Yansuk@dozolive.com';
    const subject = 'Agent Inquiry';
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    Linking.openURL(url).catch(() => {
      alert('No email app found');
    });
  };

  return (
    <MainContainer>
      <SafeAreaView style={styles.container}>
        <CustomHeader title="Come and join!" textColor="white" />

        <ThemedText style={styles.header}>Agent Recruiting</ThemedText>

        <View style={styles.textContainer}>
          <ThemedText style={styles.title}>More fun More Profitable</ThemedText>

          <View style={styles.infoSection}>
            <ThemedText style={styles.infoText}>
              We are looking for experienced agents who can bring beautiful
              hosts and invite others to our platform. High agency commission
              and rewards are waiting for you!
            </ThemedText>
          </View>

          <View style={styles.infoSection}>
            <ThemedText style={styles.infoText}>
              Contact Yansuk to become an agent!{'\n'}
              Enjoy your agency on our platform as early as possible!
            </ThemedText>
          </View>

          <View style={styles.specialistSection}>
            <ThemedText style={styles.specialistTitle}>
              Agent Policy Specialist
            </ThemedText>

            <View style={styles.aliceButton}>
              <ThemedText style={styles.aliceButtonText}>Yansuk</ThemedText>
            </View>

            <View style={styles.emailContainer}>
              {/* <TouchableOpacity onPress={openWhatsApp}>
                <ThemedText style={styles.emailAddress}>
                  WhatsApp: +44 7853 078105
                </ThemedText>
              </TouchableOpacity> */}
              <TouchableOpacity onPress={openEmail}>
                <ThemedText style={styles.emailAddress}>
                  Email: Yansuk@dozolive.com
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    paddingTop: scaleHeight(20),
  },
  customHeader: {
    fontSize: scaleFont(24),
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  header: {
    fontSize: scaleFont(40),
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: scaleHeight(20),
    textShadowColor: '#ff5100',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  textContainer: {
    paddingVertical: scaleHeight(10),
    alignItems: 'center',
    paddingHorizontal: scaleWidth(10),
    backgroundColor: 'white',
    marginHorizontal: scaleWidth(20),
    borderRadius: scaleWidth(10),
  },
  title: {
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    color: '#aa3206',
    backgroundColor: '#fdda99',
    paddingVertical: scaleHeight(5),
    paddingHorizontal: scaleWidth(15),
    borderRadius: scaleWidth(10),
    marginBottom: scaleHeight(10),
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#4682B4',
  },
  infoSection: {
    backgroundColor: '#c0dff8', // Semi-transparent white background
    paddingVertical: scaleHeight(15),
    paddingHorizontal: scaleWidth(10),
    borderRadius: scaleWidth(6),
    marginVertical: scaleHeight(8),
    width: '100%',
  },
  infoText: {
    fontSize: scaleFont(14),
    color: '#004074',
    textAlign: 'center',
    lineHeight: scaleHeight(24),
  },
  specialistSection: {
    width: '100%',
    paddingVertical: scaleHeight(15),
    alignItems: 'center',
    backgroundColor: '#c0dff8', // Semi-transparent white background
    borderRadius: scaleWidth(10),
    marginVertical: scaleHeight(6),
    paddingHorizontal: scaleWidth(2),
  },
  specialistTitle: {
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    color: '#004074',
    marginBottom: scaleHeight(15),
  },
  aliceButton: {
    backgroundColor: '#1E90FF',
    borderRadius: scaleWidth(25),
    paddingVertical: scaleHeight(8),
    paddingHorizontal: scaleWidth(35),
    marginBottom: scaleHeight(15),
  },
  aliceButtonText: {
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  emailContainer: {
    alignItems: 'center',
    gap: 2,
  },
  emailLabel: {
    fontSize: scaleFont(16),
    fontStyle: 'italic',
    color: '#004074',
    marginBottom: scaleHeight(5),
  },
  emailAddress: {
    fontSize: scaleFont(14),
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#004074',
  },
});

export default AgentRecruiting;

function alert(arg0: string) {
  throw new Error('Function not implemented.');
}
