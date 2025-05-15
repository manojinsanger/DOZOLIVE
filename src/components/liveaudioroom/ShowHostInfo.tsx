import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { scaleFont, scaleWidth } from '@/constants/scaling';

const ShowHostInfo = () => {
  const host = {
    name: 'John Doe',
    id: 'host_12345',
    image: 'https://via.placeholder.com/100', // Replace with actual URL
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Image source={{ uri: host.image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{host.name}</Text>
          <Text style={styles.id}>{host.id}</Text>
        </View>
      </View>
    </View>
  );
};

export default ShowHostInfo;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // 0.3 opacity black background
    padding: 0.5,
    borderRadius: 15,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    paddingRight:10
  },
  image: {
    width: scaleWidth(35),
    height: scaleWidth(35),
    borderRadius: 10,
    backgroundColor: '#ccc',
  },
  textContainer: {
    marginLeft: 12,
  },
  name: {
    fontSize: scaleFont(12),
    fontWeight: '600',
    color: '#fff',
  },
  id: {
    fontSize: scaleFont(12),
    color: '#ddd',
  },
});
