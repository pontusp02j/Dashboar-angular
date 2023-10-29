export interface IWeatherDay {
  datetime: string;
  datetimeEpoch: number;
  tzoffset: number;
  tempmax: number;
  tempmin: number;
  temp: number;
  city?: string;
  humidity?: number; 
  windSpeed?: number;
}