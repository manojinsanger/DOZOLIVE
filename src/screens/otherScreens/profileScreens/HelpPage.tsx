import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { scaleHeight, scaleWidth, scaleFont } from '@/constants/scaling';
import customColors from '@/constants/styles';
import CustomHeader from '@/components/profile/CustomHeader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ThemedText from '@/components/ThemedText';
import { redirect } from '@/utils/navigationService';

// Define the type for the navigation stack
type RootStackParamList = {
  Help: undefined;
  MyFeedback: undefined;
  MessageFeedback: undefined;
};

// Define the navigation prop type
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Define the type for a single question
interface Question {
  id: number;
  question: string;
  answer: string;
}

// Define the type for the questions object
interface Questions {
  Frequent: Question[];
  Livestream: Question[];
  Recharge: Question[];
  Report: Question[];
  Account: Question[];
}

// Define the possible tab names
type TabName = keyof Questions;

const HelpScreen = () => {
  const [activeTab, setActiveTab] = useState<TabName>('Frequent');
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const navigation = useNavigation<NavigationProp>();

  const questions: Questions = {
    Frequent: [
      {
        id: 1,
        question: 'How to become an agent?',
        answer: 'Please kindly pass the face authentication first and then send message to "Agency Application" in "Help" then our specialist would help you for the agent application process.',
      },
      {
        id: 2,
        question: 'Why can\'t the "Points to be confirmed" be withdrawn?',
        answer: 'I didn\'t receive salary after making withdrawal. What should I do?',
      },
      {
        id: 3,
        question: 'I didn\'t receive coins after topping up. What should I do?',
        answer: 'Please contact support for assistance.',
      },
      {
        id: 4,
        question: 'How to quit an agency?',
        answer: 'Please follow the agency termination process via the account settings.',
      },
      {
        id: 5,
        question: 'Why is my livestream task missing?',
        answer: 'Check your task history or contact support if the issue persists.',
      },
    ],
    Livestream: [
      {
        id: 1,
        question: 'Why is my livestream not starting?',
        answer: 'Ensure your internet connection is stable and check livestream settings.',
      },
      {
        id: 2,
        question: 'How to schedule a livestream?',
        answer: 'Go to the livestream section and use the schedule feature.',
      },
    ],
    Recharge: [
      {
        id: 1,
        question: 'Why didn\'t I receive coins after recharging?',
        answer: 'Contact support with your transaction details.',
      },
    ],
    Report: [
      {
        id: 1,
        question: 'How to file a report?',
        answer: 'Navigate to the Report tab and submit your issue.',
      },
    ],
    Account: [
      {
        id: 1,
        question: 'How to update my account?',
        answer: 'Go to Account settings and edit your profile.',
      },
    ],
  };

  const toggleAnswer = (id: number) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  const tabs = [
    { name: 'Frequent' as TabName, icon: MaterialIcons, iconName: 'local-fire-department', iconColor: customColors.res500 },
    { name: 'Livestream' as TabName, icon: MaterialIcons, iconName: 'video-camera-back', iconColor: customColors.Blue400 },
    { name: 'Recharge' as TabName, icon: MaterialIcons, iconName: 'payment', iconColor: customColors.yellow300 },
    { name: 'Report' as TabName, icon: MaterialIcons, iconName: 'report-problem', iconColor: customColors.green200 },
    { name: 'Account' as TabName, icon: MaterialIcons, iconName: 'person', iconColor: customColors.blue700 },
  ];

  const renderQuestion = (item: Question) => (
    <View key={item.id} style={styles.questionWrapper}>
      <TouchableOpacity
        style={styles.question}
        onPress={() => toggleAnswer(item.id)}
      >
        <ThemedText style={styles.questionText}>{item.question}</ThemedText>
        {expandedQuestion === item.id ? (
          <MaterialIcons name="expand-more" style={styles.dropdownIcon} />
        ) : (
          <MaterialIcons name="chevron-right" style={styles.dropdownIcon} />
        )}
      </TouchableOpacity>
      {expandedQuestion === item.id && (
        <View style={styles.answer}>
          <ThemedText style={styles.answerText}>{item.answer}</ThemedText>
        </View>
      )}
      {expandedQuestion !== item.id && (
        <View style={styles.verticalLine} />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <CustomHeader title="Help" textColor="black" />
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.name}
            style={[
              styles.tab,
              activeTab === tab.name && styles.activeTab,
            ]}
            onPress={() => setActiveTab(tab.name)}
          >
            <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
              <tab.icon name={tab.iconName} size={18} color={tab.iconColor} />
              <ThemedText style={[styles.tabText, activeTab !== tab.name && { color: 'black' }]}>{tab.name}</ThemedText>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView style={styles.content}>
        <ThemedText style={styles.sectionTitle}>{activeTab}</ThemedText>
        <View style={styles.questionsContainer}>
          {questions[activeTab].map(renderQuestion)}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.feedbackButton}
           onPress={() => redirect('myfeedback')}
        >
          <ThemedText style={styles.buttonText}>My feedback</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.feedbackButton, styles.messageButton]}
          onPress={() => redirect('messagefeedback')}
        >
          <ThemedText style={styles.buttonText}>Message feedback</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    padding: scaleWidth(12),
    backgroundColor: '#fff',
  },
  tab: {
    padding: scaleWidth(14),
    borderRadius: scaleWidth(8),
    backgroundColor: customColors.gray100,
    alignItems: 'center',
    marginRight: 10,
    marginBottom: scaleHeight(8),
  },
  activeTab: {
    backgroundColor: customColors.secondary,
  },
  tabText: {
    fontSize: scaleFont(12),
    color: customColors.white,
  },
  content: {
    flex: 1,
    padding: scaleWidth(16),
  },
  sectionTitle: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    color: customColors.textLightPrimary,
    marginBottom: scaleHeight(8),
  },
  questionsContainer: {
    marginBottom: scaleHeight(16),
  },
  questionWrapper: {
    marginBottom: scaleHeight(8),
    borderRadius: scaleWidth(8),
  },
  question: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: scaleWidth(12),
  },
  questionText: {
    fontSize: scaleFont(15),
    color: customColors.textLightPrimary,
  },
  dropdownIcon: {
    fontSize: scaleFont(18),
    color: customColors.textLightSecondary,
  },
  answer: {
    padding: scaleWidth(12),
    backgroundColor: '#fff',
  },
  answerText: {
    fontSize: scaleFont(14),
    color: customColors.textLightSecondary,
  },
  verticalLine: {
    height: 2,
    backgroundColor: customColors.gray100,
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: scaleWidth(16),
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',

    bottom: 0,
  },
  feedbackButton: {
    padding: scaleWidth(12),
    borderRadius: scaleWidth(30),
    backgroundColor: '#d8d5ff',
  },
  messageButton: {
    backgroundColor: '#6b48ff',
  },
  buttonText: {
    fontSize: scaleFont(15),
    color: '#fff',
  },
});

export default HelpScreen;