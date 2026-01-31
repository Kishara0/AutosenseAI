import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import { ChevronLeft, ChevronDown, Lightbulb, ArrowRight } from 'lucide-react-native';
import CustomButton from '../../components/CustomButton';
import { useVehicles } from '../../context/VehicleContext';

const AddVehicleScreen = ({ navigation }) => {
    // Context to add vehicle
    const { addVehicle } = useVehicles();

    // State management for form (simplified)
    const [make, setMake] = useState('Toyota');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('2018');
    const [mileage, setMileage] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft size={24} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Vehicle Details</Text>
                <View style={{ width: 24 }} />
            </View>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.content}>
                    <Text style={styles.title}>Tell us about your vehicle</Text>
                    <Text style={styles.subtitle}>We'll use this to provide accurate AI diagnostics.</Text>

                    {/* Make Input (Simulated Dropdown) */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Make</Text>
                        <TouchableOpacity style={styles.dropdownInput}>
                            <Text style={styles.inputText}>{make}</Text>
                            <ChevronDown size={20} color={COLORS.textSecondary} />
                        </TouchableOpacity>
                    </View>

                    {/* Model Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Model</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. Camry"
                            value={model}
                            onChangeText={setModel}
                        />
                    </View>

                    {/* Year Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Year</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. 2020"
                            value={year}
                            onChangeText={setYear}
                            keyboardType="numeric"
                        />
                    </View>

                    {/* Mileage Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Mileage (mi)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter current mileage"
                            value={mileage}
                            onChangeText={setMileage}
                            keyboardType="numeric"
                        />
                    </View>

                    {/* Tip Box */}
                    <View style={styles.tipBox}>
                        <Lightbulb size={20} color="#FBC02D" style={{ marginRight: 10 }} />
                        <Text style={styles.tipText}>
                            Tip: Accurate vehicle information helps our AI provide better diagnostics and repair estimates.
                        </Text>
                    </View>

                    <CustomButton
                        title="Continue"
                        onPress={() => {
                            addVehicle({ make, model, year, mileage });
                            navigation.goBack();
                        }}
                        style={{ marginTop: 20 }}
                    />

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SIZES.padding,
        paddingBottom: 10,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    content: {
        padding: SIZES.padding,
    },
    title: {
        fontSize: SIZES.h2,
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginBottom: 30,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.black,
        marginBottom: 8,
    },
    input: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: SIZES.radius,
        padding: 16,
        fontSize: 16,
        color: COLORS.black,
    },
    dropdownInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: SIZES.radius,
        padding: 16,
    },
    inputText: {
        fontSize: 16,
        color: COLORS.black,
    },
    tipBox: {
        flexDirection: 'row',
        backgroundColor: '#FFF9C4', // Light yellow
        padding: 16,
        borderRadius: SIZES.radius,
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    tipText: {
        flex: 1,
        fontSize: 13,
        color: '#F57F17', // Darker yellow/orange text
        lineHeight: 20,
    }
});

export default AddVehicleScreen;
