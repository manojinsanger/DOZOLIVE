import MainContainer from '@/components/common/mainContainers/MainContainer';
import TopUpCard from '@/components/topup/TopUpCard';
import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';
import customColors from '@/constants/styles';
import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
  StatusBar,
} from 'react-native';
import { goBack, redirect } from '@/utils/navigationService';
import LinnerGradientCard3 from '@/components/common/gradientCards/LinnearGradientCard3';
import LightContentStatusBar from '@/components/statusbar/LightContentStatusBar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ThemedText from '@/components/ThemedText';
import LoadingScreen from '@/components/common/Loading';
import { useAppDispatch, useAppSelector } from '@/store/useTypeDispatchSelector';
import { fetchTransactionsRequest } from '@/store/features/wallet/walletSlice';
import { useUser } from '@/context/UserProvider';

interface StoreProps { }

const countries = [
  { name: 'India', code: 'IN' },
  { name: 'USA', code: 'US' },
  { name: 'UK', code: 'GB' },
  { name: 'Canada', code: 'CA' },
  { name: 'Germany', code: 'DE' },
  { name: 'France', code: 'FR' },
  { name: 'Japan', code: 'JP' },
  { name: 'Australia', code: 'AU' },
  { name: 'China', code: 'CN' },
];

const getFlagUrl = (code: string) =>
  `https://flagcdn.com/w40/${code.toLowerCase()}.png`;

const Coins = (props: StoreProps) => {
  const [activeTab, setActiveTab] = React.useState<
    'recharge' | 'googlePay' | 'agent'
  >('recharge');
  const [selectedCountry, setSelectedCountry] = React.useState<{
    name: string;
    code: string;
  }>({ name: 'India', code: 'IN' });
  const [isDropdownVisible, setDropdownVisible] =
    React.useState<boolean>(false);
    const dispatch = useAppDispatch();
    const {userAllDetails} = useUser()

  React.useEffect(() => {
    dispatch(fetchTransactionsRequest({
      commonId: userAllDetails?.id, secondUserID: userAllDetails.specialId || userAllDetails.liveId, page: 1,
      walletType: 'COIN'
    }));

  }, []);

  const { coinWalletBalance, error: countError } = useAppSelector((state) => state.wallet);
  const renderContent = () => {
    if (activeTab === 'recharge') {
      return (
        <View style={styles.postsContainer}>
          <View style={styles.cardRow}>
            {upiData.map((item, index) => (
              <TopUpCard
                key={index}
                value={item.value}
                price={item.price}
                onPress={() => {
                  console.log('object');
                }}
              />
            ))}
          </View>
        </View>
      );
    }

    if (activeTab === 'googlePay') {
      return (
        <View style={styles.postsContainer}>
          <View style={styles.cardRow}>
            {googleData.map((item, index) => (
              <TopUpCard
                key={index}
                value={item.value}
                price={item.price}
                activeTab={activeTab}
                onPress={() => {
                  console.log('object');
                }}
              />
            ))}
          </View>
        </View>
      );
    }

    return (
      <View style={styles.postsContainer}>
        <View style={styles.cardRow}>
          {agentData.map((item, index) => (
            <TopUpCard
              key={index}
              value={item.value}
              price={item.price}
              onPress={() => {
                console.log('object');
                redirect('agents');
              }}
            />
          ))}
        </View>
      </View>
    );
  };

  // if (isLoading) <LoadingScreen />

  return (
    <MainContainer>
      <LightContentStatusBar />
      <View style={styles.container}>
        {/* Custom Header */}
        <View style={styles.customHeader}>
          <TouchableOpacity
            style={styles.backButtonContainer}
            onPress={() => goBack()}>
            <MaterialIcons
              name="arrow-back"
              size={scaleFont(24)}
              color="#fff"
            />
            <Animated.Text style={styles.headerTitle}>Top Up</Animated.Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.countrySelector}
            onPress={() => setDropdownVisible(true)}
            accessibilityLabel="Select country">
            {selectedCountry ? (
              <Image
                source={{ uri: getFlagUrl(selectedCountry.code) }}
                style={styles.selectedFlag}
              />
            ) : null}
            <Text style={[styles.countryText, { color: '#fff' }]}>
              {selectedCountry?.name || 'Select Country'}
            </Text>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={scaleFont(24)}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.cardContainer}>
          <LinnerGradientCard3 customStyles={{ padding: 20 }}>
            <View style={styles.topRow}>
              <View style={styles.coinInfo}>
                <Text style={styles.coinValue}>{coinWalletBalance}</Text>
                <Text style={styles.coinLabel}>Remaining Coins</Text>
              </View>
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => redirect("tradingdetails", {
                  walletType: "COIN"
                })}>
                <Text style={styles.detailsText}>Details</Text>
              </TouchableOpacity>
            </View>
          </LinnerGradientCard3>
        </View>

        <Modal
          transparent={true}
          visible={isDropdownVisible}
          animationType="slide"
          onRequestClose={() => setDropdownVisible(false)}>
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setDropdownVisible(false)}>
            <View style={styles.modalContainer}>
              <ThemedText style={styles.modalTitle}>Select Country</ThemedText>
              <FlatList
                data={countries}
                keyExtractor={item => item.code}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.countryItem}
                    onPress={() => {
                      setSelectedCountry(item);
                      setDropdownVisible(false);
                    }}>
                    <View style={styles.countryRow}>
                      <Image
                        source={{ uri: getFlagUrl(item.code) }}
                        style={styles.flagIcon}
                      />
                      <ThemedText style={styles.countryText}>{item.name}</ThemedText>
                    </View>
                    <MaterialIcons
                      name="keyboard-arrow-down"
                      size={scaleFont(24)}
                      color="#fff"
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'recharge' && styles.activeTabButton,
            ]}
            onPress={() => {
              setActiveTab('recharge');
            }}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'recharge' && styles.activeTabText,
              ]}>
              Recharge
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'googlePay' && styles.activeTabButton,
            ]}
            onPress={() => {
              setActiveTab('googlePay');
            }}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'googlePay' && styles.activeTabText,
              ]}>
              Google Pay
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'agent' && styles.activeTabButton,
            ]}
            onPress={() => {
              setActiveTab('agent');
            }}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'agent' && styles.activeTabText,
              ]}>
              Agents
            </Text>
          </TouchableOpacity>
        </View>
        {renderContent()}
      </View>
    </MainContainer>
  );
};

