import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { scaleWidth, scaleHeight, scaleFont } from '@/constants/scaling';

// Define the props interface
interface RoomMessage {
  id: string;
  type: 'system' | 'join' | 'leave';
  message: string;
  userID?: string;
  userName?: string;
  timestamp: number;
}

interface AudioRoomAnnouncementProps {
  messages: RoomMessage[];
  currentUsers: number;
}

// Use the props interface in the component
const AudioRoomAnnouncement: React.FC<AudioRoomAnnouncementProps> = ({ messages, currentUsers }) => {
  return (
    <View style={styles.announcement}>
      <Text style={styles.announcementTitle}>Announcement</Text>
      {/* Display the number of current users */}
      <Text style={styles.announcementText}>
        {currentUsers} user{currentUsers !== 1 ? 's' : ''} currently in the room
      </Text>
      {/* Display the latest messages */}
      {messages.length > 0 ? (
        messages.slice(-3).map((msg) => ( // Show the last 3 messages to avoid clutter
          <Text key={msg.id} style={styles.announcementText}>
            {msg.message}
          </Text>
        ))
      ) : (
        <Text style={styles.announcementText}>
          Welcome everyone! Let's chat and have fun together!
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  announcement: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: scaleWidth(12),
    padding: scaleWidth(10),
    margin: scaleWidth(16),
    marginTop: scaleHeight(30),
  },
  announcementTitle: {
    color: '#fff',
    fontSize: scaleFont(14),
    fontWeight: 'bold',
    marginBottom: scaleHeight(6),
  },
  announcementText: {
    color: '#fff',
    fontSize: scaleFont(12),
    marginBottom: scaleHeight(4), // Add some spacing between messages
  },
});

export default AudioRoomAnnouncement;