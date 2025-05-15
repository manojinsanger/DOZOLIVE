import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import { scaleWidth, scaleFont } from '@/constants/scaling';

interface UserListModalProps {
  isVisible: boolean;
  onClose: () => void;
  users: any[];
  roomId: string;
  toggleChatMute: (roomId: string, userId: string) => void;
}

const UserListModal: React.FC<UserListModalProps> = ({
  isVisible,
  onClose,
  users,
  roomId,
  toggleChatMute,
}) => {
  const renderUser = ({ item }: { item: any }) => (
    <View style={styles.userRow}>
      <Image
        source={{ uri: item.userProfile || 'https://via.placeholder.com/30' }}
        style={styles.avatar}
      />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.userName}>
          {item.userName}{' '}
          <Text style={styles.roleText}>
            {item.isHost ? '(Host)' : item.isCohost ? '(Co-host)' : ''}
          </Text>
        </Text>

        <Text style={styles.chatMuteInfo}>
          Chat: {item.chatMute ? 'Muted' : 'Unmuted'}
        </Text>
      </View>

      {/* {typeof item.chatMute === 'boolean' && (
        <TouchableOpacity onPress={() => toggleChatMute(roomId, item.id)}>
          <Text style={styles.muteBtn}>
            {item.chatMute ? 'Unmute' : 'Mute'}
          </Text>
        </TouchableOpacity>
      )} */}

    </View>
  );

  return (
<Modal
  isVisible={isVisible}
  onBackdropPress={onClose}
  onBackButtonPress={onClose}
  style={styles.modal}
  backdropOpacity={0.0}
>
  <View style={styles.modalContent}>
    <Text style={styles.title}>Audience Members</Text>
    <FlatList
      data={users}
      renderItem={renderUser}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={
        <Text style={styles.emptyText}>No audience members</Text>
      }
    />
  </View>
</Modal>

  );
};

export default UserListModal;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end', // bottom attachment
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    height: '50%', // half of screen height
  },
  title: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  avatar: {
    width: scaleWidth(30),
    height: scaleWidth(30),
    borderRadius: 15,
    backgroundColor: '#ccc',
  },
  userName: {
    color: 'white',
    fontSize: scaleFont(14),
    fontWeight: '600',
  },
  roleText: {
    fontSize: scaleFont(12),
    color: '#aaa',
  },
  chatMuteInfo: {
    color: '#999',
    fontSize: scaleFont(12),
  },
  muteBtn: {
    color: '#00bfff',
    fontSize: scaleFont(13),
    fontWeight: '500',
  },
  emptyText: {
    color: '#ccc',
    textAlign: 'center',
    marginTop: 20,
    fontSize: scaleFont(14),
  },
});
