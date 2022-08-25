import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import CustomInput from '../../../components/CustomInput';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const InputDataTest: React.FC<{navigation: any}> = ({navigation}) => {
  DropDownPicker.setListMode('MODAL');
  DropDownPicker.setLanguage('RU');
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const [openDrop, setOpenDrop] = useState(false);
  const [value, setValue] = useState(-1);
  const [items, setItems] = useState([
    {
      label: 'Мужской',
      value: 0,
    },
    {label: 'Женский', value: 1},
  ]);
  return (
    <SafeAreaView style={{height: '100%'}}>
      <ScrollView horizontal={false} style={{padding: '2.5%'}}>
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
            multiple={false}
            placeholder={'Выберите пол'}
            placeholderStyle={{
              color: '#32357C',
              paddingVertical: '5%',
              paddingHorizontal: '2.5%',
            }}
            customItemContainerStyle={{
              backgroundColor: '#32357C',
            }}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default InputDataTest;
