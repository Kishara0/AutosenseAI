import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Wrench, User } from 'lucide-react-native';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Garage</Text>
                <TouchableOpacity style={styles.profileButton}>
                    <User size={24} color={COLORS.black} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Add Vehicle Card */}
                <View style={styles.addVehicleCard}>
                    <View style={styles.iconContainer}>
                        {/* Placeholder car icon since we don't have the exact illustration */}
                        <Text style={{ fontSize: 50 }}>🚗</Text>
                    </View>
                    <Text style={styles.cardTitle}>Add Your First Vehicle</Text>
                    <Text style={styles.cardSubtitle}>
                        Register your car to start monitoring its health and running diagnostics instantly.
                    </Text>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => navigation.navigate('AddVehicle')}
                    >
                        <Plus size={20} color={COLORS.white} style={{ marginRight: 8 }} />
                        <Text style={styles.addButtonText}>Add Vehicle</Text>
                    </TouchableOpacity>
                </View>

                {/* Recent Activity */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recent Activity</Text>
                </View>

                <View style={styles.emptyStateContainer}>
                    <View style={styles.emptyStateIcon}>
                        <Wrench size={40} color={COLORS.textSecondary} />
                    </View>
                    <Text style={styles.emptyStateTitle}>No diagnostics run yet</Text>
                    <Text style={styles.emptyStateText}>
                        Once you add a vehicle, your diagnostic history and health reports will appear here.
                    </Text>
                </View>

            </ScrollView>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SIZES.padding,
        paddingBottom: 10,
    },
    headerTitle: {
        fontSize: SIZES.h1,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    profileButton: {
        padding: 8,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        ...SHADOWS.light,
    },
    content: {
        padding: SIZES.padding,
    },
    addVehicleCard: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        padding: SIZES.padding,
        alignItems: 'center',
        marginBottom: 30,
        ...SHADOWS.medium,
    },
    iconContainer: {
        width: 80,
        height: 80,
        backgroundColor: '#E3F2FD', // Light blue bg
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: SIZES.h3,
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: 8,
    },
    cardSubtitle: {
        fontSize: SIZES.body,
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 22,
    },
    addButton: {
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 25,
        width: '100%',
        justifyContent: 'center',
    },
    addButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '600',
    },
    sectionHeader: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: SIZES.h2,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    emptyStateContainer: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        padding: SIZES.padding * 1.5,
        alignItems: 'center',
        ...SHADOWS.light,
    },
    emptyStateIcon: {
        marginBottom: 16,
        opacity: 0.5,
    },
    emptyStateTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.black,
        marginBottom: 8,
    },
    emptyStateText: {
        fontSize: 14,
        color: COLORS.textSecondary,
        textAlign: 'center',
        lineHeight: 20,
    }
});

export default HomeScreen;
