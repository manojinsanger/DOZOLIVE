import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Modal,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import Img1 from '@/assets/images/landing_page/placeholder11.png'
import Img2 from '@/assets/images/landing_page/placeholder12.png'
import Img3 from '@/assets/images/landing_page/placeholder21.png'
import Img4 from '@/assets/images/landing_page/placeholder22.png'
import Img5 from '@/assets/images/landing_page/placeholder32.png'


import { Ionicons } from "@expo/vector-icons";

const blockedUsers = [
  {
    id: "1",
    name: "Ralph Jones",
    emoji: "😎",
    username: "4657185624",
    image: Img1,
  },
  {
    id: "2",
    name: "Johnny Neal",
    emoji: "❤️",
    username: "4657185624",
    image: Img2,
  },
  {
    id: "3",
    name: "Akshay Syal",
    emoji: "",
    username: "syalakshay",
    image: Img3,
  },
  {
    id: "4",
    name: "Ralph Jones",
    emoji: "",
    username: "4657185624",
    image: Img4,
  },
  {
    id: "5",
    name: "Ana Fields",
    emoji: "😍",
    username: "anfields",
    image: Img5,
  },
];

const BlockedListScreen = () => {
  const [users, setUsers] = useState(blockedUsers);
  const [selectedUser, setSelectedUser] = useState<{ id: string; name: string; emoji: string; username: string; image: any } | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleUnblock = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
    setModalVisible(false);
  };

  const openModal = (user: { id: string; name: string; emoji: string; username: string; image: any }) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitle: "Settings",
          headerBackVisible: true,
          headerStyle: { backgroundColor: "#F1567D" },
          headerTintColor: "#ffffff",
        }}
      />

      {/* Blocked Users List */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userRow}>
            <Image source={item.image} style={styles.avatar} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>
                {item.name} {item.emoji}
              </Text>
              <Text style={styles.userUsername}>{item.username}</Text>
            </View>
            <TouchableOpacity onPress={() => openModal(item)}>
              <Ionicons
                name="remove-circle-outline"
                size={24}
                color="#CECECE"
              />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Confirmation Modal */}
      {selectedUser && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Are you sure to remove {selectedUser.name} from your blocklist?
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton]}
                  onPress={() => handleUnblock(selectedUser.id)}
                >
                  <Text style={styles.modalButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f1f1f",
  },
  userUsername: {
    fontSize: 14,
    color: "#777777",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 30,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  modalButtonText: {
    fontSize: 16,
    color: "#F1567D",
  },
});

export default BlockedListScreen;
