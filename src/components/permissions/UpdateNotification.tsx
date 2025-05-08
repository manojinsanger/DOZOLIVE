import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface UpdateNotificationProps { }

const UpdateNotification = (props: UpdateNotificationProps) => {
    return (
        <View style={styles.container}>
            <Text>UpdateNotification</Text>
        </View>
    );
};

export default UpdateNotification;

const styles = StyleSheet.create({
    container: {}
});
