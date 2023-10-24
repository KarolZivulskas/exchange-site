import axios from "axios";
import BaseEndpoints from "_contant/BaseEndpoints";
import Currency from "_model/Currency";

const baseUrl = BaseEndpoints.currency;
const CurrencyAPI = {
  findAll: (): Promise<Currency[]> => axios.get(`${baseUrl}`),
  findAllCurrencies: (): Promise<Currency[]> => axios.get(`${baseUrl}/current`),
};

export default CurrencyAPI;