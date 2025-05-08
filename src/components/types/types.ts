// src/types/zego-uikit-prebuilt-live-streaming.d.ts
import { ComponentType } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

declare module '@zegocloud/zego-uikit-prebuilt-live-streaming-rn' {
    export interface ZegoUIKitPrebuiltLiveStreamingProps {
        appID: number;
        appSign: string;
        userID: string;
        userName: string;
        liveID: string;
        config?: {
            onStartLiveButtonPressed?: () => void;
            onLiveStreamingEnded?: () => void;
            onLeaveLiveStreaming?: () => void;
            durationConfig?: {
                isVisible?: boolean;
                onDurationUpdate?: (duration: number) => void;
            };
            topMenuBarConfig?: {
                buttons: string[];
            };
            onWindowMinimized?: () => void;
            onWindowMaximized?: () => void;
        };
        plugins?: any[];
    }

    export const ZegoMenuBarButtonName: {
        minimizingButton: string;
        leaveButton: string;
    };

    export const HOST_DEFAULT_CONFIG: {
        [key: string]: any;
    };

    const ZegoUIKitPrebuiltLiveStreaming: ComponentType<ZegoUIKitPrebuiltLiveStreamingProps>;
}


export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
}

export type StringArrayRecord<T> = Record<string, T[]>;

export interface AsyncState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

export interface User {
    id: string;
    name: string;
}

export interface UserState {
    data: User | null;
    loading: boolean;
    error: string | null;
}

export interface CategoryState {
    selectedCategory: string | null;
    activeSubCategory: string | null;
    subcategories: StringArrayRecord<string>;
}

export interface SetUserActionPayload {
    user: User;
}

export interface SetCategoryActionPayload {
    category: string;
    subcategories: string[];
}

export interface HeaderProps {
    appName: string;
}

export interface ButtonProps {
    onPress: () => void;
    title: string;
    disabled?: boolean;
}

export type RootState = {
    user: UserState;
    category: CategoryState;
};

export type AppDispatch = any;

export type AsyncActionPayload<T> = {
    type: string;
    payload: T;
};

export interface ProfileData {
    id: string,
    coverImage: string | undefined;
    profileImage: string | undefined;
    firstName: string;
    gender: 'male' | 'female';
    age: number;
    gifts: number;
    level: number;
    friends: number;
    followers: number;
    follows: number;
    visitors: number;
}

export interface StatItemProps {
    label: string;
    value: number;
}

export interface MessageCardProps {
    name: string;
    status: string;
    lastMessage: string;
    imageUrl: string;
    lastMessageTime: string;
}

export interface StatsCardProps {
    name: string;
    value: string | number;
    icon: any;
    onPress: () => void;
}

export type Party = {
    id: string;
    title: string;
    image: string;
    isLive: boolean;
    description: string;
};



type Host = {
    name: string;
    gender: string;
    profilePhoto: string;
};

export interface PartyCardProps {
    title: string;
    image: string;
    isLive: boolean;
    location: string;
    userCount: number;
    hosts: Host[] | null;
    onPress: () => void;
}


export interface BannerProps {
    banners: { text: string; imageUrl: string }[];
}

export interface Card {
    imageUrl: string;
    id: number;
    size: 'small' | 'big';
}
export const styles = StyleSheet.create({
    main: {
        flex: 1,
        // backgroundColor: '#1a1a2e',
    },
    videoContainer: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    fullScreenVideo: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 90,
        zIndex: 10,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    liveCount: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 40,
        height: 90,
        zIndex: 10,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    liveCountContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 16,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(12px)",
    },
    liveCountText: {
        color: "#FFF",
        fontSize: 12,
        fontWeight: "bold",
        marginLeft: 4,
    },
    badge: {
        width: 30,
        height: 17,
        marginLeft: 5,
        borderRadius: 13.5,
        backgroundColor: "#F01B43",
        justifyContent: "center",
        alignItems: "center",
        flexShrink: 0,
    },
    text: {
        color: "#FFF",
        fontSize: 10,
        fontWeight: "bold",
    },
    headerContent: {
        marginTop: 40,
        gap: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    backButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 26,
        width: 26,
        backgroundColor: 'rgba(0, 0, 0, 0.40)',
        borderRadius: '50%',
        // backdropFilter: 'Blur(30px)
    },
    coHostContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 120,
        height: 160,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 8,
    },
    coHostVideo: {
        width: '100%',
        height: '100%',
    },
    notificationText: {
        color: '#fff',
        fontSize: 14,
        marginBottom: 5,
    },

    overlayContainer: {
        position: 'absolute',
        width: '100%',
        bottom: 20,
        alignItems: 'center',
    },
    // buttonContainer: {
    //     flexDirection: 'row',
    //     // justifyContent: 'space-evenly',
    //     width: '100%',
    // },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    waitingText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    switchText: {
        color: '#ffffff',
        fontSize: 16,
        marginHorizontal: 10,
    },
    scrollView: {
        maxHeight: 300,
    },
    notificationContainer: {
        position: 'absolute',
        left: 5,
        right: 10,
        bottom: 50,
        display: 'flex',
        // backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 10,
        maxHeight: 200,
    },
    message: {
        color: '#fff',
        fontSize: 14,
        marginBottom: 8,
        fontWeight: '400',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 8,
        borderRadius: 8,
        lineHeight: 14,
        width: '100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 10,
        // borderWidth:1,
        width: '100%'
    },
    circleButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 20,
        height: 20,
        tintColor: '#fff',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 5,
        // paddingHorizontal: 12,
        // borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        // marginHorizontal: 5,
        marginBottom: -21,
    },
    sendInput: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 25,
        color: '#333',
    },
    sendButton: {
        // backgroundColor: '#4A90E2',
        // borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
    },
    sendButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#B0B0B0',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    notificationItem: {
        alignSelf: 'flex-start',
        flexDirection: 'row', // Align image and text horizontally
        alignItems: 'center',
        marginBottom: 10,
        padding: 8,
        // backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: 8,
        width: 'auto',
        paddingHorizontal: 10,
    },
    profileImage: {
        width: 26,
        height: 26,
        borderRadius: 13,
        marginRight: 8,
    },
    textContainer: {
        flexShrink: 1,
    },
    notificationTitle: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#f1f1f1',
        marginBottom: 2,
    },
    notificationMessage: {
        fontSize: 14,
        color: '#f4f4f4',
    },
});

