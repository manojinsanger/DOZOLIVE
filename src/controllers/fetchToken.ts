import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchToken = async () => {
    try {
        const token = await AsyncStorage.getItem("userToken");
        console.log(token)
        if (token) {
            return token;
        } else {
            throw new Error("Token not found");
        }
    } catch (error) {
        console.log("Error fetching token:", error);
        return null;
    }
};
