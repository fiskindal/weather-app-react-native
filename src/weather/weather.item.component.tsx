import { connect } from "react-redux";
import { WeatherService } from "./store/weather.service";
import { Image, Text, View } from "react-native";
import React, { useEffect } from "react";
import { HourDetail } from "../api/dtos/Forecast/hourDetail";

const WeatherItem = (props: Props) => {
  useEffect(() => {
    props.getWeather();
  }, []);
  
  return (
    <View style={{ 
      padding: 10,
      borderWidth: 1,
      borderRadius:20,
      borderColor: 'purple',
      margin: 2,
      backgroundColor:"#48007C"
    }}>
      <Text style={{color:'white'}}> {props.item?.temp_c + ' ' + '°C'}</Text>
      <Text style={{color:'white'}}> {props.item?.time}</Text>
      <Image style={{backfaceVisibility:"visible"}} source={{uri: `https:${props.item?.condition.icon}`, height:45, width:45}}/>
    </View>
  );

}
  


const mapStateToProps = ({}: {}) => ({});

const mapDispatchToProps = (dispatch: any) => ({
getWeather: () => dispatch(WeatherService.getWeather()),
});

type Props = {
  item: HourDetail | null;
  getWeather: () => void;
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherItem);