import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomHeader from '@/components/profile/CustomHeader';
import UnderlinedTabSelector from '@/components/profile/UnderlinedTabSelector';
import LiveMonthlyData from '@/components/livedata/LiveMontlyData';
import LiveDataDescriptionModal from '@/components/livedata/LiveDataDescriptionModal';
import MainContainer from '@/components/common/mainContainers/MainContainer';
import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';
import customColors from '@/constants/styles';

// Assets with fallbacks
import rulesIcon from '@/assets/images/icon/question.png';
import beanIcon from '@/assets/images/bean.png';
import userAvatar from '@/assets/images/icon/user.png';
import ThemedText from '@/components/ThemedText';



const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: customColors.white || '#fff',
  },
  innerContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || scaleHeight(20) : scaleHeight(10),
  },
  border: {
    backgroundColor: customColors.white || '#fff',
    marginHorizontal: scaleWidth(10),
    borderRadius: scaleWidth(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scaleHeight(2) },
    shadowOpacity: 0.1,
    shadowRadius: scaleWidth(4),
    elevation: 3,
  },
  border2: {
    backgroundColor: customColors.white || '#fff',
    marginHorizontal: scaleWidth(15),
    padding: scaleWidth(15),
    marginBottom: scaleHeight(20),
    borderRadius: scaleWidth(16),
  },
  section: {
    padding: scaleWidth(16),
    borderRadius: scaleWidth(16),
    marginBottom: scaleHeight(16),
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scaleHeight(10),
    width: '100%',
  },
  earningsText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: scaleFont(15),
    color:  '#333',
  },
  labelText: {
    textAlign: 'center',
    color: '#666',
    fontSize: scaleFont(13),
  },
  commissionWrapper: {
    borderColor: '#ddd',
    borderWidth: scaleWidth(1),
    borderRadius: scaleWidth(6),
    padding: scaleWidth(10),
    marginVertical: scaleHeight(6),
    backgroundColor:  '#f5f5f5',
  },
  commissionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dataBlock: {
    width: '48%',
    alignItems: 'center',
    padding: scaleWidth(10),
    borderRadius: scaleWidth(5),
    marginVertical: scaleHeight(5),
  },
  ruleIcon: {
    width: scaleWidth(16),
    height: scaleHeight(16),
    resizeMode: 'contain',
    marginLeft: scaleWidth(5),
    marginTop: scaleHeight(2),
  },
  bean: {
    width: scaleWidth(16),
    height: scaleHeight(16),
    resizeMode: 'contain',
    marginRight: scaleWidth(4),
  },
  poster: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: scaleWidth(10),
  },
  posterTitle: {
    fontSize: scaleFont(20),
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: customColors.white || '#fff',
    textAlign: 'center',
    padding: scaleWidth(15),
  },
  host: {
    marginHorizontal: scaleWidth(15),
    marginVertical: scaleHeight(15),
  },
  trophy: {
    width: scaleWidth(24),
    height: scaleHeight(24),
    resizeMode: 'contain',
  },
  avatar: {
    width: scaleWidth(50),
    height: scaleWidth(50),
    borderRadius: scaleWidth(25),
    resizeMode: 'cover',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: scaleHeight(15),
    marginHorizontal: scaleWidth(15),
  },
  profileTextContainer: {
    marginLeft: scaleWidth(10),
    justifyContent: 'center',
  },
  profileName: {
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    color: '#fff',
  },
  profileStatus: {
    fontSize: scaleFont(13),
    color: '#fff',
  },
});

const earningsData = [
  {
    value: (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <ThemedText style={styles.earningsText}>0</ThemedText>
        <Image source={beanIcon} style={styles.bean} />
      </View>
    ),
    label: 'Last diamond income',
  },
  {
    value: <ThemedText style={styles.earningsText}>00:00:00</ThemedText>,
    label: 'My Commission',
  },
  { value: <ThemedText style={styles.earningsText}>0</ThemedText>, label: 'Earning Host NO.' },
  { value: <ThemedText style={styles.earningsText}>3</ThemedText>, label: 'Number of active hosts (Last 7 days)' },
  {
    value: (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={beanIcon} style={styles.bean} />
        <ThemedText style={styles.earningsText}>0</ThemedText>
      </View>
    ),
    label: 'Host Earning',
  },
  {
    label: 'My Commission',
    value: (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={beanIcon} style={styles.bean} />
        <ThemedText style={styles.earningsText}>0</ThemedText>
      </View>
    ),
  },
];

const inviteData = [
  { value: <ThemedText style={styles.earningsText}>0</ThemedText>, label: 'Last diamond income' },
  { value: <ThemedText style={styles.earningsText}>00:00:00</ThemedText>, label: 'My Commission' },
  { value: <ThemedText style={styles.earningsText}>0</ThemedText>, label: 'Earning Host NO.' },
  { value: <ThemedText style={styles.earningsText}>3</ThemedText>, label: 'Number of active hosts (Last 7 days)' },
  { value: <ThemedText style={styles.earningsText}>0</ThemedText>, label: 'Host Earning' },
  { value: <ThemedText style={styles.earningsText}>0</ThemedText>, label: 'My Commission' },
];

const DataBlock: React.FC<{ value: React.ReactNode; label: string }> = ({ value, label }) => (
  <View style={styles.dataBlock}>
    <ThemedText style={styles.labelText}>{label}</ThemedText>
    {typeof value === 'string' ? <ThemedText style={{ alignItems: 'center' }}>{value}</ThemedText> : value}
  </View>
);

