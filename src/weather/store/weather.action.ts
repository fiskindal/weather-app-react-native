import { WeatherGetResult } from "../../api/dtos/weatherGetResult";


export const WEATHER_GET_ACTION = 'WEATHER_GET_ACTION';
interface WeatherGetActionType {
  type: typeof WEATHER_GET_ACTION;
  payload: WeatherGetResult;
}

export type WeatherActionTypes = WeatherGetActionType;

export function weatherGetAction(payload: WeatherGetResult ): WeatherGetActionType {
  return {
    type: WEATHER_GET_ACTION,
    payload: payload
  };
}

