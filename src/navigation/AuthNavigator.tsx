import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PhoneAuth from '@/screens/authScreens/phone-auth';
import AuthPage from '@/screens/authScreens/auth';
import ProfileSetup from '@/screens/authScreens/profile';
import Broadcasters from '@/screens/authScreens/broadcasters';
import Interests from '@/screens/authScreens/interests';
import OtpAuth from '@/screens/authScreens/otp-auth';
import LanguageSelection from '@/screens/authScreens/language-selection';
import Onboarding from '@/screens/authScreens/onboarding';
import DarkContentStatusBar from '@/components/statusbar/DarkContentStatusBar';

export type AuthStackParamList = {
  phoneAuth: undefined;
  auth: undefined;
  profileSetup: undefined;
  broadcasters: undefined;
  interests: undefined;
  landing: undefined;
  languageSelection: undefined;
  otpAuth: undefined;
  onboarding: undefined;
  profile: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <>
      <DarkContentStatusBar />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="auth" component={AuthPage} />
        <Stack.Screen name="profileSetup" component={ProfileSetup} />
        <Stack.Screen name="broadcasters" component={Broadcasters} />
        <Stack.Screen name="interests" component={Interests} />
        {/* <Stack.Screen name="landing" component={LandingPage} /> */}
        <Stack.Screen name="languageSelection" component={LanguageSelection} />
        <Stack.Screen name="phoneAuth" component={PhoneAuth} />
        <Stack.Screen name="otpAuth" component={OtpAuth} />
        <Stack.Screen name="onboarding" component={Onboarding} />
      </Stack.Navigator>
    </>
  );
}
