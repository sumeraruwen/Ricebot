import MQTT from 'mqtt';

class MQTTConnection {
  constructor(clientId, onMessageReceived) {
    // Connect using the MQTT broker on port 1883 (standard MQTT)
    this.client = MQTT.connect('mqtt://broker.hivemq.com:1883', {
      clientId: clientId,
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000,
    });

    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
    });

    this.client.on('message', (topic, message) => {
      onMessageReceived(message.toString());  // Callback function to update state in parent
      console.log(`Received message: ${message.toString()} on topic: ${topic}`);
    });

    this.client.on('error', (err) => {
      console.log(`Connection error: ${err}`);
    });

    this.client.on('close', () => {
      console.log('MQTT client disconnected');
    });
  }

  publish(topic, message, qos = 0) {
    this.client.publish(topic, message, { qos: qos }, (err) => {
      if (err) {
        console.error(`Error publishing: ${err}`);
      } else {
        console.log(`Message published to topic ${topic}`);
      }
    });
  }

  subscribe(topic, qos = 0) {
    this.client.subscribe(topic, { qos: qos }, (err) => {
      if (err) {
        console.error(`Error subscribing: ${err}`);
      } else {
        console.log(`Subscribed to topic ${topic}`);
      }
    });
  }

  disconnect() {
    this.client.end(() => {
      console.log('Disconnected from MQTT broker');
    });
  }
}

export default MQTTConnection;
