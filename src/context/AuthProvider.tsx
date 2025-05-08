import React, { createContext, useContext, useEffect, useState } from "react";
import LoadingScreen from "../components/common/Loading";
import { checkAuth } from "@/config/checkAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
    user: any | null;
    loading: boolean;
    setUser: React.Dispatch<React.SetStateAction<any | null>>;
    isAuthenticated: boolean;
    logout: () => Promise<void>;
    toggleCheckAuthentication: any;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [checkAuthentication, setCheckAuthentication] = useState(false);

    const toggleCheckAuthentication = () => {
        setLoading(true)
        try {

            setCheckAuthentication(!checkAuthentication)
        } catch (err) {

        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }

    useEffect(() => {
        const init = async () => {
            try {
                const userToken = await AsyncStorage.getItem('userToken');
                if (!userToken) {
                    // Token hi nahi hai → skip API call
                    setUser(null);
                    setLoading(false);
                    return;
                }

                const result = await checkAuth();
                if (result?.success && result.data) {
                    setUser(result.data);
                } else {
                    setUser(null);
                }
            } catch (err) {
                console.error("checkAuth failed", err);
                setUser(null);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 100); // Optional: for smoother transition
            }
        };

        init();
    }, [checkAuthentication]);


    const logout = async () => {
        try {
            setLoading(true)

            setUser(null);
            await AsyncStorage.removeItem('userToken');

        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    };

    const isAuthenticated = !!user;

    if (loading) {
        return <LoadingScreen size={250} />;
    }

    return (
        <AuthContext.Provider value={{ user, loading, setUser, isAuthenticated, logout, toggleCheckAuthentication }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
