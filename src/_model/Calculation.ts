import Currency from "./Currency";

interface Calculation {
  date: string;
  leftAmount: string;
  leftCurrency: Currency
  rightAmount: string;
  rightCurrency: Currency
}

export default Calculation;