import {
  ActivityIndicator,
  Animated,
  Button,
  FlatList,
  FlatListProps,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {LegacyRef, useEffect, useRef, useState} from 'react';
import Card from '../../components/Card';
import {NavigationProp} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Main: React.FC<{navigation: NavigationProp<any, any>}> = ({
  navigation,
}) => {
  const rnd = (len: number) => {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';
    const charactersLength = characters.length;
    for (let i = 0; i < len; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  const [items, setItems] = useState(
    Array(10)
      .fill(0)
      .map(item =>
        Object({
          user: rnd(10),
          title: rnd(10),
          description: rnd(100),
        }),
      ),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
  const CONTENT_OFFSET_THRESHOLD = 300;
  let refFlat: FlatList;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    if (contentVerticalOffset < CONTENT_OFFSET_THRESHOLD) {
      fadeAnim.setValue(0);
    }
  });
  return (
    <SafeAreaView>
      <FlatList
        horizontal={false}
        style={{paddingHorizontal: '2.5%', position: 'relative'}}
        data={items}
        renderItem={({item, index}) => {
          return items.length - 1 === index ? (
            <>
              <Card card={item} navigation={navigation} isLoading={isLoading} />
            </>
          ) : (
            <Card card={item} navigation={navigation} />
          );
        }}
        maxToRenderPerBatch={5}
        onEndReached={info => {
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
            setItems([
              ...items,
              ...Array(10)
                .fill(0)
                .map(item =>
                  Object({
                    user: rnd(10),
                    title: rnd(10),
                    description: rnd(100),
                  }),
                ),
            ]);
          }, 1000);
        }}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            colors={['#141414', '#32357C', '#DE6C2E', '#D1D1F9', '#F4F4FE']}
            tintColor={'#DE6C2E'}
            onRefresh={() => {
              setRefresh(true);
              setTimeout(() => {
                setItems(
                  Array(10)
                    .fill(0)
                    .map(item =>
                      Object({
                        user: rnd(10),
                        title: rnd(10),
                        description: rnd(100),
                      }),
                    ),
                );
                setRefresh(false);
              }, 5000);
            }}
          />
        }
        ref={ref => {
          refFlat = ref!;
        }}
        onScroll={event => {
          setContentVerticalOffset(event.nativeEvent.contentOffset.y);
        }}
      />
      <Animated.View style={{opacity: fadeAnim}}>
        {contentVerticalOffset > CONTENT_OFFSET_THRESHOLD && (
          <TouchableOpacity
            onLayout={event => {
              fadeIn();
            }}
            style={{
              backgroundColor: '#32357C',
              position: 'absolute',
              bottom: 0,
              right: 0,
              padding: 15,
              borderRadius: 100,
              margin: 20,
            }}
            onPress={() => {
              refFlat.scrollToOffset({animated: true, offset: 0});
            }}>
            <Icon name={'arrow-up'} size={30} color={'#DE6C2E'} />
          </TouchableOpacity>
        )}
      </Animated.View>
    </SafeAreaView>
  );
};

export default Main;
