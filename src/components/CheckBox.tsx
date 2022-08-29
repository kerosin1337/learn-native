import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {IBouncyCheckboxProps} from 'react-native-bouncy-checkbox/lib/BouncyCheckbox';
import {FlexStyle} from 'react-native';

const CheckBox: React.FC<
  Required<Pick<IBouncyCheckboxProps, 'text'>> &
    Pick<IBouncyCheckboxProps, 'size'> & {
      setState: (isChecked: boolean) => void;
      state: boolean;
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
    }
> = ({size = 20, text, setState, state, style}) => {
  return (
    <BouncyCheckbox
      size={size}
      fillColor="#DE6C2E"
      unfillColor="white"
      text="Я подтверждаю согласие с политикой обработки персональных данных"
      textStyle={{
        color: '#32357C',
        fontSize: 14,
        fontWeight: 'normal',
        textDecorationLine: 'none',
      }}
      onPress={isChecked => {
        setState(isChecked);
      }}
      iconStyle={{
        borderRadius: 0,
        borderWidth: 0,
      }}
      innerIconStyle={{
        borderRadius: 0,
        borderWidth: state ? 0 : 2,
        borderColor: '#32357C',
      }}
      iconImageStyle={{
        width: 15,
        height: 15,
      }}
      style={style}
    />
  );
};

export default CheckBox;
