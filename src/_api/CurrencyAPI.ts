import axios, { AxiosResponse } from "axios";
import BaseEndpoints from "_contant/BaseEndpoints";
import Currency from "_model/Currency";

interface CurrencyAPIInterface { // interfeisas atskiria metodus, susijusius su API call'ais
  findAll: () => Promise<Currency[]>;
  findAllCurrencies: () => Promise<Currency[]>;
}

class CurrencyAPI implements CurrencyAPIInterface {  //objektas keičiamas į klasę, decoupling
  private baseUrl: string; // baseUrl įkapsuliavimas

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async get<T>(endpoint: string): Promise<T> {
    const response = await axios.get(`${this.baseUrl}/${endpoint}`);
    return response.data;
  }

  findAll(): Promise<Currency[]> {
    return this.get<Currency[]>("");
  }

  findAllCurrencies(): Promise<Currency[]> {
    return this.get<Currency[]>("current");
  }
}

export default new CurrencyAPI(BaseEndpoints.currency);
