import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import CustomHeader from '@/components/profile/CustomHeader';
import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';
import customColors from '@/constants/styles';
import { useAppDispatch, useAppSelector } from '@/store/useTypeDispatchSelector';
import { fetchTransactionsRequest } from '@/store/features/wallet/walletSlice';
import { TransactionItem, TransactionWalletType } from '@/store/features/wallet/walletTypes';
import { useUser } from '@/context/UserProvider';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TradingDetails() {
  const [search, setSearch] = useState('');
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [selecting, setSelecting] = useState<'start' | 'end'>('start');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const dispatch = useAppDispatch();
  const { loading, transactions, pagination } = useAppSelector(state => state.wallet);
  const [filteredData, setFilteredData] = useState<TransactionItem[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'received' | 'sent'>('all');
  const [page, setPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const route = useRoute();
  const { walletType } = route.params as { walletType: TransactionWalletType };
  const { userAllDetails } = useUser();

  useEffect(() => {
    dispatch(fetchTransactionsRequest({
      commonId: userAllDetails?.id,
      secondUserID: userAllDetails.specialId || userAllDetails.liveId,
      page,
      walletType,
      search,
      startDate,
      endDate,
      transactionType: activeTab === 'all' ? undefined : activeTab,
    }));
  }, [dispatch, page, walletType, userAllDetails, search, startDate, endDate, activeTab]);

  useEffect(() => {
    if (transactions && transactions.length > 0) {
      if (page === 1) {
        setFilteredData(transactions);
      } else {
        setFilteredData(prev => [...prev, ...transactions]);
      }
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    setIsFetchingMore(false);
  }, [transactions]);

  const handleDayPress = (day: { dateString: string }) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day.dateString);
      setEndDate(null);
      setSelecting('end');
    } else if (selecting === 'end') {
      if (moment(day.dateString).isAfter(startDate)) {
        setEndDate(day.dateString);
        setCalendarVisible(false);
        setPage(1);
        setFilteredData([]);
      } else {
        setStartDate(day.dateString);
        setEndDate(null);
      }
    }
  };

  const getMarkedDates = () => {
    let marked: Record<string, any> = {};
    if (startDate) {
      marked[startDate] = { startingDay: true, color: customColors.primary, textColor: 'white' };
    }
    if (startDate && endDate) {
      const range = getDatesInRange(startDate, endDate);
      range.forEach((date, index) => {
        if (index !== 0 && index !== range.length - 1) {
          marked[date] = { color: '#E8E7FF', textColor: 'black' };
        }
      });
      marked[endDate] = { endingDay: true, color: customColors.primary, textColor: 'white' };
    }
    return marked;
  };

  const getDatesInRange = (start: string, end: string) => {
    const dates = [];
    let current = moment(start);
    const last = moment(end);
    while (current.isSameOrBefore(last)) {
      dates.push(current.format('YYYY-MM-DD'));
      current.add(1, 'days');
    }
    return dates;
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    setPage(1);
    setFilteredData([]);
  };

  const handleTabChange = (tab: 'all' | 'received' | 'sent') => {
    setActiveTab(tab);
    setPage(1);
    setFilteredData([]);
  };

  const handleEndReached = () => {
    if (!isFetchingMore && pagination && page < pagination.totalPages && filteredData.length >= 20) {
      setIsFetchingMore(true);
      setPage(prev => prev + 1);
    }
  };

  const renderItem = ({ item, index }: { item: TransactionItem; index: number }) => {
    const { transaction, sender, receiver } = item;
    const isCredit = receiver?.id === userAllDetails.id;
    const isDebit = sender?.id === userAllDetails.id;
    const isSelfTransection = sender?.id === receiver?.id;

    const amount = transaction.amount;
    const currentBalance = isDebit
      ? transaction.senderCurrentBalance
      : transaction.receiverCurrentBalance;

    const userId = isCredit
      ? (sender?.specialId || sender?.liveId)
      : (receiver?.specialId || receiver?.liveId);
    const formattedAmount = Number(amount).toLocaleString();

    const animatedStyle = {
      opacity: fadeAnim,
      transform: [{
        translateY: fadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0]
        })
      }]
    };

    if (isSelfTransection && walletType === 'SELLER') return null;

    return (
      <Animated.View
        style={[
          styles.itemContainer,
          animatedStyle,
          {
            backgroundColor: index % 2 === 0 ? customColors.white : customColors.gray100
          }
        ]}
      >
        <View style={styles.itemContent}>
          <View style={styles.transactionIconContainer}>
            <View style={[
              styles.iconCircle,
              { backgroundColor: isCredit ? 'rgba(0, 170, 0, 0.1)' : 'rgba(255, 77, 79, 0.1)' }
            ]}>
              <MaterialIcons
                name={isCredit ? "arrow-downward" : "arrow-upward"}
                size={24}
                color={isCredit ? 'green' : 'red'}
              />
            </View>
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.nameText}>
              {isCredit
                ? `Received from ${sender.name || `User`}`
                : `Transfer to ${receiver.name || `User`}`}
            </Text>
            <View style={styles.idContainer}>
              <Text style={styles.idText}>ID: {userId}</Text>
              <View style={styles.dot} />
              <Text style={styles.idText}>
                {moment(transaction.timestamp).format('YYYY-MM-DD')}
              </Text>
            </View>
            <Text style={styles.walletTypeText}>
              {receiver.walletType
                ? receiver.walletType.charAt(0).toUpperCase() + receiver.walletType.slice(1).toLowerCase()
                : 'Coin'} account
            </Text>
          </View>

          <View style={styles.transactionDetails}>
            <Text style={[styles.amountText, { color: isDebit ? 'red' : 'green' }]}>
              {isDebit ? `-₹${formattedAmount}` : `+₹${formattedAmount}`}
            </Text>
            <Text style={styles.timeText}>
              {moment(transaction.timestamp).format('HH:mm:ss')}
            </Text>
            <Text style={styles.balanceText}>Balance: ₹{Number(currentBalance).toLocaleString()}</Text>
          </View>
        </View>
      </Animated.View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <MaterialIcons name="receipt-long" size={80} color={customColors.gray300} />
      <Text style={styles.emptyTitle}>No Transactions Found</Text>
      <Text style={styles.emptySubtitle}>
        {search || startDate ? 'Try adjusting your filters' : 'Your transaction history will appear here'}
      </Text>
    </View>
  );

  const renderFooter = () => {
    if (isFetchingMore || loading) {
      return (
        <View style={styles.loadingFooter}>
          <ActivityIndicator size="small" color={customColors.primary} />
        </View>
      );
    }
    return null;
  };

  const clearDateFilter = () => {
    setStartDate(null);
    setEndDate(null);
    setCalendarVisible(false);
    setPage(1);
    setFilteredData([]);
  };

  const renderFilterBadge = () => {
    if (startDate || endDate || search) {
      const count = (startDate && endDate ? 1 : 0) + (search ? 1 : 0);
      return (
        <View style={styles.filterBadge}>
          <Text style={styles.filterBadgeText}>{count}</Text>
        </View>
      );
    }
    return null;
  };

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [scaleHeight(140), scaleHeight(100)],
    extrapolate: 'clamp'
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={customColors.primary} barStyle="dark-content" />
      <CustomHeader title="Transaction Details" />

      <Animated.View style={[styles.filterSection, { height: headerHeight }]}>
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <MaterialIcons name="search" size={20} color={customColors.textLightTertiary} style={styles.searchIcon} />
            <TextInput
              style={styles.searchBar}
              placeholder="Search by ID or name"
              value={search}
              onChangeText={handleSearch}
              placeholderTextColor={customColors.textLightTertiary}
            />
            {search ? (
              <TouchableOpacity onPress={() => handleSearch('')}>
                <MaterialIcons name="close" size={20} color={customColors.textLightTertiary} />
              </TouchableOpacity>
            ) : null}
          </View>

          <TouchableOpacity onPress={() => setCalendarVisible(true)} style={styles.dateRangeButton}>
            <MaterialIcons name="date-range" size={22} color={customColors.backgroundDark} />
            {renderFilterBadge()}
          </TouchableOpacity>
        </View>

        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'all' && styles.activeTab]}
            onPress={() => handleTabChange('all')}
          >
            <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>All</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'received' && styles.activeTab]}
            onPress={() => handleTabChange('received')}
          >
            <Text style={[styles.tabText, activeTab === 'received' && styles.activeTabText]}>Received</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'sent' && styles.activeTab]}
            onPress={() => handleTabChange('sent')}
          >
            <Text style={[styles.tabText, activeTab === 'sent' && styles.activeTabText]}>Sent</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Animated.FlatList
        data={filteredData}
        keyExtractor={(item) => String(item.transaction.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmptyState}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        ListFooterComponent={renderFooter}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.3} // Trigger earlier to ensure smooth loading
      />

      <Modal
        isVisible={calendarVisible}
        onBackdropPress={() => setCalendarVisible(false)}
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.modal}
      >
        <View style={styles.calendarContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.calendarTitle}>Select Date Range</Text>
            <TouchableOpacity onPress={() => setCalendarVisible(false)}>
              <MaterialIcons name="close" size={24} color={customColors.backgroundDark} />
            </TouchableOpacity>
          </View>

          <View style={styles.dateSelectionInfo}>
            <View style={styles.dateBox}>
              <Text style={styles.dateLabel}>Start Date</Text>
              <Text style={styles.dateValue}>
                {startDate ? moment(startDate).format('MMM D, YYYY') : 'Select'}
              </Text>
            </View>
            <MaterialIcons name="arrow-forward" size={20} color={customColors.textLightTertiary} />
            <View style={styles.dateBox}>
              <Text style={styles.dateLabel}>End Date</Text>
              <Text style={styles.dateValue}>
                {endDate ? moment(endDate).format('MMM D, YYYY') : 'Select'}
              </Text>
            </View>
          </View>

          <Calendar
            onDayPress={handleDayPress}
            markedDates={getMarkedDates()}
            markingType="period"
            minDate="1990-01-01"
            maxDate={moment().format("YYYY-MM-DD")}
            theme={{
              selectedDayBackgroundColor: customColors.primary,
              todayTextColor: '#FF4D4F',
              arrowColor: customColors.primary,
              monthTextColor: customColors.backgroundDark,
              textDayFontSize: scaleFont(14),
              textMonthFontSize: scaleFont(16),
              textDayHeaderFontSize: scaleFont(12),
              calendarBackground: '#f9f9f9',
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e1e8',
            }}
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={clearDateFilter} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setCalendarVisible(false);
                setPage(1);
                setFilteredData([]);
              }}
              style={styles.applyButton}
              disabled={!startDate || !endDate}
            >
              <Text style={styles.applyButtonText}>Apply Filter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customColors.white,
  },
  filterSection: {
    backgroundColor: customColors.white,
    paddingTop: scaleHeight(16),
    paddingHorizontal: scaleWidth(16),
    borderBottomWidth: 1,
    borderBottomColor: customColors.gray100,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    zIndex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: scaleHeight(16),
    alignItems: 'center',
  },
  searchWrapper: {
    flex: 1,
    height: scaleHeight(48),
    backgroundColor: customColors.gray100,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(12),
    marginRight: scaleWidth(12),
  },
  searchIcon: {
    marginRight: scaleWidth(8),
  },
  searchBar: {
    flex: 1,
    height: '100%',
    color: customColors.textLightPrimary,
    fontSize: scaleFont(14),
  },
  dateRangeButton: {
    height: scaleHeight(48),
    width: scaleWidth(48),
    backgroundColor: customColors.gray100,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  filterBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: customColors.primary,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBadgeText: {
    color: 'white',
    fontSize: scaleFont(10),
    fontWeight: 'bold',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: customColors.gray100,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: scaleHeight(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: customColors.primary,
  },
  tabText: {
    color: customColors.textLightSecondary,
    fontSize: scaleFont(14),
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
    fontWeight: '600',
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: scaleHeight(20),
  },
  itemContainer: {
    backgroundColor: customColors.white,
    borderBottomWidth: 1,
    borderBottomColor: customColors.gray100,
  },
  itemContent: {
    flexDirection: 'row',
    padding: scaleWidth(16),
    alignItems: 'center',
  },
  transactionIconContainer: {
    marginRight: scaleWidth(12),
  },
  iconCircle: {
    width: scaleWidth(44),
    height: scaleWidth(44),
    borderRadius: scaleWidth(22),
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
    marginRight: scaleWidth(12),
  },
  nameText: {
    fontSize: scaleFont(14),
    fontWeight: '600',
    color: customColors.textLightPrimary,
    marginBottom: scaleHeight(4),
  },
  idContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaleHeight(4),
  },
  idText: {
    fontSize: scaleFont(12),
    color: customColors.textLightSecondary,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: customColors.textLightTertiary,
    marginHorizontal: scaleWidth(6),
  },
  walletTypeText: {
    fontSize: scaleFont(12),
    color: customColors.textLightTertiary,
    fontWeight: '500',
  },
  transactionDetails: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  amountText: {
    fontSize: scaleFont(16),
    fontWeight: '700',
    marginBottom: scaleHeight(4),
  },
  timeText: {
    fontSize: scaleFont(12),
    color: customColors.textLightTertiary,
    marginBottom: scaleHeight(4),
  },
  balanceText: {
    fontSize: scaleFont(10),
    color: customColors.textLightSecondary,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  calendarContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: scaleWidth(16),
    paddingBottom: scaleHeight(30),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scaleHeight(16),
  },
  calendarTitle: {
    fontSize: scaleFont(18),
    fontWeight: '600',
    color: customColors.textLightPrimary,
  },
  dateSelectionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scaleHeight(16),
    paddingHorizontal: scaleWidth(12),
  },
  dateBox: {
    flex: 1,
    backgroundColor: customColors.gray100,
    borderRadius: 8,
    padding: scaleWidth(10),
  },
  dateLabel: {
    fontSize: scaleFont(12),
    color: customColors.textLightTertiary,
    marginBottom: scaleHeight(4),
  },
  dateValue: {
    fontSize: scaleFont(14),
    fontWeight: '500',
    color: customColors.textLightPrimary,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scaleHeight(16),
  },
  clearButton: {
    flex: 1,
    padding: scaleHeight(14),
    borderRadius: 12,
    alignItems: 'center',
    marginRight: scaleWidth(8),
    backgroundColor: customColors.gray100,
  },
  clearButtonText: {
    color: customColors.textLightPrimary,
    fontSize: scaleFont(16),
    fontWeight: '500',
  },
  applyButton: {
    flex: 2,
    padding: scaleHeight(14),
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: customColors.primary,
  },
  applyButtonText: {
    color: 'white',
    fontSize: scaleFont(16),
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scaleHeight(100),
  },
  emptyTitle: {
    fontSize: scaleFont(18),
    fontWeight: '600',
    color: customColors.textLightPrimary,
    marginTop: scaleHeight(16),
  },
  emptySubtitle: {
    fontSize: scaleFont(14),
    color: customColors.textLightSecondary,
    marginTop: scaleHeight(8),
    textAlign: 'center',
    paddingHorizontal: scaleWidth(40),
  },
  loadingFooter: {
    paddingVertical: scaleHeight(16),
    alignItems: 'center',
  },
});