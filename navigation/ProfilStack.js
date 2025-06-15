import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfilScreen from '../screens/ProfilScreen';
import LanguageScreen from '../screens/profil/LanguageScreen';
import AboutScreen from '../screens/profil/AboutScreen';
import TermsScreen from '../screens/profil/TermsScreen';
import PrivacyScreen from '../screens/profil/PrivacyScreen';


const Stack = createStackNavigator();

export default function ProfilStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfilScreen" component={ProfilScreen} />
      <Stack.Screen name="LanguageScreen" component={LanguageScreen} />
      <Stack.Screen name="AboutScreen" component={AboutScreen} />
      <Stack.Screen name="TermsScreen" component={TermsScreen} />
      <Stack.Screen name="PrivacyScreen" component={PrivacyScreen} />
    </Stack.Navigator>
  );
}
