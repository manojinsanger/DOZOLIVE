import {Alert} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  FacebookAuthProvider,
  fetchSignInMethodsForEmail,
  GoogleAuthProvider,
  signInWithCredential,
} from 'firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {sendFbTokenToBackend} from '@/services/userAuth';
import auth from '@react-native-firebase/auth';

export async function signInWithGoogle() {
  try {
    console.log('🚀 Checking Google Play Services...');
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

    // 🔍 Check if already signed in
    const currentUser = await GoogleSignin.getCurrentUser();
    console.log('🟢 Current Google user:', currentUser);

    if (currentUser) {
      console.log(
        '🔄 User already signed in — signing out for a fresh login...',
      );
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    }

    // ✅ Use getCurrentUser only
    // const currentUser = await GoogleSignin.getCurrentUser();
    console.log('🟢 Current Google user (before sign-in):', currentUser);

    // Optional: sign out for fresh login
    // await GoogleSignin.signOut();

    console.log('🔁 Starting Google Sign-In...');
    const googleUser = await GoogleSignin.signIn();
    console.log('✅ Google User:', googleUser);

    const idToken = googleUser?.data?.idToken;
    if (!idToken) {
      throw new Error('❌ Missing Google ID token.');
    }

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    console.log('🔐 Signing into Firebase...');
    const userCredential = await auth().signInWithCredential(googleCredential);

    console.log('🎯 Firebase user signed in:', userCredential.user?.email);

    const token = await userCredential.user?.getIdToken();
    console.log('📨 Sending token to backend...');
    const backendResponse = await sendFbTokenToBackend(token || '');

    return backendResponse;
  } catch (error: any) {
    console.error('❌ Google Sign-In Error:', error);

    let errorMessage = 'An unexpected error occurred. Please try again.';
    switch (error.code) {
      case statusCodes.SIGN_IN_CANCELLED:
        errorMessage = 'You cancelled the login process.';
        break;
      case statusCodes.IN_PROGRESS:
        errorMessage = 'Sign-in is already in progress.';
        break;
      case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
        errorMessage =
          'Google Play Services are required. Please update or enable them.';
        break;
      default:
        errorMessage = error.message || errorMessage;
    }

    Alert.alert('Login Failed', errorMessage);
    return null;
  }
}

export async function signInWithFacebook() {
  try {
    console.log('🔁 Starting Facebook Sign-In...');

    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw new Error('❌ User cancelled the login process.');
    }

    const data = await AccessToken.getCurrentAccessToken();
    if (!data || !data.accessToken) {
      throw new Error('❌ Failed to get Facebook access token.');
    }

    console.log('🔐 Getting Facebook credential...');
    const facebookCredential = FacebookAuthProvider.credential(
      data.accessToken,
    );

    console.log('🔐 Signing into Firebase...');
    const userCredential = await auth().signInWithCredential(
      facebookCredential,
    );

    console.log('✅ Firebase Facebook user:', userCredential.user?.email);

    const token = await userCredential.user?.getIdToken();
    console.log('📨 Sending token to backend...');
    const backendResponse = await sendFbTokenToBackend(token || '');

    return backendResponse;
  } catch (error: any) {
    console.error('❌ Facebook Sign-In Error:', error);

    if (error.code === 'auth/account-exists-with-different-credential') {
      const email = error.email;
      const pendingCredential = error.credential;

      if (email) {
        const methods = await fetchSignInMethodsForEmail(auth(), email);
        if (methods.includes('google.com')) {
          Alert.alert(
            'Account Conflict',
            'This email is already linked with a Google account. Please use Google Sign-In.',
          );
        } else if (methods.includes('password')) {
          Alert.alert(
            'Account Conflict',
            'This email is linked with an Email/Password login. Please sign in with email and password.',
          );
        }
      }
    } else {
      Alert.alert(
        'Facebook Login Failed',
        error.message || 'Something went wrong with Facebook login.',
      );
    }

    return null;
  }
}

