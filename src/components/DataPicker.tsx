import React from 'react';
import {FlexStyle, Text, View} from 'react-native';
import DropDownPicker, {
  DropDownPickerProps,
  ItemType,
} from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomInput from './CustomInput';

const DataPicker: React.FC<
  Pick<
    DropDownPickerProps<any>,
    | 'open'
    | 'value'
    | 'items'
    | 'setOpen'
    | 'setValue'
    | 'setItems'
    | 'multiple'
    | 'searchable'
    | 'placeholder'
    | 'searchPlaceholder'
  > & {
    title: string;
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
  }
> = ({
  title,
  open,
  value,
  items,
  setOpen,
  setValue,
  setItems,
  multiple,
  searchable,
  placeholder,
  searchPlaceholder,
  style,
}) => {
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
  return (
    <View style={style}>
      <Text style={{color: '#32357C', paddingBottom: '2.5%'}}>{title}</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        multiple={multiple}
        searchable={searchable}
        placeholder={placeholder}
        searchPlaceholder={searchPlaceholder}
        searchTextInputProps={{autoCapitalize: 'none'}}
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
  );
};

export default DataPicker;
