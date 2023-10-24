import axios from "axios";
import BaseEndpoints from "_contant/BaseEndpoints";
import Rate from "_model/Rate";
import moment from "moment";
import {formatTimestamp} from "_util/UtilFunctions";
import Calculation from "_model/Calculation";

const baseUrl = BaseEndpoints.rate;
const RateAPI = {
  findAll: (): Promise<Rate[]> => axios.get(`${baseUrl}`),
  findAllCurrent: (): Promise<Rate[]> => axios.get(`${baseUrl}/current`),
  getRatesForCurrency: (from: moment.Moment, to: moment.Moment, currency: string): Promise<Rate[]> =>
    axios.get(`${baseUrl}/rate`,
      {
        params: {
          from: formatTimestamp(from),
          to: formatTimestamp(to),
          currency
        }
      }),
  calculate: (from: string, to: string, amount: string): Promise<Calculation> =>
    axios.get(`${baseUrl}/calculate`,
      {
        params: {
          currencyFrom: from,
          currencyTo: to,
          amount
        }
      }),
};

export default RateAPI;
