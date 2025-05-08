import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import Banner from '../party/Banner';
import LiveCard from './LiveCards';
// import { useRouter } from 'expo-router';
import { getLives } from '../../services/agora';
import SkeletonCard from './SekeletonCard';
import { Dimensions } from 'react-native';
// import NoSearchScreen from '@/components/blank_state/NoSearchScreen';


type BannerProp = {
    text: string,
    imageUrl?: string,
    image?: string,
    path?: string
}

const BannerData: BannerProp[] = [
    {
        text: 'Agent Recruiting',
        image: require('../../assets/images/agent_banner.png'),
        path: "agentRecruiting",
    },
    {
        text: 'Experience the Thrill of Exclusive VIP Parties!',
        imageUrl: 'https://images.pexels.com/photos/1137511/pexels-photo-1137511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        text: 'Celebrate Life at Stunning Event Venues!',
        imageUrl: 'https://images.pexels.com/photos/3473085/pexels-photo-3473085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        text: 'Unforgettable Moments, Every Single Day!',
        imageUrl: 'https://images.pexels.com/photos/3345876/pexels-photo-3345876.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
        text: 'Join Us and Make Every Night Magical!',
        imageUrl: 'https://images.pexels.com/photos/4552852/pexels-photo-4552852.jpeg'
    },
];



const liveCardData: LiveCardData[] = [
    {
        title: 'Ananya Sharma',
        image: 'https://images.pexels.com/photos/1484989/pexels-photo-1484989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        tags: ['Host'],
        country: 'IN',
    },
    {
        title: 'Priya Verma',
        image: 'https://images.pexels.com/photos/19904346/pexels-photo-19904346/free-photo-of-a-woman-in-green-and-gold-jewelry.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        tags: ['New'],
        country: 'IN',
    },
    {
        title: 'Sanya Gupta',
        image: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        tags: ['Hot Chat'],
        country: 'IN',
    },
    {
        title: 'Ritika Mehta',
        image: 'https://images.pexels.com/photos/27155552/pexels-photo-27155552/free-photo-of-beautiful-indian-bride-with-traditional-dresses-and-makeup.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        tags: ['Host'],
        country: 'IN',
    },
    {
        title: 'Neha Patel',
        image: 'https://images.pexels.com/photos/18307935/pexels-photo-18307935/free-photo-of-smiling-girl-in-traditional-clothing-and-crown.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        tags: ['New'],
        country: 'IN',
    },
    {
        title: 'Simran Kaur',
        image: 'https://images.pexels.com/photos/12995512/pexels-photo-12995512.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        tags: ['Hot Chat'],
        country: 'IN',
    },
    {
        title: 'Meera Reddy',
        image: 'https://images.pexels.com/photos/16605844/pexels-photo-16605844/free-photo-of-portrait-of-an-indian-woman-smiling.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        tags: ['Host'],
        country: 'IN',
    },
    {
        title: 'Aisha Roy',
        image: 'https://images.pexels.com/photos/1484989/pexels-photo-1484989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        tags: ['New'],
        country: 'IN',
    },
    {
        title: 'Shreya Iyer',
        image: 'https://images.pexels.com/photos/19904346/pexels-photo-19904346/free-photo-of-a-woman-in-green-and-gold-jewelry.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        tags: ['Hot Chat'],
        country: 'IN',
    },
    {
        title: 'Srishti Patel',
        image: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        tags: ['Host'],
        country: 'IN',
    },
    {
        title: 'Pooja Choudhary',
        image: 'https://images.pexels.com/photos/18307935/pexels-photo-18307935/free-photo-of-smiling-girl-in-traditional-clothing-and-crown.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        tags: ['New'],
        country: 'IN',
    },
    {
        title: 'Pooja Choudhary',
        image: 'https://images.pexels.com/photos/18307935/pexels-photo-18307935/free-photo-of-smiling-girl-in-traditional-clothing-and-crown.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        tags: ['New'],
        country: 'IN',
    },
];






const LiveCardsList: React.FC<LiveCardsListProps> = ({ lives, loading, refreshing, onRefresh }) => {
    // const router = useRouter();
    const [, setLives] = useState<LiveSession[]>([]);
    const [, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [query, setQuery] = useState<string>("");

    const fetchLives = useCallback(async () => {
        // page: number, limit: number, search: string
        setLoading(true);
        setError(null);

        try {
            const response = await getLives();
            // axio.get(
            //     `/api/live/all?page=${page}&limit=${limit}&search=${search}`
            // );
            // setLives(response.results || []);
            // setTotalPages(response.totalPages);
        } catch (err: any) {
            setError(err.response?.data?.error || "Failed to fetch live sessions.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // fetchLives();
    }, [fetchLives]);

    const handlePress = useCallback((index: number, baseLiveId: number, channelName: string) => {
        // router.push(`/hosts/${String(123442)}/${channelName}`);
    }, []);

    if (loading) {
        return <ScrollView
            style={styles.container}
            contentContainerStyle={styles.cardList}
            showsVerticalScrollIndicator={false}
        >
            <Banner banners={BannerData} />
            <View style={styles.cardContainer}>
                {liveCardData.slice(0, 4).map((card, index) => (
                    <SkeletonCard key={index} />
                ))}
            </View>
            <Banner banners={BannerData} />
            {/* <View style={styles.cardContainer}>
                {liveCardData.slice(4).map((card, index) => (
                    <SkeletonCard key={index} />
                ))}
            </View> */}
        </ScrollView>;
    }

    if (!lives?.length && !loading) {
        return (
            <ScrollView
                contentContainerStyle={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                {/* <NoSearchScreen /> */}
            </ScrollView>
        );
    }
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.cardList}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            <Banner banners={BannerData} />
            <View style={styles.cardContainer}>
                {lives && lives.length > 0
                    ? lives.slice(0, 4).map((card, index) => (
                        <LiveCard
                            key={index}
                            name={card.title || 'Untitled'}
                            image={card.image}
                            tag={card.tags?.[0] || ''}
                            country={'IN'}
                            onPress={() => handlePress(index, 153253211, card.channelName)}
                        />
                    ))
                    : Array(4)
                        .fill(null)
                        .map((_, index) => <SkeletonCard key={index} />)}
            </View>
            <Banner banners={BannerData} />
            <View style={[styles.cardContainer, { marginBottom: 40 }]}>
                {lives && lives.length > 4
                    ? lives.slice(4).map((card, index) => (
                        <LiveCard
                            key={`live-card-${index}`}
                            name={card.title || "Untitled"}
                            image={card.image}
                            tag={card.tags?.[0] || ""}
                            country={"IN"}
                            onPress={() => handlePress(index, 11534531, card.channelName || "")}
                        />
                    ))
                    : Array(8)
                        .fill(null)
                        .map((_, index) => <SkeletonCard key={`skeleton-${index}`} />)}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 5,
        // paddingVertical: 20,
    },
    cardList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    cardContainer: {
        // borderWidth: 1,
        // marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    }
});

export default LiveCardsList;


