import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Modal,
  FlatList,
  Image,
  ListRenderItemInfo,
} from "react-native";
import { useSocket } from "../../context/SocketProvider";
import Ionicons from "react-native-vector-icons/Ionicons";
import UserIcon from "../../assets/images/profile_assets/default-profile.png"

interface HeaderProps {
  appName: string;
}

interface Participant {
  _id: string,
  name: string,
  email: string | null,
  profileImage?: string,
}

interface ChatRequest {
  _id: string;
  participants: Participant[];
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Header: React.FC<HeaderProps> = ({ appName }) => {
  const { socket, userId } = useSocket();
  const [chatRequests, setChatRequests] = useState<ChatRequest[]>([]);
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const [modelVisible, setModelVisible] = useState(false);

  useEffect(() => {
    if (!socket) return;

    socket.on("chatRequests", (newRequest: ChatRequest[]) => {
      console.log("🔔 New Chat Request:", newRequest);
      const filteredRequests = newRequest.filter((item) => item.participants[0]._id !== userId && item.status === 'pending');
      setChatRequests(filteredRequests);
      setNotificationCount(filteredRequests.length);
      console.log("Filtered Requests:", filteredRequests);
    });

    return () => {
      socket.off("chatRequests");
    };
  }, [socket]);

  const handleAction = (senderId: string, action: 'accept' | 'reject'): void => {
    if (!socket) return;

    // Emit the respondChat event with the appropriate action
    socket.emit("respondChat", {
      senderId,
      action
    });
    socket?.emit("getChatRequests");
  };

  const renderNotificationItem = ({ item }: ListRenderItemInfo<ChatRequest>) => {

    return (
      <View style={styles.notificationItem}>
        <Image
          source={item?.participants[0]?.profileImage ? { uri: item.participants[0].profileImage } : UserIcon}
          style={styles.profileImage}
        />
        <View style={styles.notificationContent}>
          <Text style={styles.notificationText}>
            {item?.participants[0]?.name}  wants to chat with you
          </Text>
          <Text style={styles.notificationTime}>
            {new Date(item.createdAt).toLocaleTimeString()}
          </Text>
        </View>
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() => handleAction(item?.participants[0]?._id, 'accept')}
          >
            <Text style={styles.acceptText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rejectButton}
            onPress={() => handleAction(item?.participants[0]?._id, 'reject')}
          >
            <Text style={styles.rejectText}>Reject</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.appName}>{appName}</Text>
        <View style={styles.iconsContainer}>
          <TouchableOpacity
            style={styles.iconBlock}
            onPress={() => console.log("Search")}
          >
            <Ionicons name="search-outline" size={24} color="#ffffff" />

          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconBlock}
            onPress={() => {
              setModelVisible(true)
              socket?.emit("getChatRequests")
            }}
          >
            <Ionicons name="notifications-outline" size={24} color="#ffffff" />
            {notificationCount > 0 && (
              <View style={styles.notificationDot}>
                <Text style={styles.notificationText}>
                  {notificationCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modelVisible}
        onRequestClose={() => setModelVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Chat Requests</Text>
              <TouchableOpacity onPress={() => setModelVisible(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            {chatRequests.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No pending chat requests</Text>
              </View>
            ) : (
              <FlatList
                data={chatRequests}
                renderItem={renderNotificationItem}
                keyExtractor={(item) => item._id}
                style={styles.notificationList}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  bellContainer: {
    position: 'relative',
    padding: 8,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF4B8A',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    marginTop: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationList: {
    flex: 1,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
    padding: 10,

  },
  notificationText: {
    fontSize: 16,
    fontWeight: '500',
  },
  notificationTime: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  actionContainer: {
    flexDirection: 'column',
    gap: 8,
  },
  acceptButton: {
    backgroundColor: '#FF4B8A',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  acceptText: {
    color: 'white',
    fontWeight: 'bold',
  },
  rejectButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  rejectText: {
    color: '#777',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
  },
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingBottom: Platform.OS === "ios" ? 14 : 17,
    zIndex: 10,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
  },
  iconsContainer: {
    flexDirection: "row",
    gap: 15,
  },
  iconBlock: {
    padding: 5,
    position: "relative",
  },
  notificationDot: {
    position: "absolute",
    top: -8,
    right: -5,
    width: 24,
    height: 24,
    borderRadius: 20,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#F1567D",
  },
  // notificationText: {
  //   color: "white",
  //   fontSize: 10,
  //   fontWeight: "bold",
  // },
  // modalOverlay: {
  //   flex: 1,
  //   backgroundColor: 'rgba(0,0,0,0.5)',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // modalContainer: {
  //   width: '90%',
  //   backgroundColor: 'white',
  //   borderRadius: 10,
  //   padding: 15,
  //   maxHeight: '70%',
  // },
  // modalHeader: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   marginBottom: 15,
  // },
  // modalTitle: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  // },
  requestList: {
    paddingVertical: 10,
  },
  requestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  requestUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  requestUserName: {
    fontSize: 16,
    fontWeight: '500',
  },
  requestActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  // acceptButton: {
  //   backgroundColor: '#4CAF50',
  // },
  // rejectButton: {
  //   backgroundColor: '#F44336',
  // },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyStateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#888',
  },
});

export default Header;