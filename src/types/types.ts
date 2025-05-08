// src/types/zego-uikit-prebuilt-live-streaming.d.ts
import { ComponentType } from 'react';
import { TextStyle } from 'react-native';

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

    // export const ZegoMenuBarButtonName: {
    //     minimizingButton: string;
    //     leaveButton: string;
    // };

    // export const HOST_DEFAULT_CONFIG: {
    //     [key: string]: any;
    // };

    // const ZegoUIKitPrebuiltLiveStreaming: ComponentType<ZegoUIKitPrebuiltLiveStreamingProps>;
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
export interface SvgProps {
    width?: number;
    height?: number;
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

export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
    SELLER = 'SELLER',
    HOST= 'HOST',
    AGENT= 'AGENT',
    SUPER_SELLER = 'SUPER_SELLER',
    SUPER_ADMIN = 'SUPER_ADMIN',
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
    specialId:string,
    coverImage: string | undefined;
    profileImage: string | undefined;
    name: string;
    gender: 'Male' | 'Female';
    age: number;
    gifts: number;
    level: number;
    friends: string;
    followers: string;
    following: string;
    visitors: string;
    liveId:number,
    liveLevel?: number,
    wealthLevel?: number,
    roles: UserRole[],
}

export interface StatItemProps {
    label: string;
    value: number;
    color?: string; 
}

export interface MessageCardProps {
    id: string;
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
    iconWidth?: number;
    iconHeight?: number;
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
    banners: { imageUrl: string;image?:any, text: string }[];
    height?: number; // Add height as an optional property
    marginVertical?: number,
    marginHorizontal?: number,
    fontSize?: number;
    color?: string,
    textStyle?: TextStyle,
}


export interface Card {
    imageUrl: string;
    id: number;
    size: 'small' | 'big';
}

export interface InterestChipProps {
    label: string;
    isSelected: boolean;
    onSelect: () => void;
}
 export interface Withdrawal {
    amount: number;
    date: string;
    time: string;
    platformId?: string;
    amountDetails?: string;
    localCurrency?: string;
    actualAmountReceived?: string;
    paymentMethod?: string;
    account?: string;
    orderNumber?: string;
    paymentTime?: string;
  }


  export type PaymentMethodKey = 'epay' | 'usdt' | 'bank' | 'upi';

  export type PaymentMethod = {
     name: string;
     country?: string[];
     icon: any;
     fee: string;
     arrival: string;
     identifier: string;
     id: string;
     withdrawalAmount: string;
     withdrawalPoints: string;
     rules?: {
       exchangeRate: string;
       minWithdrawal: string;
       maxWithdrawal: string | null;
       serviceFeeRates: { range: string; fee: string }[];
       withdrawalFrequency: { range: string; fee: string } | null;
     };
     color?: string;
   };