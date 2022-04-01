
import { Current } from '../../api/dtos/current';
import { ForecastDayDetail } from '../../api/dtos/Forecast/forecastDayDetail';
import { HourDetail } from '../../api/dtos/Forecast/hourDetail';
import { ForecastDay } from '../../api/dtos/forecastDay';
import { Location } from '../../api/dtos/location';
import { WeatherActionTypes, WEATHER_GET_ACTION } from './weather.action';
export interface WeatherStateModel {
  current: Current | null;
  location: Location | null;
  hourDetail: HourDetail[] | null;

}

export const initialState: WeatherStateModel = {
 current: null,
 hourDetail: [],
  location: null
};

export function weatherReducer(
  state = initialState,
  action: WeatherActionTypes
): WeatherStateModel {
  switch (action.type) {
    case WEATHER_GET_ACTION:
      return {  
        ...state,
        location: action.payload.location,
        current: action.payload.current,
        hourDetail: action.payload.forecast.forecastday[0].hour
      };
    default:
      return state;
  }
}
      