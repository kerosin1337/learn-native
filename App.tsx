/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import SignIn from './src/views/auth/SignIn';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from './src/views/auth/Register';
import {Alert, Text, TouchableOpacity} from 'react-native';
import Main from './src/views/main/Main';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {logout} from './src/store/user/reducer';
import Profile from './src/views/main/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppDispatch} from './src/store/store';

const Stack = createNativeStackNavigator<{
  SignIn: undefined;
  SignUp: undefined;
  Main: undefined;
  Profile: {name: string};
}>();
const App = () => {
  const dispatch = useAppDispatch();
  return (
    <NavigationContainer
      theme={{
        dark: false,
        colors: {
          primary: '#32357C',
          background: 'white',
          card: 'white',
          text: '#32357C',
          border: 'red',
          notification: 'red',
        },
      }}>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            title: 'Вход в систему',
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={Register}
          options={{
            title: 'Регистрация',
            headerBackTitle: 'Назад',
          }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={({navigation}) => ({
            title: 'Main',
            headerLargeTitle: true,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Profile', {
                    name: 'Eugene Kerov',
                  });
                }}>
                <Icon name="account-circle" size={30} color="#32357C" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={'Profile'}
          component={Profile}
          options={({route, navigation}) => ({
            title: route.params.name,
            headerLargeTitle: true,
            headerRight: () => (
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() =>
                  Alert.alert('Выйти', 'Точно выйти?', [
                    {
                      text: 'Нет',
                      style: 'default',
                    },
                    {
                      text: 'Да',
                      onPress: async () => {
                        try {
                          await AsyncStorage.removeItem('accessToken');
                          dispatch(logout());
                        } catch (e) {
                          console.log(e);
                        }
                        navigation.reset({
                          index: 0,
                          routes: [{name: 'SignIn'}],
                        });
                      },
                      style: 'destructive',
                    },
                  ])
                }>
                <Icon name="exit-to-app" size={20} color="#DE6C2E" />
                <Text style={{color: '#DE6C2E'}}>Выйти</Text>
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;