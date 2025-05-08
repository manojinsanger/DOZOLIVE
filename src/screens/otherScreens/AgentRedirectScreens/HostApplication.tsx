import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native';
import CustomHeader from '@/components/profile/CustomHeader';
import rulesIcon from '@/assets/images/icon/question.png';
import userIcon from '@/assets/images/icon/user.png';
import userProfileIcon from '@/assets/images/icon/user-profile.png';
import detectiveIcon from '@/assets/images/icon/detective.png';
import policewomanIcon from '@/assets/images/icon/policewoman.png';
import customColors from '@/constants/styles';
import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const mockData = [
  { id: '4997238', name: 'takshdweeppp', level: 'D', hosts: 12, time: '03-21 14:02', image: userIcon },
  { id: '12767478', name: '\uD83C\uDF39simple gi', level: 'C', hosts: 2, time: '02-25 13:53', image: userProfileIcon },
  { id: '13506426', name: '\u2606Mr Surya\uD83D\uDE0E\uD83C\uDDEE\uD83C\uDDF3', level: 'D', hosts: 0, time: '01-17 03:13', image: detectiveIcon },
  { id: '21855685', name: '@Akshu \uD83C\uDDEE\uD83C\uDDF3 POPP', level: 'D', hosts: 7, time: '01-04 02:11', image: policewomanIcon },
  { id: '4997239', name: 'takshdweeppp', level: 'D', hosts: 12, time: '03-21 14:02', image: userIcon },
  { id: '12767479', name: '\uD83C\uDF39simple gi', level: 'C', hosts: 2, time: '02-25 13:53', image: userProfileIcon },
  { id: '13506427', name: '\u2606Mr Surya\uD83D\uDE0E\uD83C\uDDEE\uD83C\uDDF3', level: 'D', hosts: 0, time: '01-17 03:13', image: detectiveIcon },
  { id: '21855686', name: '@Akshu \uD83C\uDDEE\uD83C\uDDF3 POPP', level: 'D', hosts: 7, time: '01-04 02:11', image: policewomanIcon },
];

// Button Components
const AcceptButton: React.FC<{ onPress: () => void }> = ({ onPress }) => {
  const [scaleAnim] = useState(new Animated.Value(1));

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  return (
    <TouchableOpacity
      style={styles.acceptButton}
      onPress={() => {
        animateButton();
        onPress();
      }}
      activeOpacity={0.7}
    >
      <MaterialCommunityIcons name="check" size={16} color={customColors.white} />
      <Text style={styles.buttonText}>Accept</Text>
    </TouchableOpacity>
  );
};

const RejectButton: React.FC<{ onPress: () => void }> = ({ onPress }) => {
  const [scaleAnim] = useState(new Animated.Value(1));

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  return (
    <TouchableOpacity
      style={styles.rejectButton}
      onPress={() => {
        animateButton();
        onPress();
      }}
      activeOpacity={0.7}
    >
      <MaterialCommunityIcons name="close" size={16} color={customColors.white} />
      <Text style={styles.buttonText}>Reject</Text>
    </TouchableOpacity>
  );
};

const AcceptedButton: React.FC = () => (
  <View style={styles.acceptedButton}>
    <MaterialCommunityIcons name="check-circle" size={16} color={customColors.success} />
    <Text style={[styles.buttonText, { color: customColors.success }]}>Accepted</Text>
  </View>
);

const RejectedButton: React.FC = () => (
  <View style={styles.rejectedButton}>
    <MaterialCommunityIcons name="close-circle" size={16} color={customColors.error} />
    <Text style={[styles.buttonText, { color: customColors.error }]}>Rejected</Text>
  </View>
);

