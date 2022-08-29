import * as React from 'react';
import {
  FlexStyle,
  KeyboardTypeOptions,
  StyleProp,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import CustomText from './CustomText';

const CustomInput: React.FC<{
  title?: string;
  handleChange: (text: string) => void;
  value: string;
  textContentType?:
    | 'none'
    | 'URL'
    | 'addressCity'
    | 'addressCityAndState'
    | 'addressState'
    | 'countryName'
    | 'creditCardNumber'
    | 'emailAddress'
    | 'familyName'
    | 'fullStreetAddress'
    | 'givenName'
    | 'jobTitle'
    | 'location'
    | 'middleName'
    | 'name'
    | 'namePrefix'
    | 'nameSuffix'
    | 'nickname'
    | 'organizationName'
    | 'postalCode'
    | 'streetAddressLine1'
    | 'streetAddressLine2'
    | 'sublocality'
    | 'telephoneNumber'
    | 'username'
    | 'password'
    | 'newPassword'
    | 'oneTimeCode'
    | undefined;
  placeholder: string;
  error?: string;
  secure?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  keyboardType?: KeyboardTypeOptions | undefined;
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
}> = ({
  title,
  handleChange,
  value,
  textContentType = 'none',
  placeholder,
  error = undefined,
  secure = false,
  autoCapitalize = 'none',
  keyboardType = 'default',
  style,
}) => {
  return (
    <View style={style}>
      {title && (
        // <Text style={{color: '#32357C', paddingBottom: '2.5%'}}>{title}</Text>
        <CustomText fontSize={16} style={{paddingBottom: '2.5%'}}>
          {title}
        </CustomText>
      )}
      <TextInput
        onChangeText={handleChange}
        value={value}
        textContentType={textContentType}
        placeholder={placeholder}
        placeholderTextColor="#32357C"
        style={{
          backgroundColor: '#F4F4FE',
          padding: '5%',
          borderRadius: 10,
          color: '#32357C',
          borderWidth: error ? 1 : 0,
          borderColor: error ? '#DE6C2E' : undefined,
          fontSize: 16,
        }}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secure}
        keyboardType={keyboardType}
      />
      {error && (
        <CustomText fontSize={14} style={{color: '#DE6C2E'}}>
          {error}
        </CustomText>
      )}
    </View>
  );
};
export default CustomInput;
