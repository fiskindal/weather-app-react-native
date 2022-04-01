import * as React from 'react';
import { useEffect } from 'react';
import { View, Text, ViewStyle, Platform, Image, FlatList, SafeAreaView, StatusBar, StyleSheet, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { Current } from '../api/dtos/current';
import { HourDetail } from '../api/dtos/Forecast/hourDetail';
import { Location } from '../api/dtos/location';
import { WeatherService } from './store/weather.service';
import { WeatherStateModel } from './store/weather.store';
import WeatherItemComponent from './weather.item.component';

// veriler 1 sefer gelsin
const wait = (timeout: number | undefined) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

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
  });
  return (<>
    <View style={{backgroundColor:"purple", flex:1}}>
      <View style={{ ...iosBar }}>
      </View>
      <View style={{flex:1, flexDirection:"column"}}>
        <View style={{ flex:1, flexDirection:"column",  justifyContent:"space-evenly"}}>
          <View>
          <Text style={{color:"white",}}>{props.location?.name}</Text>
          </View>
         <View>
         <Text style={{color:"white"}}>{props.location?.localtime}</Text>
         </View>
         <View>
         <Text style={{ color:"white"}}>
            {props.current?.temp_c + ' ' + '°C'}
          </Text>
         </View>
        </View>
        <View>
          <Image source={{ uri: `https:${props.current?.condition.icon}`, height: 100, width: 100 }}></Image>
        </View>
        <View>
        </View>
        <View>
        <SafeAreaView>
          <FlatList data={props.hourDetail} initialNumToRender={7} 
          showsVerticalScrollIndicator={false}
        renderItem={renderItem} horizontal={true}  showsHorizontalScrollIndicator={false}/>
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