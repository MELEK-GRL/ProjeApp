import React from 'react';
import { StyleSheet, View } from 'react-native';
import MainLayout from './src/components/layout/MainLayout';
import 'react-native-gesture-handler';

function App() {
  return (
    <View style={styles.container}>
      <MainLayout />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
