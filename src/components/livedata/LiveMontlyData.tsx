import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';
import rulesicon from '../../assets/images/icon/question.png';
import bean from '../../assets/images/bean.png';
import customColors from '@/constants/styles';
import LiveDataDescriptionModal from './LiveDataDescriptionModal';
import ThemedText from '../ThemedText';


type DataBlockProps = {
    value: React.ReactNode;
    label: string;
    tooltipText?: string;
};

const styles = StyleSheet.create({
    avatar: {
        paddingHorizontal: scaleWidth(45),
        padding: scaleWidth(15),
        marginEnd: scaleWidth(200),
    },
    section: {


    },
    dataRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: scaleHeight(10),
        width: '100%',
    },
    earningsText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: scaleFont(16),
    },
    labelText: {
        textAlign: 'center',
        color: '#666',
    },
    commissionWrapper: {
        borderColor: '#ddd',
        borderRadius: scaleWidth(6),
        padding: scaleWidth(8),
        marginVertical: scaleHeight(6),
        backgroundColor: customColors.gray100,
    },
    commissionContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    dataBlock: {
        width: '48%',
        alignItems: 'center',
        padding: scaleWidth(12),
        borderRadius: scaleWidth(5),
        marginVertical: scaleHeight(5),
    },
    RuleIcon: {
        width: 18,
        height: scaleHeight(18),
        resizeMode: 'contain',
        marginLeft: scaleWidth(5),
        marginTop: scaleHeight(2),
    },
    bean: {
        width: scaleWidth(18),
        height: scaleHeight(18),
        resizeMode: 'contain',
        marginRight: scaleWidth(4),
    },
});

const earningsData = [
    {
        value: (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <ThemedText style={styles.earningsText}>0</ThemedText>
                <Image source={bean} style={styles.bean} />
            </View>
        ),
        label: 'Last diamond income',
    },
    {
        value: <ThemedText style={styles.earningsText}>00:00:00</ThemedText>,
        label: 'My Commission',
    },
    { value: '0', label: 'Earning Host NO.' },
    { value: '3', label: 'Number of active hosts (Last 7 days)' },
    {
        value: (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={bean} style={styles.bean} />
                <ThemedText style={styles.earningsText}>0</ThemedText>
            </View>
        ),
        label: 'Host Earning',
    },
    {
        value: (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={bean} style={styles.bean} />
                <ThemedText style={styles.earningsText}>0</ThemedText>
            </View>
        ),
        label: 'My Commission',
    },
];

const DataBlock: React.FC<{ value: React.ReactNode; label: string }> = ({ value, label }) => (
    <View style={styles.dataBlock}>
      <Text style={styles.labelText}>{label}</Text>
      {typeof value === 'string' ? <Text style={{ alignItems: 'center' }}>{value}</Text> : value}
    </View>
  );

const LiveMonthlyData = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const onDateChange = (event: any, date?: Date) => {
        if (event.type === 'dismissed') {
            setShowDatePicker(false);
            return;
        }
        if (date) {
            setSelectedDate(date);
            setShowDatePicker(Platform.OS === 'ios');
        }
    };

    return (
        <View>


            <View style={styles.section}>


                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <ThemedText
                        onPress={() => setShowDatePicker(true)}
                        style={{
                            paddingHorizontal: scaleWidth(5),
                            fontSize: scaleFont(14),
                            // backgroundColor: customColors.gray100,
                            // color:customColors.textLightSecondary,
                            borderRadius: scaleWidth(6),
                            marginRight: scaleWidth(6),
                        }}
                    >
                        {selectedDate ? selectedDate.toLocaleDateString() : 'Select Date'}
                        <ThemedText
                            onPress={() => setShowDatePicker(true)}
                            style={{
                                fontSize: scaleFont(18),
                                color: customColors.primary,
                            }}
                        >
                            📅
                        </ThemedText>
                    </ThemedText>

                    <TouchableOpacity onPress={() => setShowModal(true)}>
                        <Image source={rulesicon} style={styles.RuleIcon} />
                    </TouchableOpacity>
                </View>

                <View style={styles.dataRow}>
                    <View>
                        <ThemedText style={styles.earningsText}>💎 0</ThemedText>
                        <ThemedText style={styles.labelText}>Total diamond income</ThemedText>
                    </View>
                </View>

                <View style={styles.commissionWrapper}>
                    <View style={styles.commissionContainer}>
                        {earningsData.map((item, index) => (
                            <DataBlock key={index} label={item.label} value={item.value} />
                        ))}
                    </View>
                </View>
                <View style={styles.commissionWrapper}>
                    <View style={styles.commissionContainer}>
                        {earningsData.map((item, index) => (
                            <DataBlock key={index} label={item.label} value={item.value} />
                        ))}
                    </View>
                </View>

                <View style={styles.commissionWrapper}>
                    <View style={styles.commissionContainer}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            <ThemedText style={{ textAlign: 'center', fontWeight: 'bold' }}>1</ThemedText>
                            <ThemedText style={{ textAlign: 'center' }}>New Fans</ThemedText>
                        </View>
                    </View>
                </View>
            </View>

            {showDatePicker && (
                <DateTimePicker
                    value={selectedDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                />
            )}
            <LiveDataDescriptionModal visible={showModal} onClose={() => setShowModal(false)}>
                <ThemedText>
                    1. Live diamond income: Only the income from gifting during the live broadcast is counted, excluding the income from any rewards.
                </ThemedText>

                <ThemedText >
                    2. Party diamond income: Only the income from gifting during the party room is counted, excluding the income from any rewards.
                </ThemedText>

                <ThemedText >
                    3. E-hours: Means effective hours, continuously 60 Mins living time will be counted as one E-hou.
                </ThemedText>

                <ThemedText >
                    4. E-days: Means effective days, there is at least one E-hour in one day will be counted as one E-da.
                </ThemedText>

                <ThemedText >
                    5. Time zone: UTC + 8;
                </ThemedText>

                <ThemedText >
                    6. The data of the day is updated in real time, and there will be a 5 Mins delay.
                </ThemedText>

            </LiveDataDescriptionModal>
        </View>
    );
};

export default LiveMonthlyData;
