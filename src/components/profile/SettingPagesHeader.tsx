import { goBack } from '@/utils/navigationService';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Use MaterialIcons for the back icon

interface SettingPagesHeaderProps {
  title: string;
  textColor?: string; // Optional prop for text color, defaults to black
}

const SettingPagesHeader: React.FC<SettingPagesHeaderProps> = ({ title, textColor = 'black' }) => {

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#fff' }}>
      {/* Back Icon */}
      <TouchableOpacity onPress={() => goBack()}    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      activeOpacity={0.6}
      style={{padding:6}}>
        <Icon name="arrow-back" size={24} color={textColor} />
      </TouchableOpacity>

      {/* Title */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: textColor, marginLeft: 10 }}>
        {title}
      </Text>
    </View>
  );
};

export default SettingPagesHeader;