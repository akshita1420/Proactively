import 'react-native-gesture-handler';
import React, { useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Image, Platform } from 'react-native';
import CustomSplashScreen from './src/screens/SplashScreen';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import AppointmentScreen from './src/screens/AppointmentScreen';
import StepScreen from './src/screens/StepScreen';
import BMIScreen from './src/screens/bmiScreen';
import SleepScreen from './src/screens/SleepScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//tab navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 65,
          borderTopWidth: 1,
          borderTopColor: 'rgba(236, 236, 236, 1)',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 3,
          elevation: 5,
          paddingBottom: Platform.OS === 'ios' ? 20 : 0,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          marginTop: 3,
          fontFamily: 'Inter',
          fontWeight: '500',
        },
        // basic tab bar options
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: 'rgba(97, 86, 178, 1)',
        tabBarInactiveTintColor: 'rgba(112, 112, 112, 1)',
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused 
                ? require('./assets/images/active_home.png')
                : require('./assets/images/inactive_home.png')}
              style={{ width: 22, height: 22 }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused 
                ? require('./assets/images/active_acc.png')
                : require('./assets/images/inactive_acc.png')}
              style={{ width: 22, height: 22 }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Root navigator 
function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="AppointmentScreen" component={AppointmentScreen} options={{ headerShown: false }} />
      <Stack.Screen name="StepScreen" component={StepScreen} options={{ headerShown: false }} />
      <Stack.Screen name="bmiScreen" component={BMIScreen} options={{ headerShown: false }} />
      <Stack.Screen name="sleepScreen" component={SleepScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const navigationRef = useRef(null);

  if (!isReady) {
    return <CustomSplashScreen onFinish={() => setIsReady(true)} />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}