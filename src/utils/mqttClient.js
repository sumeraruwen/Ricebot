import mqtt from 'mqtt';

const host = 'wss://fuji.lmq.cloudamqp.com:443/mqtt'; // WebSocket URL
const username = 'cdmctvyp'; // from your image
const password = 'JgX7I2DUrxfixiQ6lh8XVlEiqxCb4sG_M';

let client;

export const connectMQTT = (onMessageCallback) => {
  client = mqtt.connect(host, {
    username,
    password,
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 1000,
  });

  client.on('connect', () => {
    console.log('✅ MQTT connected');
    // Subscribe to the topic from rice cooker
    client.subscribe('ricecooker/status', (err) => {
      if (!err) {
        console.log('📥 Subscribed to ricecooker/status');
      } else {
        console.log('❌ Subscription error:', err);
      }
    });
  });

  client.on('message', (topic, message) => {
    console.log(`📨 ${topic}: ${message.toString()}`);
    onMessageCallback(topic, message.toString());
  });

  client.on('error', (err) => {
    console.log('❌ MQTT error:', err);
  });
};

export const sendCommand = (message = 'start') => {
  if (client && client.connected) {
    client.publish('ricecooker/command', message);
    console.log('📤 Sent command:', message);
  } else {
    console.log('⚠️ MQTT not connected');
  }
};

export const disconnectMQTT = () => {
  if (client) client.end();
};
