import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import customColors from '@/constants/styles';
import ThemedText from '@/components/ThemedText';
import LinnerGradientCard from '@/components/common/gradientCards/LinnearGradientCard';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const MessagesModal = ({
  visible,
  onClose,
  messages,
  sendMessage,
}: {
  visible: boolean;
  onClose: () => void;
  messages: any;
  sendMessage: (message: string) => Promise<void>;
}) => {
  const [messageInput, setMessageInput] = useState('');
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        textInputRef.current?.focus();
      }, 300);
    } else {
      setMessageInput('');
    }
  }, [visible]);

  const handleSendMessage = async () => {
    if (!messageInput.trim()) return;
    await sendMessage(messageInput);
    setMessageInput('');
    setTimeout(() => {
      textInputRef.current?.focus();
    }, 100);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{
              flex: 1,
              justifyContent: 'flex-end',
            }}
          >
            <View
              style={{
                backgroundColor: customColors.white,
                paddingHorizontal: 20,
                paddingTop: 20,
                paddingBottom: Platform.OS === 'ios' ? 30 : 20,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            >
              {/* Header */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 10,
                }}
              >
                <ThemedText style={{ fontSize: 18, fontWeight: 'bold' }}>
                  Messages
                </ThemedText>
                <TouchableOpacity onPress={onClose}>
                  <AntDesign name="close" size={24} color={customColors.gray700} />
                </TouchableOpacity>
              </View>

              {/* Input */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                }}
              >
                <TextInput
                  ref={textInputRef}
                  style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.05)',
                    borderRadius: 50,
                    padding: 10,
                    paddingLeft: 20,
                    color: customColors.gray700,
                  }}
                  value={messageInput}
                  onChangeText={setMessageInput}
                  placeholder="Type a message..."
                  placeholderTextColor={customColors.gray700}
                  returnKeyType="send"
                  onSubmitEditing={handleSendMessage}
                />
                <TouchableOpacity onPress={handleSendMessage}>
                  <LinnerGradientCard
                    customStyles={{
                      backgroundColor: customColors.secondary,
                      borderRadius: 20,
                      padding: 10,
                      marginLeft: 10,
                    }}
                  >
                    <AntDesign name="right" size={20} color="white" />
                  </LinnerGradientCard>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default MessagesModal;
