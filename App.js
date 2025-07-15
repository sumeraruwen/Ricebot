// import React from 'react';
// import { StyleSheet } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import AppNavigator from './src/navigation/AppNavigator';

// const App = () => {
//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <AppNavigator />
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default App;

import React, { useEffect } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PushNotification from 'react-native-push-notification';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      // Create Android notification channel for your cooking notifications
      PushNotification.createChannel(
        {
          channelId: 'cooking-channel', // must match channelId in your scheduled notifications
          channelName: 'Cooking Notifications',
          channelDescription: 'A channel for cooking reminders',
          soundName: 'default',
          importance: 4, // high importance
          vibrate: true,
        },
        (created) => console.log(`Notification channel created: '${created}'`)
      );
    }

    // Optional: Request permissions on iOS (if you support iOS)
    PushNotification.configure({
      onRegister: function (token) {
        console.log('PushNotification registered:', token);
      },
      onNotification: function (notification) {
        console.log('PushNotification received:', notification);
        notification.finish(PushNotification.FetchResult.NoData);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <AppNavigator />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
