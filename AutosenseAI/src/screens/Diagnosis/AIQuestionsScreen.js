import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import { ChevronLeft, Sparkles, Bot, User } from 'lucide-react-native';
import CustomButton from '../../components/CustomButton';

const AIQuestionsScreen = ({ navigation }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const question = {
        id: 1,
        total: 3,
        text: "Does the noise occur when the engine is cold or warm?",
        options: ["When cold", "When warm", "Both"]
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft size={24} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Diagnostic Check</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.content}>
                {/* Progress */}
                <View style={styles.progressContainer}>
                    <Text style={styles.progressText}>QUESTION {question.id} OF {question.total}</Text>
                    <Text style={styles.categoryText}>Engine Noise Analysis</Text>
                </View>
                <View style={styles.progressBarBackground}>
                    <View style={[styles.progressBarFill, { width: `${(question.id / question.total) * 100}%` }]} />
                </View>

                {/* AI Message */}
                <View style={styles.aiMessageContainer}>
                    <Text style={styles.aiLabel}>AI Mechanic</Text>
                    <View style={styles.aiBubble}>
                        <Bot size={20} color={COLORS.primary} style={styles.aiIcon} />
                        <Text style={styles.aiText}>{question.text}</Text>
                    </View>
                </View>

                {/* Options */}
                <View style={styles.optionsContainer}>
                    {question.options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.optionButton,
                                selectedOption === option && styles.selectedOption
                            ]}
                            onPress={() => setSelectedOption(option)}
                        >
                            <Text style={[
                                styles.optionText,
                                selectedOption === option && styles.selectedOptionText
                            ]}>{option}</Text>
                            <View style={[
                                styles.radioCircle,
                                selectedOption === option && styles.selectedRadioCircle
                            ]} />
                        </TouchableOpacity>
                    ))}
                </View>

            </View>

            {/* AI Status Banner */}
            <View style={styles.aiStatusBanner}>
                <Sparkles size={16} color={COLORS.primary} />
                <Text style={styles.aiStatusText}>AI is adapting questions...</Text>
            </View>

            {/* Navigation (Hidden until selection or for demo purposes always visible as simplified) */}
            {selectedOption && (
                <View style={styles.footer}>
                    <CustomButton
                        title="Next Question"
                        onPress={() => navigation.navigate('PhotoUpload')}
                    />
                </View>
            )}
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
        paddingBottom: 20,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    content: {
        flex: 1,
        paddingHorizontal: SIZES.padding,
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    progressText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    categoryText: {
        fontSize: 12,
        color: COLORS.textSecondary,
    },
    progressBarBackground: {
        height: 4,
        backgroundColor: COLORS.border,
        borderRadius: 2,
        marginBottom: 30,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: 2,
    },
    aiMessageContainer: {
        marginBottom: 30,
    },
    aiLabel: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginBottom: 4,
        marginLeft: 4,
    },
    aiBubble: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        padding: 20,
        borderRadius: SIZES.radius,
        alignItems: 'flex-start',
        borderTopLeftRadius: 0,
        ...SHADOWS.light,
    },
    aiIcon: {
        marginRight: 12,
        marginTop: 2,
    },
    aiText: {
        flex: 1,
        fontSize: 16,
        color: COLORS.black,
        lineHeight: 24,
    },
    optionsContainer: {
        gap: 16,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.white,
        padding: 20,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    selectedOption: {
        borderColor: COLORS.primary,
        backgroundColor: '#F0F4FF',
    },
    optionText: {
        fontSize: 16,
        color: COLORS.black,
        fontWeight: '500',
    },
    selectedOptionText: {
        color: COLORS.primary,
        fontWeight: '600',
    },
    radioCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLORS.textSecondary,
    },
    selectedRadioCircle: {
        borderColor: COLORS.primary,
        borderWidth: 6,
    },
    aiStatusBanner: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        marginBottom: 10,
    },
    aiStatusText: {
        marginLeft: 8,
        color: COLORS.textSecondary,
        fontStyle: 'italic',
    },
    footer: {
        padding: SIZES.padding,
    }
});

export default AIQuestionsScreen;
