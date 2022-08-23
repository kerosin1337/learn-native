import * as React from 'react';
import {PropsWithChildren} from 'react';
import {FlexStyle, Text, TouchableOpacity} from 'react-native';

const CustomButton: React.FC<
  PropsWithChildren<{
    button: {
      borderColor?: string;
      backgroundColor: string;
      color: string;
    };
    style?: Pick<
      FlexStyle,
      | 'margin'
      | 'marginVertical'
      | 'marginHorizontal'
      | 'marginTop'
      | 'marginBottom'
      | 'marginLeft'
      | 'marginRight'
      | 'padding'
      | 'paddingVertical'
      | 'paddingHorizontal'
      | 'paddingTop'
      | 'paddingBottom'
      | 'paddingLeft'
      | 'paddingRight'
    >;
    onPress?: () => void;
  }>
> = ({
  children,
  button: {
    backgroundColor = 'white',
    borderColor = '#32357C',
    color = '#32357C',
  },
  style,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor,
        padding: '5%',
        borderRadius: 100,
        borderColor,
        borderWidth: borderColor ? 1 : 0,
        ...style,
      }}
      onPress={onPress}>
      <Text
        style={{
          color,
          textAlign: 'center',
          fontWeight: 'bold',
          textTransform: 'uppercase',
        }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};
export default CustomButton;
