
import React from 'react';
import { Text, TextStyle, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Mobile-first responsive breakpoints
const isSmallMobile = SCREEN_WIDTH < 360;
const isMediumMobile = SCREEN_WIDTH >= 360 && SCREEN_WIDTH < 414;

interface ResponsiveTextProps {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  weight?: 'normal' | 'bold';
  color?: string;
}

const ResponsiveText: React.FC<ResponsiveTextProps> = ({
  children,
  style,
  size = 'medium',
  weight = 'normal',
  color = '#ffffff'
}) => {
  const getFontSize = () => {
    switch (size) {
      case 'small':
        return isSmallMobile ? 10 : isMediumMobile ? 11 : 12;
      case 'medium':
        return isSmallMobile ? 12 : isMediumMobile ? 13 : 14;
      case 'large':
        return isSmallMobile ? 16 : isMediumMobile ? 17 : 18;
      case 'xlarge':
        return isSmallMobile ? 20 : isMediumMobile ? 22 : 24;
      default:
        return isSmallMobile ? 12 : isMediumMobile ? 13 : 14;
    }
  };

  const responsiveStyle: TextStyle = {
    fontSize: getFontSize(),
    fontWeight: weight,
    color: color,
  };

  return (
    <Text style={[responsiveStyle, style]}>
      {children}
    </Text>
  );
};

export default ResponsiveText;
