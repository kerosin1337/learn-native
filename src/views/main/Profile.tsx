import {
  Button,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as React from 'react';
import {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {format} from 'date-fns';
import DropDownPicker from 'react-native-dropdown-picker';

const Profile: React.FC = () => {
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const makeStr = () => {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 7; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  DropDownPicker.setListMode('MODAL');
  DropDownPicker.setLanguage('RU');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState(
    Array(10)
      .fill(0)
      .map((_, i) => ({
        label: makeStr(),
        value: i,
      })),
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({android: 'height', ios: 'padding'})}
      style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView horizontal={false} style={{padding: '2.5%'}}>
          <View style={{width: '100%'}}>
            <View>
              <Text style={{color: '#32357C', paddingBottom: '2.5%'}}>Имя</Text>
              <TextInput
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
                value={'Eugene'}
              />
            </View>
            <View>
              <Text style={{color: '#32357C', paddingBottom: '2.5%'}}>
                Фамилия
              </Text>
              <TextInput
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
                value={'Kerov'}
              />
            </View>
            <View>
              <Text style={{color: '#32357C', paddingBottom: '2.5%'}}>
                Дата рождения
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#F4F4FE',
                  padding: '5%',
                  marginBottom: '5%',
                  borderRadius: 10,
                }}
                onPress={() => setOpen(true)}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#32357C'}}>
                    {format(date, 'dd.MM.yyyy')}
                  </Text>
                  <Icon
                    name="calendar-month-outline"
                    size={20}
                    color="#32357C"
                  />
                </View>
              </TouchableOpacity>
              <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={date => {
                  setOpen(false);
                  setDate(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
                maximumDate={new Date()}
                mode={'date'}
                title={'Выберите дату своего рождения'}
              />
            </View>
            <View>
              <Text style={{color: '#32357C', paddingBottom: '2.5%'}}>
                E-mail
              </Text>
              <TextInput
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
                value={'test@test.ru'}
              />
            </View>
            <View>
              <Text style={{color: '#32357C', paddingBottom: '2.5%'}}>
                Родной(ые) язык(и)
              </Text>
              <DropDownPicker
                open={openDrop}
                value={value}
                items={items}
                setOpen={setOpenDrop}
                setValue={setValue}
                setItems={setItems}
                multiple={true}
                searchable={true}
                placeholder={'Выберите язык(и)'}
                searchPlaceholder={'Введите название языка'}
                placeholderStyle={{
                  color: '#32357C',
                }}
                hideSelectedItemIcon={true}
                searchContainerStyle={{
                  borderBottomColor: '#32357C',
                }}
                searchTextInputStyle={{
                  color: '#32357C',
                  borderColor: '#32357C',
                }}
                searchPlaceholderTextColor="#32357C"
                customItemContainerStyle={{
                  backgroundColor: '#32357C',
                }}
                mode="BADGE"
                badgeDotColors={Array(10)
                  .fill(0)
                  .map((_, i) => getRandomColor())}
                style={{
                  backgroundColor: '#F4F4FE',
                  borderRadius: 10,
                  borderColor: 'none',
                  borderWidth: 0,
                }}
                modalProps={{
                  animationType: 'slide',
                }}
                modalContentContainerStyle={{
                  backgroundColor: '#F4F4FE',
                }}
                textStyle={{
                  color: '#32357C',
                }}
                CloseIconComponent={({style}) => (
                  <Icon name={'close'} size={30} color={'#32357C'} />
                )}
              />
            </View>
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: '#32357C',
                  padding: '5%',
                  borderRadius: 100,
                  marginVertical: '5%',
                }}
                onPress={() => console.log('test')}>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}>
                  СОХРАНИТЬ ИЗМЕНЕНИЯ
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: 'white',
                  padding: '5%',
                  borderRadius: 100,
                  borderColor: '#32357C',
                  borderWidth: 1,
                }}
                onPress={() => console.log('test')}>
                <Text
                  style={{
                    color: '#32357C',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}>
                  ИЗМЕНИТЬ ПАРОЛЬ
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Profile;
