import React from 'react';
import { View, Text, Linking, TouchableOpacity, Share, StyleSheet, StatusBar } from 'react-native';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons   from 'react-native-vector-icons/MaterialCommunityIcons';
import  Entypo  from 'react-native-vector-icons/Entypo';
import CustomHeader from '@/components/profile/CustomHeader';
import customColors from '@/constants/styles'; 
import { scaleWidth, scaleHeight, scaleFont } from '@/constants/scaling'; 
import LottieView from 'lottie-react-native';
import MainContainer from '@/components/common/mainContainers/MainContainer';
import ThemedText from '@/components/ThemedText';

const inviteLink = 'https://videochat.kissu.site/invite-agent_new/?inviter_id=59172856&c=cde';

const AgentInviteButton = () => {
  const handleCopyLink = async () => {
    await Share.share({ message: inviteLink });
  };

  const openLink = async (platform: any) => {
    let url = '';
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(inviteLink)}`;
        break;
      case 'messenger':
        url = `fb-messenger://share/?link=${encodeURIComponent(inviteLink)}`;
        break;
      case 'whatsapp':
        url = `whatsapp://send?text=${encodeURIComponent(inviteLink)}`;
        break;
      case 'line':
        url = `https://line.me/R/msg/text/?${encodeURIComponent(inviteLink)}`;
        break;
      case 'more':
        await Share.share({ message: inviteLink });
        return;
    }
    Linking.openURL(url).catch(err => console.error('Error opening link', err));
  };

  return (
    <MainContainer>
    <View style={styles.container}>
    <StatusBar barStyle="light-content" backgroundColor={"transparent"}  />
    <CustomHeader title="Invite Agent" textColor='white' />
   
    <View>
    </View>
   <View style={styles.lottieContainer}>
     <LottieView
       source={require('../../../assets/animations/agent_invite.json')}
       autoPlay
       loop
       style={styles.animation}
     />
   </View>
   <View style={styles.card}>
     <ThemedText style={styles.title}>1. Copy link</ThemedText>
     <View style={styles.linkBox}>
       <ThemedText style={styles.link}>{inviteLink}</ThemedText>
     </View>
     <TouchableOpacity style={styles.copyButton} onPress={handleCopyLink}>
       <ThemedText style={styles.copyButtonText}>Copy</ThemedText>
     </TouchableOpacity>
     <ThemedText style={styles.description}>
       Copy the link to invite users, after the successful invitation, you can enjoy the commission of the game consumption
     </ThemedText>
   </View>
   <View style={styles.card}>
     <ThemedText style={styles.title}>2. Share to other platforms</ThemedText>
     <View style={styles.iconRow}>
       <TouchableOpacity onPress={() => openLink('facebook')}>
         <FontAwesome name="facebook" size={scaleFont(30)} color="#3b5998" />
       </TouchableOpacity>
       <TouchableOpacity onPress={() => openLink('messenger')}>
         <MaterialCommunityIcons name="facebook-messenger" size={scaleFont(30)} color="#0084ff" />
       </TouchableOpacity>
       <TouchableOpacity onPress={() => openLink('whatsapp')}>
         <FontAwesome name="whatsapp" size={scaleFont(30)} color="#25D366" />
       </TouchableOpacity>
       <TouchableOpacity onPress={() => openLink('line')}>
         <FontAwesome name="comment" size={scaleFont(30)} color="#00c300" />
       </TouchableOpacity>
       <TouchableOpacity onPress={() => openLink('more')}>
         <Entypo name="dots-three-horizontal" size={scaleFont(30)} color="#333" />
       </TouchableOpacity>
     </View>
     <TouchableOpacity style={styles.shareButton} onPress={() => openLink('more')}>
       <ThemedText style={styles.copyButtonText}>Click to share</ThemedText>
     </TouchableOpacity>
   </View>
 </View>
    </MainContainer>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  card: {
    backgroundColor: customColors.white,
    borderRadius: scaleWidth(15),
    padding: scaleWidth(20),
    marginBottom: scaleHeight(20),
    elevation: 3,
    marginHorizontal:scaleWidth(20)
  },
  title: {
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    marginBottom: scaleHeight(10),
    color: customColors.textLightPrimary,
  },
  linkBox: {
    backgroundColor: customColors.gray200, // Changed from #f0e6ff
    padding: scaleWidth(10),
    borderRadius: scaleWidth(10),
  },
  link: {
    color: customColors.secondary, // Changed from #8000ff
    fontWeight: 'bold',
  },
  copyButton: {
    backgroundColor: customColors.accent, // Changed from #c24ae4
    padding: scaleWidth(10),
    borderRadius: scaleWidth(10),
    alignItems: 'center',
    marginVertical: scaleHeight(10),
  },
  copyButtonText: {
    color: customColors.white,
    fontWeight: 'bold',
  },
  description: {
    fontSize: scaleFont(12),
    color: customColors.textLightSecondary, // Changed from #666
    marginTop: scaleHeight(5),
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: scaleHeight(10),
  },
  shareButton: {
    backgroundColor: customColors.accent, 
    padding: scaleWidth(10),
    borderRadius: scaleWidth(10),
    alignItems: 'center',
    marginTop: scaleHeight(10),
  },
  lottieContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  animation: {
    width: 290,
    height: 290,
  },
});

export default AgentInviteButton;