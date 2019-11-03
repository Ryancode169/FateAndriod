export interface User {
  Name: string;
  Gender: string;
  Cellphone: string;
  BirthTime: number; // 出生時辰
  DateType: number;  // 國曆:0 陰曆:1
  Year: number;
  Month: number;
  Day: number;
  IsLeap: boolean; // 潤月
  SelectedBirthTimeText: string;
}
