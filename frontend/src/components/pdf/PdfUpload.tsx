import React from 'react';
import { Alert, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import RNFS from 'react-native-fs';

type Props = {
  onPdfSelected: (pdf: { name: string; base64: string }) => void;
};

const PdfUpload: React.FC<Props> = ({ onPdfSelected }) => {
const pickPdf = async () => {
  try {
    const result = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.pdf],
    });

    if (!result.name || !result.uri) {
      Alert.alert('Hata', 'PDF bilgileri alınamadı.');
      return;
    }

    let fileUri = result.uri;

    if (Platform.OS === 'ios' && fileUri.startsWith('file://')) {
      fileUri = fileUri.replace('file://', '');
    }
    const decodedPath = decodeURIComponent(fileUri);

    console.log('📂 Gerçek dosya yolu:', decodedPath);

    const exists = await RNFS.exists(decodedPath);
    console.log('📁 Dosya var mı?', exists);

    if (!exists) {
      Alert.alert('Hata', 'PDF dosyasına erişilemedi. Lütfen farklı bir dosya seçin.');
      return;
    }

    const fileContent = await RNFS.readFile(decodedPath, 'base64');

    onPdfSelected({
      name: result.name,
      base64: fileContent,
    });

    Alert.alert('PDF Yüklendi', result.name);
  } catch (err) {
    if (!DocumentPicker.isCancel(err)) {
      console.error('❌ PDF seçme hatası detaylı:', JSON.stringify(err, null, 2));
      Alert.alert('Hata', 'PDF seçilirken bir hata oluştu.');
    }
  }
};




  return (
    <TouchableOpacity style={styles.iconWrapper} onPress={pickPdf}>
      <Icon name="document-attach-outline" size={24} color="#0057d9" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    marginLeft: 10,
    padding: 5,
  },
});

export default PdfUpload;
