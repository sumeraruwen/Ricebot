import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import MQTTConnection from '../screens/MQTTConnection';

const MQTTContext = createContext();

export const useMQTT = () => {
  const context = useContext(MQTTContext);
  if (!context) {
    throw new Error('useMQTT must be used within a MQTTProvider');
  }
  return context;
};

export const MQTTProvider = ({ children }) => {
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [lastMessage, setLastMessage] = useState('');
  const mqttClientRef = useRef(null);

  const mqtt_sub_topic = 'ricecooker/command';
  const mqtt_pub_topic = 'ricecooker/status';

  const handleMessageReceived = (message, topic) => {
    console.log('Received message in context:', message, 'on topic:', topic);
    setLastMessage(message);
    setReceivedMessages(prev => [
      ...prev,
      {
        message,
        topic,
        timestamp: new Date().toISOString(),
      }
    ].slice(-50)); // Keep only last 50 messages
  };

  const handleConnectionStatusChange = (status) => {
    console.log('MQTT connection status changed:', status);
    setConnectionStatus(status);
  };

  const initializeMQTT = () => {
    if (mqttClientRef.current) {
      mqttClientRef.current.disconnect();
    }

    const clientId = 'react-native-ricebot-' + Math.random().toString(16).substr(2, 8);
    
    mqttClientRef.current = new MQTTConnection(
      clientId,
      handleMessageReceived,
      handleConnectionStatusChange
    );

    // Subscribe to command topic after connection
    setTimeout(() => {
      if (mqttClientRef.current && mqttClientRef.current.getConnectionStatus()) {
        mqttClientRef.current.subscribe(mqtt_sub_topic);
        mqttClientRef.current.publish(mqtt_pub_topic, 'React Native RiceBot App Connected');
      }
    }, 2000);
  };

  const publishMessage = (topic, message) => {
    if (mqttClientRef.current) {
      return mqttClientRef.current.publish(topic, message);
    }
    return false;
  };

  const subscribeToTopic = (topic) => {
    if (mqttClientRef.current) {
      return mqttClientRef.current.subscribe(topic);
    }
    return false;
  };

  const unsubscribeFromTopic = (topic) => {
    if (mqttClientRef.current) {
      return mqttClientRef.current.unsubscribe(topic);
    }
    return false;
  };

  const reconnect = () => {
    if (mqttClientRef.current) {
      mqttClientRef.current.reconnect();
    } else {
      initializeMQTT();
    }
  };

  const disconnect = () => {
    if (mqttClientRef.current) {
      mqttClientRef.current.disconnect();
    }
  };

  useEffect(() => {
    // Initialize MQTT connection when provider mounts
    initializeMQTT();

    // Cleanup on unmount
    return () => {
      if (mqttClientRef.current) {
        mqttClientRef.current.disconnect();
      }
    };
  }, []);

  const value = {
    connectionStatus,
    lastMessage,
    receivedMessages,
    publishMessage,
    subscribeToTopic,
    unsubscribeFromTopic,
    reconnect,
    disconnect,
    mqtt_sub_topic,
    mqtt_pub_topic,
  };

  return (
    <MQTTContext.Provider value={value}>
      {children}
    </MQTTContext.Provider>
  );
};