import * as React from 'react';
import {
  KeyboardTypeOptions,
  StyleProp,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';

const CustomInput: React.FC<{
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
  style?: StyleProp<ViewStyle> | undefined;
}> = ({
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
        }}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secure}
        keyboardType={keyboardType}
      />
      {error && <Text style={{color: '#DE6C2E'}}>{error}</Text>}
    </View>
  );
};
export default CustomInput;
