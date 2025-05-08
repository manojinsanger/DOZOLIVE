import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, StatusBar } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AgentCard, AgentCardProps } from '@/components/topup/AgentCard';
import customColors from '@/constants/styles';
import { scaleFont, scaleWidth, scaleHeight } from '@/constants/scaling';
import { goBack } from '@/utils/navigationService';
import CountrySelector, { Country } from '@/components/profile/SelectCountry';
import CustomHeader from '@/components/profile/CustomHeader';
import SelectCountryButton from '@/components/profile/SelectCountryButton';

interface OfflineAgentProps { }

const demoAgents: AgentCardProps[] = [
    {
        name: 'John Doe',
        status: 'Online',
        imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
        accountId: '12345678',
        country: '🇺🇸 USA',
    },
    {
        name: 'Jane Smith',
        status: 'Offline',
        imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
        accountId: '87654321',
        country: '🇬🇧 UK',
    },
    {
        name: 'Carlos Rodriguez',
        status: 'Online',
        imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
        accountId: '23456789',
        country: '🇪🇸 Spain',
    },
    {
        name: 'Aisha Khan',
        status: 'Online',
        imageUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
        accountId: '98765432',
        country: '🇮🇳 India',
    },
    {
        name: 'Liu Wei',
        status: 'Offline',
        imageUrl: 'https://randomuser.me/api/portraits/men/5.jpg',
        accountId: '34567890',
        country: '🇨🇳 China',
    },
];


const Agents = (props: OfflineAgentProps) => {
    const [selectedCountry, setSelectedCountry] = useState<Country>({ name: 'India', code: 'IN' });
    const [isCountryModalVisible, setCountryModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor={customColors.white} />
            {/* <CustomHeaderComponent /> */}
            <CustomHeader title='Offline Agents' rightHeader={
                <SelectCountryButton onVisible={() => setCountryModalVisible(true)} name={selectedCountry.name} />

            } />
            <CountrySelector
                onCountryChange={setSelectedCountry}
                selectedCountry={selectedCountry}
                isVisible={isCountryModalVisible}
                onClose={() => setCountryModalVisible(false)}
            />

            <FlatList
                data={demoAgents}
                keyExtractor={(item) => item.accountId}
                renderItem={({ item }) => <AgentCard {...item} />}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

export default Agents;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: customColors.white,
        paddingTop: StatusBar.currentHeight,
    },
    // Header Styles
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scaleWidth(15),
        paddingVertical: scaleHeight(15),
    },
    headerButton: {
        // padding: scaleWidth(5),
    },
    headerTitle: {
        fontSize: scaleFont(18),
        fontWeight: 500,
        color: customColors.gray800,
        flex: 1,
        marginLeft: scaleWidth(10)
    },
    // List Styles
    listContent: {
        padding: scaleWidth(10),
        paddingBottom: scaleHeight(20),
    },
});