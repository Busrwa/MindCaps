import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BenliklerStack from './BenliklerStack';
import SohbetStack from './SohbetStack';
import ProfilStack from './ProfilStack';
import AnalizScreen from '../screens/AnalizScreen';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { language } = useLanguage();
  const t = translations[language].tabs;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'selves') {
            iconName = 'home';
          } else if (route.name === 'chat') {
            iconName = 'chatbubble-ellipses';
          } else if (route.name === 'analysis') {
            iconName = 'analytics';
          } else if (route.name === 'profile') {
            iconName = 'person';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2E7D32',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="selves"
        component={BenliklerStack}
        options={{ tabBarLabel: t.selves }}
      />
      <Tab.Screen
        name="chat"
        component={SohbetStack}
        options={{ tabBarLabel: t.chat }}
      />
      <Tab.Screen
        name="analysis"
        component={AnalizScreen}
        options={{ tabBarLabel: t.analysis }}
      />
      <Tab.Screen
        name="profile"
        component={ProfilStack}
        options={{ tabBarLabel: t.profile }}
      />
    </Tab.Navigator>
  );
}
