import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

interface ConfirmationProps {
    visible: boolean,
    title?: string,
    message: string,
    onCancel: () => void
    onConfirm: () => void,
    cancelText?: string,
    confirmText?: string,
}

const ConfirmationModel = ({ visible, title = 'Instruction', message, onCancel, onConfirm, cancelText = 'Cancel', confirmText = 'Confirm' }: ConfirmationProps) => {
    return (
        <Modal visible={visible} transparent={true} animationType='fade' onRequestClose={onCancel}>
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    {/* Title */}
                    <Text style={styles.title}>{title}</Text>

                    <Text style={styles.message}>{String(message)}</Text>


                    {/* Buttons */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={onCancel}
                        >
                            <Text style={styles.cancelText}>{cancelText}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.confirmButton}
                            onPress={onConfirm}
                        >
                            <Text style={styles.confirmText}>{confirmText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 15,
        color: '#333',
    },
    message: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 22,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    cancelButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelText: {
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
    },
    confirmText: {
        fontSize: 16,
        color: '#4285F4', // Google blue color
        fontWeight: '500',
    },
});

export default ConfirmationModel