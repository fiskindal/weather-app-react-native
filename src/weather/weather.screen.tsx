import * as React from 'react';
import { useEffect } from 'react';
import { View, Text, ViewStyle, Platform, Image, FlatList, SafeAreaView, StatusBar, StyleSheet, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { Current } from '../api/dtos/current';
import { HourDetail } from '../api/dtos/Forecast/hourDetail';
import { Location } from '../api/dtos/location';
import { DataFormatType, Helper } from '../helper';
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
    iosBar = { paddingTop: 40, height: 40 };
  }
  useEffect(() => {
    props.getWeather();
  });
  return (<>
    <View style={{ backgroundColor: "purple", flex: 1}}>
      <View style={{ ...iosBar, }}>
        <Text>{" "}</Text>
      </View>
      <View style={{ flex: 1, flexDirection: "column", top:60}}>
        <View style={{ flex: 1, flexDirection:"column",  justifyContent:"center"}}>
          <View style={{flex:1,justifyContent:"center" , flexDirection: 'row', top:20}}>
            <Text style={{ color: "white", fontSize:40 }}>{props.location?.name}</Text>
          </View>
          <View style={{flex:1, justifyContent:"center" , flexDirection: 'row', top:20}}>
            <View>
            <Text style={{ color: "white" , fontSize:40}}>{Helper.dateFormat(props.location.localtime,DataFormatType.dateFormat)}</Text>
            </View>
          </View>
          <View style={{flex:1, justifyContent:"center" , flexDirection: 'row',top:20}}>
            <Image source={{ uri: `https:${props.current?.condition.icon}`, height: 150, width: 150 }}></Image>
          </View>
        </View>
        <View style={{ padding:20, top:100}}>
          <View style={{
            flexWrap: "nowrap",
            display: "flex",
            flexDirection: "row", justifyContent: "space-evenly"
          }}>
            <Text style={{ color: "white" }}>Rüzgar</Text>
            <Text style={{ color: "white" }}>Nem</Text>
            <Text style={{color:"white"}}>Derece</Text>
          </View>
          <View style={{
            flexWrap: "nowrap",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}>
            <Text style={{ color: "white", fontSize: 30 }}>{props.current?.wind_kph}km/s²</Text>
            <Text style={{ color: "white", fontSize: 30 }}>%{props.current?.humidity}</Text>
            <Text style={{ fontSize: 30, color: "white" }}>{props.current?.temp_c}°C</Text>
          </View>
        </View>
      </View>
      <View style={{flex:1}}>
      </View>
      <View>
        <SafeAreaView>
          <FlatList data={props.hourDetail?.filter(value=> {
            if (value.time >= props.location.localtime) {
              return value;
            }
          } )} initialNumToRender={7}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem} horizontal={true} showsHorizontalScrollIndicator={false} />
        </SafeAreaView>
      </View>
      <View style={{ padding:100 , height: 100,  top: 100, width:20}}>
          <Text>{"  "}</Text>
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
  location: Location;
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherScreen);