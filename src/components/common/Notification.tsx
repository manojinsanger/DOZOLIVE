import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Modal,
    Dimensions
} from 'react-native';

interface NotificationModalProps {
    visible: boolean,
    notifications: string[],
    onClose: () => void,
}

const NotificationModal: React.FC<NotificationModalProps> = ({ 
    visible, 
    notifications, 
    onClose 
}) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableOpacity 
                style={styles.overlay} 
                onPress={onClose}
                activeOpacity={1}
            />
            <View style={styles.notificationContainer}>
                <View style={styles.notificationHeader}>
                    <Text style={styles.notificationHeaderText}>Notifications</Text>
                </View>
                <ScrollView>
                    {notifications.length > 0 ? (
                        notifications.map((notification, index) => (
                            <TouchableOpacity 
                                key={index} 
                                style={styles.notificationItem}
                                onPress={() => {
                                    // Handle notification item press
                                    console.log(`Notification pressed: ${notification}`);
                                }}
                            >
                                <View style={styles.notificationBadge}>
                                    <Text style={styles.notificationBadgeText}>{index + 1}</Text>
                                </View>
                                <Text style={styles.notificationText}>{notification}</Text>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <Text style={styles.noNotifications}>
                            No new notifications
                        </Text>
                    )}
                </ScrollView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    notificationContainer: {
        position: 'absolute',
        top: 100,
        right: 20,
        width: Dimensions.get('window').width - 40,
        maxHeight: Dimensions.get('window').height * 0.6,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        elevation: 5,
    },
    notificationHeader: {
        backgroundColor: '#F1567D',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    notificationHeaderText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    notificationBadge: {
        backgroundColor: '#F1567D',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    notificationBadgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    notificationText: {
        fontSize: 14,
        color: '#333',
        flex: 1,
    },
    noNotifications: {
        textAlign: 'center',
        paddingVertical: 15,
        fontSize: 14,
        color: '#888',
    }
});

export default NotificationModal;