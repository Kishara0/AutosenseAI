import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';

const DiagnoseStartScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Diagnose Start Screen (Placeholder)</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: COLORS.white,
    }
});

export default DiagnoseStartScreen;
