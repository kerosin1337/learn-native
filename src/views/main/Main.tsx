import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Card from '../../components/Card';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationProp} from '@react-navigation/native';

const Main: React.FC<{navigation: NavigationProp<any, any>}> = ({
  navigation,
}) => {
  const items = [
    {
      user: 'eugene',
      title: 'This is a card',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non arcu in nisi blandit consectetur in at risus. Morbi non arcu in nisi blandit consectetur in at risus. Morbi non arcu in nisi blandit consectetur in at risus.',
    },
    {
      user: 'Kirocha',
      title: 'This is a card',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non arcu in nisi blandit consectetur in at risus. Morbi non arcu in nisi blandit consectetur in at risus. Morbi non arcu in nisi blandit consectetur in at risus.',
    },
    {
      user: 'ptichka',
      title: 'kavo',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non arcu in nisi blandit consectetur in at risus. Morbi non arcu in nisi blandit consectetur in at risus. Morbi non arcu in nisi blandit consectetur in at risus.',
    },
  ];

  return (
    <SafeAreaView>
      <ScrollView horizontal={false} style={{padding: '2.5%', height: '100%'}}>
        <View style={{width: '100%'}}>
          {items.map((item, index) => (
            <Card key={index} card={item} navigation={navigation} />
          ))}
        </View>

        <Button title={'back'} onPress={() => {}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Main;
