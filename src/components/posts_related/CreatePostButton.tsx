import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { redirect } from '@/utils/navigationService';
import customColors from '@/constants/styles';
import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';

const CreatePostButton = ({ animatedContainerStyle }: { animatedContainerStyle: any }) => {
  return (
    <TouchableOpacity
      style={styles.floatingButton}
      onPress={() => redirect('CreatePost')}
    >
      <LinearGradient
        colors={[customColors.primary, customColors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 1]}
        style={[styles.gradientBackground, animatedContainerStyle]} // Apply animated width style here
      >
        <View style={styles.lottieContainer}>
          <Image
            source={require('../../assets/images/icon/liveBtnPng5.webp')}
            style={{ width: 30, height: 30 }}
          />
        </View>
        <Text style={styles.buttonText}>Create New Post</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: scaleHeight(80),
    right: scaleWidth(10),
    borderRadius: scaleWidth(50),
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: scaleWidth(8),
    shadowOffset: { width: 0, height: scaleHeight(3) },
  },
  gradientBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scaleHeight(8),
    paddingHorizontal: scaleWidth(10),
    borderRadius: scaleWidth(50),
    overflow: 'hidden',
    gap: 5,
  },
  lottieContainer: {
    width: scaleWidth(20),
    height: scaleHeight(20),
    borderRadius: scaleWidth(25),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaleWidth(5),
  },
  buttonText: {
    color: customColors.white,
    fontSize: scaleFont(14),
    fontWeight: '600',
  },
});

export default CreatePostButton;
