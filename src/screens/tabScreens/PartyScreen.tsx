import Header from '@/components/common/Header';
import MainContainer from '@/components/common/mainContainers/MainContainer';
import PartyHeader from '@/components/homePage/PartyHeader';
import PartHeader from '@/components/homePage/PartyHeader';
import Banner from '@/components/party/Banner';
import PartyCard from '@/components/party/PartyCard';
import { scaleHeight } from '@/constants/scaling';
import { BannerProps, PartyCardProps } from '@/types/types';
import { redirect } from '@/utils/navigationService';
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const demoParties = [
    {
        id: '1',
        title: 'DJ Night Party',
        image: 'https://images.pexels.com/photos/801863/pexels-photo-801863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isLive: true,
        location: 'New York City, USA',
        userCount: 125,
        hosts: [
            {
                name: 'John Doe',
                gender: 'male',
                profilePhoto: 'https://randomuser.me/api/portraits/men/1.jpg',
            },
            {
                name: 'John Doe',
                gender: 'male',
                profilePhoto: 'https://randomuser.me/api/portraits/men/1.jpg',
            },
            {
                name: 'John Doe',
                gender: 'male',
                profilePhoto: 'https://randomuser.me/api/portraits/men/1.jpg',
            },
        ],
    },
    {
        id: '2',
        title: 'Beach Bonfire',
        image: 'https://images.pexels.com/photos/801863/pexels-photo-801863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isLive: false,
        location: 'Santa Monica, USA',
        userCount: 89,
        hosts: [
            {
                name: 'Emily Smith',
                gender: 'female',
                profilePhoto: 'https://randomuser.me/api/portraits/women/2.jpg',
            }
        ],
    },
    {
        id: '3',
        title: 'Karaoke Night',
        image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isLive: true,
        location: 'Tokyo, Japan',
        userCount: 200,
        hosts: [
            {
                name: 'Alice Tan',
                gender: 'female',
                profilePhoto: 'https://randomuser.me/api/portraits/women/3.jpg',
            },
            {
                name: 'John Doe',
                gender: 'male',
                profilePhoto: 'https://randomuser.me/api/portraits/men/4.jpg',
            }
        ],
    },
    {
        id: '4',
        title: 'Silent Disco',
        image: 'https://images.pexels.com/photos/801863/pexels-photo-801863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isLive: false,
        location: 'Los Angeles, USA',
        userCount: 150,
        hosts: [
            {
                name: 'Sarah Lee',
                gender: 'female',
                profilePhoto: 'https://randomuser.me/api/portraits/women/4.jpg',
            }
        ],
    },
    {
        id: '5',
        title: 'Rooftop Party',
        image: 'https://images.pexels.com/photos/801863/pexels-photo-801863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isLive: true,
        location: 'London, UK',
        userCount: 300,
        hosts: [
            {
                name: 'Mike Johnson',
                gender: 'male',
                profilePhoto: 'https://randomuser.me/api/portraits/men/2.jpg',
            },
            {
                name: 'Jane Doe',
                gender: 'female',
                profilePhoto: 'https://randomuser.me/api/portraits/women/5.jpg',
            }
        ],
    },
    {
        id: '6',
        title: 'Halloween Bash',
        image: 'https://images.pexels.com/photos/801863/pexels-photo-801863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isLive: true,
        location: 'Paris, France',
        userCount: 500,
        hosts: [
            {
                name: 'Lucas Green',
                gender: 'male',
                profilePhoto: 'https://randomuser.me/api/portraits/men/5.jpg',
            }
        ],
    },
    {
        id: '7',
        title: 'Summer Vibes',
        image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isLive: false,
        location: 'Sydney, Australia',
        userCount: 80,
        hosts: [
            {
                name: 'Anna Williams',
                gender: 'female',
                profilePhoto: 'https://randomuser.me/api/portraits/women/6.jpg',
            }
        ],
    },
    {
        id: '8',
        title: 'New Year Eve Party',
        image: 'https://images.pexels.com/photos/801863/pexels-photo-801863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isLive: true,
        location: 'Berlin, Germany',
        userCount: 650,
        hosts: [
            {
                name: 'Thomas Grey',
                gender: 'male',
                profilePhoto: 'https://randomuser.me/api/portraits/men/6.jpg',
            },
            {
                name: 'Emma Brown',
                gender: 'female',
                profilePhoto: 'https://randomuser.me/api/portraits/women/7.jpg',
            }
        ],
    },
    {
        id: '9',
        title: 'Tropical Escape',
        image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isLive: false,
        location: 'Miami, USA',
        userCount: 220,
        hosts: [
            {
                name: 'Oliver Davis',
                gender: 'male',
                profilePhoto: 'https://randomuser.me/api/portraits/men/7.jpg',
            }
        ],
    },
    {
        id: '10',
        title: 'Spa Retreat',
        image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isLive: false,
        location: 'Bali, Indonesia',
        userCount: 45,
        hosts: [
            {
                name: 'Chloe Adams',
                gender: 'female',
                profilePhoto: 'https://randomuser.me/api/portraits/women/8.jpg',
            }
        ],
    },
    {
        id: '11',
        title: 'Wine & Dine',
        image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isLive: true,
        location: 'Cape Town, South Africa',
        userCount: 99,
        hosts: [
            {
                name: 'Johnathan Clark',
                gender: 'male',
                profilePhoto: 'https://randomuser.me/api/portraits/men/8.jpg',
            }
        ],
    },
    {
        id: '12',
        title: 'Pop Up Art Gallery',
        image: 'https://images.pexels.com/photos/801863/pexels-photo-801863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isLive: true,
        location: 'Los Angeles, USA',
        userCount: 310,
        hosts: [
            {
                name: 'Sophia Brown',
                gender: 'female',
                profilePhoto: 'https://randomuser.me/api/portraits/women/9.jpg',
            }
        ],
    },
    {
        id: '13',
        title: 'Poolside Party',
        image: 'https://images.pexels.com/photos/801863/pexels-photo-801863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isLive: false,
        location: 'Dubai, UAE',
        userCount: 150,
        hosts: [
            {
                name: 'Daniel Lee',
                gender: 'male',
                profilePhoto: 'https://randomuser.me/api/portraits/men/9.jpg',
            }
        ],
    },
    {
        id: '14',
        title: 'Comic Con',
        image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isLive: false,
        location: 'San Diego, USA',
        userCount: 400,
        hosts: [
            {
                name: 'George Martin',
                gender: 'male',
                profilePhoto: 'https://randomuser.me/api/portraits/men/10.jpg',
            },
            {
                name: 'Ava Green',
                gender: 'female',
                profilePhoto: 'https://randomuser.me/api/portraits/women/10.jpg',
            }
        ],
    },
    {
        id: '15',
        title: 'Food Festival',
        image: 'https://images.pexels.com/photos/801863/pexels-photo-801863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isLive: true,
        location: 'Mexico City, Mexico',
        userCount: 1000,
        hosts: [
            {
                name: 'Liam Carter',
                gender: 'male',
                profilePhoto: 'https://randomuser.me/api/portraits/men/11.jpg',
            }
        ],
    },
    {
        id: '16',
        title: 'Fitness Challenge',
        image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isLive: true,
        location: 'Chicago, USA',
        userCount: 230,
        hosts: [
            {
                name: 'Megan Scott',
                gender: 'female',
                profilePhoto: 'https://randomuser.me/api/portraits/women/11.jpg',
            }
        ],
    },
    {
        id: '17',
        title: 'Jazz Night',
        image: 'https://images.pexels.com/photos/801863/pexels-photo-801863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isLive: false,
        location: 'New Orleans, USA',
        userCount: 300,
        hosts: [
            {
                name: 'Lily Anderson',
                gender: 'female',
                profilePhoto: 'https://randomuser.me/api/portraits/women/12.jpg',
            }
        ],
    },
    {
        id: '18',
        title: 'Craft Beer Fest',
        image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isLive: true,
        location: 'Portland, USA',
        userCount: 500,
        hosts: [
            {
                name: 'Zoe White',
                gender: 'female',
                profilePhoto: 'https://randomuser.me/api/portraits/women/13.jpg',
            }
        ],
    },
    {
        id: '19',
        title: 'Hip Hop Dance Off',
        image: 'https://images.pexels.com/photos/801863/pexels-photo-801863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isLive: false,
        location: 'Las Vegas, USA',
        userCount: 420,
        hosts: [
            {
                name: 'Chris Rock',
                gender: 'male',
                profilePhoto: 'https://randomuser.me/api/portraits/men/12.jpg',
            }
        ],
    },
    {
        id: '20',
        title: 'Circus Extravaganza',
        image: 'https://images.pexels.com/photos/801863/pexels-photo-801863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isLive: true,
        location: 'Copenhagen, Denmark',
        userCount: 800,
        hosts: [
            {
                name: 'Harold White',
                gender: 'male',
                profilePhoto: 'https://randomuser.me/api/portraits/men/13.jpg',
            }
        ],
    }
];



