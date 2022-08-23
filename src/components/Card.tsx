import {Text, TouchableOpacity, View} from 'react-native';
import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationProp} from '@react-navigation/native';
const Card: React.FC<{
  navigation: NavigationProp<any, any>;
  card: {title: string; user: string; description: string};
}> = ({card, navigation}) => {
  return (
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
          <Text style={{color: '#32357C'}}>{card.user}</Text>
        </View>
        <View
          style={{
            padding: '2.5%',
            backgroundColor: '#219653',
            borderRadius: 100,
          }}>
          <Text style={{color: 'white'}}>Активный</Text>
        </View>
      </View>
      <View style={{marginTop: '2.5%'}}>
        <Text style={{color: '#32357C', fontWeight: 'bold'}}>{card.title}</Text>
        <Text style={{color: '#32357C'}}>{card.description}</Text>
      </View>
      <View style={{flexDirection: 'row', marginTop: '2.5%'}}>
        <TouchableOpacity
          style={{
            backgroundColor: '#32357C',
            paddingVertical: '1.25%',
            paddingHorizontal: '2.5%',
            borderRadius: 6,
          }}
          onPress={() => {}}>
          <Icon name="play" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Card;
