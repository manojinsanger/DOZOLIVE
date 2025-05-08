import { View, Modal, ScrollView, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import customColors from '@/constants/styles';
import ThemedText from '@/components/ThemedText';
import CameraSwitchButton from '../CameraSwitchBtn';
import { scaleWidth, scaleHeight, scaleFont } from '@/constants/scaling';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface LiveOptionsModalProps {
    visible: boolean;
    onClose: () => void;
    isFront: boolean;
    toggleCamera: () => void;
    openBeautyModal: () => void;
}

const LiveOptionsModal = ({ visible, onClose, isFront, toggleCamera ,openBeautyModal}: LiveOptionsModalProps) => {
    // Placeholder handlers for buttons
    const handleAdmin = () => {
        console.log('Admin button pressed');
        // Add admin logic here
    };

    const handleLiveManagement = () => {
        console.log('Live Management button pressed');
        // Add live management logic here
    };

    const handleMessage = () => {
        console.log('Message button pressed');
        // Add message logic here
    };

    const handleBeauty = () => {
        console.log('Beauty button pressed');
        // Add beauty filter logic here
    };

    const handleMirror = () => {
        console.log('Mirror button pressed');
        // Add mirror toggle logic here
    };



    // Button data
    const buttons = [
        {
            icon: <AntDesign name="user" size={24} color={customColors.white} />,
            label: 'Admin',
            onPress: handleAdmin,
        },
        {
            icon: <MaterialIcons name="dashboard" size={24} color={customColors.white} />,
            label: 'Live Management',
            onPress: handleLiveManagement,
        },
        {
            icon: <AntDesign name="message1" size={24} color={customColors.white} />,
            label: 'Message',
            onPress: handleMessage,
        },
        {
            icon: <MaterialCommunityIcons name="camera-switch" size={24} color={customColors.white} />,
            label: 'Switch Camera',
            onPress:toggleCamera,
        },
        {
            icon: <AntDesign name="star" size={24} color={customColors.white} />,
            label: 'Beauty',
            onPress: openBeautyModal,
        },
        {
            icon: <AntDesign name="swap" size={24} color={customColors.white} />,
            label: 'Mirror',
            onPress: handleMirror,
        },
    ];

    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <ThemedText style={styles.headerTitle}>Live Options</ThemedText>
                        <TouchableOpacity onPress={onClose}>
                            <AntDesign name="close" size={24} color={customColors.gray100} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ flex: 1 }}
                        contentContainerStyle={styles.scrollContent}
                    >
                        <View style={styles.section}>
                            <View style={styles.buttonGrid}>
                                {buttons.map((button, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.button}
                                        onPress={button.onPress}
                                    >
                                        <View style={styles.buttonContent}>
                                            <View style={styles.iconCircle}>
                                                {button.icon}
                                            </View>
                                            <ThemedText style={styles.buttonLabel}>
                                                {button.label}
                                            </ThemedText>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContent: {
        height: SCREEN_HEIGHT / 2,
        backgroundColor: customColors.gray800,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: scaleFont(18),
        fontWeight: 'bold',
        color:customColors.white,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    section: {
        marginBottom: scaleHeight(20),
    },
    sectionTitle: {
        fontSize: scaleFont(16),
        fontWeight: '600',
        color: customColors.gray200,
        marginBottom: scaleHeight(10),
    },
    buttonGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // justifyContent: 'space-between',
    },
    button: {
        width: '25%', 
        // aspectRatio: 1,
        marginBottom: scaleHeight(10),
        borderRadius: 12,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContent: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: scaleWidth(10),
    },
    iconCircle: {
        width: scaleWidth(40),
        height: scaleWidth(40),
        borderRadius: scaleWidth(20),
        // backgroundColor: 'rgba(255, 255, 255, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: scaleHeight(5),
    },
    buttonLabel: {
        fontSize: scaleFont(10),
        color: customColors.gray200,
        textAlign: 'center',
    },
});

export default LiveOptionsModal;