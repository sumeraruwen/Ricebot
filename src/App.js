import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MQTTProvider } from './context/MQTTContext';

// Import your screens
import SplashScreen from './screens/SplashScreen';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Settings from './screens/Settings';
import Profile from './screens/Profile';
import CookingHistory from './screens/CookingHistory';
import CookingStatus from './screens/CookingStatus';
import StartCooking from './screens/StartCooking';
import ContactUs from './screens/ContactUs';
import PrivacyPolicy from './screens/PrivacyPolicy';
import TermsOfService from './screens/TermsOfService';
import MQTTTestScreen from './screens/MQTTTestScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <MQTTProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="SplashScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="CookingHistory" component={CookingHistory} />
          <Stack.Screen name="CookingStatus" component={CookingStatus} />
          <Stack.Screen name="StartCooking" component={StartCooking} />
          <Stack.Screen name="ContactUs" component={ContactUs} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
          <Stack.Screen name="TermsOfService" component={TermsOfService} />
          <Stack.Screen name="MQTTTestScreen" component={MQTTTestScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </MQTTProvider>
  );
};

export default App;
