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
import {useAppDispatch, useAppSelector} from '../../store/store';
import {getCards, refreshCard, setCards} from '../../store/card/reducer';
import {currentUser} from '../../store/user/reducer';
import CustomText from '../../components/CustomText';

const Main: React.FC<{navigation: NavigationProp<any, any>}> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();

  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
  const CONTENT_OFFSET_THRESHOLD = 300;
  let refFlat: FlatList;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (contentVerticalOffset < CONTENT_OFFSET_THRESHOLD) {
      fadeAnim.setValue(0);
    }
  });

  const {cards, isLoading, page, refresh, isLast, isLoadingPage} =
    useAppSelector(
      (state: {
        card: {
          cards: {
            id: string;
            title: string;
            description?: string;
            status: string;
            user: {
              id: string;
              firstname: string;
              lastname: string;
              email: string;
            };
          }[];
          isLoading: boolean;
          isLoadingPage: boolean;
          page: number;
          refresh: boolean;
          isLast: boolean;
        };
      }) => state.card,
    );
  useEffect(() => {
    dispatch(getCards({page}));
    return () => {
      dispatch(setCards({refresh: true, data: []}));
    };
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        {!isLoading ? (
          <FlatList
            horizontal={false}
            style={{paddingHorizontal: '2.5%', position: 'relative'}}
            data={cards}
            renderItem={({item, index}) => {
              return cards.length - 1 === index && !isLast ? (
                <>
                  <Card card={item} navigation={navigation} />
                  <ActivityIndicator size={'large'} color={'#32357C'} />
                </>
              ) : (
                <Card card={item} navigation={navigation} />
              );
            }}
            onEndReached={info => {
              console.log(info);
              dispatch(getCards({page}));
            }}
            onEndReachedThreshold={0.25}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                colors={['#141414', '#32357C', '#DE6C2E', '#D1D1F9', '#F4F4FE']}
                tintColor={'#DE6C2E'}
                onRefresh={() => {
                  dispatch(refreshCard());
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
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <CustomText
                fontSize={16}
                style={{fontWeight: 'bold', marginRight: '2.5%'}}>
                Загрузка
              </CustomText>
              <ActivityIndicator size={'small'} color={'#32357C'} />
            </View>
          </View>
        )}

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
      </View>
    </SafeAreaView>
  );
};

export default Main;
