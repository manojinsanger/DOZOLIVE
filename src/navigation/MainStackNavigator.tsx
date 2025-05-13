import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTabNavigator from './MainTabNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StorePage from '@/screens/otherScreens/profileScreens/Store';
import AgencyJoinScreen from '@/screens/otherScreens/profileScreens/MyAgency';
import LiveData from '@/screens/otherScreens/profileScreens/LiveData';
import RewardScreen from '@/screens/otherScreens/profileScreens/Rewards';
import Ranking from '@/screens/otherScreens/profileScreens/Ranking';
import InviteScreen from '@/screens/otherScreens/profileScreens/Invite';
import Agent from '@/screens/otherScreens/profileScreens/Agent';
import AgentInvite from '@/screens/otherScreens/AgentRedirectScreens/AgentInvite';
import AgentInviteButton from '@/screens/otherScreens/AgentRedirectScreens/AgentInviteButton';
import AddHost from '@/screens/otherScreens/AgentRedirectScreens/AddHost';
import AddHostButton from '@/screens/otherScreens/AgentRedirectScreens/AddHostButton';
import AgentRanking from '@/screens/otherScreens/AgentRedirectScreens/AgentRanking';
import HostApplication from '@/screens/otherScreens/AgentRedirectScreens/HostApplication';
import ActivityCenter from '@/screens/otherScreens/AgentRedirectScreens/AgentActivityCenter';
import RulesPage from '@/screens/otherScreens/AgentRedirectScreens/RulesPage';
import MorePriceDetails from '@/screens/otherScreens/tradingRedirectScreens/MorePriceDetails';
import Trading from '@/screens/otherScreens/profileScreens/Trading';
import TopUpCoin from '@/screens/otherScreens/tradingRedirectScreens/TopUpCoins';
import TradingDetails from '@/screens/otherScreens/tradingRedirectScreens/TradingDetails';
import BDCenterScreen from '@/screens/otherScreens/profileScreens/BDCenter';
import AgencyData from '@/screens/otherScreens/bdCenterRedirectScreens/AgencyData';
import InviteAgency from '@/screens/otherScreens/bdCenterRedirectScreens/InviteAgency';
import PayrollScreen from '@/screens/otherScreens/profileScreens/PayRoll';
import AbandonmentOfOrdersScreen from '@/screens/otherScreens/payrollRedirectScreens/AbandonmentOfOrdersScreen';
import SettingsScreen from '@/screens/otherScreens/profileScreens/Setting';
import RecordPage from '@/screens/otherScreens/coinsRedirectScreens/Record';
import Coins from '@/screens/otherScreens/profileScreens/Coins';
import Agents from '@/screens/otherScreens/coinsRedirectScreens/Agents';
// import NotificationsScreen from '@/screens/otherScreens/profileScreens/setting/Notification';
import PrivacyPolicy from '@/screens/otherScreens/profileScreens/setting/PrivacyPolicy';
import Privacy from '@/screens/otherScreens/profileScreens/setting/Privacy';
import BlockedListScreen from '@/screens/otherScreens/profileScreens/setting/BlockedList';
import ConnectedAccountScreen from '@/screens/otherScreens/profileScreens/setting/ConnectedAccount';
import AboutUsScreen from '@/screens/otherScreens/profileScreens/setting/AboutUs';
import HelpUs from '@/screens/otherScreens/profileScreens/setting/HelpUs';
import UserAgreementScreen from '@/screens/otherScreens/profileScreens/setting/UserAgreement';
import UserRechargeAgreement from '@/screens/otherScreens/profileScreens/setting/UserRechargeAgreement';
import NoChildAgreement from '@/screens/otherScreens/profileScreens/setting/NoChildAgreement';
import FacebookAccountScreen from '@/screens/otherScreens/profileScreens/setting/FaceBookAccount';
import TwitterAccountScreen from '@/screens/otherScreens/profileScreens/setting/TwitterAccount';
import InstagramAccountScreen from '@/screens/otherScreens/profileScreens/setting/InstagramAccount';
import GoogleAccountScreen from '@/screens/otherScreens/profileScreens/setting/GoogleAccount';
import PhoneAccount from '@/screens/otherScreens/profileScreens/setting/PhoneAccount';
import PointsScreen from '@/screens/otherScreens/profileScreens/Points';
import BroadcasterAgreement from '@/screens/otherScreens/profileScreens/setting/BroadcasterAgreement';
import WithdrawNow from '@/screens/otherScreens/pointsRedirectScreens/WithdrawNow';
import TransferScreen from '@/screens/otherScreens/pointsRedirectScreens/Transfer';
import TransactionDetailsScreen from '@/screens/otherScreens/pointsRedirectScreens/TransactionDetails';
import ProfileById from '@/screens/otherScreens/profileScreens/ProfileById';
import LiveTextScreen from '@/screens/TestScreen';
import AgentRecruiting from '@/screens/otherScreens/profileScreens/AgentRecruiting';
import NewTaskSystem from '@/screens/otherScreens/rewardsRedirectScreens/NewSystemTask';
import WithdrawalDetails from '@/screens/otherScreens/pointsRedirectScreens/WithrawalDetails';
import WithdrawalRecord from '@/screens/otherScreens/pointsRedirectScreens/WithdrawalRecords';
import ScamAlert from '@/screens/otherScreens/pointsRedirectScreens/ScamAlert';
import PointsConfirmationScreen from '@/screens/otherScreens/pointsRedirectScreens/PointsToBeConfirmed';
import PaymentMethodScreen from '@/screens/otherScreens/pointsRedirectScreens/PaymentMthods';
import ViewPaymentDetails from '@/screens/otherScreens/pointsRedirectScreens/ViewPaymentDetails';
import MyAgencyWrapper from '@/screens/otherScreens/AgencyScreens/MyAgencyWrapper';


import FollowPage from '@/screens/otherScreens/profileScreens/FollowingPage';
import FriendsPage from '@/screens/otherScreens/profileScreens/FriendsPage';
import FollowersPage from '@/screens/otherScreens/profileScreens/FollowersPage';
import VisitorsPage from '@/screens/otherScreens/profileScreens/Visitors';
import TopupDetails from '@/screens/otherScreens/TopupRedirectScreens/TopupDetails';
import HelpScreen from '@/screens/otherScreens/profileScreens/HelpPage';
import myfeedback from '@/screens/otherScreens/HelpRedirectScreens/MyFeedback';
import MyFeedback from '@/screens/otherScreens/HelpRedirectScreens/MyFeedback';
import MessageFeedback from '@/screens/otherScreens/HelpRedirectScreens/MessageFeedback';
import AllAgency from '@/screens/otherScreens/bdCenterRedirectScreens/AllAgency';
import HostDetails from '@/screens/otherScreens/AgentRedirectScreens/HostDetails';
import NotificationsScreen from '@/screens/otherScreens/profileScreens/setting/Notification';
import AgencyCongratulationsScreen from '@/screens/otherScreens/AgencyScreens/AgencyCongratulationsScreen';
import ProfileEdit from '@/screens/otherScreens/editProfileRedirectsScreens/profile-e';
import ExchangeCoinsScreen from '@/screens/otherScreens/pointsRedirectScreens/ExchangeCoins';
import AskHelpPage from '@/screens/otherScreens/profileScreens/AskHelpPage';
import Level from "@/screens/otherScreens/profileScreens/Level";
import TextScreen2 from '@/screens/TextScreen2';
import JoinAsViewerScreen from '@/screens/otherScreens/LiveScreens/JoinRoom';
import HostVideoLiveScreen from '@/screens/otherScreens/LiveScreens/HostVideoLiveScreen';

import LiveEndedScreen from '@/screens/otherScreens/LiveScreens/LiveEndedScreen';

import LiveVideoViewerScreen from '@/screens/otherScreens/LiveScreens/LiveVideoViewerScreen';
import AudioRoom from '@/screens/otherScreens/LiveScreens/AudioRoom';
import { SafeAreaView } from 'react-native-safe-area-context';

import RoomEntryScreen from '@/screens/otherScreens/LiveScreens/RoomEntryScreen';

import HostVideoLiveScreenWrapper from '@/screens/otherScreens/LiveScreens/HostVideoLiveScreenWrapper';

import PublicProfilePage from '@/screens/otherScreens/profileScreens/PublicProfilePage';

import Preview from '@/screens/otherScreens/LiveScreens/PreviewPage';
import { UserProvider } from '@/context/UserProvider';
import UserJoinLiveScreen from '@/screens/otherScreens/LiveScreens/JoinRoom';
import CreatePostScreen from '@/components/posts_related/CreatePostScreen';
import PostDetailScreen from '@/components/posts_related/PostDetailScreen';
import UpdatePostScreen from '@/components/posts_related/UpdatePostScreen';
import AudienceAudioRoom from '@/screens/otherScreens/LiveScreens/AudienceAudioRoom';
import CreateAudioRoomScreen from '@/screens/otherScreens/LiveScreens/CreateLiveAudioRoom';
import { AudioRoomProvider } from '@/context/AudioRoomSocketProvider'; // Adjust the import path

