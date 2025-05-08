import { checkUserExists, joinChatRoom, loginUser, registerUser } from "@/controllers/agoraChatService";
import RoomListener from "@/hooks/useChatRoomListener";
import { useRef } from "react";
import createAgoraRtcEngine, { AudienceLatencyLevelType, ChannelProfileType, ClientRoleType, IRtcEngine, IRtcEngineEventHandler, RtcConnection } from "react-native-agora";
import { ChatClient, ChatConnectEventListener, ChatOptions } from "react-native-agora-chat";
import KeyCenter from "./KeyCenter";

const chatClient = ChatClient.getInstance();
const init = async () => {
    const chatOptions = new ChatOptions({
        appKey: KeyCenter.appKey,
        autoLogin: true,
        imServer: KeyCenter.serverUrl,
        debugModel: false,
        acceptInvitationAlways: true,
        autoAcceptGroupInvitation: true,
        deleteMessagesAsExitChatRoom: false
    });
    chatClient.removeAllConnectionListener();
    await chatClient
        .init(chatOptions)
        .then(() => {
            console.log("Agora Chat initialized successfully");

            const listener: ChatConnectEventListener = {
                onTokenWillExpire() {
                    console.log("Token will expire soon. Refresh needed.");
                },
                onTokenDidExpire() {
                    console.log("Token expired. Please re-authenticate.");
                },
                onConnected() {
                    console.log("Connected to Agora Chat successfully");
                },
                onDisconnected() {
                    console.log("Disconnected from Agora Chat.");
                },
            };

            chatClient.addConnectionListener(listener);
        })
        .catch((error) => {
            console.error("Agora Chat initialization failed:", error);
        });

}
export const setupChat = async (showNotification: (title: string, message: string) => void, liveId: Number,userPass:string,chatRoomId:string) => {
    try {
        await init();

        await loginUser(String(liveId), userPass);

        await joinChatRoom(chatRoomId);

        const roomListener = new RoomListener(showNotification);
        const chatClient = ChatClient.getInstance();

        console.log("🛠 Removing Previous Room Listeners...");
        chatClient.roomManager.removeAllRoomListener();

        console.log("🛠 Adding New Chat Room Listener...");
        chatClient.roomManager.addRoomListener(roomListener);

        console.log("✅ Chat Room Listener Successfully Registered!");
    } catch (error) {
        console.error("❌ Error in setupChat:", error);
    }
};

export const setupVideoSDKEngine = async (agoraEngineRef: React.MutableRefObject<IRtcEngine | undefined>, eventHandler: React.MutableRefObject<IRtcEngineEventHandler | undefined>, channelName: string, showNotification: (title: string, message: string) => void, setRemoteUid: React.Dispatch<React.SetStateAction<number>>, setIsJoined: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
        // if (Platform.OS === 'android') {
        //     // await getPermission();
        // }
        agoraEngineRef.current = createAgoraRtcEngine();
        const agoraEngine = agoraEngineRef.current;
        eventHandler.current = {
            onJoinChannelSuccess: () => {
                showNotification('System', 'Successfully joined channel: ' + channelName);
                setIsJoined(true);
            },
            onUserJoined: (_connection: RtcConnection, uid: number) => {
                // showNotification('Remote user ' + uid + ' joined');
                setRemoteUid(uid);
            },
            onUserOffline: (_connection: RtcConnection, uid: number) => {
                // showNotification('Remote user ' + uid + ' left the channel');
                setRemoteUid(uid);
            },
        };

        agoraEngine.registerEventHandler(eventHandler.current);
        agoraEngine.initialize({
            appId: KeyCenter.appId,
        });
        agoraEngine.enableVideo();
    } catch (e) {
        console.log(e);
    }
};

export const join = async (setLoading: React.Dispatch<React.SetStateAction<boolean>>, agoraEngineRef: React.MutableRefObject<IRtcEngine | undefined>, liveId: number, channelName: string, isJoined: boolean, role: string, token: string) => {
    setLoading(true)
    if (isJoined) {
        setLoading(false)
        return;
    }
    try {
        const agoraEngine = agoraEngineRef.current;
        if (!agoraEngineRef.current) return;

        if (role === "broadcaster") {
            agoraEngine?.enableVideo();
            // agoraEngineRef.current?.startPreview();
            agoraEngineRef.current?.startPreview();
            agoraEngineRef.current?.joinChannel(token, channelName, liveId, {
                channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
                clientRoleType: ClientRoleType.ClientRoleBroadcaster,
                publishMicrophoneTrack: true,
                publishCameraTrack: true,
                autoSubscribeAudio: true,
                autoSubscribeVideo: true,
            });
        } else {
            alert('Audience')
            // agoraEngine?.enableVideo();
            agoraEngineRef.current?.joinChannel(token, channelName, liveId, {
                channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
                clientRoleType: ClientRoleType.ClientRoleAudience,
                publishMicrophoneTrack: false,
                publishCameraTrack: false,
                autoSubscribeAudio: true,
                autoSubscribeVideo: true,
                audienceLatencyLevel: AudienceLatencyLevelType.AudienceLatencyLevelUltraLowLatency,
            });
            agoraEngineRef.current?.stopPreview();
        }
    } catch (e) {
        console.log(e);
    } finally {
        setLoading(false)
    }
};