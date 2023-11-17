import axios, { AxiosResponse } from "axios";
import BaseEndpoints from "_contant/BaseEndpoints";
import Rate from "_model/Rate";
import moment from "moment";
import { formatTimestamp } from "_util/UtilFunctions";
import Calculation from "_model/Calculation";

const baseUrl = BaseEndpoints.rate;

interface HttpService { // sukurti interfeisai, metodų apibūdinimui
  get: (url: string) => Promise<any>;
}

const axiosHttpService: HttpService = {
  get: (url: string) => axios.get(url),
};

interface RateFetcherInterface {   // sukurti interfeisai, metodų apibūdinimui
  findAll: () => Promise<Rate[]>;
  findAllCurrent: () => Promise<Rate[]>;
  getRatesForCurrency: (
    from: moment.Moment,
    to: moment.Moment,
    currency: string
  ) => Promise<Rate[]>;
}

interface RateCalculatorInterface {   // sukurti interfeisai, metodų apibūdinimui
  calculate: (
    from: string,
    to: string,
    amount: string
  ) => Promise<Calculation>;
}

const RateFetcher = (          // atskirtos atsakomybės į skirtingas funkcijas/modulius (RateFetcher ir RateCalculator) pagal Single Responsibility Principle
  httpService: HttpService
): RateFetcherInterface => ({
  findAll: () => httpService.get(`${baseUrl}`),
  findAllCurrent: () => httpService.get(`${baseUrl}/current`),
  getRatesForCurrency: (
    from: moment.Moment,
    to: moment.Moment,
    currency: string
  ) =>
    httpService.get(`${baseUrl}/rate`, {
      params: {
        from: formatTimestamp(from),
        to: formatTimestamp(to),
        currency,
      },
    }),
});

const RateCalculator = (   // atskirtos atsakomybės į skirtingas funkcijas/modulius (RateFetcher ir RateCalculator) pagal Single Responsibility Principle
  httpService: HttpService
): RateCalculatorInterface => ({
  calculate: (from: string, to: string, amount: string) =>
    httpService.get(`${baseUrl}/calculate`, {
      params: {
        currencyFrom: from,
        currencyTo: to,
        amount,
      },
    }),
});

export {
  RateFetcher,
  RateCalculator,
  HttpService,
  axiosHttpService,
};
