// Chat.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ListRenderItemInfo,
} from 'react-native';
import TextInputComponent from '../../components/Input/TextInputComponent';
import { API_BASE_URL } from '@env'; // .env'den IP alınır

export type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
};

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Merhaba, ben Doktor AI. Tahlil sonuçlarınızı analiz edebilir veya sağlıkla ilgili sorularınızı yanıtlayabilirim. Size nasıl yardımcı olabilirim?',
      sender: 'ai',
    },
  ]);

  const [inputText, setInputText] = useState<string>('');
  const [selectedPdf, setSelectedPdf] = useState<{ name: string; base64: string } | undefined>(undefined);

  const sendMessage = async () => {
    if (!inputText.trim() && !selectedPdf) return;

    const userMessage: Message = {
      id: (messages.length + 1).toString(),
      text: inputText.trim() || `[${selectedPdf?.name} yüklendi]`,
      sender: 'user',
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    try {
      let response;
      if (selectedPdf) {
        response = await fetch(`${API_BASE_URL}/upload`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: selectedPdf.name,
            fileBase64: selectedPdf.base64,
          }),
        });
      } else {
        response = await fetch(`${API_BASE_URL}/message`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: inputText.trim() }),
        });
      }

      const result = await response.json();
      const botMessage: Message = {
        id: (messages.length + 2).toString(),
        text: result.answer,
        sender: 'ai',
      };

      setMessages(prev => [...prev, botMessage]);
      setSelectedPdf(undefined);
    } catch (error) {
      console.error('🛑 API Hatası:', error);
    }
  };

  const renderMessage = ({ item }: ListRenderItemInfo<Message>) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === 'user' ? styles.userBubble : styles.aiBubble,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        style={styles.messagesList}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={renderMessage}
      />

      <TextInputComponent
        value={inputText}
        onChangeText={setInputText}
        onSendPress={sendMessage}
        onPdfSelected={setSelectedPdf}
        selectedPdf={selectedPdf}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafd' },
  messagesList: { flex: 1, paddingHorizontal: 20, paddingTop: 10 },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    marginVertical: 6,
    maxWidth: '75%',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  userBubble: {
    backgroundColor: '#c7f0db',
    alignSelf: 'flex-end',
  },
  aiBubble: {
    backgroundColor: '#e0e7ff',
    alignSelf: 'flex-start',
  },
  messageText: { fontSize: 16, color: '#333' },
});

export default Chat;
