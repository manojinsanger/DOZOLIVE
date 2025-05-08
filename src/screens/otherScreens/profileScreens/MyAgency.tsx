import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar,
  ActivityIndicator,
  Image,
} from 'react-native';
import CustomHeader from '@/components/profile/CustomHeader';
import { redirect } from '@/utils/navigationService';
import { scaleWidth, scaleHeight, scaleFont } from '@/constants/scaling';
import customColors from '@/constants/styles';
import MainContainer from '@/components/common/mainContainers/MainContainer';
import { searchAgent, joinAgency } from '@/services/agentServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from '@/context/CustomToastContext';
import LinnerGradientCard from '@/components/common/gradientCards/LinnearGradientCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useUser, } from '@/context/UserProvider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { copyToClipboard } from '@/utils/helper';
import ThemedText from '@/components/ThemedText';


const MyAgency = () => {
  const [agentId, setAgentId] = useState<string>('');
  const [agentData, setAgentData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isJoining, setIsJoining] = useState<boolean>(false);
  const { showToast } = useToast();

  const { userAllDetails, refreshUser } = useUser();



  useEffect(() => {
    refreshUser()
  }, [])

  console.log(userAllDetails, 'userAllDetails')

  // Fetch agent on text change
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (agentId.trim() !== '') {
        fetchAgent();
      } else {
        setAgentData(null);
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [agentId]);

  const fetchAgent = async () => {
    setIsLoading(true);
    try {
      const response = await searchAgent(agentId);
      if (response.status === 'success' && response.data) {
        setAgentData(response.data);
      } else {
        setAgentData(null);
      }
    } catch (error: any) {
      console.error('Error fetching agent:', error);
      setAgentData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinAgency = async () => {
    if (!agentData) {
      showToast('error', 'Agent not found with provided ID.');
      return;
    }
    setIsJoining(true);
    try {
      const storedUser = await AsyncStorage.getItem('fbUser');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;

      if (!parsedUser?.liveId) {
        throw new Error('User ID not found. Please log in again.');
      }

      const payload = {
        userId: parsedUser.liveId,
        agentId: agentId,
      };

      const response = await joinAgency(payload);

      if (response.success) {
        // Update user role in AsyncStorage
        const updatedUser = { ...parsedUser, role: 'HOST' };
        await AsyncStorage.setItem('fbUser', JSON.stringify(updatedUser));

        showToast('success', 'You have successfully become a host!');
        await refreshUser()
        redirect('agencycongratulations');
      } else {
        let userFriendlyError = response.error;
        switch (response.error) {
          case 'userId is required':
            userFriendlyError = 'User ID is missing. Please log in again.';
            break;
          case 'agentId is required':
            userFriendlyError = 'Agent ID is missing. Please enter a valid agent ID.';
            break;
          case 'User not found with provided ID':
            userFriendlyError = 'User not found. Please check your account or log in again.';
            break;
          case 'Agent not found with provided ID':
            userFriendlyError = 'Agent not found. Please verify the agent ID and try again.';
            break;
          case 'User must have USER role':
            userFriendlyError = 'Your account is not eligible to join an agency. Contact support.';
            break;
          case 'User is already assigned to an agent':
          case 'User is already assigned to an agent in AgentHost':
            userFriendlyError = 'You are already assigned to an agent.';
            break;
          case 'Agent must have AGENT role':
            userFriendlyError = 'The provided ID does not belong to a valid agent.';
            break;
          default:
            userFriendlyError = 'Failed to join agency. Please try again.';
        }

        showToast('error', userFriendlyError);
      }
    } catch (error: any) {
      console.error('Error joining agency:', error);
      const errorMessage = error.message || 'An error occurred while joining the agency.';
      showToast('error', errorMessage);
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <MainContainer>
      <SafeAreaView style={styles.container}>
        <View style={styles.customHeader}>
          <CustomHeader title="My Agency" textColor="white" />
        </View>

        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Main Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <ThemedText style={styles.methodTitle}>Join an Agency</ThemedText>
            </View>

            <View style={styles.cardContent}>
              <View style={styles.stepIndicator}>
                <View style={styles.iconContainer}>
                  <Ionicons name="person" size={scaleFont(16)} color={customColors.gray700} />
                </View>

                <ThemedText style={styles.stepTitle}>Enter Agent ID</ThemedText>
              </View>

              {/* Input Field with Icon */}
              <View style={styles.inputWrapper}>
                <TextInput
                  value={agentId}
                  onChangeText={setAgentId}
                  style={styles.input}
                  placeholder="Enter agent's ID number"
                  // placeholderTextColor={customColors.gray500}
                  keyboardType="numeric"
                />
                {isLoading && (
                  <ActivityIndicator
                    size="small"
                    color={customColors.primary || '#6C4BFF'}
                    style={styles.inputLoader}
                  />
                )}
              </View>

              <ThemedText style={styles.inputHelp}>
                The Agent ID will be provided to you by your agent
              </ThemedText>

              {/* Agent Details */}
              {agentData ? (
                <View style={styles.agentDetailsContainer}>
                  <View style={styles.agentCardHeader}>
                    <ThemedText style={styles.agentFoundText}>Agent Found</ThemedText>
                  </View>
                  <View style={styles.agentDetails}>
                    <Image
                      source={{ uri: agentData.profileImage }}
                      style={styles.agentAvatar}
                    />
                    <View style={styles.agentInfo}>
                      <ThemedText style={styles.agentName}>{agentData.name}</ThemedText>
                      <ThemedText style={styles.agentIdText}>
                        ID: {agentData.liveId || agentData.agentId}
                      </ThemedText>
                    </View>
                  </View>
                </View>
              ) : agentId.trim() !== '' && !isLoading ? (
                <View style={styles.noAgentFound}>
                  <ThemedText style={styles.errorText}>No agent found with this ID</ThemedText>
                </View>
              ) : null}

              {/* Button */}
              {
                !agentData ? <TouchableOpacity
                  onPress={handleJoinAgency}
                  style={[
                    styles.button, styles.buttonDisabled
                  ]}
                  disabled={!agentData || isJoining}
                  activeOpacity={0.7}
                >
                  {isJoining ? (
                    <ActivityIndicator
                      size="small"
                      color={customColors.white || '#fff'}
                    />
                  ) : (
                    <ThemedText style={styles.buttonText}>
                      {agentData ? 'Join Now' : 'Enter Valid ID'}
                    </ThemedText>
                  )}
                </TouchableOpacity >
                  :
                  <LinnerGradientCard>
                    <TouchableOpacity onPress={handleJoinAgency}
                      style={[
                        styles.button,
                      ]}
                    >

                      <ThemedText style={styles.buttonText}>
                        Join Now
                      </ThemedText>
                    </TouchableOpacity>
                  </LinnerGradientCard>

              }
            </View>
          </View>
          <View style={[styles.card,]}>
            <View style={styles.cardHeader}>
              <ThemedText style={styles.methodTitle}>Waiting for agent invitation</ThemedText>
            </View>

            <View style={styles.cardContent}>
              <ThemedText style={styles.inputHelp}>
                You are required to provide the agent with your ID and host code
              </ThemedText>

              <View style={styles.notesWrapper}>
                <View>
                  <ThemedText style={{ color: customColors.gray700 }}>User ID: <Text> {userAllDetails?.liveId}</Text>
                    <TouchableOpacity style={{ paddingHorizontal: scaleWidth(10) }} onPress={() => copyToClipboard(userAllDetails?.liveId)}>
                      <FontAwesome name="copy" size={scaleWidth(14)} color="#ccc" />
                    </TouchableOpacity>
                  </ThemedText>
                </View>
                <View>
                  <ThemedText style={{ color: customColors.gray700 }}>Host Code: No. <ThemedText style={styles.notesTitle}> {userAllDetails?.hostCode}</ThemedText>
                    <TouchableOpacity style={{ paddingHorizontal: scaleWidth(10) }} onPress={() => copyToClipboard(userAllDetails?.hostCode)}>
                      <FontAwesome name="copy" size={scaleWidth(14)} color="#ccc" />
                    </TouchableOpacity>
                  </ThemedText>
                </View>
              </View>
            </View>
          </View>

          {/* Notes Section */}
          <View style={styles.notesWrapper}>
            <View style={styles.notesTitleContainer}>
              <View style={styles.notesIcon}>
                <ThemedText style={styles.notesIconText}>!</ThemedText>
              </View>
              <ThemedText style={styles.notesTitle}>Important Information</ThemedText>
            </View>

            <View style={styles.notesTextContainer}>
              <View style={styles.noteItem}>
                <View style={styles.bulletPoint} />
                <ThemedText style={styles.noteText}>
                  After joining the agency, host cannot leave without valid reason
                </ThemedText>
              </View>

              <View style={styles.noteItem}>
                <View style={styles.bulletPoint} />
                <ThemedText style={styles.noteText}>
                  Host cannot join multiple agents simultaneously
                </ThemedText>
              </View>

              <View style={styles.noteItem}>
                <View style={styles.bulletPoint} />
                <ThemedText style={styles.noteText}>
                  Agents cannot join other agents' agencies
                </ThemedText>
              </View>
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
  },
  customHeader: {
    marginTop:
      Platform.OS === 'android'
        ? scaleHeight(StatusBar.currentHeight || 20)
        : scaleHeight(10),
    marginBottom: scaleHeight(5),
    paddingHorizontal: scaleWidth(15),
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: scaleWidth(16),
    paddingBottom: scaleHeight(30),
  },
  card: {
    backgroundColor: customColors.white || '#fff',
    borderRadius: scaleWidth(16),
    marginVertical: scaleHeight(14),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scaleHeight(2) },
    shadowOpacity: 0.08,
    shadowRadius: scaleWidth(8),
    elevation: 4,
    overflow: 'hidden',
  },
  cardHeader: {
    paddingVertical: scaleHeight(14),
    backgroundColor: '#6C4BFF',
    alignItems: 'center',
  },
  methodTitle: {
    fontSize: scaleFont(18),
    fontWeight: '700',
    color: '#FFFFFF',
  },
  cardContent: {
    padding: scaleWidth(20),
  },
  iconContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 2,
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaleHeight(16),
    gap: 6
  },
  stepBadge: {
    width: scaleWidth(24),
    height: scaleWidth(24),
    borderRadius: scaleWidth(12),
    backgroundColor: '#6C4BFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaleWidth(8),
  },
  stepTitle: {
    fontSize: scaleFont(16),
    fontWeight: '600',
    color: customColors.gray800,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaleHeight(6),
  },
  inputLoader: {
    position: 'absolute',
    right: scaleWidth(15),
  },
  input: {
    flex: 1,
    height: scaleHeight(50),
    borderWidth: scaleWidth(1.5),
    borderColor: customColors.gray300 || '#E0E0E0',
    borderRadius: scaleWidth(12),
    paddingHorizontal: scaleWidth(16),
    fontSize: scaleFont(14),
    color: customColors.gray700,
    backgroundColor: '#FAFAFA',
  },
  inputHelp: {
    fontSize: scaleFont(13),
    color: customColors.gray700,
    marginBottom: scaleHeight(20),
  },
  agentDetailsContainer: {
    borderWidth: scaleWidth(1),
    borderColor: customColors.gray200 || '#EEEEEE',
    borderRadius: scaleWidth(12),
    overflow: 'hidden',
    marginBottom: scaleHeight(20),
  },
  agentCardHeader: {
    backgroundColor: '#E9F5FF',
    paddingVertical: scaleHeight(6),
    paddingHorizontal: scaleWidth(12),
  },
  agentFoundText: {
    fontSize: scaleFont(12),
    fontWeight: '600',
    color: '#0077CC',
  },
  agentDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scaleWidth(12),
    backgroundColor: customColors.white || '#FFFFFF',
  },
  agentAvatar: {
    width: scaleWidth(50),
    height: scaleWidth(50),
    borderRadius: scaleWidth(25),
    marginRight: scaleWidth(12),
    borderWidth: scaleWidth(2),
    borderColor: '#E9F5FF',
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: scaleFont(16),
    fontWeight: '600',
    color: customColors.gray900 || '#333',
    marginBottom: scaleHeight(2),
  },
  agentIdText: {
    fontSize: scaleFont(14),
    color: customColors.gray600 || '#666',
  },
  noAgentFound: {
    padding: scaleHeight(12),
    backgroundColor: '#FFF2F2',
    borderRadius: scaleWidth(8),
    marginBottom: scaleHeight(20),
    alignItems: 'center',
  },
  errorText: {
    fontSize: scaleFont(14),
    color: '#FF4040',
    fontWeight: '500',
  },
  button: {
    height: scaleHeight(54),
    borderRadius: scaleWidth(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: customColors.gray300 || '#E0E0E0',
  },
  buttonActive: {
    backgroundColor: '#6C4BFF',
  },
  buttonText: {
    fontSize: scaleFont(16),
    fontWeight: '600',
    color: '#FFFFFF',
  },
  notesWrapper: {
    backgroundColor: '#FFFAF0',
    borderRadius: scaleWidth(12),
    borderWidth: scaleWidth(1),
    borderColor: '#FFE0B2',
    padding: scaleWidth(16),
    marginBottom: scaleHeight(20),
  },
  notesTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaleHeight(12),
  },
  notesIcon: {
    width: scaleWidth(22),
    height: scaleWidth(22),
    borderRadius: scaleWidth(11),
    backgroundColor: '#FF9800',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaleWidth(8),
  },
  notesIconText: {
    color: '#FFFFFF',
    fontSize: scaleFont(14),
    fontWeight: 'bold',
  },
  notesTitle: {
    fontSize: scaleFont(16),
    fontWeight: '600',
    color: customColors.secondary,
  },
  notesTextContainer: {
    paddingLeft: scaleWidth(4),
  },
  noteItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: scaleHeight(10),
  },
  bulletPoint: {
    width: scaleWidth(6),
    height: scaleWidth(6),
    borderRadius: scaleWidth(3),
    backgroundColor: '#FF9800',
    marginTop: scaleHeight(6),
    marginRight: scaleWidth(8),
  },
  noteText: {
    flex: 1,
    fontSize: scaleFont(14),
    color: '#805500',
    lineHeight: scaleHeight(20),
  },
});

export default MyAgency;