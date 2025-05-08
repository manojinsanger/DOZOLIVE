
import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import CustomHeader from '@/components/profile/CustomHeader'; // Adjust the import path as needed
import rulesIcon from '@/assets/images/icon/question.png';
import userIcon from '@/assets/images/icon/user.png';
import userProfileIcon from '@/assets/images/icon/user-profile.png';
import detectiveIcon from '@/assets/images/icon/detective.png';
import policewomanIcon from '@/assets/images/icon/policewoman.png';
import customColors from '@/constants/styles';
import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';
import DarkContentStatusBar from '@/components/statusbar/DarkContentStatusBar';

// Updated mockData with existing images
const mockData = [
    { id: '4997238', name: 'takshdweeppp', level: 'D', hosts: 12, time: '03-21 14:02', image: userIcon },
    { id: '12767478', name: '\uD83C\uDF39simple gi', level: 'C', hosts: 2, time: '02-25 13:53', image: userProfileIcon },
    { id: '13506426', name: '\u2606Mr Surya\uD83D\uDE0E\uD83C\uDDEE\uD83C\uDDF3', level: 'D', hosts: 0, time: '01-17 03:13', image: detectiveIcon },
    { id: '21855685', name: '@Akshu \uD83C\uDDEE\uD83C\uDDF3 POPP', level: 'D', hosts: 7, time: '01-04 02:11', image: policewomanIcon },
    { id: '4997238', name: 'takshdweeppp', level: 'D', hosts: 12, time: '03-21 14:02', image: userIcon },
    { id: '12767478', name: '\uD83C\uDF39simple gi', level: 'C', hosts: 2, time: '02-25 13:53', image: userProfileIcon },
    { id: '13506426', name: '\u2606Mr Surya\uD83D\uDE0E\uD83C\uDDEE\uD83C\uDDF3', level: 'D', hosts: 0, time: '01-17 03:13', image: detectiveIcon },
    { id: '21855685', name: '@Akshu \uD83C\uDDEE\uD83C\uDDF3 POPP', level: 'D', hosts: 7, time: '01-04 02:11', image: policewomanIcon },
];

const AgentInvite = () => {
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState(mockData);

    const handleSearch = (text: string) => {
        setSearch(text);
        if (text === '') {
            setFilteredData(mockData);
        } else {
            setFilteredData(mockData.filter(user => user.name.toLowerCase().includes(text.toLowerCase())));
        }
    };

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.itemContainer}>
            <Image
                source={item.image}
                style={styles.avatar}
                defaultSource={rulesIcon} // Fallback image if the main one fails
                onError={(e) => console.log(`Error loading image for ${item.name}:`, e.nativeEvent.error)}
            />
            <Text style={styles.column}>{item.name}</Text>
            <Text style={styles.column}>{item.level}</Text>
            <Text style={styles.column}>{item.hosts}</Text>
            <Text style={styles.column}>{item.time}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <DarkContentStatusBar />
            <CustomHeader
                title="Agent Invite"
            />
            <View style={styles.content}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="ID number or nickname"
                    value={search}
                    onChangeText={handleSearch}
                    placeholderTextColor={customColors.textLightTertiary}
                />
                <View style={styles.tableHeader}>
                    <Text style={styles.headerColumn}>User</Text>
                    <Text style={styles.headerColumn}>Level</Text>
                    <Text style={styles.headerColumn}>Hosts</Text>
                    <Text style={styles.headerColumn}>Time</Text>
                </View>
                <FlatList
                    data={filteredData}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: customColors.backgroundLight,
        paddingTop: StatusBar.currentHeight,
    },
    content: {
        flex: 1,
    },
    searchBar: {
        padding: scaleWidth(12),
        margin: scaleWidth(16),
        borderWidth: 1,
        borderRadius: scaleWidth(8),
        borderColor: customColors.textLightTertiary,
        color: customColors.textLightPrimary,
        fontSize: scaleFont(14),
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: customColors.gray200,
        paddingVertical: scaleHeight(10),
        paddingHorizontal: scaleWidth(12),
    },
    headerColumn: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: scaleFont(14),
        color: customColors.textLightPrimary,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: scaleWidth(12),
        borderBottomWidth: 1,
        borderColor: customColors.textLightTertiary,
    },
    avatar: {
        width: scaleWidth(40),
        height: scaleHeight(40),
        borderRadius: scaleWidth(20),
        marginRight: scaleWidth(10),
    },
    column: {
        flex: 1,
        textAlign: 'center',
        color: customColors.textLightSecondary,
        fontSize: scaleFont(12),
    },
    headerIcon: {
        width: scaleWidth(24),
        height: scaleHeight(24),
    },
});

export default AgentInvite;