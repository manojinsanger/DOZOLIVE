import React, { useState } from 'react';
import { Animated, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import PartyScreen from '../screens/tabScreens/PartyScreen';
import ExploreScreen from '../screens/tabScreens/ExploreScreen';
import MessageScreen from '../screens/tabScreens/MessageScreen';
import ProfileScreen from '../screens/tabScreens/ProfileScreen';

// Icons
import UserIcon from '../assets/images/navigation_assets/profile.svg';
import UserActiveIcon from '../assets/images/navigation_assets/profile-active.svg';
import ExploreIcon from '../assets/images/navigation_assets/explore.svg';
import ExploreActiveIcon from '../assets/images/navigation_assets/explore-active.svg';
import MessageIcon from '../assets/images/navigation_assets/chat.svg';
import MessageActiveIcon from '../assets/images/navigation_assets/chat-active.svg';
import LiveIcon from '../assets/images/navigation_assets/live.svg';
import LiveActiveIcon from '../assets/images/navigation_assets/live-active.svg';
import PartyIcon from '../assets/images/navigation_assets/glass.svg';
import PartyActiveIcon from '../assets/images/navigation_assets/glass-active.svg';
import customColors from '../constants/styles';
import HomeLiveScreen from '../screens/tabScreens/HomeLiveScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {

    const [scaleValues] = useState<{ [key: string]: Animated.Value }>({
        live: new Animated.Value(1),
        party: new Animated.Value(1),
        explore: new Animated.Value(1),
        message: new Animated.Value(1),
        profile: new Animated.Value(1),
    });

    const getTabIcon = (
        focused: boolean,
        icon: React.ReactElement,
        activeIcon: React.ReactElement,
        tabName: string
    ) => {
        Animated.spring(scaleValues[tabName], {
            toValue: 1,
            useNativeDriver: true,
        }).start();

        return (
            <Animated.View style={{ transform: [{ scale: scaleValues[tabName] }] }}>
                {focused ? activeIcon : icon}
            </Animated.View>
        );
    };

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
               
                //   tabBarButton: (props) => <HapticTab {...props} />,
                tabBarActiveTintColor:customColors.accent,
                tabBarInactiveTintColor:customColors.gray500,
                tabBarStyle: {
                    position: 'absolute',
                    shadowColor: 'red',
                    shadowOffset: { width: 4, height: 10 },
                    shadowOpacity: Platform.OS === 'android' ? 1 : 0.001,
                    shadowRadius: 5,
                    borderRadius: Platform.OS === 'android' ? 0 : 50,
                    height: Platform.OS === 'android' ? 65 : 70,
                    overflow: 'hidden',
                    marginBottom: Platform.OS === 'android' ? 0 : 30,
                    marginHorizontal: Platform.OS === 'android' ? 0 : 10,
                    paddingBottom:20,
                    paddingTop: 4,
                    backgroundColor: customColors.gray100,
                },
            
            }}
        >
            <Tab.Screen
                name="Live"
                component={HomeLiveScreen}
                options={{
                    tabBarIcon: ({ focused }) => getTabIcon(focused, <LiveIcon />, <LiveActiveIcon />, 'live'),
                }}
            />
            <Tab.Screen
                name="Party"
                component={PartyScreen}
                options={{
                    tabBarIcon: ({ focused }) => getTabIcon(focused, <PartyIcon />, <PartyActiveIcon />, 'party'),
                }}
            />
            <Tab.Screen
                name="Explore"
                component={ExploreScreen}
                options={{
                    tabBarIcon: ({ focused }) => getTabIcon(focused, <ExploreIcon />, <ExploreActiveIcon />, 'explore'),
                }}
            />
            <Tab.Screen
                name="Message"
                component={MessageScreen}
                options={{
                    tabBarIcon: ({ focused }) => getTabIcon(focused, <MessageIcon />, <MessageActiveIcon />, 'message'),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => getTabIcon(focused, <UserIcon />, <UserActiveIcon />, 'profile'),
                    tabBarLabel: 'My Profile',
                }}
            />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;
