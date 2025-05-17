import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';

const Settings = ({ navigation }) => {
  const [serialNumber, setSerialNumber] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/robot-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.searchContainer}>
          <Image
            source={require('../assets/search.png')}
            style={styles.searchIcon}
            resizeMode="contain"
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#FFFFFF"
          />
        </View>
        <TouchableOpacity style={styles.menuButton}>
          <Image 
            source={require('../assets/menu.png')}
            style={styles.menuIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Settings</Text>
        </View>

        <View style={styles.connectionSection}>
          <Text style={styles.connectionText}>
            My Home: <Text style={styles.connectedText}>Connected*</Text>
          </Text>
          <View style={styles.serialInputContainer}>
            <TextInput
              style={styles.serialInput}
              placeholder="Serial-number"
              value={serialNumber}
              onChangeText={setSerialNumber}
            />
            <TouchableOpacity style={styles.connectButton}>
              <Text style={styles.connectButtonText}>Connect</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.riceCookerContainer}>
          <Image
            source={require('../assets/rice-cooker.png')}
            style={styles.riceCookerImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.modeToggleContainer}>
          <TouchableOpacity 
            style={[styles.modeButton, !isDarkMode && styles.activeMode]}
            onPress={() => setIsDarkMode(false)}
          >
            <Text style={[styles.modeButtonText, !isDarkMode && styles.activeModeText]}>
              Light Mode
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.modeButton, isDarkMode && styles.activeMode]}
            onPress={() => setIsDarkMode(true)}
          >
            <Text style={[styles.modeButtonText, isDarkMode && styles.activeModeText]}>
              Dark Mode
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Image
            source={require('../assets/profile.png')}
            style={styles.profileIcon}
          />
          <Text style={styles.profileButtonText}>Your Profile</Text>
          <Text style={styles.arrowIcon}>→</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('TermsOfService')}>
          <Text style={styles.footerText}>Term of Service</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}>
          <Text style={styles.footerText}>Privacy policy</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ContactUs')}>
          <Text style={styles.footerText}>Contact Us</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#178ea3',
  },
  logo: {
    width: 50,
    height: 50,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    height: 40,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF',
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    padding: 0,
  },
  menuIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  titleContainer: {
    backgroundColor: '#178ea3',
    padding: 15,
    borderRadius: 25,
    marginBottom: 30,
    borderWidth: 0.9,
    borderColor: '#096171',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  connectionSection: {
    marginBottom: 30,
  },
  connectionText: {
    fontSize: 16,
    marginBottom: 10,
  },
  connectedText: {
    color: '#4CAF50',
  },
  serialInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serialInput: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  connectButton: {
    backgroundColor: '#178ea3',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  connectButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  riceCookerContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  riceCookerImage: {
    width: 300,
    height: 320,
  },
  modeToggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    padding: 4,
    marginBottom: 40,
  },
  modeButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeMode: {
    backgroundColor: '#000000',
  },
  modeButtonText: {
    fontSize: 16,
    color: '#666666',
  },
  activeModeText: {
    color: '#FFFFFF',
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#178ea3',
    padding: 16,
    borderRadius: 25,
  },
  profileIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
    marginRight: 12,
  },
  profileButtonText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  arrowIcon: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    height: 40,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF',
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    padding: 0,
  },
  menuIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#096171',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  footerText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default Settings;