const DailyDataContent = ({
  selectedDate,
  setShowDatePicker,
  showModal,
  setShowModal,
}: {
  selectedDate: Date | null;
  setShowDatePicker: (value: boolean) => void;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}) => (
  <>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: scaleWidth(10) }}>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={{ flexDirection: 'row', alignItems: 'center' }}
        accessibilityLabel="Select Date"
      >
        <ThemedText
          style={{
            fontSize: scaleFont(14),
            color:'#555',
            marginRight: scaleWidth(6),
          }}
        >
          {selectedDate ? selectedDate.toLocaleDateString() : 'Select Date'}
        </ThemedText>
        <ThemedText
          style={{
            fontSize: scaleFont(18),
            color: customColors.primary || '#007BFF',
          }}
        >
          📅
        </ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setShowModal(true)}
        accessibilityLabel="Show Rules"
      >
        <Image source={rulesIcon} style={styles.ruleIcon} />
      </TouchableOpacity>
    </View>

    <View style={styles.dataRow}>
      <View>
        <ThemedText style={styles.earningsText}>💎 0</ThemedText>
        <ThemedText style={styles.labelText}>Total diamond income</ThemedText>
      </View>
    </View>

    <View style={styles.commissionWrapper}>
      <View style={styles.commissionContainer}>
        {earningsData.slice(0, 6).map((item, index) => (
          <DataBlock key={index} value={item.value} label={item.label} />
        ))}
      </View>
    </View>

    <View style={styles.commissionWrapper}>
      <View style={styles.commissionContainer}>
        {inviteData.slice(0, 6).map((item, index) => (
          <DataBlock key={index} label={item.label} value={item.value} />
        ))}
      </View>
    </View>

    <View style={styles.commissionWrapper}>
      <View style={styles.commissionContainer}>
        <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <ThemedText style={[styles.earningsText, { fontWeight: 'bold' }]}>0</ThemedText>
          <ThemedText style={styles.labelText}>New Fans</ThemedText>
        </View>
      </View>
    </View>
  </>
);

const LiveData = () => {
  const [activeTab, setActiveTab] = useState('Daily data');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onDateChange = (event: any, date?: Date) => {
    setShowDatePicker(Platform.OS === 'ios'); // Keep picker open on iOS
    if (event.type === 'dismissed' || !date) {
      return;
    }
    setSelectedDate(date);
  };

  return (
    <MainContainer>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
          <CustomHeader title="Live Data" textColor={customColors.white || '#fff'} />
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: scaleHeight(20) }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.profileHeader}>
              <Image style={styles.avatar} source={userAvatar} />
              <View style={styles.profileTextContainer}>
                <ThemedText style={styles.profileName}>Manoj</ThemedText>
                <ThemedText style={styles.profileStatus}>Unverified</ThemedText>
              </View>
            </View>

            <View style={styles.border}>
              <View style={styles.section}>
                <UnderlinedTabSelector
                  tabs={['Daily data', 'Monthly data']}
                  activeTab={activeTab}
                  onTabPress={setActiveTab}
                  containerStyle={{ marginBottom: scaleHeight(10) }}
                />

                {activeTab === 'Daily data' && (
                  <DailyDataContent
                    selectedDate={selectedDate}
                    setShowDatePicker={setShowDatePicker}
                    showModal={showModal}
                    setShowModal={setShowModal}
                  />
                )}
                {activeTab === 'Monthly data' && <LiveMonthlyData />}
              </View>
            </View>
          </ScrollView>

          {showDatePicker && (
            <DateTimePicker
              value={selectedDate || new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'inline' : 'default'}
              onChange={onDateChange}
            />
          )}

          <LiveDataDescriptionModal visible={showModal} onClose={() => setShowModal(false)}>
            <ThemedText style={{ fontSize: scaleFont(14), color: '#333', marginBottom: scaleHeight(10) }}>
              1. Live diamond income: Only the income from gifting during the live broadcast is counted, excluding the income from any rewards.
            </ThemedText>
            <ThemedText style={{ fontSize: scaleFont(14), color: '#333', marginBottom: scaleHeight(10) }}>
              2. Party diamond income: Only the income from gifting during the party room is counted, excluding the income from any rewards.
            </ThemedText>
            <ThemedText style={{ fontSize: scaleFont(14), color: '#333', marginBottom: scaleHeight(10) }}>
              3. E-hours: Means effective hours, continuously 60 Mins living time will be counted as one E-hour.
            </ThemedText>
            <ThemedText style={{ fontSize: scaleFont(14), color:'#333', marginBottom: scaleHeight(10) }}>
              4. E-days: Means effective days, there is at least one E-hour in one day will be counted as one E-day.
            </ThemedText>
            <ThemedText style={{ fontSize: scaleFont(14), color: '#333', marginBottom: scaleHeight(10) }}>
              5. Time zone: UTC + 8;
            </ThemedText>
            <ThemedText style={{ fontSize: scaleFont(14), color: '#333', marginBottom: scaleHeight(10) }}>
              6. The data of the day is updated in real time, and there will be a 5 Mins delay.
            </ThemedText>
          </LiveDataDescriptionModal>
        </View>
      </View>
    </MainContainer>
  );
};

export default LiveData;