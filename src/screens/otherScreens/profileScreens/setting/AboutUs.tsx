import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  StatusBar,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {redirect} from '@/utils/navigationService';
import SettingPagesHeader from '@/components/profile/SettingPagesHeader';
import CustomHeader from '@/components/profile/CustomHeader';

const aboutItems = [
  {id: '1', title: 'Privacy Policy'},
  {id: '2', title: 'Terms Of Service'},
  {id: '3', title: 'Live Agreement'},
  {id: '4', title: 'User Recharge Agreement'},
  {id: '5', title: 'No Child Engangement Policy'},
];

const AboutUsScreen = () => {
  const handlePress = (title: string) => {
    let route: string | undefined;

    switch (title) {
      case 'Privacy Policy':
        route = 'privacypolicy';
        break;
      case 'Terms Of Service':
        route = 'useragreement';
        break;
      case 'Live Agreement':
        route = 'broadcasteragreement';
        break;
      case 'User Recharge Agreement':
        route = 'userrechargeagreement';
        break;
      case 'No Child Engangement Policy':
        route = 'nochildagreement';
        break;
    }

    if (route) {
      redirect(route); // uses your navigation helper
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Settings" />
      <FlatList
        data={aboutItems}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => handlePress(item.title)}>
            <Text style={styles.itemText}>{item.title}</Text>
            <MaterialIcons name="keyboard-arrow-right" size={28} color="#777" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    paddingHorizontal: 25,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#F1567D',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 18,
    color: '#000',
  },
});

export default AboutUsScreen;
