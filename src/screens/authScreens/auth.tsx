import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthObjectImage from '../../assets/images/landing_page/bg.png';
import Users from '@/assets/images/svgs/User';
import Google from '@/assets/images/svgs/Google';
import Phone from '@/assets/images/svgs/Phone';
import Svg, { Defs, LinearGradient, Stop, Text as SvgText, TSpan } from 'react-native-svg';
import {  signInWithGoogle } from '@/config/GoogleAuth';
import { redirect } from '@/utils/navigationService';
import { scaleHeight } from '@/constants/scaling';
import customColors from '@/constants/styles';


export default function AuthPage() {
    const [loading, setLoading] = useState<boolean>(false);
    const login = async () => {
        redirect('phoneAuth');
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        const res = await signInWithGoogle();
        console.log(res,'response of singInWithGoole funtion')
        if (res) {
            await AsyncStorage.setItem('fbUser', JSON.stringify(res.user));
            await AsyncStorage.setItem('userToken', res.token);
            console.log('profileSetup redirect')
            redirect('profileSetup', undefined, { replace: true });
        } else {
            console.error("Google login failed, no user data received.");
        }
        setLoading(false);
    };
  
    return (
        <ImageBackground source={AuthObjectImage} style={styles.background}>
            <View style={styles.gradientTextContainer}>
                <Svg height="80" width="300">
                    <Defs>
                        <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                            <Stop offset="0%" stopColor={customColors.primary} />
                            <Stop offset="100%" stopColor={customColors.secondary} />
                        </LinearGradient>
                    </Defs>
                    <SvgText
                        x="50%"
                        y="50%"
                        dy="20"
                        fontSize="55"
                        fontFamily="Pacifico"
                        textAnchor="middle"
                        fill="url(#grad)"
                    >
                        <Text> <TSpan fontFamily="Pacifico-Regular" textAnchor="middle" fill="url(#grad)" >Dozo! Live</TSpan></Text>
                    </SvgText>
                </Svg>
            </View>
            <View style={styles.container}>
                <TouchableOpacity
                    style={[styles.loginButton, loading && styles.disabledButton]}
                    onPress={handleGoogleSignIn}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#F1567D" />
                    ) : (
                        <View style={styles.buttonContent}>
                            <Google width={20} height={20} />
                            <Text style={styles.buttonText}>Google</Text>
                        </View>
                    )}
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginButton} onPress={login}>
                    <Phone width={20} height={20} />
                    {/* <Image source={PhoneLogo} style={styles.icon} /> */}
                    <Text style={styles.buttonText}>Phone</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.divider} />
            </View>
            <View style={styles.socialButtonsContainer}>  
                <TouchableOpacity>
                    <Users width={38} height={38} />
                </TouchableOpacity>
            </View>

            <Text style={styles.termsText}>
                Login means you agree to <Text style={styles.boldText}>Terms of Use</Text>, <Text style={styles.boldText}>Privacy Policy</Text>{'\n'}Powered by <Text style={styles.boldText}>Dozo!live</Text>
            </Text>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 10,
        padding: 20,
        borderRadius: 10,
    },
    gradientTextContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F1F1F',
        marginBottom: 20,
    },
    loginButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        textAlign: 'center',
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 21.45,
        shadowColor: 'rgba(0, 0, 0, 0.09)',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
        width: 250,
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    buttonText: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
        textAlign: 'center',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: scaleHeight(10),
        width: '80%',
    },
    buttonContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    disabledButton: {
        opacity: 0.5,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
    },

    dividerText: {
        marginHorizontal: 10,
        fontSize: 16,
        alignItems: 'center',
        color: '#777',
        fontWeight: '500',
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 28, // Space between icons
        marginTop: 20, // Space below divider
    },

    socialIcon: {
        width: 38,
        height: 38,
        flexShrink: 0,
    },
    termsText: {
        marginTop: 40,
        textAlign: 'center',
        color: '#1F1F1F',
        fontFamily: 'DM Sans',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16,
    },
    boldText: {
        fontWeight: 'bold',
    },

});
