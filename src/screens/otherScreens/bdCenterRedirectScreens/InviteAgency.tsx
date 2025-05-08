import {
    View,
    Text,
    TextInput,
    StyleSheet,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Platform,
} from 'react-native';
import React from 'react';
import CustomHeader from '@/components/profile/CustomHeader';
import UnderlinedTabSelector from '@/components/profile/UnderlinedTabSelector';
import customColors from '@/constants/styles';
import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';
import InviteAgencyrecord from '@/components/bdcenter/InviteAgencyRecord';

type User = {
    id: string;
    addTime: string;
    status: string;
};

const InviteAgency = () => {
    const [userId, setUserId] = React.useState('');
    const [hostCode, setHostCode] = React.useState('');
    const [recentUsers, setRecentUsers] = React.useState<User[]>([]);
    const [activeTab, setActiveTab] = React.useState('Add Agent');

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content"/>
            <CustomHeader title="Invite Agency"/>

            <ScrollView keyboardShouldPersistTaps="handled" >
            
                <UnderlinedTabSelector
                    tabs={['Add Agent', 'Invitation Record']}
                    activeTab={activeTab}
                    onTabPress={setActiveTab}
                />

                {activeTab === 'Add Agent' && (
                    <View>
                            <View style={styles.border}>
                        <View style={styles.form}>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>
                                    <Text style={styles.required}>*</Text>
                                    Agent ID{' '}
                                   
                                </Text>

                                <View style={styles.horizontalDivider} />

                                <TextInput
                                    style={styles.input}
                                    placeholder="Please Enter"
                                    placeholderTextColor={customColors.gray900}
                                    value={userId}
                                    onChangeText={setUserId}
                                />
                            </View>

                            <TouchableOpacity style={styles.sendButton}>
                                <Text style={styles.sendButtonText}>Invite to Join</Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                    </View>
                )}

                {activeTab === 'Invitation Record' && (
                    <InviteAgencyrecord />
                )}
            </ScrollView>
        </View>
    );
};

export default InviteAgency;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    
        color: '#FF0000',
        paddingTop: StatusBar.currentHeight,
    },
    form: {
        paddingHorizontal: scaleWidth(24),
        paddingTop: scaleHeight(24),
    },
    inputContainer: {
        marginBottom: scaleHeight(16),
    },
    label: {
        fontSize: scaleFont(14),
        color: '#333333',
        marginBottom: scaleHeight(10),
        fontWeight: '600',
    },
    required: {
        color: '#FF0000',
     
    },
    input: {
        height: scaleHeight(50),
        backgroundColor: '#F7F7F7',
        borderRadius: scaleWidth(6),
        paddingHorizontal: scaleWidth(16),
        fontSize: scaleFont(14),
        color: '#333333',
    },
    helperText: {
        fontSize: scaleFont(14),
        color: customColors.gray800,
        marginBottom: scaleHeight(24),
    },
    sendButton: {
        paddingVertical: scaleHeight(12),
        backgroundColor: '#E5CCFF',
        borderRadius: scaleWidth(28),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: scaleHeight(20),
        marginTop: scaleHeight(80),
    },
    sendButtonText: {
        fontSize: scaleFont(16),
        color: '#FFFFFF',
        fontWeight: '600',
    },
    historyContainer: {
        paddingHorizontal: scaleWidth(24),
        borderTopWidth: 4,
        borderTopColor: '#F0F0F0',
        paddingTop: scaleHeight(16),
    },
    historyTitle: {
        fontSize: scaleFont(14),
        fontWeight: '600',
        color: '#333333',
        marginBottom: scaleHeight(16),
    },
    tableHeader: {
        flexDirection: 'row',
        paddingVertical: scaleHeight(12),
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    tableHeaderText: {
        fontSize: scaleFont(14),
        color: customColors.gray800,
        fontWeight: '500',
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: scaleHeight(12),
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    tableCell: {
        fontSize: scaleFont(14),
        color: '#333333',
    },
    emptyContainer: {
        height: scaleHeight(200),
    },
    horizontalDivider: {
        height: 1,
        width: '100%',
        backgroundColor: '#E0E0E0', // or any light gray
        marginVertical: scaleHeight(12), // optional spacing above and below
        marginBottom: scaleHeight(20),
      },
      border:{
                backgroundColor: '#fff',
                marginHorizontal:20,
               borderRadius:20


      }
      
});
