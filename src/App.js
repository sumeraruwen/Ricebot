import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import MQTTConnection from './MQTTConnection';

const App = () => {
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [receivedMessage, setReceivedMessage] = useState('');
  const mqttClientRef = useRef(null);

  const mqtt_sub_topic = 'ricecooker/command';
  const mqtt_pub_topic = 'ricecooker/status';

  useEffect(() => {
    const handleMessageReceived = (message) => {
      console.log('Received message in App.js:', message);
      setReceivedMessage(message);
    };

    // Create a new MQTTConnection instance
    mqttClientRef.current = new MQTTConnection(
      'react-native-app-client-' + Math.random().toString(16).substr(2, 8),
      handleMessageReceived
    );

    const client = mqttClientRef.current.client;

    client.on('connect', () => {
      console.log('MQTT connection successful');
      setConnectionStatus('Connected');
      Alert.alert('MQTT Connection', 'Connected to MQTT Broker!');
      
      mqttClientRef.current.subscribe(mqtt_sub_topic);
      mqttClientRef.current.publish(mqtt_pub_topic, 'React Native App Connected');
    });

    client.on('error', (error) => {
      console.error('MQTT connection error:', error);
      setConnectionStatus('Connection failed');
      Alert.alert('MQTT Connection', 'Failed to connect to the MQTT Broker!');
    });

    client.on('close', () => {
      console.log('MQTT connection closed');
      setConnectionStatus('Disconnected');
    });

    return () => {
      if (mqttClientRef.current) {
        mqttClientRef.current.disconnect();
        console.log('MQTT client disconnected');
      }
    };
  }, []);

  const handleReconnect = () => {
    if (mqttClientRef.current && connectionStatus === 'Disconnected') {
      console.log('Attempting to reconnect...');
      setConnectionStatus('Reconnecting...');
      mqttClientRef.current.client.reconnect();
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Status: {connectionStatus}</Text>
      <Text>Last Received Message: {receivedMessage}</Text>
      <Button
        title="Reconnect to MQTT"
        onPress={handleReconnect}
        disabled={connectionStatus === 'Connected'}
      />
    </View>
  );
};

export default App;
