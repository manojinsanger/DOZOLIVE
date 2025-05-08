import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Platform,
  StatusBar,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinnerGradientCard from '@/components/common/gradientCards/LinnearGradientCard';
import {
  scaleFont,
  scaleWidth,
  scaleHeight,
  fullWidth,
} from '@/constants/scaling';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import customColors from '@/constants/styles';
import EPAY from '@/assets/images/epay.png';
import USDT from '@/assets/images/usdt.png';
import CustomHeader from '@/components/profile/CustomHeader';
import CountrySelector, { Country } from '@/components/profile/SelectCountry';
import ThemedText from '@/components/ThemedText';
import SelectCountryButton from '@/components/profile/SelectCountryButton';
import { redirect } from '@/utils/navigationService';

// Sample agent data (you can replace this with actual data from an API)
const agentData = [
  {
    id: 'AG001',
    name: 'Rahul Sharma',
    country: 'India',
    flag: '🇮🇳',
    profileImg: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 'AG002',
    name: 'Priya Patel',
    country: 'India',
    flag: '🇮🇳',
    profileImg: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: 'AG003',
    name: 'Amit Kumar',
    country: 'India',
    flag: '🇮🇳',
    profileImg: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
];

const TopUpCoin = () => {
  const [selectedTab, setSelectedTab] = useState('Recharge');
  const [selectedPayment, setSelectedPayment] = useState('EPAY');
  const underlinePosition = useSharedValue(0);
  const [selectedCountry, setSelectedCountry] = useState<Country>({ name: 'India', code: 'IN' });
  const [isCountryModalVisible, setCountryModalVisible] = useState(false);


  const packageAmounts = [100, 500, 1000, 2000, 3000, 4500];

  const animatedUnderlineStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withTiming(underlinePosition.value, { duration: 300 }) },
      ],
    };
  });

  const handleTabChange = (tab: any) => {
    setSelectedTab(tab);
    underlinePosition.value = tab === 'Recharge' ? 0 : scaleWidth(150);
  };

  const calculateCoins = (amount: any, paymentMethod: any) => {
    if (paymentMethod === 'USDT') {
      return amount * 10000;
    }
    if (amount < 500) return amount * 9200;
    if (amount >= 500 && amount < 2000) return amount * 9500;
    return amount * 9900;
  };

  const renderAgentCard = (agent: any, i: number) => (
    <TouchableOpacity style={styles.agentCard} key={i}>
      <Image source={{ uri: agent.profileImg }} style={styles.agentProfileImg} />
      <View style={styles.agentDetails}>
        <ThemedText style={styles.agentName}>{agent.name}</ThemedText>
        <ThemedText style={styles.agentId}>ID: {agent.id}</ThemedText>
        <View style={styles.countryContainer}>
          <ThemedText style={styles.agentCountry}>
            {agent.flag} {agent.country}
          </ThemedText>
        </View>
      </View>
      <TouchableOpacity style={styles.whatsappIcon}>
        <FontAwesome name="whatsapp" size={scaleWidth(24)} color="#25D366" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title="Agent account"
        rightHeader={
          <SelectCountryButton onVisible={() => setCountryModalVisible(true)} name={selectedCountry.name} />

        }
      />

      <CountrySelector
        onCountryChange={setSelectedCountry}
        selectedCountry={selectedCountry}
        isVisible={isCountryModalVisible}
        onClose={() => setCountryModalVisible(false)}
      />

      <ScrollView style={styles.scrollViewContent}>
        <LinnerGradientCard
          customStyles={{
            marginBottom: scaleWidth(20),
            marginTop: scaleHeight(20),
          }}>
          <View style={styles.coinBalanceContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: scaleWidth(25),
              }}>
              <View>
                <ThemedText style={styles.remainingCoins}>162546</ThemedText>
                <ThemedText style={styles.remainingText}>Remaining coins</ThemedText>
              </View>
              <TouchableOpacity style={styles.coinDetailsButton} onPress={() => redirect("tradingdetails")}>
                <ThemedText style={styles.coinDetailsText}>Coin details</ThemedText>
              </TouchableOpacity>
            </View>
            <ThemedText style={styles.rechargeInfo}>
              [27***09] 20:51 $3.00 recharged
            </ThemedText>
          </View>
        </LinnerGradientCard>

        <View style={styles.rechargeSection}>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              onPress={() => handleTabChange('Recharge')}
              style={styles.tabButton}>
              <ThemedText
                style={[
                  styles.sectionTitle,
                  selectedTab === 'Recharge' && styles.selectedTabText,
                ]}>
                Recharge
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleTabChange('Agent')}
              style={styles.tabButton}>
              <ThemedText
                style={[
                  styles.sectionTitle,
                  selectedTab === 'Agent' && styles.selectedTabText,
                ]}>
                Agent 30%{' '}
                <Entypo
                  name="arrow-bold-up"
                  size={scaleWidth(20)}
                  color={
                    selectedTab === 'Agent'
                      ? customColors.textLightPrimary
                      : customColors.textLightSecondary
                  }
                />
              </ThemedText>
            </TouchableOpacity>
          </View>
          <Animated.View style={[styles.underline, animatedUnderlineStyle]} />
        </View>

        {selectedTab === 'Recharge' && (
          <>
            <View style={styles.paymentOptionsContainer}>
              <TouchableOpacity
                style={[
                  styles.paymentButton,
                  selectedPayment === 'EPAY' && styles.activePaymentButton,
                ]}
                onPress={() => setSelectedPayment('EPAY')}>
                <View style={styles.paymentButtonContent}>
                  <Image source={EPAY} style={styles.icon} />
                  <ThemedText style={styles.paymentText}>EPAY</ThemedText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.paymentButton,
                  selectedPayment === 'USDT' && styles.activePaymentButton,
                ]}
                onPress={() => setSelectedPayment('USDT')}>
                <View style={styles.paymentButtonContent}>
                  <Image source={USDT} style={styles.icon} />
                  <ThemedText style={styles.paymentText}>USDT</ThemedText>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.coinPackages}>
              <View style={styles.packageRow}>
                {packageAmounts.slice(0, 3).map(amount => (
                  <TouchableOpacity key={amount} style={styles.packageButton}>
                    <ThemedText style={styles.packageCoins}>
                      {calculateCoins(amount, selectedPayment).toLocaleString()}
                    </ThemedText>
                    <ThemedText style={styles.packagePrice}>$ {amount}</ThemedText>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.packageRow}>
                {packageAmounts.slice(3).map(amount => (
                  <TouchableOpacity key={amount} style={styles.packageButton}>
                    <ThemedText style={styles.packageCoins}>
                      {calculateCoins(amount, selectedPayment).toLocaleString()}
                    </ThemedText>
                    <ThemedText style={styles.packagePrice}>$ {amount}</ThemedText>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity style={styles.customizeButton}>
                <ThemedText style={styles.customizeText}>customize</ThemedText>
              </TouchableOpacity>
            </View>

            <View style={styles.pricingTable}>
              <ThemedText style={styles.pricingTitle}>
                Purchase coins through {selectedPayment}:
              </ThemedText>
              {selectedPayment === 'EPAY' ? (
                <>
                  <View style={styles.tableHeader}>
                    <ThemedText style={styles.tableHeaderText}>
                      Single purchase amount
                    </ThemedText>
                    <ThemedText style={styles.tableHeaderText}>Unit price</ThemedText>
                  </View>
                  <View style={styles.tableRow}>
                    <ThemedText style={styles.tableCell}>
                      0 {'\u003C'} N {'\u003C'} 500
                    </ThemedText>
                    <ThemedText style={styles.tableCell}>$1 = 🪙 9200</ThemedText>
                  </View>
                  <View style={styles.tableRow}>
                    <ThemedText style={styles.tableCell}>
                      500 {'\u003C'}= N {'\u003C'} 2000
                    </ThemedText>
                    <ThemedText style={styles.tableCell}>$1 = 🪙 9500</ThemedText>
                  </View>
                  <View style={styles.tableRow}>
                    <ThemedText style={styles.tableCell}>{'\u003E'}= 2000</ThemedText>
                    <ThemedText style={styles.tableCell}>$1 = 🪙 9900</ThemedText>
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.tableHeader}>
                    <ThemedText style={styles.tableHeaderText}>Purchase amount</ThemedText>
                    <ThemedText style={styles.tableHeaderText}>Unit price</ThemedText>
                  </View>
                  <View style={styles.tableRow}>
                    <ThemedText style={styles.tableCell}>Any amount</ThemedText>
                    <ThemedText style={styles.tableCell}>$1 = 🪙 10000</ThemedText>
                  </View>
                </>
              )}
            </View>
          </>
        )}

        {selectedTab === 'Agent' && (
          <View style={styles.agentListContainer}>
            {agentData.map((agent, i) => renderAgentCard(agent, i))}
          </View>
        )}

        <TouchableOpacity>
          <ThemedText style={styles.footerLink}>→ Top up customer service ←</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TopUpCoin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customColors.backgroundLight,
    paddingTop: StatusBar.currentHeight,
  },
  scrollViewContent: {
    padding: scaleWidth(10),
    paddingBottom: scaleHeight(20),
  },
  coinBalanceContainer: {
    borderRadius: scaleWidth(10),
    marginBottom: scaleHeight(20),
    padding: scaleWidth(15),
  },
  remainingCoins: {
    fontSize: scaleFont(36),
    fontWeight: 'bold',
    color: customColors.textDarkPrimary,
  },
  remainingText: {
    fontSize: scaleFont(16),
    color: customColors.textDarkPrimary,
  },
  coinDetailsButton: {
    backgroundColor: customColors.white,
    borderRadius: scaleWidth(20),
    paddingVertical: scaleHeight(5),
    paddingHorizontal: scaleWidth(15),
    marginVertical: scaleHeight(10),
  },
  coinDetailsText: {
    color: customColors.accent,
    fontSize: scaleFont(14),
    fontWeight: 'bold',
  },
  rechargeInfo: {
    fontSize: scaleFont(12),
    color: customColors.textDarkPrimary,
  },
  rechargeSection: {
    marginBottom: scaleHeight(20),
    width: '100%',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  tabButton: {
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(5),
  },
  sectionTitle: {
    fontSize: scaleFont(16),
    fontWeight: 500,
    color: customColors.textLightSecondary,
  },
  selectedTabText: {
    color: customColors.textLightPrimary,
  },
  underline: {
    width: fullWidth(10),
    height: scaleHeight(3),
    backgroundColor: customColors.textLightPrimary,
    position: 'absolute',
    bottom: 0,
    left: scaleWidth(70),
    borderRadius: scaleWidth(20),
  },
  paymentOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaleHeight(20),
  },
  paymentButton: {
    backgroundColor: customColors.white,
    borderRadius: scaleWidth(10),
    padding: scaleWidth(10),
    alignItems: 'center',
    width: '48%',
  },
  activePaymentButton: {
    borderWidth: scaleWidth(2),
    borderColor: customColors.primary,
  },
  paymentButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: scaleWidth(8),
    width: scaleWidth(25),
    height: scaleWidth(25),
    borderRadius: scaleWidth(100),
  },
  paymentText: {
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    color: customColors.textLightPrimary,
  },
  coinPackages: {
    marginBottom: scaleHeight(20),
  },
  packageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaleHeight(10),
  },
  packageButton: {
    backgroundColor: customColors.white,
    borderRadius: scaleWidth(10),
    padding: scaleWidth(12),
    alignItems: 'center',
    width: '32%',
  },
  packageCoins: {
    fontSize: scaleFont(15),
    fontWeight: 'bold',
  },
  packagePrice: {
    fontSize: scaleFont(14),
    color: customColors.textLightSecondary,
  },
  customizeButton: {
    backgroundColor: customColors.white,
    borderRadius: scaleWidth(10),
    padding: scaleHeight(15),
    alignItems: 'center',
  },
  customizeText: {
    fontSize: scaleFont(16),
    fontWeight: 'bold',
  },
  pricingTable: {
    backgroundColor: customColors.white,
    borderRadius: scaleWidth(10),
    padding: scaleWidth(15),
    marginBottom: scaleHeight(20),
  },
  pricingTitle: {
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    marginBottom: scaleHeight(10),
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: customColors.gray200,
    padding: scaleWidth(10),
    borderRadius: scaleWidth(5),
  },
  tableHeaderText: {
    fontSize: scaleFont(14),
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: scaleWidth(10),
    borderBottomWidth: scaleWidth(1),
    borderBottomColor: '#f0f0f0',
  },
  tableCell: {
    fontSize: scaleFont(14),
  },
  footerLink: {
    fontSize: scaleFont(14),
    color: customColors.primary,
    textAlign: 'center',
    marginBottom: scaleHeight(25),
  },
  // Agent Card Styles
  agentListContainer: {
    marginBottom: scaleHeight(20),
  },
  agentCard: {
    flexDirection: 'row',
    backgroundColor: customColors.white,
    borderRadius: scaleWidth(10),
    padding: scaleWidth(10),
    marginBottom: scaleHeight(10),
    alignItems: 'center',
  },
  agentProfileImg: {
    width: scaleWidth(50),
    height: scaleWidth(50),
    borderRadius: scaleWidth(25),
    marginRight: scaleWidth(10),
  },
  agentDetails: {
    flex: 1,
  },
  agentName: {
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    color: customColors.textLightPrimary,
  },
  agentId: {
    fontSize: scaleFont(14),
    color: customColors.textLightSecondary,
  },
  countryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  agentCountry: {
    fontSize: scaleFont(14),
    color: customColors.textLightPrimary,
  },
  whatsappIcon: {
    padding: scaleWidth(5),
  },
});
