import {
    View,
    TextInput,
    Image,
    StyleSheet,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import CustomHeader from '@/components/profile/CustomHeader';
import customColors from '@/constants/styles';
import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';
import AntDesign from 'react-native-vector-icons/AntDesign'
import userIcon from '@/assets/images/icon/user.png';
import righticon from '@/assets/images/icon/right-arrow.png';
import userProfileIcon from '@/assets/images/icon/user-profile.png';
import detectiveIcon from '@/assets/images/icon/detective.png';
import policewomanIcon from '@/assets/images/icon/policewoman.png';
import calendarIcon from '@/assets/images/icon/calendar.png';
import LinnerGradientCardCC from '@/components/common/gradientCards/LinnearGradientCardCC';
import Feather from 'react-native-vector-icons/Feather'
import bean from '@/assets/images/bean.png'
import { redirect } from '@/utils/navigationService';
import DarkContentStatusBar from '@/components/statusbar/DarkContentStatusBar';
import ThemedText from '@/components/ThemedText';
import LinnerGradientCard from '@/components/common/gradientCards/LinnearGradientCard';
import LightContentStatusBar from '@/components/statusbar/LightContentStatusBar';
const mockData = [
    {
        id: '1',
        name: 'takshdweeppp',
        level: 'D',
        image: userIcon,
        hourlyWage: '150',
        liveDuration: '2h 30m',
        partyHostDuration: '1h 10m',
        earning: '380',
        commission: '76',
        lastLogin: '2025-04-02',
    },
    {
        id: '2',
        name: '🌹simple gi',
        level: 'C',
        image: userProfileIcon,
        hourlyWage: '180',
        liveDuration: '3h',
        partyHostDuration: '1h 30m',
        earning: '450',
        commission: '90',
        lastLogin: '2025-04-01',
    },
    {
        id: '3',
        name: '☆Mr Surya😎🇮🇳',
        level: 'D',
        image: detectiveIcon,
        hourlyWage: '120',
        liveDuration: '1h 45m',
        partyHostDuration: '45m',
        earning: '270',
        commission: '54',
        lastLogin: '2025-03-30',
    },
    {
        id: '4',
        name: '@Akshu 🇮🇳 POPP',
        level: 'D',
        image: policewomanIcon,
        hourlyWage: '130',
        liveDuration: '2h',
        partyHostDuration: '1h',
        earning: '300',
        commission: '60',
        lastLogin: '2025-03-15',
    },
    {
        id: '5',
        name: '🔥Rider King',
        level: 'B',
        image: userIcon,
        hourlyWage: '200',
        liveDuration: '4h',
        partyHostDuration: '2h',
        earning: '600',
        commission: '120',
        lastLogin: '2025-03-28',
    },
    {
        id: '6',
        name: 'Mahi💖Queen',
        level: 'C',
        image: userProfileIcon,
        hourlyWage: '160',
        liveDuration: '2h 15m',
        partyHostDuration: '1h 5m',
        earning: '340',
        commission: '68',
        lastLogin: '2025-03-22',
    },
    {
        id: '7',
        name: 'Tiger🔥007',
        level: 'A',
        image: detectiveIcon,
        hourlyWage: '250',
        liveDuration: '5h',
        partyHostDuration: '2h 30m',
        earning: '900',
        commission: '180',
        lastLogin: '2025-03-10',
    },
    {
        id: '8',
        name: 'Crazy Girl💃',
        level: 'B',
        image: policewomanIcon,
        hourlyWage: '190',
        liveDuration: '3h 20m',
        partyHostDuration: '1h 40m',
        earning: '510',
        commission: '102',
        lastLogin: '2025-04-03',
    },
    {
        id: '9',
        name: '❤️Love Bird',
        level: 'D',
        image: userIcon,
        hourlyWage: '140',
        liveDuration: '1h 30m',
        partyHostDuration: '45m',

        earning: '60',

        commission: '52',
        lastLogin: '2025-04-02',
    },
    {
        id: '10',
        name: 'Boss Baby👑',
        level: 'C',
        image: userProfileIcon,
        hourlyWage: '175',
        liveDuration: '2h 50m',
        partyHostDuration: '1h 25m',
        earning: '430',
        commission: '86',
        lastLogin: '2025-03-25',
    },
    {
        id: '11',
        name: 'Dark Knight🦇',
        level: 'B',
        image: detectiveIcon,
        hourlyWage: '220',
        liveDuration: '4h 10m',
        partyHostDuration: '2h 5m',
        earning: '720',
        commission: '144',
        lastLogin: '2025-03-18',
    },
    {
        id: '12',
        name: 'Mona💎Shine',
        level: 'D',
        image: policewomanIcon,
        hourlyWage: '155',
        liveDuration: '2h 40m',
        partyHostDuration: '1h 10m',
        earning: '360',
        commission: '72',
        lastLogin: '2025-04-03',
    },
    {
        id: '13',
        name: 'Guru Ji🧘',
        level: 'A',
        image: userIcon,
        hourlyWage: '300',
        liveDuration: '6h',
        partyHostDuration: '3h',
        earning: '1200',
        commission: '240',
        lastLogin: '2025-03-05',
    },
    {
        id: '14',
        name: 'Queen Elsa❄️',
        level: 'B',
        image: userProfileIcon,
        hourlyWage: '185',
        liveDuration: '3h 10m',
        partyHostDuration: '1h 45m',
        earning: '500',
        commission: '100',
        lastLogin: '2025-03-31',
    },
    {
        id: '15',
        name: 'Lucky Star⭐',
        level: 'C',
        image: detectiveIcon,
        hourlyWage: '170',
        liveDuration: '2h 20m',
        partyHostDuration: '1h 20m',
        earning: '400',
        commission: '80',
        lastLogin: '2025-04-03',
    },
];

const COLUMN_WIDTH = scaleWidth(100);

const AddHost = () => {
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState(mockData);
    const [selectedYear, setSelectedYear] = useState('2025');
    const [selectedMonth, setSelectedMonth] = useState('04');
    const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState('Last 30 days');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isDateSelected, setIsDateSelected] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);


    const timePeriods = [
        'Last 30 days',
        'Last 7 days',
        'Today',
        'Last month',
        'This month',
        'Last week',
        'Current week',
    ];

    const handleSearch = (text: string) => {
        setSearch(text);
        filterData(text, selectedYear, selectedMonth, selectedPeriod);
    };

    const filterData = (searchText: string,
        year: string,
        month: string,
        period: string) => {
        let filtered = [...mockData];
        // Search filter
        if (searchText) {
            filtered = filtered.filter((user) =>
                user.name.toLowerCase().includes(searchText.toLowerCase())
            );
        }
        // Date filter
        const currentDate = new Date('2025-04-06');
        filtered = filtered.filter((user) => {
            const loginDate = new Date(user.lastLogin);
            // Year and Month filter
            if (year && month) {
                if (
                    loginDate.getFullYear().toString() !== year ||
                    (loginDate.getMonth() + 1).toString().padStart(2, '0') !== month
                ) {
                    return false;
                }
            }

            // Period filter
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
    return (
        <View style={styles.container}>

            <LightContentStatusBar />
            <LinnerGradientCard customStyles={{ paddingTop: StatusBar.currentHeight, }}>
                <CustomHeader title="Host" textColor='white' />
                <View style={styles.filterContainer}>
                    {/* Period Dropdown */}
                    <View style={styles.dropdownContainer}>

                        <TouchableOpacity
                            style={styles.dropdownButton}
                            onPress={() => setShowPeriodDropdown(!showPeriodDropdown)}
                        >
                            <ThemedText style={{color:customColors.white}}>{selectedPeriod}</ThemedText>
                        </TouchableOpacity>
                        {showPeriodDropdown && (
                            <View style={styles.dropdown}>
                                {timePeriods.map((period) => (
                                    <TouchableOpacity
                                        key={period}
                                        style={styles.dropdownItem}
                                        onPress={() => handlePeriodSelect(period)}
                                    >
                                        <ThemedText>{period}</ThemedText>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                    {/* Date Filter */}
                    <View style={styles.dateFilter}>
                        <View style={styles.dateRow}>
                            <TouchableOpacity
                                style={styles.calendarButton}
                                onPress={() => setShowDatePicker(true)}
                            >
                                <AntDesign name="calendar" color={customColors.white} size={20} />
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
                                    <ThemedText style={styles.clearText}>Clear</ThemedText>
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
                                        setIsDateSelected(true); // <- this line is new
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
                <View style={styles.searchBar}>
                    <Feather name="search" size={24} color={customColors.white} />
                    <TextInput
                        placeholder=" ID number or nickname"
                        value={search}
                        onChangeText={handleSearch}
                        placeholderTextColor={customColors.white}
                        style={{ color: customColors.white, fontSize: scaleFont(14), fontWeight: 500 }}
                    />
                </View>

                <LinnerGradientCardCC customStyles={styles.searchBar22}>
                    <View style={styles.searchBar2}>
                        <ThemedText style={{ color: customColors.white, fontSize: scaleFont(16) }}>My Commission</ThemedText>
                        <ThemedText style={{ color: customColors.white, fontSize: scaleFont(16) }}>137,302</ThemedText>
                    </View>
                </LinnerGradientCardCC>
            </LinnerGradientCard>
            <View style={styles.content}>



                <ScrollView style={styles.verticalScroll}>
                    <ScrollView
                        horizontal=
                        {true}
                        showsHorizontalScrollIndicator={true}
                        contentContainerStyle={styles.horizontalScrollContent}
                    >
                        <View style={styles.tableWrapper}>
                            {/* Table Header */}
                            <View style={styles.tableRowHeader}>
                                <ThemedText style={styles.headerCell}>User</ThemedText>
                                <ThemedText style={styles.headerCell}>Level</ThemedText>
                                <ThemedText style={styles.headerCell}>Hourly wage</ThemedText>
                                <ThemedText style={styles.headerCell}>Live duration</ThemedText>
                                <ThemedText style={styles.headerCell}>Party host duration</ThemedText>
                                <ThemedText style={styles.headerCell}>Earning</ThemedText>
                                <ThemedText style={styles.headerCell}>Commission</ThemedText>
                                <Image source={bean} style={styles.bean} />
                            </View>

                            {/* Table Rows */}
                            {filteredData.map((item) => (
                                <View key={item.id} style={styles.tableRow}>
                                    <View style={styles.userCell}>
                                        <Image source={item.image} style={styles.avatar} />
                                        <ThemedText style={styles.cellText}>{item.name}</ThemedText>
                                    </View>
                                    <ThemedText style={styles.cell}>{item.level}</ThemedText>
                                    <ThemedText style={styles.cell}>{item.hourlyWage}</ThemedText>
                                    <ThemedText style={styles.cell}>{item.liveDuration}</ThemedText>
                                    <ThemedText style={styles.cell}>{item.partyHostDuration}</ThemedText>
                                    <ThemedText style={styles.cell}>{item.earning}</ThemedText>
                                    <ThemedText style={styles.cell}>{item.commission}</ThemedText>
                                    <TouchableOpacity onPress={() => redirect('hostdetails')}>
                                        <Image source={righticon} style={styles.bean} />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: scaleWidth(16),
    },
    dateFilter: {
        flexDirection: 'row',
        gap: scaleWidth(8),
    },
    dateInput: {
        borderWidth: 2,
        padding: scaleWidth(8),
        width: scaleWidth(60),
        color: customColors.white,
    },
    dropdownContainer: {
        position: 'relative',
    },
    dropdownButton: {
        borderWidth: 2,
        borderColor: customColors.white,
        borderRadius: scaleWidth(20),
        padding: scaleWidth(8),
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        minWidth: scaleWidth(120),
    },
    dropdown: {
        position: 'absolute',
        top: scaleHeight(40),
        right: 0,
        backgroundColor: customColors.white,
        borderWidth: 1,
        borderColor: customColors.white,
        borderRadius: scaleWidth(4),
        zIndex: 1,
    },
    dropdownItem: {
        padding: scaleWidth(8),
        minWidth: scaleWidth(120),
    },
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },

    searchBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: scaleWidth(20),
        marginBottom: scaleWidth(16),
        marginHorizontal: scaleWidth(16),
        borderWidth: 2,
        borderRadius: scaleWidth(20),
        borderColor: customColors.white,
        color: customColors.white,
        fontSize: scaleFont(14),
    },

    searchBar22: {
        marginHorizontal: scaleWidth(16),
    },

    searchBar2: {
        padding: scaleWidth(13),
        marginHorizontal: scaleWidth(16),
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: scaleWidth(8),
    },
    verticalScroll: {
        flex: 1,
    },
    horizontalScrollContent: {
        // Remove paddingRight from here
        // Ensure content can grow horizontally
    },
    tableWrapper: {
        // Remove fixed width and minWidth
        flexDirection: 'column',
    },
    tableRowHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: customColors.gray200,
        paddingVertical: scaleHeight(8),
        flexWrap: 'nowrap',
    },
    headerCell: {
        width: COLUMN_WIDTH,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: scaleFont(14),
        color: customColors.textLightPrimary,
        // Prevent text wrapping
        flexShrink: 0,
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: customColors.textLightTertiary,
        paddingVertical: scaleHeight(10),
        // Ensure row doesn't wrap
        flexWrap: 'nowrap',
        paddingRight: 20
    },
    userCell: {
        width: COLUMN_WIDTH,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: scaleWidth(8),
        // Prevent shrinking
        flexShrink: 0,
    },
    avatar: {
        width: scaleWidth(32),
        height: scaleWidth(32),
        borderRadius: scaleWidth(16),
        marginRight: scaleWidth(8),
    },
    cell: {
        width: COLUMN_WIDTH,
        textAlign: 'center',
        fontSize: scaleFont(12),
        color: customColors.textLightSecondary,
        // Prevent shrinking
        flexShrink: 0,
    },

    cellText: {
        fontSize: scaleFont(12),
        color: customColors.textLightSecondary,
    },

    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scaleWidth(8),
    },

    calendarButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: customColors.white,
        borderRadius: scaleWidth(40),
        padding: scaleWidth(8),
        gap: scaleWidth(6),
    },
    calendarIcon: {
        width: scaleWidth(16),
        height: scaleWidth(16),
        tintColor: customColors.textLightSecondary,
    },
    dateText: {
        fontSize: scaleFont(12),
        color: customColors.white,
    },

    clearButton: {
        paddingHorizontal: scaleWidth(8),
        paddingVertical: scaleHeight(6),
        backgroundColor: customColors.gray200,
        borderRadius: scaleWidth(4),
    },

    clearText: {
        color: customColors.textLightPrimary,
        fontSize: scaleFont(12),
    },
    bean: {
        width: scaleWidth(12),
        height: scaleHeight(14),
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: scaleHeight(3),
        paddingTop: scaleHeight(2),
    },

});

export default AddHost;