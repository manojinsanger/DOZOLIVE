import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, StyleSheet, Dimensions, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { redirect } from '@/utils/navigationService';
import LandingPageImage from '../../assets/images/landing_page/OBJECTS.png';
import Tick from '@/assets/images/svgs/Tick';

const { height } = Dimensions.get('window');

const MAJOR_LANGUAGES = ['English', 'Hindi', 'Spanish', 'French', 'Chinese', 'Arabic', 'Bengali', 'Portuguese', 'Russian', 'Japanese'];
const ALLOWED_COUNTRIES = ['US', 'IN', 'BD', 'JP', 'CN', 'RU', 'ID', 'FR', 'ES', 'PT', 'VN'];

export default function LandingPage() {
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectLanguage, setSelectLanguage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const filteredData = data.filter((item: any) => ALLOWED_COUNTRIES.includes(item.cca2));
        const sortedCountries = filteredData.sort((a: any, b: any) => a.name.common.localeCompare(b.name.common));
        setCountries(sortedCountries);
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const handleSelectLanguage = async () => {
    if (selectLanguage) await AsyncStorage.setItem('AppLanguage', selectLanguage);
    redirect('OnboardingScreen', undefined, { replace: true });
  };

  const CustomHeader = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => redirect('OnboardingScreen', undefined, { replace: true })} style={styles.skipButton}>
        <Text style={styles.skipText}>Skip</Text>
        <Feather name="chevrons-right" size={26} color="#000" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <CustomHeader />
        <View style={styles.imageContainer}>
          <Image source={LandingPageImage} style={styles.image} />
        </View>
        <ScrollView contentContainerStyle={styles.listContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            countries.map((item) => {
              if (!item.languages) return null;

              let displayLanguage = item.cca2 === 'IN'
                ? 'Hindi'
                : (Object.values(item.languages) as string[]).filter(lang => MAJOR_LANGUAGES.includes(lang)).join(', ');

              if (!displayLanguage) return null;

              return (
                <TouchableOpacity key={item.cca2} style={styles.countryItem} onPress={() => setSelectLanguage(displayLanguage)}>
                  <Image source={{ uri: item.flags.png }} style={styles.flag} />
                  <View style={styles.dataContainer}>
                    <Text style={styles.language}>{displayLanguage}</Text>
                    {selectLanguage === displayLanguage && <Tick style={styles.tickIcon} />}
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>
      </ScrollView>
      {selectLanguage && (
        <TouchableOpacity style={styles.submitButton} onPress={handleSelectLanguage}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerContainer: { paddingTop: 50, paddingRight: 20, alignItems: 'flex-end' },
  skipButton: { flexDirection: 'row', alignItems: 'center' },
  skipText: { fontSize: 16, fontWeight: '500', marginRight: 5 },
  imageContainer: { height: 330, backgroundColor: '#E8F8F5', justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  listContainer: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 10 },
  dataContainer: { flexDirection: "row", flex: 1, alignItems: "center", justifyContent: "space-between" },
  countryItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 20, borderBottomColor: '#ddd' },
  flag: { width: 30, height: 20, marginRight: 10 },
  language: { fontSize: 16 },
  tickIcon: { marginLeft: "auto" },
  submitButton: { position: 'absolute', bottom: 20, right: 20, backgroundColor: '#F1567D', paddingVertical: 8, paddingHorizontal: 24, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  submitText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
