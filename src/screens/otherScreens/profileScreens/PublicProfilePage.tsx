import { useRoute, RouteProp } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, Animated, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ProfileData } from '@/types/types';
import PostCard from '@/components/post/PostCard';
import { useEffect, useRef, useState } from 'react';
import HapticTab from '@/components/HapticTab';
import UserDetails from '@/components/profile/UserDetail';
import { ThemedView } from '@/components/ThemedView';
import ThemedText from '@/components/ThemedText';
import LoadingScreen from '@/components/common/Loading';
import { getUserById } from '@/services/userProfile';
import customColors from '@/constants/styles';
import { goBack } from '@/utils/navigationService';
import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';
import UserProfileHeader from '@/components/profile/UserProfileHeader';

const demoPost: Post[] = [
    {
        id: 1,
        postImage: 'https://images.pexels.com/photos/906150/pexels-photo-906150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        description: 'This is an amazing sunset at Jaipur, Rajasthan. The colors of the sky are breathtaking! #Sunset #Nature #Jaipur',
        likeCount: 150000,
        comments: ['Spectacular view!', 'Such a beautiful sunset!', 'Jaipur has the best views!'],
    },
    {
        id: 2,
        postImage: 'https://images.pexels.com/photos/1619312/pexels-photo-1619312.jpeg',
        description: 'The iconic Taj Mahal in Agra, Uttar Pradesh. One of the 7 wonders of the world. #TajMahal #Agra #Heritage',
        likeCount: 230000,
        comments: ['This is truly magnificent!', 'I’ve been there, such an amazing place!', 'Taj Mahal is timeless!'],
    },
    {
        id: 3,
        postImage: 'https://images.pexels.com/photos/1164985/pexels-photo-1164985.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'A beautiful view of the tea gardens in Darjeeling, West Bengal. The misty weather is just perfect! #Darjeeling #TeaGardens #Nature',
        likeCount: 98000,
        comments: ['I love the tea gardens!', 'Darjeeling is so peaceful!', 'Such a calming place!'],
    },
    {
        id: 4,
        postImage: 'https://images.pexels.com/photos/2325447/pexels-photo-2325447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        description: 'The beautiful backwaters of Kerala. Perfect place for a relaxing vacation. #Kerala #Backwaters #Travel',
        likeCount: 175000,
        comments: ['Such serene beauty!', 'I want to visit Kerala so badly!', 'The backwaters are magical!'],
    },
    {
        id: 5,
        postImage: 'https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg',
        description: 'The majestic Himalayas, showing off their beauty in the winter months. #Himalayas #Winter #Snow',
        likeCount: 205000,
        comments: ['Breathtaking view of the mountains!', 'I wish I could see this in person!', 'Such a peaceful place!'],
    },
    {
        id: 6,
        postImage: 'https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        description: 'The streets of Mumbai are always busy, but there’s a charm to this city that never fades. #Mumbai #CityLife #StreetPhotography',
        likeCount: 120000,
        comments: ['Mumbai has its own magic!', 'The hustle and bustle of Mumbai is unmatched!', 'Such an energetic city!'],
    },
    {
        id: 7,
        postImage: 'https://images.pexels.com/photos/1187079/pexels-photo-1187079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        description: 'A vibrant festival of colors in India during Holi. Celebrating with family and friends. #Holi #FestivalOfColors #India',
        likeCount: 300000,
        comments: ['What an amazing celebration!', 'I love the colors of Holi!', 'Such a fun and festive time!'],
    },
    {
        id: 8,
        postImage: 'https://images.pexels.com/photos/1298125/pexels-photo-1298125.jpeg',
        description: 'The stunning Rann of Kutch in Gujarat during the Rann Utsav. A cultural extravaganza. #RannUtsav #Gujarat #CulturalFestival',
        likeCount: 190000,
        comments: ['I’ve heard so much about Rann Utsav!', 'Such a unique festival!', 'Amazing place and celebrations!'],
    },
    {
        id: 9,
        postImage: 'https://images.pexels.com/photos/4126814/pexels-photo-4126814.jpeg',
        description: 'The vibrant and colorful markets of Delhi. A perfect spot to shop for traditional Indian items. #Delhi #Shopping #Markets',
        likeCount: 85000,
        comments: ['Delhi markets are always full of life!', 'Such a great place to buy souvenirs!', 'I love the atmosphere of Delhi!'],
    },
    {
        id: 10,
        postImage: 'https://images.pexels.com/photos/1111356/pexels-photo-1111356.jpeg',
        description: 'A calm boat ride at the famous Dal Lake in Srinagar, Jammu & Kashmir. #DalLake #Srinagar #Peaceful',
        likeCount: 135000,
        comments: ['Dal Lake looks so serene!', 'I’ve always wanted to visit Srinagar!', 'Such a tranquil place!'],
    },
];

