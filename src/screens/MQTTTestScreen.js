import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useMQTT } from '../context/MQTTContext';

const MQTTTestScreen = ({ navigation }) => {
  const [customTopic, setCustomTopic] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  
  const { 
    connectionStatus, 
    lastMessage, 
    receivedMessages, 
    publishMessage, 
    subscribeToTopic,
    unsubscribeFromTopic,
    reconnect,
    mqtt_sub_topic,
    mqtt_pub_topic
  } = useMQTT();

  const sendTestMessage = () => {
    const topic = customTopic || mqtt_pub_topic;
    const message = customMessage || `Test message at ${new Date().toLocaleTimeString()}`;
    
    const success = publishMessage(topic, message);
    
    if (success) {
      Alert.alert('Success', `Message sent to ${topic}`);
      setCustomMessage('');
    } else {
      Alert.alert('Error', 'Failed to send message');
    }
  };

  const subscribeToCustomTopic = () => {
    if (!customTopic) {
      Alert.alert('Error', 'Please enter a topic to subscribe to');
      return;
    }
    
    const success = subscribeToTopic(customTopic);
    if (success) {
      Alert.alert('Success', `Subscribed to ${customTopic}`);
    } else {
      Alert.alert('Error', 'Failed to subscribe to topic');
    }
  };

  const unsubscribeFromCustomTopic = () => {
    if (!customTopic) {
      Alert.alert('Error', 'Please enter a topic to unsubscribe from');
      return;
    }
    
    const success = unsubscribeFromTopic(customTopic);
    if (success) {
      Alert.alert('Success', `Unsubscribed from ${customTopic}`);
    } else {
      Alert.alert('Error', 'Failed to unsubscribe from topic');
    }
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'Connected':
        return '#28a745';
      case 'Connecting':
      case 'Reconnecting...':
        return '#ffc107';
      default:
        return '#dc3545';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MQTT Test</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Connection Status */}
        <View style={styles.statusContainer}>
          <Text style={styles.sectionTitle}>Connection Status</Text>
          <View style={styles.statusRow}>
            <View style={[styles.statusIndicator, { backgroundColor: getStatusColor() }]} />
            <Text style={[styles.statusText, { color: getStatusColor() }]}>
              {connectionStatus}
            </Text>
            <TouchableOpacity style={styles.reconnectButton} onPress={reconnect}>
              <Text style={styles.reconnectButtonText}>Reconnect</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Default Topics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Default Topics</Text>
          <Text style={styles.topicText}>Subscribe: {mqtt_sub_topic}</Text>
          <Text style={styles.topicText}>Publish: {mqtt_pub_topic}</Text>
        </View>

        {/* Custom Topic Controls */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Custom Topic</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter topic (e.g., test/topic)"
            value={customTopic}
            onChangeText={setCustomTopic}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.button, styles.subscribeButton]}
              onPress={subscribeToCustomTopic}
              disabled={connectionStatus !== 'Connected'}
            >
              <Text style={styles.buttonText}>Subscribe</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.unsubscribeButton]}
              onPress={unsubscribeFromCustomTopic}
              disabled={connectionStatus !== 'Connected'}
            >
              <Text style={styles.buttonText}>Unsubscribe</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Message Publishing */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Send Message</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter message to send"
            value={customMessage}
            onChangeText={setCustomMessage}
            multiline
          />
          <TouchableOpacity 
            style={[styles.button, styles.sendButton]}
            onPress={sendTestMessage}
            disabled={connectionStatus !== 'Connected'}
          >
            <Text style={styles.buttonText}>Send Message</Text>
          </TouchableOpacity>
        </View>

        {/* Last Message */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Last Received Message</Text>
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>
              {lastMessage || 'No messages received yet'}
            </Text>
          </View>
        </View>

        {/* Message History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Messages ({receivedMessages.length})</Text>
          <ScrollView style={styles.messagesScroll} nestedScrollEnabled>
            {receivedMessages.slice(-10).reverse().map((msg, index) => (
              <View key={index} style={styles.messageItem}>
                <Text style={styles.messageTimestamp}>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </Text>
                <Text style={styles.messageTopic}>Topic: {msg.topic}</Text>
                <Text style={styles.messageContent}>{msg.message}</Text>
              </View>
            ))}
            {receivedMessages.length === 0 && (
              <Text style={styles.noMessagesText}>No messages received yet</Text>
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#178ea3',
  },
  backButton: {
    marginRight: 15,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  statusContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 2,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  statusText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  reconnectButton: {
    backgroundColor: '#178ea3',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  reconnectButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  topicText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  subscribeButton: {
    backgroundColor: '#28a745',
  },
  unsubscribeButton: {
    backgroundColor: '#dc3545',
  },
  sendButton: {
    backgroundColor: '#178ea3',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  messageContainer: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 5,
    minHeight: 50,
  },
  messageText: {
    fontSize: 14,
    color: '#333',
  },
  messagesScroll: {
    maxHeight: 200,
  },
  messageItem: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    borderLeftWidth: 3,
    borderLeftColor: '#178ea3',
  },
  messageTimestamp: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  messageTopic: {
    fontSize: 12,
    color: '#178ea3',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  messageContent: {
    fontSize: 14,
    color: '#333',
  },
  noMessagesText: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    padding: 20,
  },
});

export default MQTTTestScreen;