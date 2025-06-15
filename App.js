import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigation/TabNavigator';
import RootNavigator from './navigation/RootNavigator';
import { LanguageProvider } from './LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
    </LanguageProvider>
  );
}