export type MainStackParamList = {
    Tabs: undefined;
    store: undefined;
    myagency: undefined;
    agencycongratulations: undefined;
    livedata: undefined;
    rewards: undefined;
    ranking: undefined;
    invite: undefined;
    agent: undefined;
    agentinvite: undefined;
    agentinvitebutton: undefined;
    addhost: undefined;
    addhostbutton: undefined;
    agentranking: undefined;
    hostapplication: undefined;
    activitycenter: undefined;
    rulespage: undefined;
    trading: undefined;
    morepricedetails: undefined;
    exchangecoins: undefined;
    topupcoin: undefined;
    tradingdetails: {
        walletType?: "SELLER" | "COIN" | "BEAN"
    };
    bdcenter: undefined;
    agencydata: undefined;
    allagency: undefined;
    inviteagency: undefined;
    payroll: undefined;
    abandonmentOfordersscreen: undefined;
    coins: undefined;
    agents: undefined;
    record: undefined;
    points: undefined;
    settingscreen: undefined;
    notification: undefined;
    privacy: undefined;
    blockedlist: undefined;
    connectedaccount: undefined;
    aboutus: undefined;
    helpus: undefined;
    privacypolicy: undefined;
    useragreement: undefined;
    broadcasteragreement: undefined;
    userrechargeagreement: undefined;
    nochildagreement: undefined;
    facebookaccount: undefined;
    twitteraccount: undefined;
    instagramaccount: undefined;
    googleaccount: undefined;
    phoneaccount: undefined;
    withdrawnow: { id: string };
    transfer: undefined;
    transactiondetails: undefined;
    profilebyid: { id: string, };
    livetestscreen: undefined;
    newtaskscreen: undefined;
    agentRecruiting: undefined;
    withdrawalRecord: undefined;
    withdrawalDetails: undefined;
    scamAlert: undefined;
    pointsToBeConfirmed: undefined;
    paymentMethods: undefined;
    viewpaymentdetails: { method: string }
    hostdetails: undefined;
    followingpage: undefined;
    followerspage: undefined;
    friendspage: undefined;
    visitorspage: undefined;
    topupdetails: undefined;
    helpscreen: undefined;
    myfeedback: undefined;
    messagefeedback: undefined;
    profileedit: undefined;
    askHelpPage: undefined;
    level: undefined;
    liveenedscreen: undefined;
    audioscreen: {
        userID: string,
        userName: string,
        roonID: string,
        isHost: boolean,
    };
    roomentryscreen: undefined;
    publicprofilepage: { id: string, isUserFollowing: boolean };
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainStackNavigator() {
    return (
        <UserProvider>
            <AudioRoomProvider>
                <Stack.Navigator
                    // screenOptions={{
                    //     headerShown: false,
                    //     animation: 'slide_from_right', 
                    // }}
                    screenOptions={{
                        headerShown: false,
                        animation: 'slide_from_right', // Options: 'default', 'fade', 'slide_from_right', 'slide_from_left', 'slide_from_bottom', 'none'
                        animationDuration: 100, // 💡 speeds up the transition (default is ~300)
                    }}
                >
                    <Stack.Screen name="Tabs" component={MainTabNavigator} options={{ headerShown: false }} />
                    <Stack.Screen name="store" component={StorePage} />
                    <Stack.Screen name="myagency" component={AgencyJoinScreen} />
                    <Stack.Screen name="agencycongratulations" component={AgencyCongratulationsScreen} />
                    <Stack.Screen name="livedata" component={LiveData} />
                    <Stack.Screen name="rewards" component={RewardScreen} />
                    <Stack.Screen name="ranking" component={Ranking} />
                    <Stack.Screen name="invite" component={InviteScreen} />
                    <Stack.Screen name="agent" component={Agent} />
                    <Stack.Screen name="agentinvite" component={AgentInvite} />
                    <Stack.Screen name="agentinvitebutton" component={AgentInviteButton} />
                    <Stack.Screen name="addhost" component={AddHost} />
                    <Stack.Screen name="addhostbutton" component={AddHostButton} />
                    <Stack.Screen name="agentranking" component={AgentRanking} />
                    <Stack.Screen name="hostapplication" component={HostApplication} />
                    <Stack.Screen name="activitycenter" component={ActivityCenter} />
                    <Stack.Screen name="rulespage" component={RulesPage} />
                    <Stack.Screen name="trading" component={Trading} />
                    <Stack.Screen name="morepricedetails" component={MorePriceDetails} />
                    <Stack.Screen name="exchangecoins" component={ExchangeCoinsScreen} />
                    <Stack.Screen name="topupcoin" component={TopUpCoin} />
                    <Stack.Screen name="tradingdetails" component={TradingDetails} />
                    <Stack.Screen name="bdcenter" component={BDCenterScreen} />
                    <Stack.Screen name="agencydata" component={AgencyData} />
                    <Stack.Screen name="allagency" component={AllAgency} />
                    <Stack.Screen name="inviteagency" component={InviteAgency} />
                    <Stack.Screen name="payroll" component={PayrollScreen} />
                    <Stack.Screen name="abandonmentOfordersscreen" component={AbandonmentOfOrdersScreen} />
                    <Stack.Screen name="coins" component={Coins} />
                    <Stack.Screen name="agents" component={Agents} />
                    <Stack.Screen name="record" component={RecordPage} />
                    <Stack.Screen name="points" component={PointsScreen} />
                    <Stack.Screen name="withdrawnow" component={WithdrawNow} />
                    <Stack.Screen name="transfer" component={TransferScreen} />
                    <Stack.Screen name="transactiondetails" component={TransactionDetailsScreen} />
                    {/* ----profile --  */}
                    <Stack.Screen name="profilebyid" component={ProfileById} />

                    <Stack.Screen name="settingscreen" component={SettingsScreen} />
                    <Stack.Screen name="notification" component={NotificationsScreen} />
                    <Stack.Screen name="privacy" component={Privacy} />
                    <Stack.Screen name="blockedlist" component={BlockedListScreen} />
                    <Stack.Screen name="connectedaccount" component={ConnectedAccountScreen} />
                    <Stack.Screen name="aboutus" component={AboutUsScreen} />
                    <Stack.Screen name="helpus" component={HelpUs} />
                    <Stack.Screen name="privacypolicy" component={PrivacyPolicy} />
                    <Stack.Screen name="useragreement" component={UserAgreementScreen} />
                    <Stack.Screen name="broadcasteragreement" component={BroadcasterAgreement} />
                    <Stack.Screen name="userrechargeagreement" component={UserRechargeAgreement} />
                    <Stack.Screen name="nochildagreement" component={NoChildAgreement} />
                    <Stack.Screen name="facebookaccount" component={FacebookAccountScreen} />
                    <Stack.Screen name="twitteraccount" component={TwitterAccountScreen} />
                    <Stack.Screen name="instagramaccount" component={InstagramAccountScreen} />
                    <Stack.Screen name="googleaccount" component={GoogleAccountScreen} />
                    <Stack.Screen name="phoneaccount" component={PhoneAccount} />
                    <Stack.Screen name="livetestscreen" component={LiveTextScreen} />
                    <Stack.Screen name="myagencywrapper" component={MyAgencyWrapper} />
                    <Stack.Screen name="livetestscreen2" component={HostVideoLiveScreenWrapper} />
                    <Stack.Screen name="preview" component={Preview} />
                    <Stack.Screen name="joinStream" component={UserJoinLiveScreen} />


                    <Stack.Screen name="newtaskscreen" component={NewTaskSystem} />
                    <Stack.Screen name="agentRecruiting" component={AgentRecruiting} />
                    <Stack.Screen name="withdrawalRecord" component={WithdrawalRecord} />
                    <Stack.Screen name="withdrawalDetails" component={WithdrawalDetails} />
                    <Stack.Screen name="scamAlert" component={ScamAlert} />
                    <Stack.Screen name="pointsToBeConfirmed" component={PointsConfirmationScreen} />
                    <Stack.Screen name="paymentMethods" component={PaymentMethodScreen} />
                    <Stack.Screen name="viewpaymentdetails" component={ViewPaymentDetails} />


                    <Stack.Screen name="followingpage" component={FollowPage} />
                    <Stack.Screen name="followerspage" component={FollowersPage} />
                    <Stack.Screen name="friendspage" component={FriendsPage} />
                    <Stack.Screen name="visitorspage" component={VisitorsPage} />
                    <Stack.Screen name="topupdetails" component={TopupDetails} />
                    <Stack.Screen name="helpscreen" component={HelpScreen} />
                    <Stack.Screen name="myfeedback" component={MyFeedback} />
                    <Stack.Screen name="messagefeedback" component={MessageFeedback} />

                    <Stack.Screen name="hostdetails" component={HostDetails} />
                    <Stack.Screen name="profileedit" component={ProfileEdit} />
                    <Stack.Screen name="askHelpPage" component={AskHelpPage} />
                    <Stack.Screen name="level" component={Level} />
                    <Stack.Screen name="liveenedscreen" component={LiveEndedScreen} />
                    <Stack.Screen name="roomentryscreen" component={RoomEntryScreen} />
                    <Stack.Screen name="publicprofilepage" component={PublicProfilePage} />

                    <Stack.Screen name="PostDetail" component={PostDetailScreen} />
                    <Stack.Screen name="CreatePost" component={CreatePostScreen} />
                    <Stack.Screen name="UpdatePost" component={UpdatePostScreen} />




                    <Stack.Screen name="audioscreen" component={AudioRoom} />
                    <Stack.Screen name="audienceaudioroom" component={AudienceAudioRoom} />
                    <Stack.Screen name="createaudioroom" component={CreateAudioRoomScreen} />
                </Stack.Navigator>
            </AudioRoomProvider>
        </UserProvider>
    );
}