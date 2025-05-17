import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import Home from '../components/Home';
import StartCooking from '../screens/StartCooking';
import Welcome from '../components/Welcome';
import Login from '../components/Login';
import Register from '../components/Register';
import CookingStatus from '../screens/CookingStatus';
import CookingHistory from '../screens/CookingHistory';
import TermsOfService from '../screens/TermsOfService';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import ContactUs from '../screens/ContactUs';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="StartCooking" component={StartCooking} />
        <Stack.Screen name="CookingStatus" component={CookingStatus} />
        <Stack.Screen name="CookingHistory" component={CookingHistory} />
        <Stack.Screen name="TermsOfService" component={TermsOfService} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="ContactUs" component={ContactUs} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;