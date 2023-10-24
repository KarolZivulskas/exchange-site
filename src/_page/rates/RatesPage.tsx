import './Rates.css';
import React, {useEffect, useState} from 'react';
import Currency from '_model/Currency';
import Rate from "_model/Rate";
import CurrencyAPI from "_api/CurrencyAPI";
import RateAPI from "_api/RateAPI";
import {Typography} from "@mui/material";
import CustomTable from "_component/table/CustomTable";
import {RateTableHeadRow, RateTableRow} from "./RateTableRow";
import CustomSpinner from "_component/display/CustomSpinner";
import moment from "moment";
import CustomLineChart from '_component/charts/CustomLineChart';
import RatesActions, {ActionValues, Period} from "./RatesActions";

export default function RatesPage() {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [rates, setRates] = useState<Rate[]>([]);
  const [filteredRates, setFilteredRates] = useState<Rate[]>([]);
  const [chosen, setChosen] = useState<Currency>();
  const [period, setPeriod] = useState<Period>(Period.ONE_MONTH);
  const [loading, setLoading] = useState<boolean>(true);
  const [showTable, setShowTable] = useState<boolean>(false);

  const currencyNames = currencies
    .filter(c => c.hasRates)
    .map(c => `${c.code} (${c.nameEnglish})`);

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  async function getData(currencyCode?: string) {
    setLoading(true);
    setCurrencies(await CurrencyAPI.findAllCurrencies());
    const ratesResponse = await RateAPI.getRatesForCurrency(
      moment().subtract(3, "month"),
      moment(),
      currencyCode ?? "USD"
    );
    setRates(ratesResponse);
    filterRates(undefined, ratesResponse);
    setLoading(false);
  }
  function chooseCurrency(values: ActionValues) {
    const name = values.currency;
    const maybeCurrency = currencies.find((c: Currency) => `${c.code} (${c.nameEnglish})` === name);
    if (maybeCurrency) {
      setChosen(maybeCurrency);
      if (maybeCurrency.hasRates) {
        getData(maybeCurrency.code);
      } else {
        setRates([]);
        setFilteredRates([]);
      }
    }
  }
  function filterRates(maybePeriod?: Period, fetchedRates?: Rate[]) {
    const from = moment().subtract(maybePeriod ?? period, "months");
    const ratesToFilter = fetchedRates ?? rates;
    setFilteredRates(ratesToFilter.filter((rate: Rate) => {
      const date = moment(rate.date);
      return date.isAfter(from) || date.isSame(from);
    }));
  }

  if (loading) {
    return (
      <div className={"rates-main-container"}>
        <Typography variant={"h5"}>Loading, please wait...</Typography>
        <CustomSpinner size={50}/>
      </div>
    )
  }
  return (
    <div className={"rates-main-container"}>
      <RatesActions
        showTable={showTable}
        currencyNames={currencyNames}
        period={period}
        setPeriod={setPeriod}
        chooseCurrency={chooseCurrency}
        changeDisplay={() => setShowTable(!showTable)}
        handleFiltering={filterRates}
      />
      {!showTable && filteredRates.length !== 0 && (
        <CustomLineChart
          data={filteredRates}
          lineKeys={[
            {key: "rightAmount", name: "Rate", color: "blue"}
          ]}
          xAxisKey={"date"}
        />
      )}
      {showTable && filteredRates.length !== 0 && (
        <CustomTable
          data={filteredRates}
          ContentRow={({row}: {row: Rate}) => (
            <RateTableRow row={row}/>
          )}
          HeaderRow={() => (
            <RateTableHeadRow/>
          )}
        />
      )}
      {chosen && filteredRates.length === 0 && (
        <Typography variant={"h5"}>{`No data found for ${chosen.code}`}</Typography>
      )}
    </div>
  );
}

