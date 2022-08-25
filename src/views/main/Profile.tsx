import {
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
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';

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
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';
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
      style={{height: '100%'}}>
      <SafeAreaView>
        <ScrollView
          horizontal={false}
          style={{
            padding: '2.5%',
          }}>
          <View style={{width: '100%'}}>
            <CustomInput
              handleChange={() => {}}
              value={'Eugene'}
              placeholder={'Имя'}
              autoCapitalize={'sentences'}
              title={'Имя'}
              style={{marginBottom: '5%'}}
            />
            <CustomInput
              handleChange={() => {}}
              value={'Kerov'}
              placeholder={'Фамилия'}
              autoCapitalize={'sentences'}
              title={'Фамилия'}
              style={{marginBottom: '5%'}}
            />
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
                confirmText={'Выбрать'}
              />
            </View>
            <CustomInput
              handleChange={() => {}}
              value={'test@test.ru'}
              placeholder={'E-mail'}
              title={'E-mail'}
              style={{marginBottom: '5%'}}
              keyboardType={'email-address'}
            />
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
                  paddingHorizontal: '2.5%',
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
                  borderWidth: 0,
                  paddingVertical: '5%',
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
            <View style={{marginBottom: '5%'}}>
              <CustomButton
                button={{backgroundColor: '#32357C', color: 'white'}}
                style={{marginVertical: '5%'}}>
                СОХРАНИТЬ ИЗМЕНЕНИЯ
              </CustomButton>
              <CustomButton
                button={{
                  backgroundColor: 'white',
                  borderColor: '#32357C',
                  color: '#32357C',
                }}
                onPress={() => console.log('test')}>
                ИЗМЕНИТЬ ПАРОЛЬ
              </CustomButton>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Profile;
