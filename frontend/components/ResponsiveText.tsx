
import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { responsiveFontSize, getDeviceType } from '../utils/helpers';
import { COLORS, TYPOGRAPHY } from '../utils/constants';

interface ResponsiveTextProps {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  color?: string;
  weight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  align?: 'left' | 'center' | 'right' | 'justify';
  style?: TextStyle;
  numberOfLines?: number;
  onPress?: () => void;
}

const ResponsiveText: React.FC<ResponsiveTextProps> = ({
  children,
  size = 'md',
  color = COLORS.TEXT_PRIMARY,
  weight = 'normal',
  align = 'left',
  style,
  numberOfLines,
  onPress
}) => {
  const deviceType = getDeviceType();
  const fontSize = responsiveFontSize(TYPOGRAPHY.FONT_SIZES[size]);
  const lineHeight = TYPOGRAPHY.LINE_HEIGHTS[size];

  const textStyle: TextStyle = {
    fontSize,
    lineHeight,
    color,
    fontWeight: weight,
    textAlign: align,
    ...style
  };

  return (
    <Text 
      style={textStyle}
      numberOfLines={numberOfLines}
      onPress={onPress}
      allowFontScaling={false} // Prevent system font scaling issues
    >
      {children}
    </Text>
  );
};

export default ResponsiveText;
