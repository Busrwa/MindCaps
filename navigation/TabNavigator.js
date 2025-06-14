import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BenliklerStack from './BenliklerStack'; 
import SohbetStack from './SohbetStack';
import AnalizScreen from '../screens/AnalizScreen';
import ProfilScreen from '../screens/ProfilScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Benlikler') {
            iconName = 'home';
          } else if (route.name === 'Sohbet') {
            iconName = 'chatbubble-ellipses';
          } else if (route.name === 'Analiz') {
            iconName = 'analytics';
          } else if (route.name === 'Profil') {
            iconName = 'person';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2E7D32',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Benlikler" component={BenliklerStack} />
      <Tab.Screen name="Sohbet" component={SohbetStack} />
      <Tab.Screen name="Analiz" component={AnalizScreen} />
      <Tab.Screen name="Profil" component={ProfilScreen} />
    </Tab.Navigator>
  );
}
