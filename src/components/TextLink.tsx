import * as React from 'react';
import {PropsWithChildren} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import CustomText from './CustomText';

const TextLink: React.FC<
  PropsWithChildren<{onPress?: () => void; color?: string}>
> = ({onPress, color = 'black', children}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <CustomText fontSize={14} style={{color}}>
        {children}
      </CustomText>
    </TouchableOpacity>
  );
};

export default TextLink;
