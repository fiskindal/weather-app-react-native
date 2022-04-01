import { pipe } from "rxjs";
import { tap} from "rxjs/operators";
import { ApiRestClient } from "../../api/api.restclient";
import {weatherGetAction } from "./weather.action";

const _getWeather = () => {
  return (dispatch: any) => {
  
    return ApiRestClient.get(`http://api.weatherapi.com/v1/forecast.json?key=a17a46be0c8240a2a6764249223003&q=Bursa&days=1&aqi=no&alerts=no`).pipe(
      tap((res:any) => {
       return dispatch(weatherGetAction(res));
      })
    ).toPromise();
  }
}

export const WeatherService = {
  getWeather : _getWeather,
}