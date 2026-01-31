import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES } from '../../constants/theme';
import { ChevronLeft, Mic, CheckCircle } from 'lucide-react-native';
import CustomButton from '../../components/CustomButton';

const AudioRecordScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={24} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Record unusual sounds</Text>
                <Text style={styles.stepText}>STEP 3 OF 5</Text>
            </View>

            <View style={styles.content}>

                {/* Recording Button */}
                <View style={styles.recordContainer}>
                    <View style={styles.outerRing}>
                        <View style={styles.innerCircle}>
                            <Mic size={40} color={COLORS.white} />
                        </View>
                    </View>
                    <Text style={styles.timer}>0 : 00</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.timerLabel}>MIN</Text>
                        <View style={{ width: 20 }} />
                        <Text style={styles.timerLabel}>SEC</Text>
                    </View>
                </View>

                {/* Tips */}
                <View style={styles.tipsContainer}>
                    <Text style={styles.tipsHeader}>Recording Tips</Text>

                    <View style={styles.tipItem}>
                        <CheckCircle size={18} color={COLORS.primary} style={{ marginTop: 2 }} />
                        <Text style={styles.tipText}>Keep the engine running while you record.</Text>
                    </View>
                    <View style={styles.tipItem}>
                        <CheckCircle size={18} color={COLORS.primary} style={{ marginTop: 2 }} />
                        <Text style={styles.tipText}>Hold your phone near the source of the noise.</Text>
                    </View>
                    <View style={styles.tipItem}>
                        <CheckCircle size={18} color={COLORS.primary} style={{ marginTop: 2 }} />
                        <Text style={styles.tipText}>Record for at least 10 seconds for best results.</Text>
                    </View>
                </View>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.navigate('AIQuestions')}>
                    <Text style={styles.skipText}>Skip this step</Text>
                </TouchableOpacity>
                <CustomButton
                    title="Continue"
                    onPress={() => navigation.navigate('AIQuestions')}
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
    stepText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.textSecondary,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 40,
    },
    recordContainer: {
        alignItems: 'center',
        marginBottom: 50,
    },
    outerRing: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#E3F2FD',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        borderWidth: 1,
        borderColor: '#BBDEFB',
    },
    innerCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#EF5350', // Red for recording
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#EF5350",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    timer: {
        fontSize: 40,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    timerLabel: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginTop: 5,
    },
    tipsContainer: {
        width: '100%',
        paddingHorizontal: SIZES.padding,
    },
    tipsHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: 20,
    },
    tipItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    tipText: {
        marginLeft: 12,
        fontSize: 14,
        color: COLORS.textSecondary,
        lineHeight: 20,
        flex: 1,
    },
    footer: {
        padding: SIZES.padding,
        alignItems: 'center',
    },
    skipText: {
        color: COLORS.textSecondary,
        marginBottom: 20,
        fontSize: 14,
    }
});

export default AudioRecordScreen;
