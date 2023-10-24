import CourseType from "./CourseType";
import Currency from "./Currency";

interface Rate {
  id: number;
  type: CourseType;
  date: string;
  leftAmount: string;
  leftCurrency: Currency
  rightAmount: string;
  rightCurrency: Currency
}

export default Rate;