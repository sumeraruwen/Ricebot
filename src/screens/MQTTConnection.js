import { Client } from 'react_native_mqtt';

class MQTTConnection {
  constructor(clientId, onMessageReceived, onConnectionStatusChange) {
    this.clientId = clientId;
    this.onMessageReceived = onMessageReceived;
    this.onConnectionStatusChange = onConnectionStatusChange;
    this.client = null;
    this.isConnected = false;
    
    this.connect();
  }

  connect() {
    try {
      // Create MQTT client with proper configuration for React Native
      this.client = new Client({
        uri: 'mqtt://broker.hivemq.com:1883',
        clientId: this.clientId,
        cleanSession: true,
        keepAlive: 60,
        reconnectPeriod: 5000,
        connectTimeout: 30000,
      });

      // Set up event listeners
      this.client.on('connect', () => {
        console.log('Connected to MQTT broker');
        this.isConnected = true;
        if (this.onConnectionStatusChange) {
          this.onConnectionStatusChange('Connected');
        }
      });

      this.client.on('message', (topic, message) => {
        const messageStr = message.toString();
        console.log(`Received message: ${messageStr} on topic: ${topic}`);
        if (this.onMessageReceived) {
          this.onMessageReceived(messageStr, topic);
        }
      });

      this.client.on('error', (err) => {
        console.log(`Connection error: ${err}`);
        this.isConnected = false;
        if (this.onConnectionStatusChange) {
          this.onConnectionStatusChange('Connection Error');
        }
      });

      this.client.on('close', () => {
        console.log('MQTT client disconnected');
        this.isConnected = false;
        if (this.onConnectionStatusChange) {
          this.onConnectionStatusChange('Disconnected');
        }
      });

      this.client.on('offline', () => {
        console.log('MQTT client offline');
        this.isConnected = false;
        if (this.onConnectionStatusChange) {
          this.onConnectionStatusChange('Offline');
        }
      });

      // Connect to the broker
      this.client.connect();
      
    } catch (error) {
      console.error('Error creating MQTT client:', error);
      if (this.onConnectionStatusChange) {
        this.onConnectionStatusChange('Connection Failed');
      }
    }
  }

  publish(topic, message, qos = 0) {
    if (!this.client || !this.isConnected) {
      console.error('MQTT client not connected');
      return false;
    }

    try {
      this.client.publish(topic, message, qos, false, (err) => {
        if (err) {
          console.error(`Error publishing: ${err}`);
        } else {
          console.log(`Message published to topic ${topic}: ${message}`);
        }
      });
      return true;
    } catch (error) {
      console.error(`Error publishing message: ${error}`);
      return false;
    }
  }

  subscribe(topic, qos = 0) {
    if (!this.client || !this.isConnected) {
      console.error('MQTT client not connected');
      return false;
    }

    try {
      this.client.subscribe(topic, qos, (err) => {
        if (err) {
          console.error(`Error subscribing: ${err}`);
        } else {
          console.log(`Subscribed to topic ${topic}`);
        }
      });
      return true;
    } catch (error) {
      console.error(`Error subscribing to topic: ${error}`);
      return false;
    }
  }

  unsubscribe(topic) {
    if (!this.client || !this.isConnected) {
      console.error('MQTT client not connected');
      return false;
    }

    try {
      this.client.unsubscribe(topic, (err) => {
        if (err) {
          console.error(`Error unsubscribing: ${err}`);
        } else {
          console.log(`Unsubscribed from topic ${topic}`);
        }
      });
      return true;
    } catch (error) {
      console.error(`Error unsubscribing from topic: ${error}`);
      return false;
    }
  }

  disconnect() {
    if (this.client) {
      try {
        this.client.disconnect();
        this.isConnected = false;
        console.log('Disconnected from MQTT broker');
      } catch (error) {
        console.error('Error disconnecting:', error);
      }
    }
  }

  reconnect() {
    console.log('Attempting to reconnect...');
    if (this.client) {
      this.disconnect();
    }
    setTimeout(() => {
      this.connect();
    }, 1000);
  }

  getConnectionStatus() {
    return this.isConnected;
  }
}

export default MQTTConnection;
