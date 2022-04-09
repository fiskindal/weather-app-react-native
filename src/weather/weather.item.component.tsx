import { connect } from "react-redux";
import { WeatherService } from "./store/weather.service";
import { Image, Text, View } from "react-native";
import React, { useEffect } from "react";
import { HourDetail } from "../api/dtos/Forecast/hourDetail";
import { DataFormatType, Helper } from "../helper";

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
      backgroundColor:"#48007C",
      flex:3,
    }}>
      <View style={{flexDirection:"row"}}>
      <Text style={{color:'white'}}> {props.item?.feelslike_c + ' ' + '°C'}</Text>
      </View>
      <View >
      <Image style={{backfaceVisibility:"visible"}} source={{uri: `https:${props.item?.condition.icon}`, height:50, width:50}}/>
      <Text style={{color:'white'}}> {Helper.dateFormat(props.item?.time,DataFormatType.timeFormat)}</Text>
      </View>
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