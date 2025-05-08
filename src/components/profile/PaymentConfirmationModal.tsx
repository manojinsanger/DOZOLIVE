import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import UploadDocumentModal from './UploadDocumentModal';
import  {useUploadDocument}  from './useUploadDoument';
import ThemedText from '../ThemedText';

interface PaymentConfirmationModalProps {
    visible: boolean;
    onClose: () => void;
    bankDetails?: {
        bank: string;
        fullName: string;
        upiNumber: string;
        ifscCode: string;
        accountNumber: string;
    };
    onUploadProof: () => void;
}

const PaymentConfirmationModal: React.FC<PaymentConfirmationModalProps> = ({ visible, onClose, bankDetails, onUploadProof }) => {
    const { bank, fullName, upiNumber, ifscCode, accountNumber } = bankDetails || {
        bank: 'State Bank of India',
        fullName: 'USHA RAWAT',
        upiNumber: 'usharawat19941@oksbi',
        ifscCode: 'SBIN0003293',
        accountNumber: '11808437667'
    };

    const [timer, setTimer] = useState('07:15:51');
    const {
        isModalVisible,
        docType,
        openUploadModal,
        uploadDocument,
        setModalVisible,
    } = useUploadDocument();


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.modalHeader}>
                        <ThemedText style={styles.headerText}>Confirmation of payment</ThemedText>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <ThemedText style={styles.closeButtonText}>✕</ThemedText>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.timerContainer}>

                        <ThemedText style={styles.timerText}>{timer}</ThemedText>
                    </View>

                    <View style={styles.detailsContainer}>
                        <View style={styles.paymentMethodContainer}>

                            <ThemedText style={styles.paymentMethodText}>India Bank Transfer</ThemedText>
                        </View>

                        <View style={styles.bankDetailsContainer}>
                            <View style={styles.detailRow}>
                                <ThemedText style={styles.detailLabel}>Bank:</ThemedText>
                                <ThemedText style={styles.detailValue} numberOfLines={1}>{bank}</ThemedText>
                                <TouchableOpacity style={styles.copyButton}>
                                    <MaterialIcons name="content-copy" size={scaleHeight(18)} color="#ccc" />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.detailRow}>
                                <ThemedText style={styles.detailLabel}>Full Name:</ThemedText>
                                <ThemedText style={styles.detailValue} numberOfLines={1}>{fullName}</ThemedText>
                                <TouchableOpacity style={styles.copyButton}>
                                    <MaterialIcons name="content-copy" size={scaleHeight(18)} color="#ccc" />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.detailRow}>
                                <ThemedText style={styles.detailLabel}>UPI number:</ThemedText>
                                <ThemedText style={styles.detailValue} numberOfLines={1}>{upiNumber}</ThemedText>
                                <TouchableOpacity style={styles.copyButton}>
                                    <MaterialIcons name="content-copy" size={scaleHeight(18)} color="#ccc" />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.detailRow}>
                                <ThemedText style={styles.detailLabel}>Bank IFSC Code :</ThemedText>
                                <ThemedText style={styles.detailValue} numberOfLines={1}>{ifscCode}</ThemedText>
                                <TouchableOpacity style={styles.copyButton}>
                                    <MaterialIcons name="content-copy" size={scaleHeight(18)} color="#ccc" />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.detailRow}>
                                <ThemedText style={styles.detailLabel}>Bank Account Number:</ThemedText>
                                <ThemedText style={styles.detailValue}>{accountNumber}</ThemedText>
                                <TouchableOpacity style={styles.copyButton}>
                                    <MaterialIcons name="content-copy" size={scaleHeight(18)} color="#ccc" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.uploadSection}>
                        <ThemedText style={styles.uploadText}>Upload payment proof:</ThemedText>
                        <TouchableOpacity
                            style={styles.uploadBox}
                            onPress={() => openUploadModal('document')} // or 'cover'
                        >
                            <ThemedText style={styles.plusIcon}>+</ThemedText>
                        </TouchableOpacity>

                    </View>

                    <TouchableOpacity style={styles.remitButton} onPress={onClose} >
                        <ThemedText style={styles.remitButtonText}>Confirmation to Payment</ThemedText>
                    </TouchableOpacity>

                    <UploadDocumentModal
                        visible={isModalVisible}
                        imageType={docType}
                        onClose={() => setModalVisible(false)}
                        onPickImage={(fromCamera:any, type:any) =>
                            uploadDocument(fromCamera, (uri:any) => {
                                console.log('Uploaded URI:', uri); // handle uploaded image URI here
                            })
                        }
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: scaleWidth(20),
        borderTopRightRadius: scaleWidth(20),
        padding: scaleWidth(18),
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        position: 'relative',
        marginBottom: scaleHeight(14),
    },
    headerText: {
        fontWeight: '600',
        fontSize: 18,
        color: '#000',
    },
    closeButton: {
        position: 'absolute',
        right: 0,
    },
    closeButtonText: {
        fontSize: scaleFont(18),
        color: '#999',
    },
    timerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: scaleHeight(14),
    },
    clockIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
        tintColor: '#FF6347',
    },
    timerText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FF6347',
    },
    detailsContainer: {
        width: '100%',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 15,
        marginBottom: scaleHeight(14),
    },
    paymentMethodContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    bankIcon: {
        width: 20,
        height: scaleHeight(20),
        marginRight: 10,
    },
    paymentMethodText: {
        fontSize: scaleFont(16),
        fontWeight: '500',
    },
    bankDetailsContainer: {
        width: '100%',
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    detailLabel: {
        fontSize: 14,
        color: '#777',
        flex: 1,
    },
    detailValue: {
        fontSize: scaleFont(12),
        fontWeight: '500',
        flex: 1,
        textAlign: 'right',
        paddingRight: 10,
    },
    copyButton: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    copyIcon: {
        fontSize: 16,
        color: '#777',
    },
    uploadSection: {
        width: '100%',
        marginBottom: 20,
    },
    uploadText: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 10,
    },
    uploadBox: {
        width: 80,
        height: 80,
        backgroundColor: '#f5f5f5',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusIcon: {
        fontSize: 30,
        color: '#ccc',
    },
    remitButton: {
        paddingHorizontal: 30,

        flex: 1,
        backgroundColor: '#5b6af0',
        borderRadius: 24,
        paddingVertical: 12,
        marginLeft: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    remitButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default PaymentConfirmationModal;