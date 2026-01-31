import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, History, User, Activity } from 'lucide-react-native';
import { COLORS } from '../constants/theme';

// Screens
import OnboardingScreen from '../screens/Onboarding/OnboardingScreen';
import PaywallScreen from '../screens/Onboarding/PaywallScreen';
import LoginScreen from '../screens/Auth/LoginScreen';

// Dashboard
import HomeScreen from '../screens/Dashboard/HomeScreen';
import HistoryScreen from '../screens/Dashboard/HistoryScreen';
import ProfileScreen from '../screens/Dashboard/ProfileScreen';
import AddVehicleScreen from '../screens/Dashboard/AddVehicleScreen';

// Diagnosis Flow
import SelectVehicleScreen from '../screens/Diagnosis/SelectVehicleScreen';
import ProblemDescriptionScreen from '../screens/Diagnosis/ProblemDescriptionScreen';
import AudioRecordScreen from '../screens/Diagnosis/AudioRecordScreen';
import AIQuestionsScreen from '../screens/Diagnosis/AIQuestionsScreen';
import PhotoUploadScreen from '../screens/Diagnosis/PhotoUploadScreen';
import ResultScreen from '../screens/Diagnosis/ResultScreen';
import ChatScreen from '../screens/Diagnosis/ChatScreen';

const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const DiagnosisStack = createNativeStackNavigator();
const GarageStack = createNativeStackNavigator();

// Stack for the Diagnosis Tab
const DiagnosisNavigator = () => {
    return (
        <DiagnosisStack.Navigator screenOptions={{ headerShown: false }}>
            <DiagnosisStack.Screen name="SelectVehicle" component={SelectVehicleScreen} />
            <DiagnosisStack.Screen name="ProblemDescription" component={ProblemDescriptionScreen} />
            <DiagnosisStack.Screen name="AudioRecord" component={AudioRecordScreen} />
            <DiagnosisStack.Screen name="AIQuestions" component={AIQuestionsScreen} />
            <DiagnosisStack.Screen name="PhotoUpload" component={PhotoUploadScreen} />
            <DiagnosisStack.Screen name="Result" component={ResultScreen} />
            <DiagnosisStack.Screen name="Chat" component={ChatScreen} />
        </DiagnosisStack.Navigator>
    );
};

// Stack for the Garage Tab (Home + Add Vehicle)
const GarageNavigator = () => {
    return (
        <GarageStack.Navigator screenOptions={{ headerShown: false }}>
            <GarageStack.Screen name="HomeScreen" component={HomeScreen} />
            <GarageStack.Screen name="AddVehicle" component={AddVehicleScreen} />
        </GarageStack.Navigator>
    );
};

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: COLORS.white,
                    borderTopColor: COLORS.border,
                    height: 60,
                    paddingBottom: 5,
                },
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.textSecondary,
                tabBarShowLabel: true,
            }}
        >
            <Tab.Screen
                name="Garage"
                component={GarageNavigator} // Use the Garage Stack here
                options={{
                    tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
                }}
            />

            <Tab.Screen
                name="Diagnosis"
                component={DiagnosisNavigator} // Use the Diagnosis Stack here
                options={{
                    tabBarIcon: ({ color, size }) => <Activity color={color} size={size} />,
                }}
            />

            <Tab.Screen
                name="History"
                component={HistoryScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <History color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
                }}
            />
        </Tab.Navigator>
    );
};

const AppNavigator = () => {
    return (
        <RootStack.Navigator
            initialRouteName="Onboarding"
            screenOptions={{
                headerShown: false,
            }}
        >
            {/* Onboarding Flow */}
            <RootStack.Screen name="Onboarding" component={OnboardingScreen} />
            <RootStack.Screen name="Paywall" component={PaywallScreen} />
            <RootStack.Screen name="Login" component={LoginScreen} />

            {/* Main App (Tabs) */}
            <RootStack.Screen name="Home" component={TabNavigator} />

        </RootStack.Navigator>
    );
};

export default AppNavigator;
