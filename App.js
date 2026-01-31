import * as React from 'react';
import { VehicleProvider } from './src/context/VehicleContext';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <VehicleProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          {/* <StatusBar style="light" /> */}
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </VehicleProvider>
  );
}
