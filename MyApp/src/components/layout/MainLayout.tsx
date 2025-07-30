// src/components/layout/MainLayout.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import BottomTabNavigator from '../../navigation/BottomTabNavigator';

const MainLayout = () => {
  return (
    <View style={styles.container}>
      <BottomTabNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MainLayout;
