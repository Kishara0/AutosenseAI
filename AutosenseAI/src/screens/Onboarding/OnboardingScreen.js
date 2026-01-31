import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Animated, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES } from '../../constants/theme';
import CustomButton from '../../components/CustomButton';

const { width } = Dimensions.get('window');

const slides = [
    {
        id: '1',
        title: 'Hearing strange car noises?',
        subtitle: 'Don\'t worry. Record the sound, and our AI will identify the issue instantly.',
        // Using a placeholder image or component here. 
        // In a real app, you'd require local assets or use URLs.
        image: 'https://img.freepik.com/free-vector/car-diagnostic-concept-illustration_114360-17215.jpg?t=st=1738048698~exp=1738052298~hmac=550e5856403067984486571a80436d64923769c2777647264562c151152d1131&w=1480',
    },
    {
        id: '2',
        title: 'Your pocket mechanic.',
        subtitle: 'We use audio, photos, and questions to provide accurate diagnostics.',
        image: 'https://img.freepik.com/free-vector/mechanic-checking-car-engine_1308-34448.jpg?t=st=1738048756~exp=1738052356~hmac=563f82024bc689408018dc3250b9876e6544a475d9bdc4302631580f4f913d87&w=1480',
    },
    {
        id: '3',
        title: 'Get instant results.',
        subtitle: 'Save time and money by knowing exactly what is wrong with your vehicle.',
        image: 'https://img.freepik.com/free-vector/car-service-abstract-concept-vector-illustration-car-maintenance-repair-auto-diagnostic-center-mechanic-service-vehicle-check-up-oil-change-tire-replacement-abstract-metaphor_335657-6178.jpg?t=st=1738048793~exp=1738052393~hmac=9e150f8373302bc925ca1f5407264a75e01be9d76378e945c79e604f32997e59&w=1480',
    }
];

const OnboardingScreen = () => {
    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems && viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const handleNext = () => {
        if (currentIndex < slides.length - 1) {
            slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
        } else {
            navigation.navigate('Login'); // Skipped Paywall for now based on 'Get Started' flow in screenshot usually leading to Auth
        }
    };

    const Slide = ({ item }) => {
        return (
            <View style={styles.slide}>
                <View style={styles.imageContainer}>
                    {/* Placeholder for the ear/car image. Using a colored block or network image if available */}
                    <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.subtitle}>{item.subtitle}</Text>
                </View>
            </View>
        );
    };

    const Paginator = ({ data, scrollX }) => {
        return (
            <View style={styles.paginatorContainer}>
                {data.map((_, i) => {
                    const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

                    const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange: [8, 16, 8],
                        extrapolate: 'clamp',
                    });

                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: 'clamp',
                    });

                    return <Animated.View style={[styles.dot, { width: dotWidth, opacity }]} key={i.toString()} />;
                })}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 3 }}>
                <FlatList
                    data={slides}
                    renderItem={({ item }) => <Slide item={item} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                        useNativeDriver: false,
                    })}
                    scrollEventThrottle={32}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                />
            </View>

            <View style={styles.footer}>
                <Paginator data={slides} scrollX={scrollX} />

                <CustomButton
                    title={currentIndex === slides.length - 1 ? "Get Started" : "Next"}
                    onPress={handleNext}
                    style={styles.button}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SIZES.padding,
    },
    imageContainer: {
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        width: '100%',
    },
    image: {
        width: '80%',
        height: '80%',
        borderRadius: 20,
    },
    textContainer: {
        flex: 0.4,
        alignItems: 'center',
    },
    title: {
        fontSize: SIZES.h1,
        fontWeight: '800',
        color: COLORS.text,
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: SIZES.body,
        color: COLORS.textSecondary,
        textAlign: 'center',
        paddingHorizontal: 20,
        lineHeight: 22,
    },
    footer: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: SIZES.padding,
        paddingBottom: 20,
        width: '100%',
    },
    paginatorContainer: {
        flexDirection: 'row',
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.primary,
        marginHorizontal: 4,
    },
    button: {
        width: '100%',
    }
});

export default OnboardingScreen;
