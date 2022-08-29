import React, {PropsWithChildren} from 'react';
import {StyleProp, Text, TextStyle, ViewStyle} from 'react-native';

// enum SIZE_TEXT {
//   HEADER = 28,
//   BIGGER = 16,
//   SMALLER = 14,
// }

const CustomText: React.FC<
  PropsWithChildren<{
    fontSize: 28 | 16 | 14;
    style: Omit<TextStyle, 'fontSize'>;
  }>
> = ({children, fontSize = 16, style: {color = '#32357C', ...nestStyle}}) => {
  return <Text style={{color, fontSize, ...nestStyle}}>{children}</Text>;
};
export default CustomText;
