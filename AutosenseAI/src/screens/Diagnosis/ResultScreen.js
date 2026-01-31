import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import { ChevronLeft, Share, AlertTriangle, MessageSquare, Wrench, Eye, Volume2 } from 'lucide-react-native'; // Fixed VolumeNew -> Volume2
import CustomButton from '../../components/CustomButton';
import geminiService from '../../services/geminiService';

const ResultScreen = ({ navigation, route }) => {
    // Basic mock parameters if not passed from flow
    const { vehicleId } = route.params || {};

    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(null);

    useEffect(() => {
        fetchDiagnosis();
    }, []);

    const fetchDiagnosis = async () => {
        setLoading(true);
        // In a real app, retrieve actual data passed from previous screens
        const vehicle = { year: 2018, make: 'Toyota', model: 'Camry', mileage: '45000' };
        const symptoms = ['Strange noise from engine'];
        const description = 'Chirping sound when cold start.';

        const data = await geminiService.generateDiagnosis(vehicle, symptoms, description);
        setResult(data);
        setLoading(false);
    };

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={{ marginTop: 20, color: COLORS.textSecondary }}>Analyzing engine data...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton}>
                    <ChevronLeft size={24} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Diagnostic Report</Text>
                <TouchableOpacity>
                    <Share size={20} color={COLORS.black} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>

                {/* Status Card */}
                <View style={[styles.statusCard, result?.isError && styles.errorCard]}>
                    <AlertTriangle size={20} color={result?.isError ? COLORS.error : "#F57F17"} />
                    <View style={{ marginLeft: 12, flex: 1 }}>
                        <Text style={[styles.statusTitle, result?.isError && { color: COLORS.error }]}>
                            {result?.urgency || (result?.isError ? 'Connection Issue' : 'Moderate Issue')}
                        </Text>
                        <Text style={[styles.statusSubtitle, result?.isError && { color: COLORS.error }]}>
                            {result?.recommendation || (result?.isError ? 'Please retry analysis' : 'Maintenance recommended soon')}
                        </Text>
                    </View>
                </View>

                {/* Diagnosis */}
                <Text style={styles.diagnosisTitle}>{result?.title || 'Unknown Issue'}</Text>
                <Text style={styles.description}>{result?.description}</Text>

                {result?.isError ? (
                    <CustomButton
                        title="Retry Diagnosis"
                        onPress={fetchDiagnosis}
                        style={{ alignSelf: 'center', marginBottom: 20, width: '60%' }}
                    />
                ) : (
                    <View style={styles.aiTag}>
                        <Text style={styles.aiTagText}>✨ Detected via multi-modal AI analysis</Text>
                    </View>
                )}

                {/* Confidence Gauge (Simplified SVG) */}
                <View style={styles.gaugeContainer}>
                    <View style={[styles.gaugeCircle, { borderColor: COLORS.success }]}>
                        <View style={styles.innerGaugeInfo}>
                            <Text style={styles.confidenceLabel}>DIAGNOSIS CONFIDENCE</Text>
                            <Text style={styles.confidenceValue}>{result?.confidence || 0}%</Text>
                        </View>
                    </View>
                </View>

                {/* Cost Estimate */}
                <View style={styles.costCard}>
                    <View>
                        <Text style={styles.costLabel}>Estimated Repair Cost</Text>
                        <Text style={styles.costValue}>{result?.costEstimate || 'N/A'}</Text>
                    </View>
                    <Text style={styles.marketData}>Local Market Data</Text>
                </View>

                {/* Analysis Details */}
                <Text style={styles.sectionHeader}>Analysis Details</Text>

                <View style={styles.detailRow}>
                    <View style={styles.detailIcon}>
                        <Volume2 size={16} color={COLORS.primary} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                            <Text style={styles.detailTitle}>Audio Analysis</Text>
                            <Text style={styles.detailScore}>88%</Text>
                        </View>
                        <View style={styles.progressBarBackground}>
                            <View style={[styles.progressBarFill, { width: '88%' }]} />
                        </View>
                    </View>
                </View>

                <View style={styles.detailRow}>
                    <View style={styles.detailIcon}>
                        <Eye size={16} color={COLORS.primary} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                            <Text style={styles.detailTitle}>Visual Inspection</Text>
                            <Text style={styles.detailScore}>96%</Text>
                        </View>
                        <View style={styles.progressBarBackground}>
                            <View style={[styles.progressBarFill, { width: '96%' }]} />
                        </View>
                    </View>
                </View>

            </ScrollView>

            <View style={styles.footer}>
                <CustomButton
                    title="Find Nearby Mechanics"
                    onPress={() => { }}
                    icon={<Wrench size={18} color={COLORS.white} style={{ marginRight: 8 }} />}
                />

                <CustomButton
                    title="Chat with AI"
                    variant="outline"
                    onPress={() => navigation.navigate('Chat')}
                    icon={<MessageSquare size={18} color={COLORS.primary} style={{ marginRight: 8 }} />}
                    style={{ marginTop: 0 }} // Remove default margin usually on CustomButton
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
        paddingBottom: 20,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    content: {
        paddingHorizontal: SIZES.padding,
        paddingBottom: 20,
    },
    statusCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF8E1', // Yellow bg
        padding: 16,
        borderRadius: SIZES.radius,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#FFE082',
    },
    errorCard: {
        backgroundColor: '#FFEBEE',
        borderColor: '#FFCDD2',
    },
    statusTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#F57F17',
    },
    statusSubtitle: {
        fontSize: 12,
        color: '#F9A825',
    },
    diagnosisTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.black,
        textAlign: 'center',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginBottom: 16,
        paddingHorizontal: 10,
    },
    aiTag: {
        alignSelf: 'center',
        marginBottom: 30,
    },
    aiTagText: {
        fontSize: 12,
        color: COLORS.primary,
        fontWeight: '600',
    },
    gaugeContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    gaugeCircle: {
        width: 140,
        height: 140,
        borderRadius: 70,
        borderWidth: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerGaugeInfo: {
        alignItems: 'center',
    },
    confidenceLabel: {
        fontSize: 10,
        color: COLORS.textSecondary,
        fontWeight: 'bold',
        textAlign: 'center',
        width: 80,
    },
    confidenceValue: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    costCard: {
        backgroundColor: COLORS.white,
        padding: 20,
        borderRadius: SIZES.radius,
        ...SHADOWS.light,
        marginBottom: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    costLabel: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginBottom: 4,
    },
    costValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    marketData: {
        fontSize: 10,
        color: COLORS.textSecondary,
        marginBottom: 4,
    },
    sectionHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: 16,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    detailIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#E3F2FD',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    detailTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.black,
    },
    detailScore: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    progressBarBackground: {
        height: 6,
        backgroundColor: COLORS.border,
        borderRadius: 3,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: 3,
    },
    footer: {
        padding: SIZES.padding,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        gap: 12,
    }
});

export default ResultScreen;
