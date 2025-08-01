
import React from 'react';
import { SafeAreaView, View, StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface SafeAreaProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

const SafeArea: React.FC<SafeAreaProps> = ({ 
  children, 
  backgroundColor = '#0a0a0a' 
}) => {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={backgroundColor}
        translucent={Platform.OS === 'android'}
      />
      <View style={[styles.content, { backgroundColor }]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
  },
});

export default SafeArea;
