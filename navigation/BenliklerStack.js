import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BenliklerScreen from '../screens/BenliklerScreen';
import GecmisBenlikScreen from '../screens/benlikler/GecmisBenlikScreen';
import SimdikiBenlikScreen from '../screens/benlikler/SimdikiBenlikScreen';
import GelecekBenlikScreen from '../screens/benlikler/GelecekBenlikScreen';


const Stack = createNativeStackNavigator();

export default function BenliklerStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BenliklerMain" component={BenliklerScreen} />
      <Stack.Screen name="GecmisBenlik" component={GecmisBenlikScreen} />
      <Stack.Screen name="SimdikiBenlik" component={SimdikiBenlikScreen} />
      <Stack.Screen name="GelecekBenlik" component={GelecekBenlikScreen} />
    </Stack.Navigator>
  );
}
