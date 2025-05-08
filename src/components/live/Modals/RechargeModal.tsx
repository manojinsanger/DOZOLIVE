import { View, Modal, ScrollView, Image, TouchableOpacity, Dimensions, Text, TextInput } from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import customColors from '@/constants/styles';
import { scaleFont, scaleWidth } from '@/constants/scaling';
import ThemedText from '@/components/ThemedText';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const RechargeModal = ({ visible, onClose }: { visible: any, onClose: any }) => {

    return (
        <>
            <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                    }}
                >
                    <View
                        style={{
                            height: SCREEN_HEIGHT * 0.50,
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            paddingHorizontal: 20,
                            paddingTop: 20,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 12,
                            }}
                        >
                            <ThemedText style={{ fontSize: scaleFont(18), fontWeight: 'bold', color: customColors.white }}>
                                Recharge
                            </ThemedText>
                            <TouchableOpacity onPress={onClose}>
                                <AntDesign name="close" size={24} color={customColors.white} />
                            </TouchableOpacity>
                        </View>

                        {/* Gifts Grid */}
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                paddingBottom: 20,
                                justifyContent: 'space-between',
                            }}
                        >

                        </ScrollView>
 
                    </View>
                </View>
            </Modal>

        </>
    );
};

export default RechargeModal;