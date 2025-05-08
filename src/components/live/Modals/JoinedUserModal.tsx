import { View, Modal, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { scaleWidth } from '@/constants/scaling';
import customColors from '@/constants/styles';
import ThemedText from '@/components/ThemedText';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const JoinedUserModal = ({ visible, onClose, users }) => {
    const renderUserItem = (user:any) => (
        <View
            key={user.id}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: 'rgba(255,255,255,0.1)',
            }}
        >
            <Image
                source={user.avatar}
                style={{ width: scaleWidth(40), height: scaleWidth(40), borderRadius: 20 }}
            />
            <ThemedText style={{ marginLeft: 10, fontSize: 16 }}>{user.name}</ThemedText>
        </View>
    );

    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                }}
            >
                <View
                    style={{
                        height: SCREEN_HEIGHT / 2,
                        backgroundColor: customColors.white,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        paddingHorizontal: 20,
                        paddingTop: 20,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 10,
                        }}
                    >
                        <ThemedText style={{ fontSize: 18, fontWeight: 'bold' }}>
                            Live Users
                        </ThemedText>
                        <TouchableOpacity onPress={onClose}>
                            <AntDesign name="close" size={24} color={customColors.gray700} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {users.map(renderUserItem)}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

export default JoinedUserModal;

// import { View, Text } from 'react-native'
// import React from 'react'

// const JoinedUsermodal = () => {
//   return (
//     <View>
//       <Text>JoinedUsermodal</Text>
//     </View>
//   )
// }

// export default JoinedUsermodal