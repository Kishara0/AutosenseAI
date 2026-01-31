import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import { ChevronLeft, AlertTriangle, Wrench, Search, Camera } from 'lucide-react-native';
import CustomButton from '../../components/CustomButton';

const PhotoUploadScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft size={24} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Visual Evidence</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.grid}>
                    {/* Zone 1: Dashboard Lights */}
                    <TouchableOpacity style={styles.uploadCard}>
                        <View style={[styles.iconCircle, { backgroundColor: '#FFEBEE' }]}>
                            <AlertTriangle size={24} color="#D32F2F" />
                        </View>
                        <Text style={styles.uploadTitle}>Dashboard</Text>
                        <Text style={styles.uploadSubtitle}>Warning lights</Text>
                        <View style={styles.addButton}>
                            <Camera size={14} color={COLORS.primary} style={{ marginRight: 4 }} />
                            <Text style={styles.addButtonText}>Add</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Zone 2: Engine Bay */}
                    <TouchableOpacity style={styles.uploadCard}>
                        <View style={[styles.iconCircle, { backgroundColor: '#E3F2FD' }]}>
                            <Wrench size={24} color="#1976D2" />
                        </View>
                        <Text style={styles.uploadTitle}>Engine Bay</Text>
                        <Text style={styles.uploadSubtitle}>Engine photo</Text>
                        <View style={styles.addButton}>
                            <Camera size={14} color={COLORS.primary} style={{ marginRight: 4 }} />
                            <Text style={styles.addButtonText}>Add</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Zone 3: Problem Area */}
                    <TouchableOpacity style={styles.uploadCard}>
                        <View style={[styles.iconCircle, { backgroundColor: '#F3E5F5' }]}>
                            <Search size={24} color="#7B1FA2" />
                        </View>
                        <Text style={styles.uploadTitle}>Problem Area</Text>
                        <Text style={styles.uploadSubtitle}>Specific issue</Text>
                        <View style={styles.addButton}>
                            <Camera size={14} color={COLORS.primary} style={{ marginRight: 4 }} />
                            <Text style={styles.addButtonText}>Add</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Tips Card */}
                    <View style={styles.uploadCard}>
                        <Text style={styles.uploadTitle}>Photo Tips</Text>
                        <Text style={styles.tipText}>
                            Good lighting, steady camera, and avoid glare for best AI results.
                        </Text>
                        <TouchableOpacity>
                            <Text style={styles.linkText}>Read more →</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>

            <View style={styles.footer}>
                <CustomButton
                    title="Continue"
                    onPress={() => navigation.navigate('Result')}
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
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    content: {
        padding: SIZES.padding,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 16,
    },
    uploadCard: {
        width: '47%',
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        padding: 16,
        alignItems: 'center',
        ...SHADOWS.light,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: COLORS.background, // Subtle
        borderStyle: 'dashed',
    },
    iconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    uploadTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: 4,
    },
    uploadSubtitle: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginBottom: 12,
        textAlign: 'center',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F4FF',
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 15,
    },
    addButtonText: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.primary,
    },
    tipText: {
        fontSize: 12,
        color: COLORS.textSecondary,
        textAlign: 'center',
        lineHeight: 18,
        marginTop: 8,
        marginBottom: 8,
    },
    linkText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    footer: {
        padding: SIZES.padding,
    }
});

export default PhotoUploadScreen;
