import {
    createNavigationContainerRef,
    StackActions,
  } from '@react-navigation/native';
  
  type ParamList = Record<string, object | undefined>;
  
  export const navigationRef = createNavigationContainerRef<ParamList>();
  
  // ✅ Simple navigate
  export function navigate(name: string, params?: Record<string, any>) {
    if (navigationRef.isReady()) {
      navigationRef.navigate(name, params);
    }
  }
  
  // ✅ Replace current screen
  export function replace(name: string, params?: Record<string, any>) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.replace(name, params));
    }
  }
  
  // ✅ Go back
  export function goBack() {
    if (navigationRef.isReady() && navigationRef.canGoBack()) {
      navigationRef.goBack();
    }
  }
  
  // ✅ Redirect logic — replaces or navigates
  export function redirect(
    name: string,
    params?: Record<string, any>,
    options?: { replace?: boolean }
  ) {
    if (options?.replace) {
      replace(name, params);
    } else {
      navigate(name, params);
    }
  }
  



// Examples how to use it  

// ✅ 1. Simple Redirect (Navigate to a screen)
// redirect('HomeScreen');
// ✅ 2. Navigate with Params
// redirect('ProfileScreen', { userId: 'abc123' });
// ✅ 3. Replace Current Screen
// redirect('LoginScreen', undefined, { replace: true });
// ✅ 4. Replace with Params
// redirect('LiveRoom', { roomId: 'xyz789' }, { replace: true });
// ✅ 5. Just Go Back
// goBack();
// ✅ 6. Using Navigate Directly
// navigate('Settings', { tab: 'privacy' });
// ✅ 7. Using Replace Directly
// replace('AuthScreen', { from: 'splash' });