// import { auth } from "@/config/firebaseConfig";
// import * as WebBrowser from "expo-web-browser";
// import * as Google from "expo-auth-session/providers/google";
// import { useEffect, useState } from "react";
// import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";

import { Alert, Platform } from "react-native";
import { apiUrl, axiosInstance } from "./apiUrl";

// WebBrowser.maybeCompleteAuthSession();

// export const useGoogleLogin = () => {
//     const [request, response, promptAsync] = Google.useAuthRequest({
//         clientId: "210237367752-kd6a2ke3kmka06ueitfnhi8uehq3s2et.apps.googleusercontent.com",
//         // iosClientId: "YOUR_IOS_CLIENT_ID",
//         // androidClientId: "YOUR_ANDROID_CLIENT_ID",
//         // webClientId: "210237367752-kd6a2ke3kmka06ueitfnhi8uehq3s2et.apps.googleusercontent.com",
//     });

//     useEffect(() => {
//         if (response?.type === "success") {
//             const { id_token } = response.params;
//             const credential = GoogleAuthProvider.credential(id_token);
//             signInWithCredential(auth, credential)
//                 .then(userCredential => {
//                     console.log("User signed in:", userCredential.user);
//                 })
//                 .catch(error => {
//                     console.error("Error signing in:", error.message);
//                 });
//         }
//     }, [response]);

//     return { promptAsync };
// };

export const sendFbTokenToBackend = async (fbToken: object) => {
    try {
        const response = await axiosInstance.post("/auth/login", { accessToken: fbToken });
        return response.data?.data;
    } catch (error: any) {
        console.error("Error sending Facebook token:", error.response?.data || error.message);
        Alert.alert(error.response?.data?.message || "An error occurred.");
        throw error;
    }
};

export const getLoginUser = async (token: string) => {
    try {
        const response = await axiosInstance.get("/user/my_profile", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        // console.error("Error fetching user profile:", error.response?.data || error.message);
        Alert.alert(error.response?.data?.message?.message || "An error occurred.");
        throw error;
    }
};

export const initiateOTP = async (phone: number) => {
    try {
        const response = await axiosInstance.post("/auth/otp/initiate", { phone: phone.toString() });
        return response.data;
    } catch (error: any) {
        console.error("Error in initiatiting otp:", error.response?.data || error.message);
        Alert.alert(error.response?.data?.message || "An error occurred.");
        throw error;
    }
};

export const verifyAndLoginWithPhone = async (phone: number, otp: string) => {
    try {
        const response = await axiosInstance.post("/auth/otp/verify", { phone:phone.toString(), otp });
        return response.data;
    } catch (error: any) {
        console.error("Error fetching user profile:", error.response?.data || error.message);
        Alert.alert(error.response?.data?.message || "An error occurred.");
        throw error;
    }
};