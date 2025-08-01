
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Platform } from 'react-native';
import { COLORS } from '../utils/constants';

interface SafeAreaProps {
  children: React.ReactNode;
  backgroundColor?: string;
  barStyle?: 'default' | 'light-content' | 'dark-content';
}

const SafeArea: React.FC<SafeAreaProps> = ({ 
  children, 
  backgroundColor = COLORS.BACKGROUND,
  barStyle = 'light-content'
}) => {
  return (
    <>
      <StatusBar 
        barStyle={barStyle} 
        backgroundColor={backgroundColor}
        translucent={Platform.OS === 'android'}
      />
      <SafeAreaView style={[styles.container, { backgroundColor }]}>
        {children}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SafeArea;
