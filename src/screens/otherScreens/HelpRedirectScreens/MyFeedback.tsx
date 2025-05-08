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

import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';



const MyFeedback = () => {
    const [userId, setUserId] = React.useState('');
    const [activeTab, setActiveTab] = React.useState('Waiting for your       reply');


    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <CustomHeader title="My Feedback" />

            <ScrollView keyboardShouldPersistTaps="handled" style={styles.scrollView}>
                <UnderlinedTabSelector
                    tabs={['Waiting for your       reply', 'Pending', 'Solved']}
                    activeTab={activeTab}
                    onTabPress={setActiveTab}
                />

                <View style={styles.border}>
                    {activeTab === 'Waiting for your reply' && (
                        <Text></Text>
                    )}
                    {activeTab === 'Pending' && (
                        <Text></Text>
                    )}
                    {activeTab === 'Solved' && (
                        <Text></Text>
                    )}
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={[styles.feedbackButton, styles.messageButton]}>
                    <Text style={styles.buttonText}>Questioning</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default MyFeedback;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        flex: 1,
    },
    border: {
        backgroundColor: '#fff',
        marginHorizontal: scaleWidth(20),
        borderRadius: scaleWidth(20),
        flex: 1,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: scaleWidth(16),
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    feedbackButton: {
        padding: scaleWidth(12),
        borderRadius: scaleWidth(30),
        backgroundColor: '#d8d5ff',
        flex: 1, // Makes the button take full width of the footer
    },
    messageButton: {
        backgroundColor: '#6b48ff',
    },
    buttonText: {
        fontSize: scaleFont(15),
        color: '#fff',
        textAlign: 'center',
    },
});