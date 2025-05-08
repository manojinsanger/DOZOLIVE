import KeyCenter from "@/components/live/KeyCenter";
import { ChatClient, ChatOptions, ChatConnectEventListener, ChatMessage, ChatMessageChatType, ChatRoomMessagePriority } from "react-native-agora-chat";

// const CLIENT_ID = "b280bf90abde4866af6a5f93f4bf4f58";
// const CLIENT_SECRET = "f2ab306813ae44dd9c161222970059d6";
// const chatToken = '007eJxTYHhjcnrBf/nsxSuPhfc0mC5/kb8/N9FX4PvKkBDLx27x9z4qMBiaJJkZGRsYJhslGZuYGSUlJSebJZqmpaSlWBgYWponqvqvSW8IZGQIae1nYGRgBWImBhCfgQEAGOAfOA=='
// const adminToken = '007eJxTYPh9teD48grHza6b1K/tygn7GGp54rDpJNf57mckrz+9s+eLAoOhSZKZkbGBYbJRkrGJmVFSUnKyWaJpWkpaioWBoaV5Ir/06vSGQEYGe4OPLIwMrAyMQAjiqzAYGxqbGpiaG+imWpia6BoapqbpWpgmJutampqZGZubJJqaGloAAIQgKJ0='

const chatClient = ChatClient.getInstance();


const apiUrl = `${KeyCenter.serverUrl}/${KeyCenter.orgName}/${KeyCenter.appName}`


const initChat = async () => {
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

    try {
        await chatClient.init(chatOptions);
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
    } catch (error) {
        console.error("Agora Chat initialization failed:", error);
    }
};



const registerUser = async (userId: string, password: string) => {
    try {

        // const token = await getAgoraToken();
        // if (!token) {
        //     console.error("Failed to get Agora token. User registration aborted.");
        //     return;
        // }
        const response = await fetch(`${apiUrl}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${KeyCenter.chatToken}`
            },
            body: JSON.stringify({
                username: userId,
                password: password,
                // grant_type: "client_credentials",
                // client_id: CLIENT_ID,
                // client_secret: CLIENT_SECRET
            })
        });

        const data = await response.json();

        if (response.ok) {
            // console.log("User registered successfully:", data);
        } else {
            console.error("User registration failed:", data);
        }
    } catch (error) {
        console.error("Error registering user:", error);
    }
};

const loginUser = async (userId: string, password: string) => {
    try {
        await chatClient.login(userId, password, true);
        console.log("User logged in successfully:", userId);
    } catch (error) {
        console.error("User login failed:", error);
    }
};

const checkUserExists = async (userId: string) => {
    const url = `${apiUrl}/users/${userId}`;
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${KeyCenter.chatToken}`
            }
        });

        if (response.ok) {
            console.log("User exists:", userId);
            return true;
        } else {
            console.log("User does not exist:", userId);
            return false;
        }
    } catch (error) {
        console.error("Error checking user existence:", error);
        return false;
    }
};

// Create a chat room
const createChatRoom = async (channelName: string, adminId: string,) => {
    try {
        const subject = `Live Room ${channelName}`;
        const desc = "Live Streaming Chat Room";
        const welcomeMsg = "Welcome to the chat room!";
        const maxCount = 10000;

        // const room = await chatClient.roomManager.createChatRoom(
        //     subject,
        //     desc,
        //     welcomeMsg,
        //     [],
        //     maxCount
        // );

        const room = await fetch(`${apiUrl}/chatrooms`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${KeyCenter.chatToken}`
            },
            body: JSON.stringify({
                name: subject,
                description: desc,
                maxusers: maxCount,
                owner: adminId,
                members: [adminId]
                // grant_type: "client_credentials",
                // client_id: CLIENT_ID,
                // client_secret: CLIENT_SECRET
            })
        });
        const jsonData = await room.json();
        console.log("Chat room created:", JSON.stringify(jsonData, null, 4));

        if (jsonData.id) {
            console.log("Chat Room ID:", jsonData.data.id);
        } else {
            console.log("Chat room ID not found in response.");
        }
        // console.log("Chat room created:", room);
        return jsonData.data.id;
    } catch (error) {
        console.error("Chat room creation failed:", error);
        return null;
    }
};

const joinChatRoom = async (chatRoomId: string) => {
    try {
        await chatClient.roomManager.joinChatRoom(chatRoomId);
        console.log("Joined Chat Room:", chatRoomId);
    } catch (error) {
        console.error("Failed to join chat room:", error);
    }
};

const leaveChatRoom = async (chatRoomId: string) => {
    try {
        await chatClient.roomManager.leaveChatRoom(chatRoomId);
        console.log("Left Chat Room:", chatRoomId);
    } catch (error) {
        console.error("Failed to Leave chat room:", error);
    }
};


const sendMessageToRoom = async (roomId: string, messageText: any) => {
    try {
        const message = ChatMessage.createTextMessage(
            roomId, JSON.stringify(messageText),
            ChatMessageChatType.ChatRoom,
            {
                deliverOnlineOnly: true,
            }
        );
        message.messagePriority = ChatRoomMessagePriority.PriorityHigh;

        await ChatClient.getInstance().chatManager.sendMessage(message);

        // console.log('Message sent:', message);
    } catch (error) {
        console.error('Failed to send message:', error);
    }
};

export {
    initChat,
    registerUser,
    loginUser,
    checkUserExists,
    createChatRoom,
    joinChatRoom,
    leaveChatRoom,
    sendMessageToRoom
};
