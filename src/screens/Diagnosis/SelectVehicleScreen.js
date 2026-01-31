import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import { Plus, Car, ChevronRight } from 'lucide-react-native';
import { useVehicles } from '../../context/VehicleContext';
import CustomButton from '../../components/CustomButton';

const SelectVehicleScreen = ({ navigation }) => {
    const { vehicles } = useVehicles();

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ProblemDescription', { vehicleId: item.id })}
        >
            <View style={styles.iconContainer}>
                <Car size={24} color={COLORS.primary} />
            </View>
            <View style={{ flex: 1, marginLeft: 16 }}>
                <Text style={styles.vehicleName}>{item.make} {item.model}</Text>
                <Text style={styles.vehicleDetail}>{item.year} • {item.mileage} mi</Text>
            </View>
            <ChevronRight size={20} color={COLORS.textSecondary} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Diagnosis</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.subtitle}>Select a vehicle to start diagnosis</Text>

                <FlatList
                    data={vehicles}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    ListEmptyComponent={
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyText}>No vehicles added yet.</Text>
                            <Text style={styles.emptySubText}>Add a vehicle to your garage to start diagnosing issues.</Text>
                            <CustomButton
                                title="Add Vehicle"
                                onPress={() => navigation.navigate('Garage', { screen: 'AddVehicle' })} // Navigate to Garage stack
                                style={{ marginTop: 20, width: '100%' }}
                            />
                        </View>
                    }
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
        padding: SIZES.padding,
        paddingBottom: 10,
    },
    headerTitle: {
        fontSize: SIZES.h1,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    content: {
        flex: 1,
        padding: SIZES.padding,
    },
    subtitle: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginBottom: 20,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        padding: 16,
        borderRadius: SIZES.radius,
        marginBottom: 12,
        ...SHADOWS.light,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#E3F2FD',
        justifyContent: 'center',
        alignItems: 'center',
    },
    vehicleName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    vehicleDetail: {
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    emptyState: {
        marginTop: 50,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    emptyText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: 8,
    },
    emptySubText: {
        fontSize: 14,
        color: COLORS.textSecondary,
        textAlign: 'center',
        lineHeight: 20,
    }
});

export default SelectVehicleScreen;
