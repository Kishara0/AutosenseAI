import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../../constants/theme';
import CustomButton from '../../components/CustomButton';

const PaywallScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Unlock Full Access</Text>
                <Text style={styles.subtitle}>Get detailed AI diagnostics for your vehicle.</Text>

                <View style={styles.plansContainer}>
                    <View style={styles.planCard}>
                        <Text style={styles.planTitle}>Monthly</Text>
                        <Text style={styles.planPrice}>$9.99/mo</Text>
                    </View>
                </View>

                <View style={styles.footer}>
                    <CustomButton
                        title="Subscribe Now"
                        onPress={() => navigation.navigate('Login')}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Text style={styles.skipText}>Restore Purchases</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
        padding: SIZES.padding,
    },
    title: {
        fontSize: SIZES.h1,
        fontWeight: 'bold',
        color: COLORS.white,
        textAlign: 'center',
        marginTop: SIZES.padding * 2,
    },
    subtitle: {
        fontSize: SIZES.body,
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginTop: 10,
    },
    plansContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    planCard: {
        width: '100%',
        padding: 20,
        backgroundColor: COLORS.surface,
        borderRadius: SIZES.radius,
        borderWidth: 1,
        borderColor: COLORS.primary,
        alignItems: 'center',
    },
    planTitle: {
        color: COLORS.white,
        fontSize: SIZES.h2,
        fontWeight: 'bold',
    },
    planPrice: {
        color: COLORS.primary,
        fontSize: SIZES.h3,
        marginTop: 5,
    },
    footer: {
        marginBottom: SIZES.padding,
        alignItems: 'center',
    },
    skipText: {
        color: COLORS.textSecondary,
        marginTop: 20,
    }
});

export default PaywallScreen;
