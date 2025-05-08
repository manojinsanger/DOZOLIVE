import { getLoginUser } from "../services/userAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function checkAuth() {
    const userToken = await AsyncStorage.getItem('userToken');
    if (userToken) {
        const response = await getLoginUser(userToken)
        return response;
    }
    return null;
}