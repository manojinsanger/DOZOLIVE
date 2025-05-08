import { View, Modal, ScrollView, Image, TouchableOpacity, Dimensions, Text, TextInput } from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import customColors from '@/constants/styles';
import { scaleFont, scaleWidth } from '@/constants/scaling';
import ThemedText from '@/components/ThemedText';
import { Switch } from 'react-native-paper';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const UserBroadCastWaitingModal = ({ visible, onClose }: { visible: any, onClose: any }) => {
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);



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
                            backgroundColor: customColors.white,
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
                            <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                <ThemedText style={{ fontSize: scaleFont(18), fontWeight: 'bold', color: customColors.gray500 }}>
                                    Guest Call
                                </ThemedText>
                                <Switch
                                    value={isEnabled}
                                    onValueChange={toggleSwitch}
                                    trackColor={{ false: customColors.gray300, true: customColors.primary }}
                                    thumbColor={customColors.gray200}
                                    style={{
                                        transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
                                    }}
                                />
                            </View>
                            <TouchableOpacity onPress={onClose}>
                                <AntDesign name="close" size={24} color={customColors.gray300} />
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

                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                {/* <Text style={{ color: customColors.gray500, fontWeight: 700, fontSize: scaleFont(22) }}>
                                    Accept Call
                                </Text> */}
                            </View>
                        </ScrollView>

                    </View>
                </View>
            </Modal>

        </>
    );
};

export default UserBroadCastWaitingModal;