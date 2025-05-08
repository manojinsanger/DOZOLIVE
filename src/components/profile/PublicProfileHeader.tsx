import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Dimensions, Text, ActivityIndicator } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ThemedText from '@/components/ThemedText';
import { ProfileData } from '@/types/types';
import StatItem from './StatItem';
import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';
import customColors from '@/constants/styles';
import { copyToClipboard } from '@/utils/helper';
import ProfileHeaderLevels from './ProfileHeaderLevels';
import LinnerGradientCard from '../common/gradientCards/LinnearGradientCard';
import { useNoOfFollowers } from '@/context/FollowProvider';
import { useFollow } from '@/hooks/useFollow';
import GenderProfile from './GenderLevel';

// Main PublicProfileHeader Component
const PublicProfileHeader = ({ data }: { data: ProfileData; }) => {

    const renderImage = (uri: string | undefined, defaultImage: any) => {
        return uri ? { uri } : defaultImage;
    };

    return (
        <View style={styles.headerContainer}>
            {/* Cover Image with wave pattern */}
            <Image
                source={renderImage(data?.coverImage, require('../../assets/images/profile_assets/default-cover.png'))}
                style={styles.coverImage}
                resizeMode="cover"
            />
            {/* Profile Information Section */}
            <View style={styles.profileSection}>
                {/* Profile Image */}
                <Image
                    source={renderImage(data?.profileImage, require('../../assets/images/profile_assets/default-profile.png'))}
                    style={styles.profileImage}
                    resizeMode="cover"
                />

                {/* Profile Details */}
                <View style={styles.profileInfo}>
                    <ThemedText style={styles.nameText}>{data?.name}   <GenderProfile gender={data.gender} age={data.age} /></ThemedText>
                        
                    
                    <View style={styles.idContainer}>
                        <ThemedText style={styles.idText}>ID: {data?.specialId ? data?.specialId : data?.liveId}</ThemedText>
                        <TouchableOpacity onPress={() => copyToClipboard(String(data?.specialId ? data?.specialId : data?.liveId))} style={styles.copyButton}>
                            <MaterialCommunityIcons
                                name="content-copy"
                                size={scaleWidth(12)}
                                color={customColors.gray400}
                            />
                        </TouchableOpacity>
                        <ProfileHeaderLevels customStyle={{ justifyContent: 'flex-start', marginTop: 0, marginLeft: 10 }} data={data} />
                    </View>
                </View>
            </View>

            {/* Stats Row - Optional based on preference */}
            <View style={styles.statsRow}>
                <View>
                    <Text style={{ fontSize: scaleFont(12), color: customColors.gray500, fontWeight: 700 }}>
                        {data?.following} Following
                    </Text>

                </View>
                <View>
                    <Text style={{ fontSize: scaleFont(12), color: customColors.gray500, fontWeight: 700 }}>
                        {data?.followers} Follower
                    </Text>

                </View>
            </View>
        </View>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: customColors.white,
        borderBottomWidth: 1,
        borderBottomColor: customColors.gray200,
    },
    coverImage: {
        width: width,
        height: width * 0.6, // Reduced height to match reference image
    },
    profileSection: {
        paddingHorizontal: scaleWidth(16),
        // paddingBottom: scaleHeight(12),
    },
    profileImage: {
        width: scaleWidth(90),
        height: scaleWidth(90),
        borderRadius: scaleWidth(50),
        borderWidth: 4,
        borderColor: customColors.white,
        marginTop: -scaleWidth(40), // Half the image rises above the cover
        marginBottom: scaleHeight(8),
    },
    actionButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        right: scaleWidth(8),
        top: scaleHeight(8),
    },
    followButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scaleWidth(10),
        paddingVertical: scaleHeight(6),
        borderRadius: scaleWidth(8),
    },
    followButtonText: {
        fontSize: scaleFont(14),
        fontWeight: '600',
        color: customColors.white,
        height: scaleHeight(20),
    },
    plusIcon: {
        marginRight: scaleWidth(4),
        color: customColors.white,
    },
    iconButton: {
        padding: scaleWidth(8),
        marginHorizontal: scaleWidth(2),
    },
    profileInfo: {
        paddingTop: scaleHeight(1),
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    nameText: {
        fontSize: scaleFont(20),
        fontWeight: 'bold',
        color: customColors.gray700,
    },
    titleText: {
        fontSize: scaleFont(14),
        color: customColors.gray500,
        marginBottom: scaleHeight(12),
    },
    connectionsPreview: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: scaleHeight(8),
    },
    avatarStack: {
        flexDirection: 'row',
        marginRight: scaleWidth(20),
    },
    miniAvatar: {
        width: scaleWidth(26),
        height: scaleWidth(26),
        borderRadius: scaleWidth(13),
        borderWidth: 1,
        borderColor: customColors.white,
        position: 'relative',
    },
    followingText: {
        fontSize: scaleFont(14),
        color: customColors.gray600,
    },
    idContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    idText: {
        fontSize: scaleFont(14),
        fontWeight: '700',
        color: customColors.gray400,
    },
    copyButton: {
        // marginRight: scaleWidth(8),
        padding: scaleWidth(4),
    },
    statsRow: {
        flexDirection: 'row',
        paddingHorizontal: scaleWidth(16),
        marginVertical: scaleHeight(2),
        gap: scaleWidth(15),
        marginBottom: scaleHeight(20),
    },
});

export default PublicProfileHeader;