export default Coins;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleWidth(20),
    paddingVertical: scaleHeight(10),
  },
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: scaleFont(20),
    fontWeight: '600',
    marginLeft: scaleWidth(10),
    color: '#fff',
  },
  headerText: {
    fontSize: scaleFont(16),
    fontWeight: '700',
    color: '#fff',
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scaleHeight(12),
  },
  selectedFlag: {
    width: scaleWidth(12),
    height: scaleHeight(12),
    marginRight: scaleWidth(6),
    borderRadius: scaleWidth(2),
  },
  countryText: {
    fontSize: scaleFont(12),
    color: '#000',
    marginHorizontal: scaleWidth(10),
  },
  flagIcon: {
    width: scaleWidth(25),
    height: scaleHeight(25),
    borderRadius: scaleWidth(12.5),
    backgroundColor: '#ddd',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tabButton: {
    paddingVertical: scaleHeight(15),
    width: '33%',
    paddingHorizontal: scaleWidth(15),
    borderBottomWidth: scaleWidth(1),
    borderBottomColor: customColors.gray100,
  },
  activeTabButton: {
    borderBottomWidth: scaleWidth(2),
    borderBottomColor: customColors.secondary,
  },
  tabText: {
    fontSize: scaleFont(16),
    marginHorizontal: 'auto',
    fontWeight: '600',
    color: customColors.gray300,
  },
  activeTabText: {
    color: customColors.white,
  },
  postsContainer: {
    marginTop: scaleHeight(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardRow: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: scaleWidth(15),
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: scaleWidth(20),
    borderTopRightRadius: scaleWidth(20),
    paddingBottom: scaleHeight(20),
    paddingHorizontal: scaleWidth(15),
    paddingTop: scaleHeight(10),
  },
  modalTitle: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    marginBottom: scaleHeight(10),
    textAlign: 'center',
  },
  countryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scaleHeight(12),
    paddingHorizontal: scaleWidth(15),
    borderBottomWidth: scaleWidth(0.5),
    borderBottomColor: '#ddd',
  },
  countryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContainer: {
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 8,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  detailsButton: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: customColors.white,
  },
  detailsText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
  },
  coinInfo: {
    alignItems: 'flex-start',
  },
  coinValue: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  coinLabel: {
    color: 'white',
    opacity: 0.8,
    fontSize: 14,
    marginTop: 4,
  },
});

const agentData = [
  { value: 9000, price: 100 },
  { value: 18000, price: 200 },
  { value: 27000, price: 300 },
  { value: 45000, price: 500 },
  { value: 63000, price: 700 },
  { value: 100000, price: 1000 },
  { value: 150000, price: 1500 },
  { value: 200000, price: 2000 },
  { value: 250000, price: 2500 },
  { value: 300000, price: 3000 },
  { value: 400000, price: 4000 },
  { value: 500000, price: 5000 },
];

const googleData = [
  { value: 6000, price: 100 },
  { value: 12000, price: 200 },
  { value: 18000, price: 300 },
  { value: 30000, price: 500 },
  { value: 42000, price: 700 },
  { value: 60000, price: 1000 },
  { value: 90000, price: 1500 },
  { value: 120000, price: 2000 },
  { value: 150000, price: 2500 },
  { value: 180000, price: 3000 },
  { value: 240000, price: 4000 },
  { value: 300000, price: 5000 },
];

const upiData = [
  { value: 7000, price: 100 },
  { value: 14000, price: 200 },
  { value: 21000, price: 300 },
  { value: 35000, price: 500 },
  { value: 49000, price: 700 },
  { value: 70000, price: 1000 },
  { value: 105000, price: 1500 },
  { value: 140000, price: 2000 },
  { value: 175000, price: 2500 },
  { value: 210000, price: 3000 },
  { value: 280000, price: 4000 },
  { value: 350000, price: 5000 },
];
