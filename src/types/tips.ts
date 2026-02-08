export interface Week {
  id: string;
  year: number;
  week: number;
  startDate: string;
  endDate: string;
}

export interface PracticalTips {
  oneMinute: string;
  fiveMinutes: string;
  fifteenMinutes: string;
}

export interface Tip {
  week: string;
  tipNumber: number;
  title: string;
  category: string;
  image: string;
  imageBig?: string;
  content: string;
  content_en?: string;
  // Support both old string format and new structured format
  practicalTips?: string | PracticalTips;
  practicalTips_en?: string | PracticalTips;
  psContent?: string;
  psContent_en?: string;
}

export interface TipsData {
  weeks: Week[];
  currentWeek: string;
  tips: Tip[];
}
