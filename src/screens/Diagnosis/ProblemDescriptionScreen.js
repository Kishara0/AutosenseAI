import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import { ChevronLeft } from 'lucide-react-native';
import CustomButton from '../../components/CustomButton';

const PROBLEM_CHIPS = [
    "Strange noise from engine",
    "Warning light on",
    "Unusual vibration",
    "Overheating",
    "Braking issues",
    "Fluid leak",
    "Electrical problem"
];

const ProblemDescriptionScreen = ({ navigation }) => {
    const [selectedChip, setSelectedChip] = useState('Strange noise from engine');
    const [description, setDescription] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft size={24} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.stepText}>STEP 2 OF 5</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>What's happening with your vehicle?</Text>

                {/* Chips Grid */}
                <View style={styles.chipsContainer}>
                    {PROBLEM_CHIPS.map((chip, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.chip,
                                selectedChip === chip ? styles.activeChip : styles.inactiveChip
                            ]}
                            onPress={() => setSelectedChip(chip)}
                        >
                            <Text style={[
                                styles.chipText,
                                selectedChip === chip ? styles.activeChipText : styles.inactiveChipText
                            ]}>
                                {chip}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Detailed Description */}
                <Text style={styles.label}>Detailed Description</Text>
                <TextInput
                    style={styles.textArea}
                    placeholder="Tell us more about when it happens, e.g., only when accelerating or turning..."
                    multiline
                    numberOfLines={6}
                    textAlignVertical="top"
                    value={description}
                    onChangeText={setDescription}
                />
            </ScrollView>

            <View style={styles.footer}>
                <CustomButton
                    title="Continue"
                    onPress={() => navigation.navigate('AudioRecord')}
                />
            </View>
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
    stepText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.textSecondary,
    },
    content: {
        padding: SIZES.padding,
    },
    title: {
        fontSize: SIZES.h2,
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: 24,
    },
    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 30,
    },
    chip: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginRight: 10,
        marginBottom: 10,
        borderWidth: 1,
    },
    activeChip: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    inactiveChip: {
        backgroundColor: COLORS.white,
        borderColor: COLORS.border,
    },
    activeChipText: {
        color: COLORS.white,
        fontWeight: '600',
    },
    inactiveChipText: {
        color: COLORS.text,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: 12,
    },
    textArea: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: SIZES.radius,
        padding: 16,
        fontSize: 16,
        height: 150,
        color: COLORS.black,
    },
    footer: {
        padding: SIZES.padding,
        backgroundColor: COLORS.background, // Ensure footer blends
    }
});

export default ProblemDescriptionScreen;
