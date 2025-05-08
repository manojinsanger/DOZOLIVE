import {
    View,
    Text,
    Image,
    StyleSheet,
    StatusBar,
    ScrollView,
} from 'react-native';
import React from 'react';
import CustomHeader from '@/components/profile/CustomHeader';
import UnderlinedTabSelector from '@/components/profile/UnderlinedTabSelector';
import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';
import userIcon from '@/assets/images/icon/user-profile.png';
import bean from '@/assets/images/bean.png';
import ThemedText from '@/components/ThemedText';

const agencyData = [
    {
        id: 'AG123456',
        name: 'John Doe',
        newHost: 5,
        allHost: 20,
        income: '₹15,000',
    },
    {
        id: 'AG654321',
        name: 'Jane Smith',
        newHost: 3,
        allHost: 18,
        income: '₹12,500',
    },
    {
        id: 'AG789012',
        name: 'Mark Taylor',
        newHost: 4,
        allHost: 22,
        income: '₹18,700',
    },
];

const AgencyData = () => {
    const [activeTab, setActiveTab] = React.useState<string | null>(null);

    return (
        <View style={styles.container}>
         <StatusBar barStyle="dark-content"/>
            <CustomHeader title="Agency Data" />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <UnderlinedTabSelector
                    tabs={['September', 'August', 'July']}
                    activeTab={activeTab}
                    onTabPress={setActiveTab}
                />

                {agencyData.map((agency, index) => (
                    <View key={index} style={styles.agencyCard}>
                        <View style={styles.cardContent}>
                            {/* Left: User Info Vertical */}
                            <View style={styles.userInfo}>
                                <Image source={userIcon} style={styles.userImage} />
                                <ThemedText style={styles.userName}>{agency.name}</ThemedText>
                                <ThemedText style={styles.userId}>ID: {agency.id}</ThemedText>
                            </View>

                            {/* Right: Host Data */}
                            <View style={styles.hostData}>
                                <View style={styles.dataItem}>
                                    <ThemedText style={styles.label}>New Host</ThemedText>
                                    <ThemedText style={styles.value}>{agency.newHost}</ThemedText>
                                </View>
                                <View style={styles.dataItem}>
                                    <ThemedText style={styles.label}>All Host</ThemedText>
                                    <ThemedText style={styles.value}>{agency.allHost}</ThemedText>
                                </View>
                                <View style={styles.dataItem}>
                                    <View style={styles.beandir}>


                                        <Image source={bean} style={styles.beanIcon} />
                                        <ThemedText style={styles.label}>All Host Income</ThemedText>


                                    </View>
                                    <ThemedText style={styles.value}>{agency.income}</ThemedText>
                                </View>
                            </View>
                        </View>
                    </View>

                ))}
            </ScrollView>
        </View>
    );
};

export default AgencyData;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: '#FF0000',
        paddingTop: StatusBar.currentHeight,
    },
    scrollContent: {
        padding: scaleWidth(12),
    },
    agencyCard: {
        marginVertical: scaleHeight(10),
        borderWidth: 1,
        borderColor: '#e0e0e0',
        backgroundColor: '#fff',
        borderRadius: scaleWidth(12),
        padding: scaleWidth(12),
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userInfo: {
        alignItems: 'center',
        marginRight: scaleWidth(20),
    },
    userImage: {
        width: scaleWidth(50),
        height: scaleWidth(50),
        borderRadius: scaleWidth(25),
        marginBottom: scaleHeight(6),
    },
    userName: {
        fontSize: scaleFont(14),
        fontWeight: '600',
        color: '#000',
    },
    userId: {
        fontSize: scaleFont(12),
        color: '#666',
    },
    hostData: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dataItem: {
        alignItems: 'center',
        flex: 1,
    },
    label: {
        fontSize: scaleFont(11),
        color: '#888',
        marginBottom: scaleHeight(4),
    },
    value: {
        fontSize: scaleFont(15),
        fontWeight: '600',
        color: '#000',
    },
    beanIcon: {
        width: scaleWidth(12),
        height: scaleHeight(16),
        marginRight: scaleWidth(4),
    },
    beandir: {
        flexDirection: 'row',
    },
});
