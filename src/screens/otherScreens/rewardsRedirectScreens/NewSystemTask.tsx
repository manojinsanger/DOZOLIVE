import React from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Image,
} from 'react-native';
import CustomHeader from '@/components/profile/CustomHeader';
import beanIcon from '@/assets/images/bean.png';
import {
  defaultPadding,
  scaleFont,
  scaleHeight,
  scaleWidth,
} from '@/constants/scaling';
import ThemedText from '@/components/ThemedText';
import LinnerGradientCard from '@/components/common/gradientCards/LinnearGradientCard';
import customColors from '@/constants/styles';

interface Level {
  level: string;
  totalCapital: string;
  dailyEarnings: string;
  hoursPerDay: string;
}

interface Rule {
  text: string;
}

interface Notice {
  text: string;
}

// Data
const levels: Level[] = [
  {
    level: 'S',
    totalCapital: '50,000,000',
    dailyEarnings: '120,000',
    hoursPerDay: '4H/दिन',
  },
  {
    level: 'A',
    totalCapital: '22,000,000',
    dailyEarnings: '70,000',
    hoursPerDay: '4H/दिन',
  },
  {
    level: 'B',
    totalCapital: '10,000,000',
    dailyEarnings: '50,000',
    hoursPerDay: '3H/दिन',
  },
  {
    level: 'C',
    totalCapital: '7,000,000',
    dailyEarnings: '40,000',
    hoursPerDay: '3H/दिन',
  },
  {
    level: 'D',
    totalCapital: '4,000,000',
    dailyEarnings: '28,000',
    hoursPerDay: '3H/दिन',
  },
  {
    level: 'E',
    totalCapital: '2,000,000',
    dailyEarnings: '18,000',
    hoursPerDay: '3H/दिन',
  },
  {
    level: 'F',
    totalCapital: '1,200,000',
    dailyEarnings: '12,000',
    hoursPerDay: '3H/दिन',
  },
  {
    level: 'G',
    totalCapital: '900,000',
    dailyEarnings: '9,000',
    hoursPerDay: '2H/दिन',
  },
  {
    level: 'H',
    totalCapital: '300,000',
    dailyEarnings: '5,000',
    hoursPerDay: '2H/दिन',
  },
  {
    level: 'I',
    totalCapital: '150,000',
    dailyEarnings: '3,000',
    hoursPerDay: '2H/दिन',
  },
];

const newHostData = {
  label: 'नया होस्ट',
  dailyEarnings: '10,000',
  hoursPerDay: '3H/दिन',
  days: '7 दिन',
};

const ordinaryHostData = {
  label: 'साधारण होस्ट',
  dailyEarnings: '2,000',
  hoursPerDay: '1H/दिन',
  condition: 'नया होस्ट नहीं और पिछले 7 दिनों की आय < 150,000',
};

const rules: Rule[] = [
  {
    text: 'होस्ट दैनिक कार्य हाल के 7 दिनों की कुल लाइवस्ट्रीम आय पर निर्भर करता है (पार्टी में शामिल होने और लाइव देखने की आय भी शामिल होती, चलफंड हाल के 7 दिनों की अवधि हाल के 6 दिनों से दैनिक आय बदती है, और कार्य स्तर को मूल्य दिया जा सकता है, लेकिन समान अवधि के कार्य का दोबा दावा एक बार किया जा सकता है)। ऊपरोक्त स्तर के बाद कार्य परिस्कार प्राप्त करने की अनुमति की जाती है।',
  },
];

const notices: Notice[] = [
  { text: 'सभी तरफ रिवॉर्ड पहिटेड है' },
  {
    text: 'इसकम में लाइव इनकम और पार्टी इनकाम शामिल है (स्नाइप कार्ड और गीफ्ट वाइप और योगदान की आय को जाएगी, इसमें टेलीफोन रिचार्ज शामिल नहीं है)।',
  },
  {
    text: 'जिस दिन इनकम लक्ष्य तक पहुंच जाएगी, एक नया लाइभ नोटिफिकार तरफ अपने आपसे प्रदर्शित होगा',
  },
  {
    text: 'होस्ट जिसने कई बार रजिस्टर किए है, और जो कई आईपी नई नई उपकरणों के साथ लॉग इन करते है, उन्हें नीती भंग के रूप में देखा जाएगा।',
  },
];

