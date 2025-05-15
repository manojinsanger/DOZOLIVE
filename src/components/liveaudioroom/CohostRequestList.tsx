import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import { scaleFont, scaleWidth } from '@/constants/scaling';
import customColors from '@/constants/styles';

interface CohostRequestModalProps {
  isVisible: boolean;
  onClose: () => void;
  cohostRequests: string[];
  users: any[];
  roomId: string;
  acceptCohost: (roomId: string, userId: string) => void;
  rejectCohost: (roomId: string, userId: string) => void;
}

const CohostRequestModal: React.FC<CohostRequestModalProps> = ({
  isVisible,
  onClose,
  cohostRequests,
  users,
  roomId,
  acceptCohost,
  rejectCohost,
}) => {
  const renderCohostRequest = ({ item }: { item: string }) => {
    const user = users.find((u) => u.id === item);
    if (!user) return null;

    return (
      <View style={styles.requestItem}>
        <Image
          source={{ uri: user.userProfile || 'https://via.placeholder.com/30' }}
          style={styles.avatar}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.nameText}>
            {user.userName} wants to be a co-host
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={() => acceptCohost(roomId, user.id)}
            >
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rejectButton}
              onPress={() => rejectCohost(roomId, user.id)}
            >
              <Text style={styles.buttonText}>Reject</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
        backdropOpacity={0.0}
    >
      <View style={styles.modalContent}>
        <Text style={styles.title}>Co-host Requests</Text>
        <FlatList
          data={cohostRequests}
          renderItem={renderCohostRequest}
          keyExtractor={(item) => item}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No cohost requests</Text>
          }
        />
      </View>
    </Modal>
  );
};

export default CohostRequestModal;

const styles = StyleSheet.create({
  modal: {
 justifyContent: 'flex-end', // bottom attachment
    margin: 0,
  },
modalContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    height: '50%', 
},

  title: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    color: customColors.gray700,
    marginBottom: 10,
  },
  requestItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  avatar: {
    width: scaleWidth(40),
    height: scaleWidth(40),
    borderRadius: 20,
    backgroundColor: '#ccc',
  },
  nameText: {
    color: 'white',
    fontSize: scaleFont(14),
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  acceptButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  rejectButton: {
    backgroundColor: '#f44336',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
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
