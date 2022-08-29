import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewComponent,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomInput from '../../../components/CustomInput';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {format} from 'date-fns';
import DatePicker from 'react-native-date-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DataPicker from '../../../components/DataPicker';

const InputDataTest: React.FC<{navigation: any}> = ({navigation}) => {
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
  const [openDrop, setOpenDrop] = useState(false);

  const [date, setDate] = useState(new Date());

  const [items, setItems] = useState([
    {
      label: 'Мужской',
      value: 0,
    },
    {label: 'Женский', value: 1},
  ]);
  const [value, setValue] = useState(-1);
  const [open, setOpen] = useState(false);

  const [itemsLanguage, setItemsLanguage] = useState(
    Array(10)
      .fill(0)
      .map((_, i) => ({
        label: makeStr(),
        value: i,
      })),
  );
  const [openLanguage, setOpenLanguage] = useState(false);
  const [valueLanguage, setValueLanguage] = useState([]);

  const [itemsPartOfSpeech, setItemsPartOfSpeech] = useState(
    Array(10)
      .fill(0)
      .map((_, i) => ({
        label: makeStr(),
        value: i,
      })),
  );
  const [openPartOfSpeech, setOpenPartOfSpeech] = useState(false);
  const [valuePartOfSpeech, setValuePartOfSpeech] = useState([]);

  const [itemsLanguageOfIncentives, setItemsLanguageOfIncentives] = useState(
    Array(10)
      .fill(0)
      .map((_, i) => ({
        label: makeStr(),
        value: i,
      })),
  );
  const [openLanguageOfIncentives, setOpenLanguageOfIncentives] =
    useState(false);
  const [valueLanguageOfIncentives, setValueLanguageOfIncentives] = useState(
    [],
  );
  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAwareScrollView horizontal={false} style={{padding: '2.5%'}}>
        <View style={{marginBottom: '2.5%'}}>
          <Text
            style={{
              fontWeight: 'bold',
              color: '#32357C',
              marginBottom: '5%',
              marginTop: '2.5%',
            }}>
            Данные о респонденте:
          </Text>
          <CustomInput
            handleChange={() => {}}
            value={'Eugene'}
            placeholder={'Имя'}
            title={'Имя'}
            style={{marginBottom: '5%'}}
            autoCapitalize={'sentences'}
          />
          <CustomInput
            handleChange={() => {}}
            value={'Kerov'}
            placeholder={'Фамилия'}
            title={'Фамилия'}
            style={{marginBottom: '5%'}}
            autoCapitalize={'sentences'}
          />
          <DataPicker
            setValue={setValue}
            value={value}
            items={items}
            open={openDrop}
            setOpen={setOpenDrop}
            title={'Родной(ые) язык(и)'}
            style={{marginBottom: '5%'}}
          />
          <View style={{marginBottom: '5%'}}>
            <Text style={{color: '#32357C', paddingBottom: '2.5%'}}>
              Дата рождения
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#F4F4FE',
                padding: '5%',
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
                <Icon name="calendar-month-outline" size={20} color="#32357C" />
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
          <DataPicker
            setValue={setValueLanguage}
            value={valueLanguage}
            items={itemsLanguage}
            open={openLanguage}
            setOpen={setOpenLanguage}
            title={'Родной(ые) язык(и)'}
            multiple={true}
            searchable={true}
          />
        </View>
        <View>
          <Text
            style={{
              fontWeight: 'bold',
              color: '#32357C',
              marginVertical: '5%',
            }}>
            Характеристики эксперимента::
          </Text>
          <CustomInput
            handleChange={() => {}}
            title={'Идентификационный номер'}
            value={''}
            placeholder={''}
            keyboardType={'number-pad'}
            style={{marginBottom: '5%'}}
          />
          <DataPicker
            setValue={setValuePartOfSpeech}
            value={valuePartOfSpeech}
            items={itemsPartOfSpeech}
            open={openPartOfSpeech}
            setOpen={setOpenPartOfSpeech}
            title={'Часть речи'}
            searchable={true}
            multiple={true}
            style={{marginBottom: '5%'}}
          />
          <DataPicker
            setValue={setValueLanguageOfIncentives}
            value={valueLanguageOfIncentives}
            items={itemsLanguageOfIncentives}
            open={openLanguageOfIncentives}
            setOpen={setOpenLanguageOfIncentives}
            title={'Язык стимулов'}
            multiple={true}
            searchable={true}
            style={{marginBottom: '5%'}}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default InputDataTest;
