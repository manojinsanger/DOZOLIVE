import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { getLoginUser } from '@/services/userAuth';
import { fetchToken } from '@/controllers/fetchToken';



type UserContextType = {
    userAllDetails: any | null;
    updateUser: (newUser: any) => Promise<void>;
    refreshUser: () => Promise<void>;
    clearUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [userAllDetails, setUser] = useState<any | null>(null);

    useEffect(() => {
        const loadUser = async () => {
            const storedUser = await AsyncStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        };
        loadUser();
    }, []);

    const updateUser = async (newUser: Partial<any>) => {
        const updated = { ...userAllDetails, ...newUser }; 
        setUser(updated);
        await AsyncStorage.setItem('user', JSON.stringify(updated));
    };

    const refreshUser = async () => {
        try {
            const token = await AsyncStorage.getItem("userToken");
            console.log(token,'token')
            if (!token) throw new Error("No token found");
            const fetchedUser = await getLoginUser(token);
            await updateUser(fetchedUser.data);
        } catch (err) {
            console.error("Failed to refresh user:", err);
        }
    };

    const clearUser = async () => {
        setUser(null);
        await AsyncStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{ userAllDetails, updateUser, refreshUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
