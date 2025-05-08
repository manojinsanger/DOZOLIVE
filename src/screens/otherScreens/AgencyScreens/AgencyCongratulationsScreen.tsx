import CustomHeader from '@/components/profile/CustomHeader';
import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import MainContainer from '@/components/common/mainContainers/MainContainer';
import LottieView from 'lottie-react-native';
import agencyJoinCograts from '@/assets/animations/agencyJoinCograts.json';
import { getAgentDetailsForHost } from '@/services/joinHostService';
import { useUser } from '@/context/UserProvider';

interface AgentDetails {
  agentId: number;
  agentLiveId: number;
  agentProfileImage: string;
  country: string | null;
  createdTime: string;
  gender: string;
  name: string;
  specialId: string;
  userType?: string;
}

interface AgencyCongratulationsScreenProps {
  data?: AgentDetails;
}

const AgencyCongratulationsScreen: React.FC<AgencyCongratulationsScreenProps> = () => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  // State management
  const [data, setData] = useState<AgentDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userAllDetails } = useUser();

  // Fetch agent details
  useEffect(() => {
    const fetchAgentDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getAgentDetailsForHost(userAllDetails.liveId);
        setData(response);
      } catch (error) {
        console.error('Error fetching agent details:', error);
        setError('Failed to load agent details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAgentDetails();
  }, [userAllDetails.liveId]);

  // Animation effect
  useEffect(() => {
    if (!loading && !error && data) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [loading, error, data]);

  // Retry fetching data
  const handleRetry = () => {
    setLoading(true);
    setError(null);
    const fetchAgentDetails = async () => {
      try {
        const response = await getAgentDetailsForHost(userAllDetails.liveId);
        setData(response);
      } catch (error) {
        setError('Failed to load agent details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchAgentDetails();
  };

  // Fallback values
  const userName = data?.name || 'User';
  const userType = data?.userType || 'Host';
  const agentSpecialId = data?.specialId || data?.agentLiveId?.toString() || 'Unknown';
  const date = data?.createdTime
    ? new Date(data.createdTime).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    : new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  const profileImage = data?.agentProfileImage || 'https://via.placeholder.com/42';

  // Loading UI
  if (loading) {
    return (
      <MainContainer>
        <SafeAreaView style={styles.container}>
          <View style={styles.bg}>
            <CustomHeader title="My Agency" textColor="white" />
          </View>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6B66FF" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        </SafeAreaView>
      </MainContainer>
    );
  }

  // Error UI
  if (error) {
    return (
      <MainContainer>
        <SafeAreaView style={styles.container}>
          <View style={styles.bg}>
            <CustomHeader title="My Agency" textColor="white" />
          </View>
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </MainContainer>
    );
  }

  // Main Content
  return (
    <MainContainer>
      <SafeAreaView style={styles.container}>
        <View style={styles.bg}>
          <CustomHeader title="My Agency" textColor="white" />
        </View>

        {/* Gradient Background */}
        <View style={styles.gradientBackground} />

        {/* Main Content */}
        <View style={styles.content}>
          <Animated.View
            style={[
              styles.card,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {/* Lottie Animation */}
            <View style={styles.animationContainer}>
              <LottieView
                source={agencyJoinCograts}
                autoPlay
                loop
                style={styles.animation}
              />
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.greeting}>
                Welcome <Text style={styles.userName}>{userAllDetails.name}</Text>!
              </Text>

              <Text style={styles.userType}>
                <FontAwesome name="star" size={scaleFont(14)} color="#FFC531" />
                YOU ARE NOW {userType}
                <FontAwesome name="star" size={scaleFont(14)} color="#FFC531" />
              </Text>

              <View style={styles.messageBubble}>
                <Text style={styles.message}>
                  We're excited to have you join our agency! Together, we'll achieve great success and create a powerful partnership.
                </Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.agencyInfo}>
                <View style={styles.infoRow}>
                  <View style={styles.profileContainer}>
                    <View style={styles.profileIcon}>
                      <Image
                        source={{ uri: profileImage }}
                        style={styles.profileImage}
                        resizeMode="cover"
                      />
                    </View>
                    <Text style={styles.userNameText}>{userName}</Text>
                  </View>
                </View>

                <View style={styles.infoItem}>
                  <FontAwesome name="id-badge" size={scaleFont(14)} color="#6B66FF" />
                  <Text style={styles.infoText}>
                    {agentSpecialId === 'Unknown'
                      ? `Agency ID: ${agentSpecialId}`
                      : `Agent Special ID: ${agentSpecialId}`}
                  </Text>
                </View>

                <View style={styles.infoItem}>
                  <FontAwesome name="calendar" size={scaleFont(14)} color="#6B66FF" />
                  <Text style={styles.infoText}>Joined: {date}</Text>
                </View>
              </View>
            </View>

            <View style={styles.cardFooter}>
              <View style={styles.badgeContainer}>
                <View style={styles.badge}>
                  <FontAwesome name="check" size={scaleFont(24)} color="#fff" />
                </View>
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            </View>
          </Animated.View>
        </View>
      </SafeAreaView>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  bg: {
    zIndex: 100,
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#6B66FF',
    opacity: 0.05,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(20),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: scaleHeight(10),
    fontSize: scaleFont(16),
    color: '#6B66FF',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(20),
  },
  errorText: {
    fontSize: scaleFont(16),
    color: '#FF4D4D',
    textAlign: 'center',
    marginBottom: scaleHeight(20),
  },
  retryButton: {
    backgroundColor: '#6B66FF',
    paddingVertical: scaleHeight(12),
    paddingHorizontal: scaleWidth(24),
    borderRadius: scaleWidth(8),
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: scaleFont(16),
    fontWeight: '600',
  },
  animationContainer: {
    position: 'absolute',
    top: -scaleHeight(30),
    alignSelf: 'center',
    width: scaleWidth(160),
    height: scaleHeight(160),
    zIndex: 10,
  },
  animation: {
    width: '100%',
    height: '100%',
  },
  card: {
    width: '98%',
    backgroundColor: '#FFFFFF',
    borderRadius: scaleWidth(20),
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    marginBottom: scaleHeight(20),
  },
  cardBody: {
    padding: scaleWidth(24),
  },
  greeting: {
    fontSize: scaleFont(18),
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
    marginBottom: scaleHeight(4),
  },
  userName: {
    fontWeight: '700',
    color: '#6B66FF',
  },
  userType: {
    fontSize: scaleFont(14),
    color: '#555',
    textAlign: 'center',
    marginBottom: scaleHeight(20),
  },
  messageBubble: {
    backgroundColor: 'rgba(107, 102, 255, 0.08)',
    borderRadius: scaleWidth(16),
    padding: scaleWidth(16),
    marginBottom: scaleHeight(24),
    paddingHorizontal: 10,
  },
  message: {
    fontSize: scaleFont(15),
    color: '#444',
    lineHeight: scaleHeight(22),
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: scaleHeight(16),
  },
  agencyInfo: {
    paddingVertical: scaleHeight(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scaleHeight(16),
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileIcon: {
    width: scaleWidth(42),
    height: scaleWidth(42),
    borderRadius: scaleWidth(21),
    backgroundColor: '#6B66FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaleWidth(12),
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: scaleWidth(21),
  },
  userNameText: {
    fontSize: scaleFont(16),
    fontWeight: '500',
    color: '#333',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaleHeight(10),
  },
  infoText: {
    fontSize: scaleFont(14),
    color: '#555',
    marginLeft: scaleWidth(10),
  },
  cardFooter: {
    alignItems: 'center',
    backgroundColor: '#6B66FF',
    paddingVertical: scaleHeight(16),
  },
  badgeContainer: {
    alignItems: 'center',
  },
  badge: {
    width: scaleWidth(44),
    height: scaleWidth(44),
    borderRadius: scaleWidth(22),
    backgroundColor: '#FFC531',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scaleHeight(6),
  },
  verifiedText: {
    color: 'white',
    fontSize: scaleFont(14),
    fontWeight: '600',
  },
});

export default AgencyCongratulationsScreen;