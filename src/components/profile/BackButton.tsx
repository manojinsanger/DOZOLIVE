
import React from 'react';
import { TouchableOpacity } from 'react-native';
import  Feather  from 'react-native-vector-icons/Feather';
import { goBack } from '@/utils/navigationService';

type BackButtonProps = {
  textColor?: string;
};

const BackButton = ({ textColor = "white" }: BackButtonProps) => (
  <TouchableOpacity onPress={() => goBack()}>
    <Feather name="arrow-left" size={24} color={textColor} />
  </TouchableOpacity>
);

export default BackButton;