import React, { useState, useRef, useEffect } from 'react';
import {
    View, Text, TouchableOpacity, Image, StyleSheet,
    Dimensions, FlatList, ScrollView,
    Animated
} from 'react-native';
import PlaceHolder11 from '../../assets/images/landing_page/placeholder10.png'
import PlaceHolder12 from '../../assets/images/landing_page/placeholder11.png'
import PlaceHolder13 from '../../assets/images/landing_page/placeholder12.png'
import PlaceHolder14 from '../../assets/images/landing_page/placeholder13.png'

import PlaceHolder21 from '../../assets/images/landing_page/placeholder20.png'
import PlaceHolder22 from '../../assets/images/landing_page/placeholder21.png'
import PlaceHolder23 from '../../assets/images/landing_page/placeholder22.png'
import PlaceHolder24 from '../../assets/images/landing_page/placeholder23.png'

import PlaceHolder31 from '../../assets/images/landing_page/placeholder30.png'
import PlaceHolder32 from '../../assets/images/landing_page/placeholder31.png'
import PlaceHolder33 from '../../assets/images/landing_page/placeholder32.png'
import PlaceHolder34 from '../../assets/images/landing_page/placeholder33.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { replace } from '@/utils/navigationService';


const { width, height } = Dimensions.get('window');

const onboardingData = [
    {
        id: '1',
        title: 'Create and Share your Magic',
        description: 'Unleash your creativity, share your talents, and create stunning videos and live streams without limits.',
        images: [PlaceHolder11, PlaceHolder12, PlaceHolder13, PlaceHolder14],
    },
    {
        id: '2',
        title: 'Create and Share your Magic',
        description: 'Unleash your creativity, share your talents, and create stunning videos and live streams without limits.',
        images: [PlaceHolder21, PlaceHolder22, PlaceHolder23, PlaceHolder24],
    },
    {
        id: '3',
        title: 'Connect with a Global Community',
        description: 'Join millions worldwide. Interact, make friends, and collaborate with creators from all over the globe.',
        images: [PlaceHolder31, PlaceHolder32, PlaceHolder33, PlaceHolder34],
    }
];

export default function Onboarding() {
    const flatListRef = useRef<FlatList>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const animatedValue = useRef(new Animated.Value(0)).current;
    const [fbUser, setFbUser] = useState(null);

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             const storedUser = await AsyncStorage.getItem("fbUser");
    //             if (storedUser) {
    //                 setFbUser(JSON.parse(storedUser));
    //             }
    //         } catch (error) {
    //             console.error("Error fetching Facebook user data:", error);
    //         }
    //     };

    //     fetchUserData();
    // }, []);

    // console.log(fbUser);

    const handleNext = () => {
        if (currentPage < onboardingData.length - 1) {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            Animated.timing(animatedValue, {
                toValue: nextPage,
                duration: 300,
                useNativeDriver: false,
            }).start();
            flatListRef.current?.scrollToIndex({ index: nextPage, animated: true });
        } else {
            replace('/onboard/auth');
        }
    };

    return (
        <View style={styles.scrollContainer}>
            <View style={styles.container}>
                <FlatList
                    ref={flatListRef}
                    data={onboardingData}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    onMomentumScrollEnd={(event) => {
                        const pageIndex = Math.round(event.nativeEvent.contentOffset.x / width);
                        setCurrentPage(pageIndex);
                    }}
                    renderItem={({ item }) => (
                        <ScrollView contentContainerStyle={styles.page}>
                            <View style={styles.imageContainer}>
                                <View style={styles.column}>
                                    <Image source={item.images[0]} style={styles.firstImage} />
                                    <Image source={item.images[1]} style={styles.secondImage} />
                                </View>

                                <View style={styles.column}>
                                    <Image source={item.images[2]} style={styles.secondImage} />
                                    <Image source={item.images[3]} style={styles.firstImage} />
                                </View>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.description}>{item.description}</Text>
                            </View>
                        </ScrollView>
                    )}
                />

                <View style={styles.footer}>
                    <View style={styles.indicatorContainer}>
                        {onboardingData.map((_, index) => {
                            const widthAnim = animatedValue.interpolate({
                                inputRange: onboardingData.map((_, i) => i),
                                outputRange: onboardingData.map((_, i) => (i === index ? 36 : 18)),
                                extrapolate: 'clamp',
                            });
                            const heightAnim = animatedValue.interpolate({
                                inputRange: onboardingData.map((_, i) => i),
                                outputRange: onboardingData.map((_, i) => (i === index ? 6 : 4)),
                                extrapolate: 'clamp',
                            });
                            return (
                                <Animated.View
                                    key={index}
                                    style={[
                                        styles.indicator,
                                        {
                                            width: widthAnim,
                                            height: heightAnim,
                                            backgroundColor: currentPage === index ? '#F1567D' : '#E0E0E0'
                                        }
                                    ]}
                                />
                            );
                        })}
                    </View>

                    <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                        <Text style={styles.nextButtonText}>
                            {currentPage === onboardingData.length - 1 ? 'Get Started' : 'Next'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        // minHeight: height,
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    page: {
        width,
        alignItems: 'flex-start',
        paddingTop: 50,
        marginBottom: 40
    },
    imageContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    column: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
    },
    firstImage: {
        width: 154,
        height: 255,
        borderRadius: 100,
        backgroundColor: 'lightgray',
    },
    secondImage: {
        width: 154,
        height: 154,
        borderRadius: 100,
        backgroundColor: 'lightgray',
    },
    textContainer: {
        paddingTop: 40,
        paddingHorizontal: 20,
        alignItems: 'flex-start',
        width: '100%',
    },
    title: {
        width: '70%',
        color: '#1F1F1F',
        fontFamily: 'DM Sans',
        fontSize: 24,
        fontWeight: '700',
        lineHeight: 38,
        textAlign: 'left',
        marginBottom: 5,
    },
    description: {
        width: '80%',
        color: '#777',
        fontFamily: 'DM Sans',
        fontSize: 18,
        fontWeight: '400',
        lineHeight: 28,
        textAlign: 'left',
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: 30
    },
    indicatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    indicator: {
        width: 18.44,
        height: 4,
        borderRadius: 16,
        backgroundColor: '#E0E0E0',
    },
    activeIndicator: {
        width: 36.881,
        height: 6,
        borderRadius: 16,
        backgroundColor: '#F1567D',
    },
    nextButton: {
        backgroundColor: '#F1567D',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nextButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

