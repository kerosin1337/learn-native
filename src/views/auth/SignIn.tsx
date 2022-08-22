import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import CustomInput from '../../components/CustomInput';
import {useDispatch} from 'react-redux';
import {
  currentUser,
  setIncorrectMessage,
  setLoadingCurrent,
  setValidMessage,
  signIn,
} from '../../store/user/reducer';
import {NavigationProp} from '@react-navigation/core/src/types';
import {AppDispatch, useAppDispatch, useAppSelector} from '../../store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn: React.FC<{navigation: any}> = ({navigation}) => {
  const {isLoading, validMessage, incorrectMessage, isLoadingCurrent} =
    useAppSelector(
      (state: {
        user: {
          isLoading: boolean;
          validMessage?: {[key: string]: string};
          incorrectMessage?: string;
          isLoadingCurrent: boolean;
          user: any;
          accessToken?: string;
        };
      }) => state.user,
    );
  const dispatch = useAppDispatch();
  AsyncStorage.getItem('accessToken').then(value => {
    if (value) {
      console.log(123);
      dispatch(currentUser(navigation));
    } else {
      dispatch(setLoadingCurrent(false));
      console.log(isLoadingCurrent);
    }
  });
  const signInValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(6, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.select({android: 'height', ios: 'padding'})}>
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: '2.5%',
          backgroundColor: '#fff',
          position: 'relative',
        }}>
        <Formik
          validationSchema={signInValidationSchema}
          initialValues={{
            email: 'test@test.ru',
            password: 'qwe123',
          }}
          onSubmit={values => {
            dispatch(setIncorrectMessage(''));
            dispatch(setValidMessage({}));
            dispatch(signIn({body: values, nav: navigation}));
          }}>
          {({handleChange, setErrors, handleSubmit, values, errors}) => (
            <View style={{width: '100%'}}>
              <CustomInput
                style={{marginBottom: '5%'}}
                handleChange={handleChange('email')}
                value={values.email}
                textContentType={'emailAddress'}
                placeholder={'E-mail'}
                keyboardType={'email-address'}
                error={errors?.email || validMessage?.email}
              />
              <CustomInput
                handleChange={handleChange('password')}
                value={values.password}
                textContentType={'password'}
                placeholder={'Пароль'}
                secure={true}
                error={errors?.password || validMessage?.password}
              />
              <Text style={{color: 'black'}}>
                {isLoadingCurrent.toString()}
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#32357C',
                  padding: '5%',
                  borderRadius: 100,
                  marginVertical: '5%',
                }}
                onPress={async () => {
                  await handleSubmit();
                }}
                disabled={isLoading}>
                {isLoading ? (
                  <ActivityIndicator size={'small'} color="#fff" />
                ) : (
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                    }}>
                    Войти
                  </Text>
                )}
              </TouchableOpacity>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{color: '#32357C', marginRight: '2.5%'}}>
                  Забыли пароль?
                </Text>
                <TouchableOpacity>
                  <Text style={{color: '#DE6C2E'}}>Восстановить</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>

        <View style={{width: '100%'}}>
          {incorrectMessage && (
            <View
              style={{
                marginVertical: '5%',
                marginHorizontal: '2.5%',
                backgroundColor: '#DE6C2E',
                padding: '5%',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                }}>
                {incorrectMessage}
              </Text>
            </View>
          )}
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={{color: '#32357C', marginRight: '2.5%'}}>
              Еще нет аккаунта?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignUp');
              }}>
              <Text style={{color: '#DE6C2E'}}>Зарегистрироваться</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      {isLoadingCurrent && (
        <View
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'gray',
            opacity: 0.5,
            position: 'absolute',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size={'large'} color="#fff" />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};
export default SignIn;