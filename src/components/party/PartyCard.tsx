import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import  ThemedText  from '../ThemedText';
import { PartyCardProps } from '@/types/types';
import customColors from '@/constants/styles';
import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';
import IndianFlag from '@/assets/images/icon/indianFlag.png';

const PartyCard: React.FC<PartyCardProps> = ({ title, image, isLive, location, userCount, hosts, onPress }) => {
    const { width } = useWindowDimensions();
    const cardWidth = Math.min(scaleWidth(220), width / 2 - scaleWidth(16));
    const mainImage = hosts && hosts.length === 1 ? hosts[0].profilePhoto : image;

    return (
        <TouchableOpacity style={[styles.cardContainer, { width: cardWidth }]} onPress={onPress}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: mainImage }}
                    style={[styles.cardImage, { height: cardWidth }]}
                />
                {isLive && (
                    <View style={styles.liveTag}>
                        <Text style={styles.liveText}>LIVE</Text>
                    </View>
                )}
                <View style={styles.userCountContainer}>
                    <Text style={styles.userCountText}>{userCount}</Text>
                </View>


                <View style={styles.hostContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: scaleWidth(8) }}>
                        {hosts && hosts.length > 1 && (
                            hosts.map((host, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.hostIconContainer,
                                        { zIndex: hosts.length - index },
                                    ]}
                                >
                                    <Image
                                        source={{ uri: host.profilePhoto }}
                                        style={styles.hostImage}
                                    />
                                    <Text style={styles.hostGenderIcon}>
                                        {host.gender === 'male' ? '♂' : '♀'}
                                    </Text>
                                </View>
                            ))
                        )}
                    </View>
                    <View style={styles.contentContainer}>
                        <Image source={IndianFlag} style={{width:scaleWidth(15),height:scaleWidth(15)}} />
                        <ThemedText style={styles.title}>
                            {hosts && hosts.length === 1 ? (
                                <>
                                    {hosts[0].name}
                                    <Text> {hosts[0].gender === 'male' ? '♂' : '♀'}</Text>
                                </>
                            ) : (
                                title
                            )}
                        </ThemedText>
                        {/* <ThemedText type="body" style={styles.location}>
                            <FontAwesome6
                                name="location-dot"
                                size={scaleFont(12)}
                                style={styles.locationIcon}
                            />
                            <ThemedText type="body" style={[styles.location,{marginLeft: scaleWidth(6)}]}>
                                {location}
                            </ThemedText>
                        </ThemedText> */}
                    </View>
                </View>

            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        margin: scaleWidth(4),
        borderRadius: scaleWidth(10),
        overflow: 'hidden',
    },
    imageContainer: {
        position: 'relative',
    },
    cardImage: {
        width: '100%',
        borderWidth: scaleWidth(2),
        borderColor: '#fff',
        borderRadius: scaleWidth(10),
        resizeMode: 'cover',
    },
    liveTag: {
        position: 'absolute',
        top: scaleHeight(10),
        left: scaleWidth(10),
        backgroundColor: '#e63946',
        borderRadius: scaleWidth(12),
        paddingHorizontal: scaleWidth(10),
        paddingVertical: scaleHeight(4),
    },
    liveText: {
        color: '#fff',
        fontSize: scaleFont(12),
        fontWeight: '600',
    },
    userCountContainer: {
        position: 'absolute',
        top: scaleHeight(5),
        right: 0,
        borderBottomLeftRadius: scaleWidth(12),
        paddingHorizontal: scaleWidth(10),
        paddingVertical: scaleHeight(4),
    },
    userCountText: {
        color: customColors.white,
        fontSize: scaleFont(12),
        fontWeight: '600',
    },
    contentContainer: {
        paddingHorizontal: scaleWidth(10),
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:scaleWidth(4)
    },
    title: {
        fontSize: scaleFont(12),
        fontWeight: '500',
        color: customColors.white,
        marginTop: scaleHeight(-4),
    },
    location: {
        marginTop: scaleHeight(-8),
        fontSize: scaleFont(10),
        color: customColors.white,
    },
    locationIcon: {
        color: customColors.white,
        paddingRight: scaleWidth(8),

    },
    hostContainer: {
        position: 'absolute',
        bottom: scaleHeight(4),
        left: scaleWidth(1),
        flexDirection: 'column',
    },
    hostIconContainer: {
        marginRight: scaleWidth(-6),
        alignItems: 'center',
    },
    hostImage: {
        width: scaleWidth(28),
        height: scaleHeight(28),
        borderRadius: scaleWidth(15),
        borderWidth: scaleWidth(1),
        borderColor: 'white',
    },
    hostGenderIcon: {
        fontSize: scaleFont(9),
        color: customColors.white,
        position: 'absolute',
        bottom: 0,
        right: scaleWidth(-3),
        backgroundColor: 'rgba(241, 86, 125, 1)',
        borderRadius: scaleWidth(12),
        paddingHorizontal: scaleWidth(3),
        paddingVertical: scaleHeight(2),
    },
    hostName: {
        fontSize: scaleFont(10),
        color: customColors.white,
    },
});

export default PartyCard;