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
  Alert,
} from 'react-native';
import { useMQTT } from '../context/MQTTContext';

const Settings = ({ navigation }) => {
  const [serialNumber, setSerialNumber] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Use MQTT context for real-time connection status
  const { connectionStatus, reconnect, disconnect, publishMessage, mqtt_pub_topic } = useMQTT();

  const handleReconnect = () => {
    Alert.alert(
      'MQTT Reconnection',
      'Attempting to reconnect to MQTT broker...',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reconnect',
          onPress: () => {
            reconnect();
          },
        },
      ]
    );
  };

  const handleDisconnect = () => {
    Alert.alert(
      'MQTT Disconnection',
      'Are you sure you want to disconnect from MQTT broker?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Disconnect',
          onPress: () => {
            disconnect();
          },
        },
      ]
    );
  };

  const testConnection = () => {
    const testMessage = `Test message from RiceBot app at ${new Date().toLocaleTimeString()}`;
    const success = publishMessage(mqtt_pub_topic, testMessage);
    
    if (success) {
      Alert.alert('Test Message', 'Test message sent successfully!');
    } else {
      Alert.alert('Test Message', 'Failed to send test message. Please check connection.');
    }
  };

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
          <Text style={styles.connectionText}>MQTT Connection Status: </Text>

          <View style={styles.connectionStatusContainer}>
            <Text style={[styles.connectionStatus, connectionStatus === 'Connected' ? styles.connected : styles.disconnected]}>
              {connectionStatus}
            </Text>

            <View style={[styles.circle, connectionStatus === 'Connected' ? styles.connectedCircle : styles.disconnectedCircle]} />
          </View>

          {/* MQTT Control Buttons */}
          <View style={styles.mqttControlsContainer}>
            <TouchableOpacity 
              style={[styles.mqttButton, styles.reconnectButton]}
              onPress={handleReconnect}
              disabled={connectionStatus === 'Connected'}
            >
              <Text style={styles.mqttButtonText}>Reconnect</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.mqttButton, styles.disconnectButton]}
              onPress={handleDisconnect}
              disabled={connectionStatus === 'Disconnected'}
            >
              <Text style={styles.mqttButtonText}>Disconnect</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.mqttButton, styles.testButton]}
              onPress={testConnection}
              disabled={connectionStatus !== 'Connected'}
            >
              <Text style={styles.mqttButtonText}>Test</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.mqttTestScreenButton}
            onPress={() => navigation.navigate('MQTTTestScreen')}
          >
            <Text style={styles.mqttTestScreenButtonText}>Open MQTT Debug Screen</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.riceCookerContainer}>
          <Image
            source={require('../assets/rice-cooker.png')}
            style={styles.riceCookerImage}
            resizeMode="contain"
          />
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
  connectionStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  connectionStatus: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  connected: {
    color: 'green',
  },
  disconnected: {
    color: 'red',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 50,
    marginLeft: 5,
  },
  connectedCircle: {
    backgroundColor: 'green',
  },
  disconnectedCircle: {
    backgroundColor: 'red',
  },
  mqttControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  mqttButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 2,
    alignItems: 'center',
  },
  reconnectButton: {
    backgroundColor: '#178ea3',
  },
  disconnectButton: {
    backgroundColor: '#dc3545',
  },
  testButton: {
    backgroundColor: '#28a745',
  },
  mqttButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  mqttTestScreenButton: {
    backgroundColor: '#6c757d',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  mqttTestScreenButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  riceCookerContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  riceCookerImage: {
    width: 300,
    height: 320,
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#178ea3',
    padding: 16,
    borderRadius: 25,
    marginBottom: 50,
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
});

export default Settings;
