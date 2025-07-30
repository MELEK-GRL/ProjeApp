import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import BottomTabNavigator from '../../navigation/BottomTabNavigator';

const MainLayout: FC = () => {
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