const BannerData = [
    { text: 'Limited Time Offer: Exclusive Access to VIP Parties!', imageUrl: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { text: 'Join the Fun, Live Events Happening Now!', imageUrl: 'https://images.pexels.com/photos/801863/pexels-photo-801863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { text: 'New Events Every Day. Stay Tuned!', imageUrl: 'https://images.pexels.com/photos/801863/pexels-photo-801863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
];


type BannerItem = {
    type: 'banner';
    banners: BannerProps['banners'];
};

type PartyItem = {
    type: 'party';
} & PartyCardProps;

type CombinedDataItem = BannerItem | PartyItem;

const combinedData: CombinedDataItem[] = [
    { type: 'banner', banners: BannerData },
    ...demoParties.slice(0, 5).map((party) => ({
        ...party,
        type: 'party' as const,
        onPress: () => console.log(`Party ${party.title} clicked`),
    })),
    { type: 'banner', banners: BannerData },
    ...demoParties.slice(4).map((party) => ({
        ...party,
        type: 'party' as const,
        onPress: () => console.log(`Party ${party.title} clicked`),
    })),
];


const PartyScreen: React.FC = () => {
    return (
        <MainContainer>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <PartyHeader />
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <Banner banners={BannerData} />
                        {demoParties.slice(0, 4).map((item, index) => (
                            <PartyCard
                                key={index}
                                title={item.title}
                                image={item.image}
                                isLive={item.isLive}
                                location={item.location}
                                userCount={item.userCount}
                                hosts={item.hosts}
                                onPress={() => redirect("audioscreen")}
                            />
                        ))}
                        <Banner banners={BannerData} />
                        {demoParties.slice(4).map((item, index) => (
                            <PartyCard
                                key={index}
                                title={item.title}
                                image={item.image}
                                isLive={item.isLive}
                                location={item.location}
                                userCount={item.userCount}
                                hosts={item.hosts}
                                onPress={() => console.log(item.title)}
                            />
                        ))}
                    </ScrollView>
                </View>
            </SafeAreaView>
        </MainContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: scaleHeight(110),
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
});


export default PartyScreen;



// import { View, Text } from 'react-native'
// import React from 'react'

// const PartyScreen = () => {
//   return (
//     <View>
//       <Text>PartyScreen</Text>
//     </View>
//   )
// }

// export default PartyScreen