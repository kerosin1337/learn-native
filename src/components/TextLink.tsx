import * as React from 'react';
import {PropsWithChildren} from 'react';
import {Text, TouchableOpacity} from 'react-native';

const TextLink: React.FC<
  PropsWithChildren<{onPress?: () => void; color?: string}>
> = ({onPress, color = 'black', children}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={{color}}>{children}</Text>
    </TouchableOpacity>
  );
};

export default TextLink;
