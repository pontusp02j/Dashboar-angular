import { IWeatherDay } from "./IWeatherDay";

export interface IWeatherData {
    id: number;
    queryCost: number;
    latitude: number;
    longitude: number;
    resolvedAddress: string;
    address: string;
    alerts: any[];
    currentConditions: any;
    days: IWeatherDay[];
    description: string; 
    tzoffset: number;  
}