import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as yup from 'yup';
import {NavigationProp} from '@react-navigation/native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useHeaderHeight} from 'react-native-screens/native-stack';
const Register: React.FC<{navigation: NavigationProp<any, any>}> = ({
  navigation,
}) => {
  const [checkboxState, setCheckboxState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState<{
    email: string;
    firstname: string;
    lastname: string;
    password: string;
  }>({
    email: '',
    firstname: '',
    lastname: '',
    password: '',
  });
  const signUpValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });
  return (
    <KeyboardAvoidingView
      behavior={Platform.select({android: 'height', ios: 'padding'})}>
      <SafeAreaView style={{height: '100%'}}>
        <ScrollView horizontal={false} style={{padding: '2.5%'}}>
          <View style={{width: '100%'}}>
            <TextInput
              value={body.firstname}
              onChangeText={text => setBody({...body, firstname: text})}
              textContentType={'name'}
              placeholder="Имя"
              placeholderTextColor="#32357C"
              style={{
                backgroundColor: '#F4F4FE',
                padding: '5%',
                marginBottom: '5%',
                borderRadius: 10,
                color: '#32357C',
              }}
              autoCapitalize={'sentences'}
              keyboardType={'default'}
            />
            <TextInput
              value={body.lastname}
              onChangeText={text => setBody({...body, lastname: text})}
              textContentType={'familyName'}
              placeholder="Фамилия"
              placeholderTextColor="#32357C"
              style={{
                backgroundColor: '#F4F4FE',
                padding: '5%',
                marginBottom: '5%',
                borderRadius: 10,
                color: '#32357C',
              }}
              autoCapitalize={'sentences'}
              keyboardType={'default'}
            />
            <TextInput
              value={body.email}
              onChangeText={text => setBody({...body, email: text})}
              textContentType={'emailAddress'}
              placeholder="E-mail"
              placeholderTextColor="#32357C"
              style={{
                backgroundColor: '#F4F4FE',
                padding: '5%',
                marginBottom: '5%',
                borderRadius: 10,
                color: '#32357C',
              }}
              autoCapitalize={'none'}
              keyboardType={'email-address'}
            />
            <TextInput
              value={body.password}
              onChangeText={text => setBody({...body, password: text})}
              textContentType={'password'}
              placeholder="Пароль"
              placeholderTextColor="#32357C"
              style={{
                backgroundColor: '#F4F4FE',
                padding: '5%',
                borderRadius: 10,
                color: '#32357C',
                marginBottom: '5%',
              }}
              autoCapitalize={'none'}
              secureTextEntry={true}
            />
            <TextInput
              textContentType={'password'}
              placeholder="Подтвердите пароль"
              placeholderTextColor="#32357C"
              style={{
                backgroundColor: '#F4F4FE',
                padding: '5%',
                borderRadius: 10,
                color: '#32357C',
                marginBottom: '5%',
              }}
              autoCapitalize={'none'}
              secureTextEntry={true}
            />
            <BouncyCheckbox
              size={20}
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
                setCheckboxState(isChecked);
              }}
              iconStyle={{
                borderRadius: 0,
                borderWidth: 0,
              }}
              innerIconStyle={{
                borderRadius: 0,
                borderWidth: checkboxState ? 0 : 2,
                borderColor: '#32357C',
              }}
              iconImageStyle={{
                width: 15,
                height: 15,
              }}
              style={{
                marginVertical: '2.5%',
              }}
            />
            <TouchableOpacity
              style={{
                backgroundColor: '#32357C',
                padding: '5%',
                borderRadius: 100,
                marginVertical: '5%',
              }}
              onPress={async () => {
                setLoading(true);
                // await signUp(body);
                setLoading(false);
              }}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator size={'small'} color="#fff" />
              ) : (
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}>
                  Зарегистрироваться
                </Text>
              )}
            </TouchableOpacity>
          </View>
          {/*<View style={{flexDirection: 'row'}}>*/}
          {/*  <Text style={{color: '#32357C', marginRight: '2.5%'}}>*/}
          {/*    Уже есть аккаунт?*/}
          {/*  </Text>*/}
          {/*  <TouchableOpacity onPress={() => navigation.goBack()}>*/}
          {/*    <Text style={{color: '#DE6C2E'}}>Войти</Text>*/}
          {/*  </TouchableOpacity>*/}
          {/*</View>*/}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Register;
