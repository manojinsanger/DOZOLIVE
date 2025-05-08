import React, { useEffect } from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AuthProvider } from './src/context/AuthProvider';
import { ToastProvider } from './src/context/CustomToastContext';
import { Provider } from 'react-redux';
import { store } from '@/store';

// Add GestureHandlerRootView and SafeAreaProvider
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '210237367752-kd6a2ke3kmka06ueitfnhi8uehq3s2et.apps.googleusercontent.com',
      offlineAccess: true,
    });
    console.log('✅ Google Sign-In configured');
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ToastProvider>
          <AuthProvider>
            <Provider store={store}>
              <RootNavigator />
            </Provider>
          </AuthProvider>
        </ToastProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;