import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

const CustomButton = ({
    title,
    onPress,
    variant = 'primary', // primary, secondary, outline, glass
    isLoading = false,
    style
}) => {
    const getBackgroundColor = () => {
        switch (variant) {
            case 'primary': return COLORS.primary;
            case 'secondary': return COLORS.secondary;
            case 'outline': return 'transparent';
            case 'glass': return COLORS.surface;
            default: return COLORS.primary;
        }
    };

    const getTextColor = () => {
        switch (variant) {
            case 'outline': return COLORS.primary;
            default: return COLORS.white;
        }
    };

    const getBorder = () => {
        if (variant === 'outline') {
            return { borderWidth: 1, borderColor: COLORS.primary };
        }
        if (variant === 'glass') {
            return { borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' };
        }
        return {};
    };

    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor: getBackgroundColor() },
                getBorder(),
                style,
            ]}
            onPress={onPress}
            disabled={isLoading}
            activeOpacity={0.8}
        >
            {isLoading ? (
                <ActivityIndicator color={getTextColor()} />
            ) : (
                <Text style={[styles.text, { color: getTextColor() }]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: SIZES.radius,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        ...SHADOWS.light,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CustomButton;