const NewTaskSystem: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar backgroundColor="#6200ee" barStyle="light-content" /> */}
      <CustomHeader title="New Task System" />

      <ScrollView style={styles.scrollView}>
        <LinnerGradientCard customStyles={styles.purpleBanner}>
          <ThemedText style={styles.bannerTitle}>मेजबान कार्य</ThemedText>
          <ThemedText style={styles.bannerSubtitle}>विस्तृत विवरण</ThemedText>

          <ThemedText style={styles.bannerDescription}>
            प्रिय होस्ट, डोज़ो लाइव के स्वस्थ विकास के लिए डोज़ो लाइव मेजबान
            कार्य प्रणाली को सशापोषित करेंगा।
          </ThemedText>

          <ThemedText style={styles.sectionTitle}>नियम</ThemedText>
          {rules.map((rule, index) => (
            <ThemedText key={index} style={styles.ruleText}>
              {rule.text}
            </ThemedText>
          ))}
        </LinnerGradientCard>


        <View style={styles.sectionContainer}>
          <ThemedText style={styles.levelTitle}>स्तर कार्य</ThemedText>
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <ThemedText style={styles.levelCell} children={undefined}></ThemedText>
              <View
                style={[
                  styles.tableRow,
                  {
                    borderBottomWidth: 0,
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: 5,
                  },
                ]}>
                <Text>हाल के 7 दिनों की आय</Text>
                <Image style={styles.bean} source={beanIcon} />
              </View>
              <ThemedText style={styles.headerCell}>दिन का कार्य इनाम</ThemedText>
            </View>

            {levels.map((level, index) => (
              <View
                key={index}
                style={[
                  styles.tableRow,
                  index % 2 === 0 ? styles.evenRow : {},
                ]}>
                <ThemedText style={styles.levelCell}>{level.level}</ThemedText>
                <ThemedText style={styles.valueCell}>{level.totalCapital}</ThemedText>
                <View style={styles.earningsCell}>
                  <ThemedText style={styles.earningsValue}>
                    {level.dailyEarnings} / H
                  </ThemedText>
                  <Image style={styles.beanInline} source={beanIcon} />
                  <ThemedText style={styles.hoursValue}>{level.hoursPerDay}</ThemedText>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <ThemedText style={styles.levelTitle}>नए होस्ट</ThemedText>
          <ThemedText style={styles.newHostDesc}>
            रजिस्टर के 7 दिनों, के भीतर होस्ट सुरक्षा नीति का आनंद ले सकते हैं
          </ThemedText>

          <View style={styles.smallTableContainer}>
            <View style={styles.tableHeader}>
              {/* <ThemedText style={styles.headerCell}></ThemedText> */}
              <ThemedText style={styles.headerCell}>दिन का कार्य इनाम</ThemedText>
            </View>

            <View style={styles.tableRow}>
              <ThemedText style={styles.levelCell}>{newHostData.label}</ThemedText>
              <View style={styles.earningsCell}>
                <ThemedText style={styles.earningsValue}>
                  {newHostData.dailyEarnings} / H
                </ThemedText>
                <Image style={styles.beanInline} source={beanIcon} />
                <ThemedText style={styles.hoursValue}>{newHostData.hoursPerDay}</ThemedText>
                <ThemedText style={styles.daysValue}>{newHostData.days}</ThemedText>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <ThemedText style={styles.levelTitle}>साधारण होस्ट</ThemedText>
          <ThemedText style={styles.ordinaryHostDesc}>
            {ordinaryHostData.condition}
          </ThemedText>

          <View style={styles.smallTableContainer}>
            <View style={styles.tableHeader}>
              {/* <ThemedText style={styles.headerCell}></ThemedText> */}
              <ThemedText style={styles.headerCell}>दिन का कार्य इनाम</ThemedText>
            </View>

            <View style={styles.tableRow}>
              <ThemedText style={styles.levelCell}>{ordinaryHostData.label}</ThemedText>
              <View style={styles.earningsCell}>
                <ThemedText style={styles.earningsValue}>
                  {ordinaryHostData.dailyEarnings} / H
                </ThemedText>
                <Image style={styles.beanInline} source={beanIcon} />
                <ThemedText style={styles.hoursValue}>
                  {ordinaryHostData.hoursPerDay}
                </ThemedText>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <ThemedText style={styles.levelTitle}>सूचना</ThemedText>
          {notices.map((notice, index) => (
            <View key={index} style={styles.noticeContainer}>
              <ThemedText style={styles.noticeNumber}>{index + 1}.</ThemedText>
              <ThemedText style={styles.noticeText}>{notice.text}</ThemedText>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: scaleHeight(12),
    paddingHorizontal: defaultPadding,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    marginRight: scaleWidth(10),
  },
  headerTitle: {
    fontSize: scaleFont(18),
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  purpleBanner: {
    padding: defaultPadding,
    paddingBottom: scaleHeight(30),
    marginTop:20,

  },
  bannerTitle: {
    fontSize: scaleFont(54),
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  bean: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginRight: -20,
  },
  beanInline: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginLeft: 2,
    marginRight: 2,
  },
  bannerSubtitle: {
    fontSize: scaleFont(20),
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
    marginBottom: scaleHeight(20),
  },
  bannerDescription: {
    fontSize: scaleFont(16),
    color: '#fff',
    marginBottom: scaleHeight(20),
    lineHeight: scaleHeight(24),
    textAlign: 'center'
  },
  sectionTitle: {
    fontSize: scaleFont(18),
    fontWeight: '500',
    color: customColors.white,
    marginBottom: scaleHeight(10),
    textAlign: 'center',
  },
  ruleText: {
    fontSize: scaleFont(14),
    color: '#fff',
    lineHeight: scaleHeight(22),
    textAlign: 'center'
  },
  sectionContainer: {
    backgroundColor: '#fff',
    padding: defaultPadding,
    marginTop: scaleHeight(10),
  },
  levelTitle: {
    fontSize: scaleFont(18),
    fontWeight: '500',
    color: '#8a4baf',
    marginBottom: scaleHeight(10),
    textAlign: 'center',
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: scaleWidth(10),
    overflow: 'hidden',
  },
  smallTableContainer: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: scaleWidth(10),
    overflow: 'hidden',
    marginTop: scaleHeight(10),
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    padding: scaleWidth(10),
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerCell: {
    flex: 1,
    fontSize: scaleFont(14),
    fontWeight: '500',
    textAlign: 'center',
    alignSelf: 'center'
  },
  tableRow: {
    flex: 1,
    flexDirection: 'row',
    padding: scaleWidth(8),
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: "center"
  },
  evenRow: {
    backgroundColor: '#f9f9f9',
  },
  levelCell: {
    fontWeight: '500',
    fontSize: scaleFont(14),
    marginLeft: 20,
    textAlign: 'center',
  },
  valueCell: {
    flex: 1,
    fontSize: scaleFont(14),
    textAlign: 'center',
  },
  earningsCell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  earningsValue: {
    fontSize: scaleFont(14),
    fontWeight: '500',
    color: '#8a4baf',
  },
  hoursValue: {
    fontSize: scaleFont(12),
    color: '#666',
    marginLeft: 4,
  },
  daysValue: {
    fontSize: scaleFont(12),
    color: '#666',
    marginLeft: 4,
  },
  newHostDesc: {
    fontSize: scaleFont(14),
    color: '#666',
    marginBottom: scaleHeight(10),
  },
  ordinaryHostDesc: {
    fontSize: scaleFont(14),
    color: '#666',
    marginBottom: scaleHeight(10),
    textAlign: 'center',
  },
  noticeContainer: {
    flexDirection: 'row',
    marginBottom: scaleHeight(8),
  },
  noticeNumber: {
    fontSize: scaleFont(14),
    marginRight: scaleWidth(5),
    fontWeight: '500',
  },
  noticeText: {
    flex: 1,
    fontSize: scaleFont(14),
    lineHeight: scaleHeight(20),
  },
});

export default NewTaskSystem;
