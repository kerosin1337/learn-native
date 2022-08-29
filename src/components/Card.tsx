import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationProp} from '@react-navigation/native';
import CustomText from './CustomText';
const Card: React.FC<{
  navigation: NavigationProp<any, any>;
  card: {
    title: string;
    user: {id: string; firstname: string; lastname: string; email: string};
    description?: string;
    status: string;
  };
}> = ({card, navigation}) => {
  return (
    <>
      <View
        style={{
          width: '100%',
          maxHeight: '100%',
          backgroundColor: '#F9F9F9',
          padding: '2.5%',
          marginVertical: '2.5%',
          borderRadius: 7,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          <View>
            <CustomText fontSize={14} style={{}}>
              {card.user.firstname}
            </CustomText>
          </View>
          <View
            style={{
              padding: '2.5%',
              backgroundColor: '#219653',
              borderRadius: 100,
            }}>
            <CustomText fontSize={14} style={{color: 'white'}}>
              {card.status}
            </CustomText>
          </View>
        </View>
        <View style={{marginTop: '2.5%'}}>
          <CustomText fontSize={14} style={{fontWeight: 'bold'}}>
            {card.title}
          </CustomText>
          <CustomText fontSize={14} style={{marginTop: '2.5%'}}>
            {card.description}
          </CustomText>
        </View>
        <View style={{flexDirection: 'row', marginTop: '2.5%'}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#32357C',
              paddingVertical: '1.25%',
              paddingHorizontal: '2.5%',
              borderRadius: 6,
            }}
            onPress={() => {
              navigation.navigate('InputDataTest', {title: card.title});
            }}>
            <Icon name="play" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Card;