const HostApplication = () => {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(mockData);
  const [statusMap, setStatusMap] = useState<{ [key: string]: 'accepted' | 'rejected' | null }>({});

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text === '') {
      setFilteredData(mockData);
    } else {
      setFilteredData(
        mockData.filter(
          (user) =>
            user.name.toLowerCase().includes(text.toLowerCase()) ||
            user.id.includes(text)
        )
      );
    }
  };

  const clearSearch = () => {
    setSearch('');
    setFilteredData(mockData);
  };

  const handleAccept = (id: string) => {
    setStatusMap((prev) => ({ ...prev, [id]: 'accepted' }));
  };

  const handleReject = (id: string) => {
    setStatusMap((prev) => ({ ...prev, [id]: 'rejected' }));
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const status = statusMap[item.id] || null;
    const backgroundColor = index % 2 === 0 ? customColors.white : customColors.white;

    return (
      <View style={[styles.itemContainer, { backgroundColor }]}>
        {/* Avatar */}
        <Image
          source={item.image}
          style={styles.avatar}
          defaultSource={rulesIcon}
          onError={(e) => console.log(`Error loading image for ${item.name}:`, e.nativeEvent.error)}
        />
        {/* Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={styles.idText}>ID: {item.id}</Text>
        </View>
        {/* Actions */}
        <View style={styles.buttonContainer}>
          {status === null && (
            <>
              <AcceptButton onPress={() => handleAccept(item.id)} />
              <RejectButton onPress={() => handleReject(item.id)} />
            </>
          )}
          {status === 'accepted' && <AcceptedButton />}
          {status === 'rejected' && <RejectedButton />}
        </View>
      </View>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No results found</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={customColors.backgroundLight} />
      {/* Fixed Header and Search Bar */}
      <View style={styles.fixedHeader}>
        <CustomHeader title="Host Application" />
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons
            name="magnify"
            size={24}
            color={customColors.textLightTertiary}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchBar}
            placeholder="Search by ID or nickname"
            value={search}
            onChangeText={handleSearch}
            placeholderTextColor={customColors.textLightTertiary}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <MaterialCommunityIcons name="close-circle" size={20} color={customColors.textLightTertiary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.listContainer}>
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListEmptyComponent={renderEmpty}
            contentContainerStyle={styles.listContent}
            nestedScrollEnabled
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customColors.backgroundLight,
  },
  fixedHeader: {
    backgroundColor: customColors.white,
    zIndex: 10,
    paddingTop: StatusBar.currentHeight,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: customColors.white,
    borderRadius: scaleWidth(16),
    paddingHorizontal: scaleWidth(12),
    marginHorizontal: scaleWidth(20),
    marginVertical:scaleHeight(20),
    borderWidth: 1,
    borderColor: customColors.gray300,
  },
  searchIcon: {
    marginRight: scaleWidth(8),
  },
  searchBar: {
    flex: 1,
    paddingVertical: scaleHeight(14),
    fontSize: scaleFont(16),
    color: customColors.textLightPrimary,
  },
  clearButton: {
    padding: scaleWidth(8),
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: scaleHeight(16),
  },
  listContainer: {
    paddingHorizontal: scaleWidth(10),
  },
  // List Item Styles
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scaleWidth(16),
    borderRadius: scaleWidth(12),
    marginBottom: scaleHeight(12),
  },
  avatar: {
    width: scaleWidth(48),
    height: scaleHeight(48),
    borderRadius: scaleWidth(24),
    marginRight: scaleWidth(16),
    borderWidth: 1,
    borderColor: customColors.gray200,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nameText: {
    color: customColors.textLightPrimary,
    fontSize: scaleFont(14),
    fontWeight: '600',
  },
  idText: {
    color: customColors.textLightSecondary,
    fontSize: scaleFont(12),
    marginTop: scaleHeight(4),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: scaleWidth(8),
  },
  // Button Styles
  acceptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745', // Green for Accept
    paddingHorizontal: scaleWidth(8),
    paddingVertical: scaleHeight(4),
    borderRadius: scaleWidth(8),
  },
  rejectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc3545', // Red for Reject
    paddingHorizontal: scaleWidth(8),
    paddingVertical: scaleHeight(4),
    borderRadius: scaleWidth(8),
  },
  acceptedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(8),
    paddingVertical: scaleHeight(4),
    borderRadius: scaleWidth(8),
    borderWidth: 1,
    borderColor: '#28a745',
  },
  rejectedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(8),
    paddingVertical: scaleHeight(4),
    borderRadius: scaleWidth(8),
    borderWidth: 1,
    borderColor: '#dc3545',
  },
  buttonText: {
    marginLeft: scaleWidth(1),
    fontSize: scaleFont(12),
    color: customColors.white,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: scaleHeight(20),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scaleHeight(20),
  },
  emptyText: {
    fontSize: scaleFont(16),
    color: customColors.textLightSecondary,
  },
});

export default HostApplication;