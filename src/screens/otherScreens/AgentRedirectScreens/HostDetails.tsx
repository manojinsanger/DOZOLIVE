import {
    View,
    Image,
    StyleSheet,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import CustomHeader from '@/components/profile/CustomHeader';
import customColors from '@/constants/styles';
import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';
import femaleIcon from '@/assets/images/icon/femaleIcon.png';
import userProfileIcon from '@/assets/images/icon/user-profile.png';
import calendarIcon from '@/assets/images/icon/calendar.png';
import bean from '@/assets/images/bean.png';
import ThemedText from '@/components/ThemedText';
import MainContainer from '@/components/common/mainContainers/MainContainer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

interface Host {
    id: string;
    name: string;
    level: string;
    image: any;
    hourlyWage: string;
    liveDuration: string;
    partyHostDuration: string;
    earning: string;
    commission: string;
    lastLogin: string;
    onlineStatus?: string;
    remainingPoints?: number;
    totalEarningsOfPoints?: number;
    platformHourlySalary?: number;
    superSalary?: number;
    superRank?: number;
    partyCrownDuration?: string;
    liveEarnings?: number;
    agentPrivateChat?: number;
    partyEarnings?: number;
    tips?: number;
    platformRewards?: number;
    otherEarnings?: number;
    totalEarningsPast3Months?: number;
    lastLiveBroadcastDate?: string;
}

const mockData: Host[] = [
    // Same mockData as provided, omitted for brevity
];

const COLUMN_WIDTH = scaleWidth(100);

const HostDetails: React.FC = () => {
    const [search, setSearch] = useState<string>('');
    const [filteredData, setFilteredData] = useState<Host[]>(mockData);
    const [selectedYear, setSelectedYear] = useState<string>('2025');
    const [selectedMonth, setSelectedMonth] = useState<string>('04');
    const [showPeriodDropdown, setShowPeriodDropdown] = useState<boolean>(false);
    const [selectedPeriod, setSelectedPeriod] = useState<string>('Last 30 days');
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [isDateSelected, setIsDateSelected] = useState<boolean>(false);
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

    const timePeriods: string[] = [
        'Last 30 days',
        'Last 7 days',
        'Today',
        'Last month',
        'This month',
        'Last week',
        'Current week',
    ];

    const filterData = (searchText: string, year: string, month: string, period: string) => {
        let filtered = [...mockData];
        if (searchText) {
            filtered = filtered.filter((user) =>
                user.name.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        const currentDate = new Date('2025-04-06');
        filtered = filtered.filter((user) => {
            const loginDate = new Date(user.lastLogin);
            if (year && month) {
                if (
                    loginDate.getFullYear().toString() !== year ||
                    (loginDate.getMonth() + 1).toString().padStart(2, '0') !== month
                ) {
                    return false;
                }
            }

            switch (period) {
                case 'Last 30 days':
                    return (currentDate.getTime() - loginDate.getTime()) / (1000 * 60 * 60 * 24) <= 30;
                case 'Last 7 days':
                    return (currentDate.getTime() - loginDate.getTime()) / (1000 * 60 * 60 * 24) <= 7;
                case 'Today':
                    return loginDate.toDateString() === currentDate.toDateString();
                case 'Last month':
                    const lastMonth = new Date(currentDate);
                    lastMonth.setMonth(lastMonth.getMonth() - 1);
                    return (
                        loginDate.getMonth() === lastMonth.getMonth() &&
                        loginDate.getFullYear() === lastMonth.getFullYear()
                    );
                case 'This month':
                    return (
                        loginDate.getMonth() === currentDate.getMonth() &&
                        loginDate.getFullYear() === currentDate.getFullYear()
                    );
                case 'Last week':
                    const daysDiff = (currentDate.getTime() - loginDate.getTime()) / (1000 * 60 * 60 * 24);
                    return daysDiff <= 14 && daysDiff > 7;
                case 'Current week':
                    return (currentDate.getTime() - loginDate.getTime()) / (1000 * 60 * 60 * 24) <= 7;
                default:
                    return true;
            }
        });

        setFilteredData(filtered);
    };

    const handlePeriodSelect = (period: string) => {
        setSelectedPeriod(period);
        setShowPeriodDropdown(false);
        filterData(search, selectedYear, selectedMonth, period);
    };

    const host = {
        name: 'Ueco',
        level: 'D',
        onlineStatus: 'Online',
        id: 254344,
        remainingPoints: 6488,
        totalEarningsOfPoints: 0,
        platformHourlySalary: 0,
        superSalary: 0,
        superRank: 0,
        liveDuration: '00:00:12',
        partyHostDuration: '00:00:00',
        partyCrownDuration: '00:00:00',
        liveEarnings: 0,
        agentPrivateChat: 0,
        partyEarnings: 0,
        tips: 0,
        platformRewards: 0,
        otherEarnings: 0,
        totalEarningsPast3Months: 0,
        lastLiveBroadcastDate: '2025-04-02',
    };

    return (
        <MainContainer>

            <View style={styles.container}>
                <CustomHeader title="Host Details" textColor='white' />
                <View style={styles.filterContainer}>
                    <View style={styles.dropdownContainer}>
                        <TouchableOpacity
                            style={styles.dropdownButton}
                            onPress={() => setShowPeriodDropdown(!showPeriodDropdown)}
                        >
                            <ThemedText style={styles.dropdownText}>{selectedPeriod}</ThemedText>
                        </TouchableOpacity>
                        {showPeriodDropdown && (
                            <View style={styles.dropdown}>
                                {timePeriods.map((period) => (
                                    <TouchableOpacity
                                        key={period}
                                        style={styles.dropdownItem}
                                        onPress={() => handlePeriodSelect(period)}
                                    >
                                        <ThemedText style={styles.dropdownItemText}>{period}</ThemedText>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                    <View style={styles.dateFilter}>
                        <View style={styles.dateRow}>
                            <TouchableOpacity
                                style={styles.calendarButton}
                                onPress={() => setShowDatePicker(true)}
                            >
                                <Image source={calendarIcon} style={styles.calendarIcon} />
                                <ThemedText style={styles.dateText}>
                                    {isDateSelected ? selectedDate.toDateString() : 'Select date'}
                                </ThemedText>
                            </TouchableOpacity>
                            {isDateSelected && (
                                <TouchableOpacity
                                    style={styles.clearButton}
                                    onPress={() => {
                                        setIsDateSelected(false);
                                        setSelectedDate(new Date());
                                        setSelectedYear('');
                                        setSelectedMonth('');
                                        filterData(search, '', '', selectedPeriod);
                                    }}
                                >
                                    <MaterialIcons name="cancel" size={22} />
                                </TouchableOpacity>
                            )}
                        </View>
                        {showDatePicker && (
                            <DateTimePicker
                                value={selectedDate}
                                mode="date"
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                onChange={(event, date) => {
                                    setShowDatePicker(Platform.OS === 'ios');
                                    if (date) {
                                        setSelectedDate(date);
                                        setIsDateSelected(true);
                                        const year = date.getFullYear().toString();
                                        const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                        setSelectedYear(year);
                                        setSelectedMonth(month);
                                        filterData(search, year, month, selectedPeriod);
                                    }
                                }}
                            />
                        )}
                    </View>
                </View>
                <View style={styles.content}>
                    <ScrollView style={styles.verticalScroll}>
                        {/* Host Info */}
                        <View style={styles.hostInfo}>
                            <View style={styles.hostAvatar}>
                                <Image
                                    source={userProfileIcon}
                                    style={styles.avatarImage}
                                    resizeMode="cover"
                                />
                                <View>
                                    <ThemedText style={styles.hostName}>{host.name}</ThemedText>
                                    <View style={styles.levelStatus}>
                                        <Image source={femaleIcon} style={styles.bean} />
                                        <Image source={femaleIcon} style={styles.bean} />
                                        <Image source={femaleIcon} style={styles.bean} />
                                    </View>
                                    <View style={styles.levelStatus}>
                                        <ThemedText style={styles.level}>Level: {host.level}</ThemedText>
                                        <ThemedText style={styles.level}>ID: {host.id}</ThemedText>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.hostActions}>
                                <ThemedText style={styles.status}>{host.onlineStatus}</ThemedText>
                                <TouchableOpacity style={styles.removeButton}>
                                    <ThemedText style={styles.removeText}>Remove Host</ThemedText>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Remaining Points */}
                        <View style={styles.card}>
                            <ThemedText style={styles.cardTitle}>Remaining Points</ThemedText>
                            <View style={styles.beanCont}>
                                <Image source={bean} style={styles.bean} />
                                <ThemedText style={{}}>{host.remainingPoints}</ThemedText>
                            </View>
                        </View>

                        {/* Already Received Salary */}
                        <View style={styles.card}>
                            <ThemedText style={styles.cardTitle}>Already Received Salary</ThemedText>
                            <View style={styles.cardContent}>
                                {[
                                    { label: 'Total Earnings of Points', value: host.totalEarningsOfPoints },
                                    { label: 'Platform Hourly Salary', value: host.platformHourlySalary },
                                    { label: 'Super Salary', value: host.superSalary },
                                    { label: 'Super Rank', value: host.superRank },
                                ].map((item, index) => (
                                    <View key={index} style={styles.cardRow}>
                                        <ThemedText style={styles.cardLabel}>{item.label}:</ThemedText>
                                        <View style={styles.beanCont}>
                                            <Image source={bean} style={styles.bean} />
                                            <ThemedText style={styles.cardValue}>{item.value}</ThemedText>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>

                        {/* Host Salary */}
                        <View style={styles.card}>
                            <ThemedText style={styles.cardTitle}>Host Salary</ThemedText>
                            <View style={styles.cardRow}>
                                <ThemedText style={styles.cardLabel}>Platform Hourly Salary:</ThemedText>
                                <ThemedText style={styles.cardValue}>Live: {host.liveDuration}/H:0H</ThemedText>
                            </View>
                        </View>

                        {/* Duration Data */}
                        <View style={styles.card}>
                            <ThemedText style={styles.cardTitle}>Duration Data</ThemedText>
                            <View style={styles.cardContent}>
                                {[
                                    { label: 'Live Duration', value: host.liveDuration },
                                    { label: 'Party Host Duration', value: host.partyHostDuration },
                                    { label: 'Party Crown Duration', value: host.partyCrownDuration },
                                ].map((item, index) => (
                                    <View key={index} style={styles.cardRow}>
                                        <ThemedText style={styles.cardLabel}>{item.label}:</ThemedText>
                                        <ThemedText style={styles.cardValue}>{item.value}</ThemedText>
                                    </View>
                                ))}
                            </View>
                        </View>

                        {/* Earnings Data */}
                        <View style={styles.card}>
                            <ThemedText style={styles.cardTitle}>Earnings Data</ThemedText>
                            <View style={styles.cardContent}>
                                {[
                                    { label: 'Total Earnings of Points', value: host.totalEarningsOfPoints },
                                    { label: 'Live Earnings', value: host.liveEarnings },
                                    { label: 'Agent Private Chat', value: host.agentPrivateChat },
                                    { label: 'Party Earnings', value: host.partyEarnings },
                                    { label: 'Tips', value: host.tips },
                                    { label: 'Platform Rewards', value: host.platformRewards },
                                    { label: 'Other Earnings', value: host.otherEarnings },
                                ].map((item, index) => (
                                    <View key={index} style={styles.cardRow}>
                                        <ThemedText style={styles.cardLabel}>{item.label}:</ThemedText>
                                        <View style={styles.beanCont}>
                                            <Image source={bean} style={styles.bean} />
                                            <ThemedText style={styles.cardValue}>{item.value}</ThemedText>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>

                        {/* Host Dynamics */}
                        <View style={styles.card}>
                            <ThemedText style={styles.cardTitle}>Host Dynamics</ThemedText>
                            <View style={styles.cardContent}>
                                <View style={styles.cardRow}>
                                    <ThemedText style={styles.cardLabel}>
                                        Total Earnings in Past 3 Months (Excl. Platform Rewards):
                                    </ThemedText>
                                    <View style={styles.beanCont}>
                                        <Image source={bean} style={styles.bean} />
                                        <ThemedText style={styles.cardValue}>{host.totalEarningsPast3Months}</ThemedText>
                                    </View>
                                </View>
                                <View style={styles.cardRow}>
                                    <ThemedText style={styles.cardLabel}>Last Live Broadcast Date:</ThemedText>
                                    <ThemedText style={styles.cardValue}>{host.lastLiveBroadcastDate}</ThemedText>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </MainContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    content: {
        flex: 1,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: scaleWidth(16),
        paddingVertical:scaleHeight(8)
    },
    dropdownContainer: {
        position: 'relative',
        zIndex: 1000,
    },
    dropdownButton: {
        backgroundColor: customColors.white,
        borderWidth: 1,
        borderColor: customColors.gray300,
        borderRadius: scaleWidth(8),
        paddingVertical: scaleHeight(10),
        paddingHorizontal: scaleWidth(12),
        minWidth: scaleWidth(140),
        alignItems: 'center',
    },
    dropdownText: {
        fontSize: scaleFont(14),
        color: customColors.textLightPrimary,
    },
    dropdown: {
        position: 'absolute',
        top: scaleHeight(48),
        right: 0,
        backgroundColor: customColors.white,
        borderWidth: 1,
        borderColor: customColors.gray300,
        borderRadius: scaleWidth(8),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        minWidth: scaleWidth(140),
        zIndex: 200
    },
    dropdownItem: {
        paddingVertical: scaleHeight(10),
        paddingHorizontal: scaleWidth(12),
        borderBottomWidth: 1,
        borderBottomColor: customColors.gray200,
    },
    dropdownItemText: {
        fontSize: scaleFont(14),
        color: customColors.textLightPrimary,
    },
    dateFilter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scaleWidth(10),
    },
    calendarButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: customColors.white,
        borderWidth: 1,
        borderColor: customColors.gray300,
        borderRadius: scaleWidth(8),
        paddingVertical: scaleHeight(10),
        paddingHorizontal: scaleWidth(12),
        gap: scaleWidth(8),
    },
    calendarIcon: {
        width: scaleWidth(18),
        height: scaleWidth(18),
        tintColor: customColors.textLightSecondary,
    },
    dateText: {
        fontSize: scaleFont(14),
        color: customColors.textLightPrimary,
    },
    clearButton: {
        backgroundColor: customColors.gray200,
        borderRadius: scaleWidth(8),
        paddingVertical: scaleHeight(2),
        paddingHorizontal: scaleWidth(2),
    },
    clearText: {
        fontSize: scaleFont(14),
        color: customColors.textLightPrimary,
    },
    verticalScroll: {
        flex: 1,
        paddingBottom: scaleHeight(20),
    },
    hostInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: scaleWidth(16),
        backgroundColor: customColors.white,
        borderRadius: scaleWidth(12),
        margin: scaleWidth(16),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    hostAvatar: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarImage: {
        width: scaleWidth(48),
        height: scaleWidth(48),
        borderRadius: scaleWidth(24),
        borderWidth: 1,
        borderColor: customColors.gray300,
        marginRight: scaleWidth(12),
    },
    hostName: {
        fontSize: scaleFont(18),
        fontWeight: '600',
        color: customColors.textLightPrimary,
    },
    levelStatus: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    level: {
        fontSize: scaleFont(14),
        color: customColors.textLightSecondary,
        marginRight: scaleWidth(12),
    },
    hostActions: {
        alignItems: 'flex-end',
    },
    status: {
        fontSize: scaleFont(14),
        color: customColors.success,
        marginBottom: scaleHeight(8),
        fontWeight: 700
    },
    removeButton: {
        backgroundColor: customColors.error,
        borderRadius: scaleWidth(8),
        paddingVertical: scaleHeight(8),
        paddingHorizontal: scaleWidth(14),
    },
    removeText: {
        fontSize: scaleFont(12),
        color: customColors.white,
        fontWeight: '700',
    },
    card: {
        backgroundColor: customColors.white,
        borderRadius: scaleWidth(12),
        marginHorizontal: scaleWidth(16),
        marginBottom: scaleHeight(16),
        padding: scaleWidth(16),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardTitle: {
        fontSize: scaleFont(16),
        fontWeight: '600',
        color: customColors.textLightPrimary,
        marginBottom: scaleHeight(12),
    },
    cardContent: {
        borderWidth: 1,
        borderColor: customColors.gray200,
        borderRadius: scaleWidth(8),
        padding: scaleWidth(12),
        backgroundColor: customColors.gray100,
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: scaleHeight(8),
    },
    cardLabel: {
        fontSize: scaleFont(14),
        color: customColors.textLightSecondary,
        flex: 1,
    },
    cardValue: {
        fontSize: scaleFont(14),
        color: customColors.textLightPrimary,
        fontWeight: '500',
    },
    bean: {
        width: scaleWidth(14),
        height: scaleWidth(14),
        marginRight: scaleWidth(6),
    },
    beanCont: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default HostDetails;