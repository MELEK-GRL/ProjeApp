
import React from 'react';

import {  SafeAreaView, StyleSheet, Text, View } from 'react-native';

function App() {

console.log('--->hı')
  return (
    <View style={styles.container}>
     
   <SafeAreaView>
      <Text>HEOLLO</Text>
   </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
