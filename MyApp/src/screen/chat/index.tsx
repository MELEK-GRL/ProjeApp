import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ListRenderItemInfo,
} from 'react-native';

import { makeChatRequest } from '../../utils/gptUtils';  // Yolunu kontrol et

type Message = {
  id: string;
  text: string;
};

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Merhaba!' },
    { id: '2', text: 'Nasılsın?' },
  ]);
  const [inputText, setInputText] = useState<string>('');

  const sendMessage = async () => {
    if (inputText.trim() === '') return;

    const userMessage: Message = {
      id: (messages.length + 1).toString(),
      text: inputText.trim(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

   try {
  const botResponse = await makeChatRequest(userMessage.text);
  console.log("OpenAI yanıtı:", botResponse);

  const botMessage: Message = {
    id: (messages.length + 2).toString(),
    text: botResponse,
  };

  setMessages(prev => [...prev, botMessage]);
} catch (error) {
  console.error('OpenAI API hata:', error);
}

  };

  const renderMessage = ({ item }: ListRenderItemInfo<Message>) => (
    <View style={styles.messageBubble}>
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

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Mesajınızı yazın..."
          placeholderTextColor="#999"
          multiline
        />
        <TouchableOpacity
          style={styles.sendButton}
         // onPress={sendMessage}
           onPress={()=>{}}
          activeOpacity={0.7}
        >
          <Text style={styles.sendButtonText}>Gönder</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafd' },
  messagesList: { flex: 1, paddingHorizontal: 20, paddingTop: 10 },
  messageBubble: {
    backgroundColor: '#e0e7ff',
    padding: 12,
    borderRadius: 16,
    marginVertical: 6,
    alignSelf: 'flex-start',
    maxWidth: '75%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  messageText: { fontSize: 16, color: '#333' },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 90,
    backgroundColor: '#f1f3f6',
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'top',
  },
  sendButton: {
    backgroundColor: '#0057d9',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 10,
    shadowColor: '#0057d9',
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  sendButtonText: { color: 'white', fontWeight: '700', fontSize: 16 },
});

export default Chat;
