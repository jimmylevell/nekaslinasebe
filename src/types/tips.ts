export interface Week {
  id: string;
  year: number;
  week: number;
  startDate: string;
  endDate: string;
}

export interface Tip {
  week: string;
  tipNumber: number;
  title: string;
  category: string;
  image: string;
  imageBig?: string;
  content: string;
  practicalTips?: string;
}

export interface TipsData {
  weeks: Week[];
  currentWeek: string;
  tips: Tip[];
}
