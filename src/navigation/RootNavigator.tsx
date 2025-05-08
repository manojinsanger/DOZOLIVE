import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import MainStackNavigator from './MainStackNavigator';
import { navigationRef } from '@/utils/navigationService';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DarkContentStatusBar from '@/components/statusbar/DarkContentStatusBar';
import { SocketProvider } from '@/context/SocketProvider';
import { useAuth } from '@/context/AuthProvider';
import { FollowProvider } from '@/context/FollowProvider';

export default function RootNavigator() {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated, 'isAuthenticated ---- on RootNavigator');
  return (
    <>
      <DarkContentStatusBar />
      <NavigationContainer ref={navigationRef}>
        <SocketProvider>
          <FollowProvider>
            <SafeAreaProvider>
              {isAuthenticated ? <MainStackNavigator /> : <AuthNavigator />}
            </SafeAreaProvider>
          </FollowProvider>
        </SocketProvider>
      </NavigationContainer>
    </>
  );
}
