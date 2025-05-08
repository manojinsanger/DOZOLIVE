import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface NotificationAccessProps { }

const NotificationAccess = (props: NotificationAccessProps) => {
    return (
        <View style={styles.container}>
            <Text>NotificationAccess</Text>
        </View>
    );
};

export default NotificationAccess;

const styles = StyleSheet.create({
    container: {}
});
