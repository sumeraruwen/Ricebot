# MQTT Connection Fixes for RiceBot React Native App

## Issues Fixed

### 1. **Library Conflicts**
- **Problem**: Multiple conflicting MQTT libraries (`mqtt`, `paho-mqtt`, `react_native_mqtt`)
- **Solution**: Removed Node.js-specific libraries and kept only `react_native_mqtt`

### 2. **React Native Compatibility**
- **Problem**: The `mqtt` library is designed for Node.js and doesn't work in React Native
- **Solution**: Replaced with `react_native_mqtt` which is specifically built for React Native

### 3. **Connection Management**
- **Problem**: No proper connection state management across the app
- **Solution**: Created `MQTTContext` provider for centralized connection management

### 4. **Android Network Permissions**
- **Problem**: Missing network permissions for MQTT connections
- **Solution**: Added necessary permissions and network security configuration

### 5. **Error Handling**
- **Problem**: Poor error handling and debugging capabilities
- **Solution**: Added comprehensive error handling and debug screen

## Files Modified/Created

### Modified Files:
- `package.json` - Removed conflicting libraries
- `src/screens/MQTTConnection.js` - Rewritten for React Native compatibility
- `src/App.js` - Updated to use MQTT context and navigation
- `src/screens/Settings.js` - Added real-time MQTT status and controls
- `android/app/src/main/AndroidManifest.xml` - Added network permissions
- `metro.config.js` - Updated for proper bundling

### New Files:
- `src/context/MQTTContext.js` - Centralized MQTT state management
- `src/screens/MQTTTestScreen.js` - Debug and testing interface
- `android/app/src/main/res/xml/network_security_config.xml` - Network security config

## Features Added

### 1. **MQTT Context Provider**
- Centralized connection state management
- Real-time status updates across all screens
- Message history tracking
- Automatic reconnection handling

### 2. **Enhanced Settings Screen**
- Real-time connection status display
- Reconnect/Disconnect buttons
- Test message functionality
- Access to debug screen

### 3. **MQTT Test Screen**
- Comprehensive connection debugging
- Custom topic subscription/publishing
- Message history viewer
- Connection status monitoring

### 4. **Improved Error Handling**
- Connection timeout handling
- Automatic reconnection attempts
- Detailed error logging
- User-friendly error messages

## Usage

### Basic MQTT Operations:
```javascript
import { useMQTT } from '../context/MQTTContext';

const { connectionStatus, publishMessage, subscribeToTopic } = useMQTT();

// Publish a message
publishMessage('ricecooker/status', 'Hello from RiceBot!');

// Subscribe to a topic
subscribeToTopic('ricecooker/commands');
```

### Default Topics:
- **Subscribe**: `ricecooker/command` - For receiving commands from IoT device
- **Publish**: `ricecooker/status` - For sending status updates to IoT device

## Testing

1. **Settings Screen**: Check real-time connection status
2. **MQTT Test Screen**: Comprehensive testing and debugging
3. **Test Connection**: Send test messages to verify connectivity

## MQTT Broker

Currently configured to use `broker.hivemq.com:1883` (public test broker).
For production, replace with your own MQTT broker in `src/context/MQTTContext.js`.

## Troubleshooting

1. **Connection Issues**: Check network permissions and broker availability
2. **Message Not Received**: Verify topic names and subscription status
3. **Android Issues**: Ensure network security config allows cleartext traffic
4. **Debug**: Use the MQTT Test Screen for detailed diagnostics