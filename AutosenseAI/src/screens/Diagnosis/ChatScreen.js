import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import { ChevronLeft, Send, Phone, AlertTriangle, Bot, User } from 'lucide-react-native';

const ChatScreen = ({ navigation }) => {
    const [message, setMessage] = useState('');

    // Mock History
    const [messages, setMessages] = useState([
        {
            id: '1',
            type: 'system',
            title: 'Diagnosis: Worn Engine Belt',
            subtitle: 'Urgency: High • 2 days left',
            icon: <AlertTriangle size={20} color="#F57F17" />,
            date: 'Today, 9:41 AM'
        },
        {
            id: '2',
            type: 'ai',
            text: "Hello! I've analyzed your engine diagnostics. We found an issue with the engine belt.",
            time: '9:41 AM'
        },
        {
            id: '3',
            type: 'user',
            text: "Is it safe to drive for another week?",
            time: '9:42 AM'
        },
        {
            id: '4',
            type: 'ai',
            text: "It is risky. If the belt snaps, you will lose power steering and alternator function. I recommend fixing it within 1-2 days to avoid being stranded.",
            time: '9:42 AM'
        }
    ]);

    const renderItem = ({ item }) => {
        if (item.type === 'system') {
            return (
                <View style={styles.systemMessageContainer}>
                    <View style={styles.systemMessage}>
                        <View style={styles.systemIcon}>
                            {item.icon}
                        </View>
                        <View>
                            <Text style={styles.systemTitle}>{item.title}</Text>
                            <Text style={styles.systemSubtitle}>{item.subtitle}</Text>
                        </View>
                        <TouchableOpacity style={styles.detailsButton}>
                            <Text style={styles.detailsText}>Details</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.dateSeparator}>{item.date}</Text>
                </View>
            );
        }

        const isUser = item.type === 'user';
        return (
            <View style={[styles.messageRow, isUser ? styles.userRow : styles.aiRow]}>
                {!isUser && (
                    <View style={styles.avatar}>
                        <Bot size={20} color={COLORS.white} />
                    </View>
                )}

                <View style={[styles.bubble, isUser ? styles.userBubble : styles.aiBubble]}>
                    <Text style={[styles.messageText, isUser ? styles.userText : styles.aiText]}>
                        {item.text}
                    </Text>
                </View>
                {isUser && (
                    <View style={[styles.avatar, { backgroundColor: COLORS.textSecondary }]}>
                        <User size={20} color={COLORS.white} />
                    </View>
                )}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft size={24} color={COLORS.black} />
                </TouchableOpacity>
                <View style={styles.headerInfo}>
                    <Text style={styles.headerTitle}>Mechanic AI</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.onlineDot} />
                        <Text style={styles.onlineText}>Online</Text>
                    </View>
                </View>
                <TouchableOpacity>
                    <Phone size={20} color={COLORS.black} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={messages}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.chatContent}
            />

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type a message..."
                        placeholderTextColor={COLORS.textSecondary}
                        value={message}
                        onChangeText={setMessage}
                    />
                    <TouchableOpacity style={styles.sendButton}>
                        <Send size={20} color={COLORS.white} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

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
        paddingHorizontal: SIZES.padding,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    backButton: {
        marginRight: 16,
    },
    headerInfo: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    onlineDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.success,
        marginRight: 6,
    },
    onlineText: {
        fontSize: 12,
        color: COLORS.textSecondary,
    },
    chatContent: {
        padding: SIZES.padding,
        paddingBottom: 20,
    },
    systemMessageContainer: {
        marginBottom: 24,
        alignItems: 'center',
    },
    systemMessage: {
        flexDirection: 'row',
        backgroundColor: '#FFF8E1',
        padding: 12,
        borderRadius: SIZES.radius,
        alignItems: 'center',
        width: '100%',
        ...SHADOWS.light,
    },
    systemIcon: {
        marginRight: 12,
    },
    systemTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    systemSubtitle: {
        fontSize: 11,
        color: COLORS.textSecondary,
    },
    detailsButton: {
        marginLeft: 'auto',
        backgroundColor: COLORS.white,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 6,
    },
    detailsText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    dateSeparator: {
        marginTop: 16,
        fontSize: 11,
        color: COLORS.textSecondary,
    },
    messageRow: {
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'flex-end',
    },
    userRow: {
        justifyContent: 'flex-end',
    },
    aiRow: {
        justifyContent: 'flex-start',
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.black,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 8,
    },
    bubble: {
        maxWidth: '70%',
        padding: 12,
        borderRadius: 16,
        ...SHADOWS.light,
    },
    userBubble: {
        backgroundColor: COLORS.primary,
        borderBottomRightRadius: 4,
    },
    aiBubble: {
        backgroundColor: COLORS.white,
        borderBottomLeftRadius: 4,
    },
    messageText: {
        fontSize: 14,
        lineHeight: 20,
    },
    userText: {
        color: COLORS.white,
    },
    aiText: {
        color: COLORS.black,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        backgroundColor: COLORS.white,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: COLORS.background,
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginRight: 12,
        fontSize: 14,
        color: COLORS.black,
    },
    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default ChatScreen;
