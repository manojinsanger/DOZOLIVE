import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  ActivityIndicator,
  Animated,
  Keyboard,
  ScrollView,
} from 'react-native';
import CustomHeader from '@/components/profile/CustomHeader';
import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';
import customColors from '@/constants/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DarkContentStatusBar from '@/components/statusbar/DarkContentStatusBar';
import { assignUserToHost, fetchRecentHosts } from '@/services/agentServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from '@/context/CustomToastContext';
import MainContainer from '@/components/common/mainContainers/MainContainer';
import LinnerGradientCard from '@/components/common/gradientCards/LinnearGradientCard';

// Types
type User = {
  id: number;
  specialId: string | null;
  time: string;
  data: string;
  status: string;
};

const AddHostButton: React.FC = () => {
  const [userLiveId, setUserLiveId] = useState<string>('');
  const [hostCode, setHostCode] = useState<string>('');
  const [isAssigning, setIsAssigning] = useState<boolean>(false);
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(false);
  const [isUserIdFocused, setIsUserIdFocused] = useState<boolean>(false);
  const [isHostCodeFocused, setIsHostCodeFocused] = useState<boolean>(false);
  const { showToast } = useToast();
  const bounceAnim = useState(new Animated.Value(0))[0];

  // Animation for button press
  const animateButton = () => {
    Animated.sequence([
      Animated.timing(bounceAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(bounceAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const buttonScale = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.95],
  });

  // Fetch history on mount and after assignment
  const loadHistory = async () => {
    setIsLoadingHistory(true);
    try {
      const storedUser = await AsyncStorage.getItem('fbUser');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;

      if (!parsedUser?.liveId) {
        throw new Error('Agent ID not found. Please log in again.');
      }

      const response = await fetchRecentHosts(parsedUser.liveId);

      if (response.success && response.data) {
        setRecentUsers(response.data);
      } else {
        throw new Error(response.error || 'Failed to fetch recent hosts');
      }
    } catch (error: any) {
      console.error('Error fetching recent hosts:', error);
      const errorMessage = error.message || 'Failed to load history. Please try again.';
      showToast('error', errorMessage);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  // Load history on mount
  useEffect(() => {
    loadHistory();
  }, []);

  // Handle assigning user to host
  const handleAssignUserToHost = async () => {
    if (!userLiveId.trim()) {
      showToast('error', 'User ID is required.');
      return;
    }
    if (!hostCode.trim()) {
      showToast('error', 'Host Code is required.');
      return;
    }

    // Hide keyboard
    Keyboard.dismiss();

    // Animate button
    animateButton();

    setIsAssigning(true);
    try {
      // Verify agent's role
      const storedUser = await AsyncStorage.getItem('fbUser');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;

      if (!parsedUser?.liveId) {
        throw new Error('Agent ID not found. Please log in again.');
      }

      if (!parsedUser?.roles?.includes('AGENT')) {
        throw new Error('You must have AGENT role to assign hosts.');
      }

      const payload:any = {
        userLiveId: userLiveId,
        hostCode: hostCode,
        agentLiveId: parsedUser.liveId,
      };


      const response = await assignUserToHost(payload);

      
      if (response.success && response.data) {
        showToast('success', 'User has been successfully converted to a host!');
        setUserLiveId('');
        setHostCode('');
        // Refresh history
        await loadHistory();
      } else {
        let userFriendlyError = response.error;
        switch (response.error) {
          case 'userLiveId is required':
            userFriendlyError = 'User ID is missing. Please enter a valid User ID.';
            break;
          case 'hostCode is required':
            userFriendlyError = 'Host Code is missing. Please enter a valid Host Code.';
            break;
          case 'agentId is required':
            userFriendlyError = 'Agent ID is missing. Please log in again.';
            break;
          case 'User not found with provided liveId':
            userFriendlyError = 'User not found. Please verify the User ID and try again.';
            break;
          case 'Agent not found with provided ID':
            userFriendlyError = 'Agent not found. Please check your account or log in again.';
            break;
          case 'User must have USER role':
            userFriendlyError = 'The selected user is not eligible to become a host. Contact support.';
            break;
          case 'Agent must have AGENT role':
            userFriendlyError = 'Your account is not authorized to assign hosts. Contact support.';
            break;
          case 'User is already assigned to an agent':
          case 'User is already assigned to an agent in AgentHost':
            userFriendlyError = 'This user is already assigned to an agent.';
            break;
          default:
            userFriendlyError = 'Failed to assign user to host. Please try again.';
        }

        showToast('error', userFriendlyError);
      }
    } catch (error: any) {
      console.error('Error assigning user to host:', error);
      const errorMessage = error.message || 'An error occurred while assigning the user to host.';
      showToast('error', errorMessage);
    } finally {
      setIsAssigning(false);
    }
  };

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();

    // Check if date is today
    if (date.toDateString() === today.toDateString()) {
      return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }

    // Check if date is yesterday
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }

    // Otherwise, return standard format
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' }) +
      ', ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Render status badge with appropriate color
  const renderStatusBadge = (status: string) => {
    let badgeColor;
    switch (status.toLowerCase()) {
      case 'active':
        badgeColor = '#4CAF50'; // Green
        break;
      case 'pending':
        badgeColor = '#FF9800'; // Orange
        break;
      case 'inactive':
        badgeColor = '#F44336'; // Red
        break;
      default:
        badgeColor = '#9E9E9E'; // Grey
    }

    return (
      <View style={[styles.statusBadge, { backgroundColor: badgeColor }]}>
        <Text style={styles.statusText}>{status}</Text>
      </View>
    );
  };

  // Determine if button is disabled
  const isButtonDisabled = isAssigning || !userLiveId.trim() || !hostCode.trim();

  return (
    <MainContainer>
      <SafeAreaView style={styles.container}>
        <DarkContentStatusBar />
        <CustomHeader
          title="Add Host"
          textColor="white"
          rightHeader={
            <TouchableOpacity style={styles.headerButton} onPress={loadHistory}>
              <Ionicons name="refresh" size={scaleFont(20)} color="white" />
            </TouchableOpacity>
          }
        />

        {/* ScrollView Wrapper */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={true}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.contentWrapper}>
            {/* Form Card */}
            <View style={styles.formCard}>
              <View style={styles.formHeader}>
                <Ionicons name="person-add" size={scaleFont(16)} color={customColors.primary} />
                <Text style={styles.formTitle}>Assign New Host</Text>
              </View>

              {/* || USER ID */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  User ID <Text style={styles.required}>*</Text>
                </Text>
                <View
                  style={[
                    styles.inputWrapper,
                    isUserIdFocused && styles.inputWrapperFocused,
                  ]}
                >
                  <Ionicons
                    name="id-card-outline"
                    size={scaleFont(16)}
                    color={isUserIdFocused ? customColors.primary : customColors.gray700}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter user ID"
                    placeholderTextColor={customColors.gray600}
                    value={userLiveId}
                    onChangeText={setUserLiveId}
                    onFocus={() => setIsUserIdFocused(true)}
                    onBlur={() => setIsUserIdFocused(false)}
                  />
                  {userLiveId.length > 0 && (
                    <TouchableOpacity
                      style={styles.clearButton}
                      onPress={() => setUserLiveId('')}
                    >
                      <Ionicons name="close-circle" size={scaleFont(16)} color={customColors.gray600} />
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              {/* || HOST CODE */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Host Code <Text style={styles.required}>*</Text>
                </Text>
                <View
                  style={[
                    styles.inputWrapper,
                    isHostCodeFocused && styles.inputWrapperFocused,
                  ]}
                >
                  <Ionicons
                    name="id-card-outline"
                    size={scaleFont(16)}
                    color={isHostCodeFocused ? customColors.primary : customColors.gray700}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter host code"
                    placeholderTextColor={customColors.gray600}
                    value={hostCode}
                    onChangeText={setHostCode}
                    onFocus={() => setIsHostCodeFocused(true)}
                    onBlur={() => setIsHostCodeFocused(false)}
                  />
                  {hostCode.length > 0 && (
                    <TouchableOpacity
                      style={styles.clearButton}
                      onPress={() => setHostCode('')}
                    >
                      <Ionicons name="close-circle" size={scaleFont(16)} color={customColors.gray600} />
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                {isButtonDisabled ? (
                  <TouchableOpacity
                    style={[styles.sendButton, styles.sendButtonDisabled]}
                    onPress={handleAssignUserToHost}
                    disabled={isButtonDisabled}
                  >
                    {isAssigning ? (
                      <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                      <>
                        <Ionicons
                          name="paper-plane"
                          size={scaleFont(18)}
                          color="#FFFFFF"
                          style={styles.buttonIcon}
                        />
                        <Text style={styles.sendButtonText}>Add Host</Text>
                      </>
                    )}
                  </TouchableOpacity>
                ) : (
                  <LinnerGradientCard>
                    <TouchableOpacity
                      style={[styles.sendButton, styles.sendButtonEnabled]}
                      onPress={handleAssignUserToHost}
                      disabled={isButtonDisabled}
                    >
                      {isAssigning ? (
                        <ActivityIndicator size="small" color="#FFFFFF" />
                      ) : (
                        <>
                          <Ionicons
                            name="paper-plane"
                            size={scaleFont(18)}
                            color="#FFFFFF"
                            style={styles.buttonIcon}
                          />
                          <Text style={styles.sendButtonText}>Send Invitation</Text>
                        </>
                      )}
                    </TouchableOpacity>
                  </LinnerGradientCard>
                )}
              </Animated.View>
            </View>

            {/* History Section */}
            <View style={styles.historySection}>
              <View style={styles.historyHeader}>
                <View style={styles.historyTitleWrapper}>
                  <Ionicons name="time" size={scaleFont(18)} color={customColors.primary} />
                  <Text style={styles.historyTitle}>Recently Added Hosts</Text>
                </View>
                <Text style={styles.historySubtitle}>Last 7 days</Text>
              </View>

              {isLoadingHistory ? (
                <View style={styles.loaderContainer}>
                  <ActivityIndicator size="large" color={customColors.primary} />
                  <Text style={styles.loaderText}>Loading history...</Text>
                </View>
              ) : recentUsers.length === 0 ? (
                <View style={styles.emptyStateContainer}>
                  <Ionicons name="people-outline" size={scaleFont(40)} color={customColors.gray500} />
                  <Text style={styles.noHistoryText}>No hosts assigned in the last 7 days</Text>
                  <Text style={styles.emptyStateSubtext}>Newly assigned hosts will appear here</Text>
                </View>
              ) : (
                <>
                  <View style={styles.tableHeader}>
                    <Text style={[styles.tableHeaderText, { flex: 1 }]}>ID</Text>
                    <Text style={[styles.tableHeaderText, { flex: 2 }]}>Name</Text>
                    <Text style={[styles.tableHeaderText, { flex: 2 }]}>Time</Text>
                    <Text style={[styles.tableHeaderText, { flex: 1.5 }]}>Status</Text>
                  </View>

                  <FlatList
                    data={recentUsers}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                      <View style={styles.tableRow}>
                        <Text style={[styles.tableCell, { flex: 1 }]} numberOfLines={1}>
                          {item.specialId !== null ? item.specialId : item.id}
                        </Text>
                        <Text style={[styles.tableCell, { flex: 2 }]} numberOfLines={1}>
                          {item.data}
                        </Text>
                        <Text style={[styles.tableCell, styles.timeCell, { flex: 2 }]}>
                          {formatDate(item.time)}
                        </Text>
                        <View style={[{ flex: 1.5, alignItems: 'flex-start' }]}>
                          {renderStatusBadge(item.status)}
                        </View>
                      </View>
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContentContainer}
                  />
                </>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: scaleHeight(20), // Added for better spacing
  },
  contentWrapper: {
    flex: 1,
    padding: scaleWidth(16),
  },
  headerButton: {
    padding: scaleWidth(8),
    borderRadius: scaleWidth(20),
    backgroundColor: 'rgba(108, 75, 255, 0.1)',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: scaleWidth(12),
    padding: scaleWidth(20),
    borderWidth: 1, // Added subtle border
    borderColor: '#E0E4E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: scaleHeight(16),
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaleHeight(16),
  },
  formTitle: {
    fontSize: scaleFont(14),
    fontWeight: '700',
    color: '#333',
    marginLeft: scaleWidth(8),
  },
  inputContainer: {
    marginBottom: scaleHeight(16),
  },
  label: {
    fontSize: scaleFont(14),
    fontWeight: '600',
    color: '#333',
    marginBottom: scaleHeight(8),
  },
  required: {
    color: '#E53935',
    fontWeight: '700',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: scaleHeight(50),
    backgroundColor: '#F5F7FA',
    borderRadius: scaleWidth(8),
    borderWidth: 1,
    borderColor: '#E0E4E8',
  },
  inputWrapperFocused: {
    borderColor: customColors.primary,
    backgroundColor: 'rgba(108, 75, 255, 0.05)',
  },
  inputIcon: {
    paddingHorizontal: scaleWidth(12),
  },
  input: {
    flex: 1,
    fontSize: scaleFont(15),
    color: '#333',
    paddingVertical: scaleHeight(10),
  },
  clearButton: {
    padding: scaleWidth(8),
  },
  helperTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaleHeight(8),
  },
  helperText: {
    fontSize: scaleFont(13),
    color: customColors.gray700,
    marginLeft: scaleWidth(4),
  },
  sendButton: {
    flexDirection: 'row',
    height: scaleHeight(50),
    borderRadius: scaleWidth(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonEnabled: {
    backgroundColor: 'transparent', // Background handled by LinearGradientCard
  },
  sendButtonDisabled: {
    backgroundColor: customColors.gray400 || '#ccc',
    opacity: 0.6, // Added for visual distinction
  },
  buttonIcon: {
    marginRight: scaleWidth(8),
  },
  sendButtonText: {
    fontSize: scaleFont(16),
    color: '#FFFFFF',
    fontWeight: '600',
  },
  historySection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: scaleWidth(12),
    padding: scaleWidth(16),
    borderWidth: 1, // Added subtle border
    borderColor: '#E0E4E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  historyHeader: {
    marginBottom: scaleHeight(16),
  },
  historyTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyTitle: {
    fontSize: scaleFont(16),
    fontWeight: '700',
    color: '#333',
    marginLeft: scaleWidth(8),
  },
  historySubtitle: {
    fontSize: scaleFont(13),
    color: customColors.gray600,
    marginLeft: scaleWidth(26),
    marginTop: scaleHeight(2),
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: scaleHeight(12),
    paddingHorizontal: scaleWidth(8),
    backgroundColor: '#F5F7FA',
    borderRadius: scaleWidth(8),
    marginBottom: scaleHeight(8),
  },
  tableHeaderText: {
    fontSize: scaleFont(13),
    color: customColors.gray800,
    fontWeight: '600',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scaleHeight(12),
    paddingHorizontal: scaleWidth(8),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tableCell: {
    fontSize: scaleFont(14),
    color: '#333',
  },
  timeCell: {
    color: customColors.gray700,
    fontSize: scaleFont(13),
  },
  statusBadge: {
    paddingHorizontal: scaleWidth(8),
    paddingVertical: scaleHeight(4),
    borderRadius: scaleWidth(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: scaleFont(12),
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: scaleHeight(16),
    fontSize: scaleFont(14),
    color: customColors.gray700,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scaleHeight(40),
  },
  noHistoryText: {
    fontSize: scaleFont(14),
    fontWeight: '600',
    color: customColors.gray800,
    marginTop: scaleHeight(16),
  },
  emptyStateSubtext: {
    fontSize: scaleFont(12),
    color: customColors.gray600,
    marginTop: scaleHeight(8),
  },
  listContentContainer: {
    flexGrow: 1,
  },
});

export default AddHostButton;