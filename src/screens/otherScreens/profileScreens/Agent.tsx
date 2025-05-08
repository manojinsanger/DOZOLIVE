import React, { useEffect, useState } from 'react';
import * as Progress from 'react-native-progress';
import { View, TouchableOpacity, ScrollView, StyleSheet, StatusBar, Image } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import CustomHeader from '@/components/profile/CustomHeader';
import MainContainer from '@/components/common/mainContainers/MainContainer';
import LightContentStatusBar from '@/components/statusbar/LightContentStatusBar';
import LinnerGradientCard from '@/components/common/gradientCards/LinnearGradientCard';
import { fullWidth, scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';
import { redirect } from '@/utils/navigationService';
import customColors from '@/constants/styles';

// Images (assumed WebP for optimization)
import bean from '@/assets/images/bean.png';
import rulesicon from '@/assets/images/icon/question.png';
import LoyaltyIcon from '@/assets/images/icon/loyalty.png';
import PosterBackground from '@/assets/images/poster_moneyBackground.png';
import PhoneBookIcon from '@/assets/images/icon/phone-book.png';
import TrophyIcon from '@/assets/images/icon/trophy.png';
import FinishIcon from '@/assets/images/icon/finish.png';
import Trophy1 from '@/assets/images/icon/trophy1.png'
import User1 from '@/assets/images/icon/user1.png'
import ThemedText from '@/components/ThemedText';
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';
import { fetchhostCount } from '@/store/features/hostCount/hostCountSlice';
import { useAppDispatch, useAppSelector } from '@/store/useTypeDispatchSelector';
// Theme constants for consistency

const Agent = () => {
    const [tooltip, setTooltip] = useState<string | null>(null);

 

    const earningsData = [
        {
            value: (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={bean} style={styles.bean} />
                    <ThemedText style={styles.earningsText}>0</ThemedText>
                </View>
            ),
            label: 'Host Earning',
            tooltip: 'Host income only counts gift income;',
        },
        {
            value: (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={bean} style={styles.bean} />
                    <ThemedText style={styles.earningsText}>0</ThemedText>
                </View>
            ),
            label: 'My Commission',
        },
        { value: '0', label: 'Earning Host NO.' },
        { value: '3', label: 'Number of active hosts (Last 7 days)' },
    ];

    const inviteData = [
        {
            value: (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={bean} style={styles.bean} />
                    <ThemedText style={styles.earningsText}>15,240</ThemedText>
                </View>
            ),
            label: 'Invite agent earning',
            tooltip: 'Invitation agent income only counts gift income',
        },
        {
            value: (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={bean} style={styles.bean} />
                    <ThemedText style={styles.earningsText}>0</ThemedText>
                </View>
            ),
            label: 'My commission',
        },
        { value: '0', label: 'Invite Agent Earning' },
    ];

    const commissionRateText = '6.0%';
    const maxCommissionRate = 20.0;
    const commissionRateValue = parseFloat(commissionRateText) / maxCommissionRate;
    const { coinWalletBalance, BeansWalletBalance, loading: walletLoading, error: walletError } = useAppSelector((state) => state.wallet);
    const DataBlock = ({ value, label, tooltipText }: { value: any; label: any; tooltipText: any }) => (
        <View style={styles.dataBlock}>
            <ThemedText style={styles.earningsText}>{value}</ThemedText>
            <View style={styles.rule}>
                <ThemedText style={styles.labelText}>{label}</ThemedText>
                {tooltipText && (
                    <TouchableOpacity
                        accessibilityLabel="Tooltip"
                        onPress={() => setTooltip(tooltip === tooltipText ? null : tooltipText)}
                    >
                        <Image source={rulesicon} style={styles.ruleIcon} />
                    </TouchableOpacity>
                )}
            </View>
            {tooltip === tooltipText && (
                <View style={styles.tooltip}>
                    <ThemedText style={styles.tooltipText}>{tooltipText}</ThemedText>
                </View>
            )}
        </View>
    );

    
     const dispatch = useAppDispatch()
      useEffect(() => {
        dispatch(fetchhostCount())               
      }, [])
    
      // const walletSelector = useAppSelector((state) => state.wallet) ///destructure 
      const { hostCount, loading: countLoading, error: countError } = useAppSelector((state) => state.hostCount);
 
    return (
        <MainContainer>
            <View style={{ paddingTop: StatusBar.currentHeight }}>
                <LightContentStatusBar />
                <CustomHeader textColor="white" title="Agent" rightHeader={<EvilIcons name="bell" size={24} color="white" />} />
                <ScrollView style={styles.container}>
                    <View style={styles.headerContainer}>
                        {/* Host Card */}
                        <LinnerGradientCard
                            customStyles={styles.card}
                        >
                            <TouchableOpacity
                                style={styles.cardContent}
                                onPress={() => redirect('addhost')}
                                activeOpacity={0.9}
                                accessibilityLabel="Host Card"
                            >
                                <View style={{ display: 'flex', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                    <View style={{ width: scaleWidth(52), height: scaleHeight(50) }}>
                                        <Image source={Trophy1} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                        <ThemedText style={styles.cardTitle}>Host</ThemedText>
                                        <ThemedText style={styles.cardNumber}>{hostCount}</ThemedText>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    style={styles.cardButton}
                                    onPress={() => redirect('addhostbutton')}
                                    activeOpacity={0.7}
                                    accessibilityLabel="Add Host"
                                >
                                    <ThemedText style={styles.cardButtonText}>Add Host</ThemedText>
                                </TouchableOpacity>
                            </TouchableOpacity>
                        </LinnerGradientCard>
                        {/* Agent Card */}
                        <LinnerGradientCard
                            customStyles={styles.card}
                        >
                            <TouchableOpacity
                                style={styles.cardContent}
                                onPress={() => redirect('agentinvite')}
                                activeOpacity={0.9}
                                accessibilityLabel="Agent Card"
                            >
                                <View style={{ display: 'flex', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                    <View style={{ width: scaleWidth(52), height: scaleHeight(50) }}>
                                        <Image source={User1} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                        <ThemedText style={styles.cardTitle}>Agent</ThemedText>
                                        <ThemedText style={styles.cardNumber}>2</ThemedText>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    style={styles.cardButton}
                                    onPress={() => redirect('agentinvitebutton')}
                                    activeOpacity={0.7}
                                    accessibilityLabel="Invite Agent"
                                >
                                    <ThemedText style={styles.cardButtonText}>Invite Agent</ThemedText>
                                </TouchableOpacity>
                            </TouchableOpacity>
                        </LinnerGradientCard>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={styles.sectionRowContainer}>
                            <View style={{ zIndex: 20 }}>
                                <View style={styles.coinBalanceContainer}>
                                    <Image source={LoyaltyIcon} style={styles.coinIcon} />
                                    <ThemedText style={styles.sectionTitle}> Coin balance</ThemedText>
                                </View>
                                <ThemedText style={styles.balanceText}>{coinWalletBalance}</ThemedText>
                            </View>
                            <LinnerGradientCard customStyles={{ width: 80, height: 80, opacity: 0.8, borderRadius: 500, position: 'absolute', right: -30, bottom: -30 }}>
                                <View>

                                </View>
                            </LinnerGradientCard>
                        </View>
                        <View style={styles.sectionRowContainer2}>
                            <View>
                                <ThemedText style={styles.sectionTitle}>
                                    <Image source={bean} style={styles.bean} /> Bean balance
                                </ThemedText>
                                <ThemedText style={styles.balanceText}>{BeansWalletBalance}</ThemedText>
                                <View />
                            </View>
                            <LinnerGradientCard customStyles={{ width: 80, height: 80, opacity: 0.8, borderRadius: 500, position: 'absolute', right: -30, bottom: -30 }}>
                                <View>

                                </View>
                            </LinnerGradientCard>
                        </View>
                    </View>

                    <View style={styles.poster}>
                        <View style={styles.posterOverlay} />
                        <Image source={PosterBackground} style={styles.posterBackground} />
                        <ThemedText style={styles.postertitle}>Agency Earning Manual</ThemedText>
                    </View>

                    <View style={styles.sectionRow}>
                        <TouchableOpacity onPress={() => redirect('hostapplication')}>
                            <LinnerGradientCard customStyles={styles.functionItem}>
                                <Image source={require('../../../assets/images/icon/hostApplication.png.png')} style={styles.functionIcon} />
                                <ThemedText style={styles.functionText}>Host application</ThemedText>
                            </LinnerGradientCard>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => redirect('agentranking')}>
                            <LinnerGradientCard customStyles={styles.functionItem}>
                                <Image source={require('../../../assets/images/icon/ranking.png')} style={styles.functionIcon} />
                                <ThemedText style={styles.functionText}>Agent Ranking</ThemedText>
                            </LinnerGradientCard>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => redirect('activitycenter')}>
                            <LinnerGradientCard customStyles={styles.functionItem}>
                                <Image source={require('../../../assets/images/icon/agent2.png')} style={styles.functionIcon} />
                                <ThemedText style={styles.functionText}>Activity Center</ThemedText>
                            </LinnerGradientCard>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.section}>
                        <ThemedText style={styles.sectionTitle}>Data of the last 30 days</ThemedText>
                        <ThemedText>2025-02-27 ~ 2025-03-29</ThemedText>
                        <View style={styles.commissionRow}>
                            <View style={styles.rule}>
                                <ThemedText>Commission Rate:</ThemedText>
                                <TouchableOpacity onPress={() => redirect('rulespage')}>
                                    <Image source={rulesicon} style={styles.ruleIcon} />
                                </TouchableOpacity>
                            </View>
                            <ThemedText style={styles.commissionRate}>{commissionRateText}</ThemedText>
                        </View>

                        <Progress.Bar
                            progress={commissionRateValue}
                            width={scaleWidth(300)}
                            height={10}
                            style={styles.progressbar}
                            color={customColors.primary}
                        />

                        <ThemedText>Still 984,760 short of next level.</ThemedText>
                        <View style={styles.dataRow}>
                            <View>
                                <ThemedText style={styles.earningsText}>15,240 💎</ThemedText>
                                <ThemedText style={styles.labelText}>Earnings of last 30 days</ThemedText>
                            </View>
                            <View>
                                <ThemedText style={styles.earningsText}>💎 0</ThemedText>
                                <ThemedText style={styles.labelText}>My Commission</ThemedText>
                            </View>
                        </View>

                        <View style={styles.commissionWrapper}>
                            <View style={styles.commissionContainer}>
                                {earningsData.map((item, index) => (
                                    <DataBlock key={index} value={item.value} label={item.label} tooltipText={item.tooltip} />
                                ))}
                            </View>
                        </View>

                        <View style={styles.commissionWrapper}>
                            <View style={styles.commissionContainer}>
                                {inviteData.map((item, index) => (
                                    <DataBlock key={index} value={item.value} label={item.label} tooltipText={item.tooltip} />
                                ))}
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <View>
                            <View style={styles.rule}>
                                <ThemedText style={styles.sectionTitle}>Total live duration of all host</ThemedText>
                                <TouchableOpacity
                                    onPress={() =>
                                        setTooltip(
                                            tooltip === 'statistics of the all host live duration(excluding party room)'
                                                ? null
                                                : 'statistics of the all host live duration(excluding party room)'
                                        )
                                    }
                                >
                                    <Image source={rulesicon} style={styles.ruleIcon} />
                                </TouchableOpacity>
                            </View>
                            {tooltip === 'statistics of the all host live duration(excluding party room)' && (
                                <View style={[styles.tooltip, { top: 30, left: 10 }]}>
                                    <ThemedText style={styles.tooltipText}>
                                        statistics of the all host live duration(excluding party room)
                                    </ThemedText>
                                </View>
                            )}
                        </View>

                        <View style={styles.fadedContainer}>
                            <ThemedText style={styles.fadedText}>00:00:00 </ThemedText>
                            <ThemedText style={styles.fadedText}>Current Week </ThemedText>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </MainContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        // padding: scaleWidth(16),
        marginBottom: scaleHeight(50),
        marginHorizontal: 10,
        marginTop: 20
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: scaleHeight(16),
        gap: 5
    },
    card: {
        flex: 1,
        // marginHorizontal: scaleWidth(5),
        borderRadius: scaleWidth(16),
        padding: scaleWidth(10),
        shadowRadius: 4,
    },
    cardContent: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    cardIcon: {
        width: scaleWidth(40),
        height: scaleHeight(40),
        resizeMode: 'contain',
        marginBottom: scaleHeight(10),
    },
    cardTitle: {
        fontSize: scaleFont(16),
        fontWeight: '600',
        color: customColors.white,
        textAlign: 'center',
    },
    cardNumber: {
        fontSize: scaleWidth(30),
        fontWeight: 'bold',
        color: customColors.white,
        textAlign: 'center',
    },
    cardButton: {
        backgroundColor: customColors.accent,
        paddingVertical: scaleHeight(10),
        width: '100%',
        borderRadius: scaleWidth(24),
        marginTop: scaleHeight(10),
    },
    cardButtonText: {
        fontSize: scaleFont(14),
        fontWeight: '600',
        color: customColors.white,
        textAlign: 'center',
    },
    section: {
        backgroundColor: 'white',
        padding: scaleWidth(20),
        borderRadius: scaleWidth(10),
        marginBottom: scaleHeight(16),
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: -4, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    sectionTitle: {
        fontSize: scaleFont(18),
        fontWeight: 'bold',
        justifyContent: 'center',
        marginBottom: scaleHeight(5)
    },
    balanceText: {
        fontSize: scaleFont(18),
        // marginTop: scaleHeight(12),
        fontWeight: 700,
        color: customColors.primary,

    },
    coinBalanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    coinIcon: {
        width: scaleWidth(20),
        height: scaleHeight(18),
    },
    poster: {
        position: 'relative',
        borderRadius: scaleWidth(10),
        marginBottom: scaleHeight(16),
        elevation: 4,
        overflow: 'hidden',
    },
    posterBackground: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: scaleWidth(10),
    },
    postertitle: {
        fontSize: scaleFont(26),
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontFamily: 'Arial',
        color: 'white',
        textAlign: 'center',
        padding: scaleWidth(30),
        zIndex: 1,
        textShadowColor: 'blue',
        textShadowOffset: { width: 4, height: 2 },
        textShadowRadius: scaleWidth(2),
    },
    sectionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: scaleWidth(16),
        gap: 10
    },
    functionItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        paddingVertical: 10
    },
    functionIcon: {
        width: scaleWidth(30),
        height: scaleHeight(30),
        resizeMode: 'contain',
        marginBottom: scaleHeight(8),
    },
    ruleIcon: {
        width: scaleWidth(18),
        height: scaleHeight(18),
        resizeMode: 'contain',
        marginLeft: scaleWidth(5),
        marginTop: scaleHeight(2),
        justifyContent: 'center',
    },
    functionText: {
        fontSize: scaleFont(12),
        fontWeight: 'bold',
        textAlign: 'center',
        color: customColors.white,
        paddingHorizontal: scaleHeight(5),
    },
    commissionWrapper: {
        borderRadius: scaleWidth(12),
        padding: scaleWidth(4),
        marginVertical: scaleHeight(10),
    },
    commissionContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    dataBlock: {
        width: '48%',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: scaleWidth(12),
        borderRadius: scaleWidth(5),
        marginVertical: scaleHeight(5),
    },
    dataRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: scaleHeight(10),
        width: '100%',
    },
    earningsText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: scaleFont(16),
        marginBottom: scaleHeight(4),
        marginTop: scaleHeight(10)
    },
    labelText: {
        textAlign: 'center',
        color: customColors.gray800,
    },
    fadedContainer: {
        borderWidth: scaleWidth(2),
        borderColor: '#ddd',
        borderRadius: scaleWidth(10),
        padding: scaleWidth(12),
        marginVertical: scaleHeight(8),
        alignItems: 'center',
    },
    fadedText: {
        fontSize: scaleFont(16),
        fontWeight: 'bold',
        color: customColors.gray700,
    },
    commissionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: scaleHeight(8),
        justifyContent: 'space-between',
    },
    commissionRate: {
        marginLeft: scaleWidth(5),
        fontWeight: '900',
        color: customColors.primary,
    },
    progressbar: {
        borderRadius: scaleWidth(20),
        marginBottom: scaleHeight(8),
    },
    rule: {
        display: 'flex',
        flexDirection: 'row',
    },
    tooltip: {
        position: 'absolute',
        top: -30,
        left: 0,
        backgroundColor: 'black',
        padding: scaleWidth(5),
        borderRadius: scaleWidth(5),
        zIndex: 10,
    },
    tooltipText: {
        color: 'white',
        fontSize: scaleFont(12),
    },
    sectionRowContainer: {
        position: 'relative',
        width: '49%',
        backgroundColor: 'white',
        padding: scaleWidth(15),
        borderRadius: scaleWidth(10),
        marginBottom: scaleHeight(16),
        // height: scaleHeight(110),
        marginRight: scaleWidth(5),
        overflow: 'hidden'
    },
    sectionRowContainer2: {
        width: '49%',
        backgroundColor: customColors.white,
        padding: scaleWidth(15),
        borderRadius: scaleWidth(10),
        marginBottom: scaleHeight(16),
        shadowRadius: 4,
        overflow: 'hidden'
        // height: scaleHeight(110),
    },
    bean: {
        width: scaleWidth(14),
        height: scaleHeight(16),
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: scaleHeight(3),
        paddingTop: scaleHeight(2),
    },
    posterOverlay: {},
});

export default Agent;