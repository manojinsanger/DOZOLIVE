import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import Banner from '../party/Banner';
import LiveCard from './LiveCards';
// import { useRouter } from 'expo-router';
import { getLives } from '../../services/agora';
import SkeletonCard from './SekeletonCard';
import { Dimensions } from 'react-native';
import LiveLoadingCard from '../loading/LiveLoadingCard';
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






const NewLiveCardList: React.FC<LiveCardsListProps> = ({ lives, loading, refreshing, onRefresh }) => {

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.cardList}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            <Banner banners={BannerData} />
            <View style={styles.cardContainer}>
                <LiveLoadingCard />
                <LiveLoadingCard />
                <LiveLoadingCard />
                <LiveLoadingCard />
            </View>
            <Banner banners={BannerData} />
            <LiveLoadingCard />
            <LiveLoadingCard />
            <LiveLoadingCard />
            <LiveLoadingCard />
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

export default NewLiveCardList;


