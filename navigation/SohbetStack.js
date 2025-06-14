import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SohbetScreen from '../screens/SohbetScreen';
import SohbetAnalizScreen from '../screens/sohbet/sohbetAnalizScreen';

const Stack = createNativeStackNavigator();

export default function SohbetStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SohbetMain" component={SohbetScreen} />
      <Stack.Screen name="SohbetAnaliz" component={SohbetAnalizScreen} />
    </Stack.Navigator>
  );
}
