import { View, Modal, ScrollView, Image, TouchableOpacity, Dimensions, Text, TextInput } from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import customColors from '@/constants/styles';
import { scaleFont, scaleWidth } from '@/constants/scaling';
import ThemedText from '@/components/ThemedText';
import RechargeModal from './RechargeModal';
import LinnerGradientCard from '@/components/common/gradientCards/LinnearGradientCard';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const GiftsModal = ({ visible, onClose, gifts }: { visible: any, onClose: any, gifts: any }) => {
    const [customModalVisible, setCustomModalVisible] = useState(false);
    // const [customValue, setCustomValue] = useState('');
    const [selectedValue, setSelectedValue] = useState(10);
    const [selectedGiftType, setSelectedGiftType] = useState('All');
    const [recharModalVisible, setRechargeModalVisible] = useState(false);
    const [selectedGift, setSelectedGift] = useState(null); // New state for selected gift

    const valueOptions = [1, 7, 17, 77, 177, 777,];
    const giftTypes = ['All', 'General', 'Special', 'Premium'];

    // Calculate gift item width for 4 items per row
    const ITEMS_PER_ROW = 4;
    const MARGIN = scaleWidth(8);
    const PADDING = scaleWidth(4);
    const TOTAL_HORIZONTAL_SPACING = (ITEMS_PER_ROW + 1) * MARGIN + ITEMS_PER_ROW * PADDING * 4;
    const GIFT_ITEM_WIDTH = (SCREEN_WIDTH - TOTAL_HORIZONTAL_SPACING) / ITEMS_PER_ROW;

    const renderGiftItem = (gift: any, i: any) => (
        <TouchableOpacity
            key={i}
            onPress={() => setSelectedGift(gift)} // Update selected gift on tap
            style={{
                width: GIFT_ITEM_WIDTH,
                alignItems: 'center',
                margin: MARGIN,
                padding: PADDING,
                borderRadius: 10,
                backgroundColor: selectedGift === gift ? 'rgba(255, 255, 255, 0.1)' : 'transparent', // Highlight selected gift
                borderWidth: selectedGift === gift ? 2 : 2, // Add border for selected gift
                borderColor: selectedGift === gift ? customColors.white : 'transparent',
            }}
        >
            <View style={{ width: GIFT_ITEM_WIDTH * 0.6, height: GIFT_ITEM_WIDTH * 0.6 }}>
                <Image
                    source={gift.icon}
                    style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                />
            </View>
            <ThemedText
                style={{
                    fontSize: scaleFont(12),
                    marginTop: 5,
                    color: customColors.white,
                    textAlign: 'center',
                }}
            >
                {gift.name}
            </ThemedText>
            <ThemedText
                style={{
                    fontSize: scaleFont(12),
                    color: customColors.white,
                    textAlign: 'center',
                }}
            >
                {gift.price} coins
            </ThemedText>
        </TouchableOpacity>
    );

    const renderValueOption = (value: number | string) => (
        <TouchableOpacity
            key={value}
            onPress={() => {
                if (value === 'Custom') {
                    setCustomModalVisible(true);
                } else {
                    setSelectedValue(value as number);
                }
            }}
            style={{
                padding: 4,
                marginHorizontal: 4,
                backgroundColor: selectedValue === value ? customColors.white : 'transparent',
                borderRadius: 20,
                borderWidth: 1,
                borderColor: customColors.white,
                minWidth: 40,
                alignItems: 'center',
            }}
        >
            <ThemedText
                style={{
                    color: selectedValue === value ? customColors.gray700 : customColors.white,
                    fontSize: scaleFont(12),
                    fontWeight: '600',
                }}
            >
                {value}
            </ThemedText>
        </TouchableOpacity>
    );

    const renderGiftType = (type: string) => (
        <TouchableOpacity
            key={type}
            onPress={() => setSelectedGiftType(type)}
            style={{
                height: 30,
                paddingHorizontal: 20,
                marginHorizontal: 6,
                backgroundColor: selectedGiftType === type ? customColors.white : 'rgba(255, 255, 255, 0.1)',
                borderRadius: 20,
                borderWidth: 1,
                borderColor: selectedGiftType === type ? customColors.white : 'rgba(255, 255, 255, 0.3)',
                shadowColor: selectedGiftType === type ? customColors.white : 'transparent',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 3,
                elevation: selectedGiftType === type ? 3 : 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <ThemedText
                style={{
                    color: selectedGiftType === type ? customColors.gray700 : customColors.white,
                    fontSize: scaleFont(12),
                    fontWeight: '600',
                    textAlign: 'center',
                }}
            >
                {type}
            </ThemedText>
        </TouchableOpacity>
    );

    const handleSend = () => {
        console.log(
            'Sending gift:',
            selectedGift ? selectedGift.name : 'No gift selected',
            'with value:',
            customModalVisible ? customValue : selectedValue,
            'and type:',
            selectedGiftType
        );
    };

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
                            backgroundColor: 'rgba(0, 0, 0, 1)',
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
                                Send a Gift
                            </ThemedText>
                            <TouchableOpacity onPress={onClose}>
                                <AntDesign name="close" size={24} color={customColors.white} />
                            </TouchableOpacity>
                        </View>

                        {/* Horizontal Gift Type Selector */}
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{
                                paddingVertical: 12,
                                paddingHorizontal: 2,
                                alignItems: 'center',
                            }}
                        >
                            {giftTypes.map(renderGiftType)}
                        </ScrollView>

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
                            {gifts.map(renderGiftItem)}
                        </ScrollView>

                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10,
                                marginTop: 20,
                            }}
                        >
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }} onPress={() => setRechargeModalVisible(!recharModalVisible)}>
                                <Text style={{ fontWeight: '700', fontSize: scaleFont(14), color: customColors.white }}>
                                    120
                                </Text>
                                <AntDesign name="right" size={16} color={customColors.white} />
                            </TouchableOpacity>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    width: SCREEN_WIDTH * 0.6,
                                    // padding: 4,
                                    paddingLeft: 8,
                                    borderRadius: 500,
                                    backgroundColor: 'rgba(121, 121, 121, 0.4)',

                                }}
                            >
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={{
                                        alignItems: 'center',
                                    }}
                                >
                                    {valueOptions.map(renderValueOption)}
                                </ScrollView>
                                <TouchableOpacity
                                    onPress={handleSend}
                                    style={{

                                    }}
                                >

                                    <LinnerGradientCard customStyles={{
                                        backgroundColor: customColors.white,
                                        padding: 10,
                                        borderRadius: 100,
                                        marginLeft: 8,
                                    }}>

                                        <ThemedText style={{ color: customColors.white, fontSize: scaleFont(14), fontWeight: '600' }}>
                                            Send
                                        </ThemedText>
                                    </LinnerGradientCard>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Custom Value Modal */}
            {/* <Modal
                animationType="slide"
                transparent={true}
                visible={customModalVisible}
                onRequestClose={() => setCustomModalVisible(false)}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                    }}
                >
                    <View
                        style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            padding: 20,
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                        }}
                    >
                        <ThemedText style={{ color: customColors.white, fontSize: scaleFont(16), marginBottom: 12 }}>
                            Enter Custom Value
                        </ThemedText>
                        <TextInput
                            style={{
                                backgroundColor: customColors.white,
                                padding: 12,
                                borderRadius: 10,
                                marginBottom: 12,
                                fontSize: scaleFont(14),
                                color: customColors.gray600,
                            }}
                            keyboardType="numeric"
                            value={customValue}
                            onChangeText={setCustomValue}
                            placeholder="Enter value"
                            placeholderTextColor={customColors.gray700}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity
                                onPress={() => setCustomModalVisible(false)}
                                style={{
                                    backgroundColor: customColors.gray600,
                                    padding: 12,
                                    borderRadius: 10,
                                    flex: 1,
                                    marginRight: 8,
                                }}
                            >
                                <ThemedText style={{ color: customColors.white, textAlign: 'center', fontSize: scaleFont(14) }}>
                                    Cancel
                                </ThemedText>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setSelectedValue(Number(customValue) || selectedValue);
                                    setCustomModalVisible(false);
                                }}
                                style={{
                                   
                                }}
                            >
                                <LinnerGradientCard customStyles={{ padding: 12,
                                    borderRadius: 10,
                                    flex: 1,
                                    marginLeft: 8,}}>

                                <ThemedText style={{ color: customColors.gray700, textAlign: 'center', fontSize: scaleFont(14) }}>
                                    Send
                                </ThemedText>
                                </LinnerGradientCard>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal> */}
            <RechargeModal
                visible={recharModalVisible}
                onClose={() => setRechargeModalVisible(false)}
            />
        </>
    );
};

export default GiftsModal;