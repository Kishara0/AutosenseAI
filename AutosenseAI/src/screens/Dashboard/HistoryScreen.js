import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import { AlertTriangle, CheckCircle, ChevronRight } from 'lucide-react-native';

const mockHistory = [
    {
        id: '1',
        vehicle: 'Toyota Corolla',
        issue: 'Worn Engine Belt',
        date: 'Jan 27, 2026',
        status: 'Moderate',
        color: '#FFA000', // Amber
    },
    {
        id: '2',
        vehicle: 'Honda Civic',
        issue: 'Battery Issue',
        date: 'Jan 15, 2026',
        status: 'Resolved',
        color: COLORS.success,
    }
];

const HistoryScreen = () => {

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card}>
            <View style={styles.cardContent}>
                <View style={[styles.statusIndicator, { backgroundColor: item.color }]} />
                <View style={{ flex: 1, paddingHorizontal: 12 }}>
                    <Text style={styles.vehicleText}>{item.vehicle}</Text>
                    <Text style={styles.issueText}>{item.issue}</Text>
                    <Text style={styles.dateText}>{item.date}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <View style={[styles.tag, { backgroundColor: item.color + '20' }]}>
                        <Text style={[styles.tagText, { color: item.color }]}>{item.status}</Text>
                    </View>
                    <ChevronRight size={20} color={COLORS.textSecondary} style={{ marginTop: 8 }} />
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Diagnosis History</Text>
            </View>

            <FlatList
                data={mockHistory}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No history yet.</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        padding: SIZES.padding,
        paddingBottom: 10,
    },
    headerTitle: {
        fontSize: SIZES.h1,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    listContent: {
        padding: SIZES.padding,
    },
    card: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        marginBottom: 16,
        padding: 16,
        ...SHADOWS.light,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    statusIndicator: {
        width: 4,
        height: 40,
        borderRadius: 2,
        marginTop: 2,
    },
    vehicleText: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginBottom: 2,
    },
    issueText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: 4,
    },
    dateText: {
        fontSize: 12,
        color: COLORS.textSecondary,
    },
    tag: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    tagText: {
        fontSize: 12,
        fontWeight: '600',
    },
    emptyContainer: {
        marginTop: 50,
        alignItems: 'center',
    },
    emptyText: {
        color: COLORS.textSecondary,
    }
});

export default HistoryScreen;
