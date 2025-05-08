import React, { useState, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    Modal,
    ScrollView,
    StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import customColors from '@/constants/styles';
import LinnerGradientCard from '../common/gradientCards/LinnearGradientCard';
import ThemedText from '../ThemedText';

const TermsAndConditions = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const loadCheckboxState = async () => {
            try {
                const value = await AsyncStorage.getItem('termsAccepted');
                if (value !== null) {
                    setIsChecked(JSON.parse(value));
                }
            } catch (error) {
                console.error('Error loading from AsyncStorage:', error);
            }
        };
        loadCheckboxState();
    }, []);

    const handleCheckboxChange = async (newValue: boolean) => {
        setIsChecked(newValue);
        try {
            await AsyncStorage.setItem('termsAccepted', JSON.stringify(newValue));
        } catch (error) {
            console.error('Error saving to AsyncStorage:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.checkboxContainer}>
                <TouchableOpacity
                    style={styles.customCheckboxContainer}
                    onPress={() => handleCheckboxChange(!isChecked)}
                >
                    <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
                        {isChecked && <ThemedText style={styles.checkboxTick}>✓</ThemedText>}
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <ThemedText style={styles.termsText}>I agree to the Terms and Conditions</ThemedText>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <ScrollView>
                            <ThemedText style={styles.modalTitle}>Terms and Conditions</ThemedText>
                            <ThemedText style={styles.modalText}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                {'\n\n'}
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                {'\n\n'}
                                Add your complete terms and conditions here...
                            </ThemedText>
                        </ScrollView>
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                        >
                            <LinnerGradientCard customStyles={styles.closeButton}>
                                <ThemedText style={styles.closeButtonText}>Close</ThemedText>
                            </LinnerGradientCard>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        padding: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    termsText: {
        color: customColors.gray200,
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '90%',
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        lineHeight: 24,
    },
    closeButton: {
        borderRadius: 5,
        padding: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },

    // Custom checkbox styles
    customCheckboxContainer: {
        marginRight: 10,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: customColors.gray200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        // backgroundColor: customColors.white,
    },
    checkboxTick: {
        color: customColors.gray200,
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default TermsAndConditions;
