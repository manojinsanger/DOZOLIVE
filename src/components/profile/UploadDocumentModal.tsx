import React from 'react';
import {
    Modal,
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    GestureResponderEvent,
} from 'react-native';

type ImageType = 'profile' | 'cover' | 'document';

type UploadDocumentModalProps = {
    visible: boolean;
    onClose: () => void;
    onPickImage: (useCamera: boolean, imageType: ImageType) => void;
    imageType: ImageType;
};


const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({
    visible,
    onClose,
    onPickImage,
    imageType,
}) => {
    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity
                        onPress={() => onPickImage(false, imageType)}
                        style={styles.modalOption}
                    >
                        <Text style={styles.modalText}>Choose from album</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => onPickImage(true, imageType)}
                        style={styles.modalOption}
                    >
                        <Text style={styles.modalText}>Take a photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onClose}
                        style={[styles.modalOption, styles.cancelButton]}
                    >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default UploadDocumentModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 16,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    modalOption: {
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    modalText: {
        fontSize: 16,
        color: '#333',
    },
    cancelButton: {
        borderBottomWidth: 0,
        marginTop: 10,
    },
    cancelButtonText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
    },
});