interface Post {
    id: number;
    postImage: string;
    description: string;
    likeCount: number;
    comments: string[];
}

type ParamList = {
    ProfileScreen: { id: number; isUserFollowing: boolean };
};

export default function PublicProfilePage() {
    const route = useRoute<RouteProp<ParamList, 'ProfileScreen'>>();
    const { id, isUserFollowing } = route.params;
    const [activeTab, setActiveTab] = useState<'moment' | 'profile'>('profile');
    const [user, setUser] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const scrollY = useRef(new Animated.Value(0)).current;

    const headerBackgroundColor = scrollY.interpolate({
        inputRange: [0, 200],
        outputRange: ['transparent', '#F1567D'],
        extrapolate: 'clamp',
    });

    const headerIconColor = scrollY.interpolate({
        inputRange: [0, 200],
        outputRange: ['white', 'white'],
        extrapolate: 'clamp',
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userData = await getUserById(id);
                if (userData) {
                    setUser(userData.data);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [id]);

    if (loading) {
        return <LoadingScreen size={250} />;
    }

    if (!user) {
        return (
            <ThemedView style={styles.container}>
                <ThemedText style={styles.errorText}>No profile data available.</ThemedText>
            </ThemedView>
        );
    }

    const renderContent = () => {
        if (activeTab === 'moment') {
            return (
                <View style={styles.postsContainer}>
                    {demoPost.map((post) => (
                        <PostCard
                            key={post.id}
                            postImage={post.postImage}
                            description={post.description}
                            likeCount={post.likeCount}
                            comments={post.comments}
                        />
                    ))}
                </View>
            );
        }
        return (
            <View style={styles.detailsContainer}>
                <UserDetails user={user} />
            </View>
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: customColors.white }]}>
            {/* Header */}
            <Animated.View style={[styles.header, { backgroundColor: headerBackgroundColor }]}>
                <View style={styles.headerContent}>
                    <View style={styles.backButtonContainer}>
                        <MaterialIcons
                            name="arrow-back"
                            size={scaleFont(24)}
                            style={styles.icon}
                            onPress={() => goBack()}
                            color="#fff"
                        />
                        <Animated.Text style={[styles.headerTitle, { color: headerIconColor }]}>
                            {user.name || 'Profile'}
                        </Animated.Text>
                    </View>
                    <MaterialIcons
                        name="more-vert"
                        size={scaleFont(24)}
                        style={styles.icon}
                        onPress={() => console.log('More options pressed')}
                        color="#fff"
                    />
                </View>
            </Animated.View>

            <Animated.ScrollView
                style={styles.scrollContent}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
                    useNativeDriver: false,
                })}
                scrollEventThrottle={16}
            >
                <UserProfileHeader data={user} currentUserFollows={isUserFollowing} />

                {/* Tabs */}
                <View style={styles.tabContainer}>

                    <TouchableOpacity
                        style={[
                            styles.tabButton,
                            activeTab === 'profile' && styles.activeTabButton,
                        ]}
                        onPress={() => { HapticTab(); setActiveTab('profile'); }}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                activeTab === 'profile' && styles.activeTabText,
                                { color: customColors.accent },
                            ]}
                        >
                            Detailed Profile
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.tabButton,
                            activeTab === 'moment' && styles.activeTabButton,
                        ]}
                        onPress={() => { HapticTab(); setActiveTab('moment'); }}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                activeTab === 'moment' && styles.activeTabText,
                                { color: customColors.accent },
                            ]}
                        >
                            Moments
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Dynamic Content */}
                {renderContent()}
            </Animated.ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: scaleHeight(105),
        zIndex: 10,
        justifyContent: 'center',
        paddingHorizontal: scaleWidth(10),
    },
    headerContent: {
        marginTop: scaleHeight(50),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    scrollContent: {
        marginTop: scaleHeight(0),
    },
    errorText: {
        fontSize: scaleFont(18),
        textAlign: 'center',
        marginTop: scaleHeight(20),
    },
    postsContainer: {
        padding: scaleWidth(10),
        gap: scaleHeight(15),
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: scaleHeight(10),
    },
    tabButton: {
        paddingVertical: scaleHeight(15),
        width: '50%',
        paddingHorizontal: scaleWidth(15),
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(232, 227, 227)',
    },
    activeTabButton: {
        borderBottomWidth: 2,
        borderBottomColor: '#F1567D',
    },
    tabText: {
        fontSize: scaleFont(16),
        marginHorizontal: 'auto',
        color: '#333',
    },
    activeTabText: {
        color: '#F1567D',
    },
    detailsContainer: {
        marginVertical: scaleHeight(10),
    },
    detailText: {
        fontSize: scaleFont(16),
        marginVertical: scaleHeight(5),
    },
    backButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: scaleFont(20),
        fontWeight: 'bold',
        marginLeft: scaleWidth(10),
    },
    icon: {
        paddingHorizontal: scaleWidth(10),
    },
});