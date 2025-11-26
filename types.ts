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

export interface DayPlan {
  id: number;
  date: string;
  weekday: string;
  route: string;
  theme: string;
  activities: Activity[];
}

export interface DeploymentStep {
  title: string;
  content: string;
}
