
export enum ActivityType {
  Drive = 'Drive',
  Food = 'Food',
  Activity = 'Activity',
  Hotel = 'Hotel',
  Rest = 'Rest',
}

export interface Activity {
  time: string;
  title: string;
  description?: string;
  type: ActivityType;
  location?: string;
  tips?: string[];
  options?: {
    title: string;
    description: string;
  }[];
}

export interface WeatherInfo {
  type: 'sunny' | 'cloudy' | 'rain' | 'windy';
  temp: string;
  desc: string;
}

export interface DayPlan {
  id: number;
  date: string;
  weekday: string;
  route: string;
  theme: string;
  weather: WeatherInfo;
  activities: Activity[];
}

export interface DeploymentStep {
  title: string;
  content: string;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: 'food' | 'transport' | 'stay' | 'play' | 'other';
  payer: string;
  date: string;
  dateTimestamp?: number; // 用於排序
}
