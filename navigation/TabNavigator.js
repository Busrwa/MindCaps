import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BenliklerStack from './BenliklerStack';
import SohbetStack from './SohbetStack';
import ProfilStack from './ProfilStack';
import AnalizScreen from '../screens/AnalizScreen';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';
import { Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { language } = useLanguage();
  const t = translations[language].tabs;
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'selves':
              iconName = 'home';
              break;
            case 'chat':
              iconName = 'chatbubble-ellipses';
              break;
            case 'analysis':
              iconName = 'analytics';
              break;
            case 'profile':
              iconName = 'person';
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2E7D32',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 12,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        },
        tabBarBackground: () => (
          <View style={{ flex: 1, backgroundColor: '#fff' }} />
        ),
        tabBarHideOnKeyboard: false,
      })}
    >
      <Tab.Screen name="selves" component={BenliklerStack} options={{ tabBarLabel: t.selves }} />
      <Tab.Screen name="chat" component={SohbetStack} options={{ tabBarLabel: t.chat }} />
      <Tab.Screen name="analysis" component={AnalizScreen} options={{ tabBarLabel: t.analysis }} />
      <Tab.Screen name="profile" component={ProfilStack} options={{ tabBarLabel: t.profile }} />
    </Tab.Navigator>
  );
}
