import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import CustomInput from '../../components/CustomInput';
import {
  currentUser,
  setIncorrectMessage,
  setValidMessage,
  signIn,
} from '../../store/user/reducer';
import {useAppDispatch, useAppSelector} from '../../store/store';
import TextLink from '../../components/TextLink';
import CustomText from '../../components/CustomText';
import CustomButton from '../../components/CustomButton';

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

  useEffect(() => {
    dispatch(currentUser(navigation));
  }, []);
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
                placeholder={'????????????'}
                secure={true}
                error={errors?.password || validMessage?.password}
              />
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
                  <CustomText
                    fontSize={16}
                    style={{
                      textTransform: 'uppercase',
                      color: 'white',
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}>
                    ??????????
                  </CustomText>
                )}
              </TouchableOpacity>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <CustomText
                  fontSize={14}
                  style={{color: '#32357C', marginRight: '2.5%'}}>
                  ???????????? ?????????????
                </CustomText>
                <TextLink color={'#DE6C2E'}>????????????????????????</TextLink>
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
              <CustomText
                fontSize={16}
                style={{
                  textAlign: 'center',
                  color: 'white',
                }}>
                {incorrectMessage}
              </CustomText>
            </View>
          )}
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <CustomText fontSize={14} style={{marginRight: '2.5%'}}>
              ?????? ?????? ?????????????????
            </CustomText>
            <TextLink
              color={'#DE6C2E'}
              onPress={() => {
                navigation.navigate('SignUp');
              }}>
              ????????????????????????????????????
            </TextLink>
          </View>
        </View>
      </SafeAreaView>
      <Modal visible={isLoadingCurrent} transparent={true}>
        <View
          style={{
            backgroundColor: 'gray',
            opacity: 0.5,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}>
          <ActivityIndicator size={'large'} color="#fff" />
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
