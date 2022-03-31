import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, ViewStyle, Platform, Image, FlatList, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Current } from '../api/dtos/current';
import { HourDetail } from '../api/dtos/Forecast/hourDetail';
import { ForecastDay } from '../api/dtos/forecastDay';
import { Location } from '../api/dtos/location';
import { WeatherService } from './store/weather.service';
import { WeatherStateModel } from './store/weather.store';
import WeatherItemComponent from './weather.item.component';

const WeatherScreen = (props: Props) => {
  const renderItem = ({ item }: { item: HourDetail }) => {
    return (
      <>
        <WeatherItemComponent item={item}></WeatherItemComponent>
      </>
    );
  };
  let iosBar: ViewStyle = {};
  if (Platform.OS === 'ios') {
    iosBar = { paddingTop: 40 };
  }
  useEffect(() => {
    props.getWeather();
  }, []);

  return (<>
    <View>
      <View style={{ ...iosBar }}>
      </View>
      <View>
        <View>
          <Text>{props.location?.name}</Text>
          <Text>{props.location?.localtime}</Text>
        </View>
        <View>
          <Image source={{ uri: `https:${props.current?.condition.icon}`, height: 100, width: 100 }}></Image>
        </View>
        <View>
        </View>
        <View>
        <SafeAreaView>
          <FlatList data={props.hourDetail} renderItem={renderItem} horizontal={true}  showsHorizontalScrollIndicator={false}/>
        </SafeAreaView>
        </View>
      </View>
    </View>
  </>)
}


const mapStateToProps = ({ weather }: { weather: WeatherStateModel }) => ({
  hourDetail: weather.hourDetail,
  current: weather.current,
  location: weather.location,
});

const mapDispatchToProps = (dispatch: any) => ({
  getWeather: () => dispatch(WeatherService.getWeather()),
});

type Props = {
  getWeather: () => any;
  hourDetail: HourDetail[] | null;
  current: Current | null;
  location: Location | null;
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherScreen);