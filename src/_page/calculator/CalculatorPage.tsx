import "./Calculator.css";
import React, {useEffect, useState} from "react";
import Currency from "_model/Currency";
import CurrencyAPI from "_api/CurrencyAPI";
import {Button, Typography, useTheme} from "@mui/material";
import CustomSpinner from "_component/display/CustomSpinner";
import {Formik, FormikProps} from "formik";
import * as yup from "yup";
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import CustomAutoComplete from "_component/field/CustomAutoComplete";
import CustomTextField from "_component/field/CustomTextField";
import Rate from "_model/Rate";
import RateAPI from "_api/RateAPI";
import SubmitToken from "_component/field/SubmitToken";
import Calculation from "_model/Calculation";
import {isNumeric} from "_util/UtilFunctions";

export default function CalculatorPage() {
  const theme = useTheme();
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [initialValues, setInitialValues] = useState<CalculationFormValues>()
  const [loading, setLoading] = useState<boolean>(true);
  const currencyNames = currencies
    .filter(c => c.hasRates)
    .map(c => `${c.code} (${c.nameEnglish})`);

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  async function getData() {
    setLoading(true);
    const ratesResponse = await RateAPI.findAll();
    const maybeInitial = ratesResponse.find((currency: Rate) => currency.rightCurrency.code === "USD")
    if (maybeInitial) {
      setCurrencies(await CurrencyAPI.findAll());
      setInitialValues(getInitialValues(maybeInitial))
      setLoading(false);
    }
  }
  async function handleCalculation(values: CalculationFormValues) {
    function getCurrency(name: string): Currency | undefined {
      return currencies.find((c: Currency) => `${c.code} (${c.nameEnglish})` === name);
    }
    const leftCurrencyCode = getCurrency(values.leftCurrency)?.code;
    const rightCurrencyCode = getCurrency(values.rightCurrency)?.code;
    if (leftCurrencyCode && rightCurrencyCode) {
      const response = await RateAPI.calculate(
        leftCurrencyCode,
        rightCurrencyCode,
        values.leftAmount
      );
      setInitialValues(toFormValues(response));
    }
  }

  if (loading || !initialValues) {
    return (
      <div className={"calculator-main-container"}>
        <Typography variant={"h5"}>Loading, please wait...</Typography>
        <CustomSpinner size={50}/>
      </div>
    );
  }
  return (
    <div className={"calculator-main-container"}>
      <div className={"calculator-calculation-container"}>
        <Formik
          initialValues={initialValues}
          validationSchema={getValidationSchema(currencyNames)}
          onSubmit={(values: any) => handleCalculation(values as CalculationFormValues)}
          enableReinitialize
        >
          {(formik: FormikProps<any>) => (
            <>
              <div className={"calculator-form"}>
                <div className={"calculator-form-currency-section"}>
                  <CustomAutoComplete
                    value={formik.values.leftCurrency}
                    options={currencyNames ?? []}
                    name={"leftCurrency"}
                    label={"Currency (FROM)"}
                  />
                  <CustomTextField
                    name={"leftAmount"}
                    label={"Amount (FROM)"}
                  />
                </div>
                <Button
                  onClick={async () => {
                    formik.setValues({
                      leftCurrency: formik.values.rightCurrency,
                      leftAmount: formik.values.rightAmount,
                      rightCurrency: formik.values.leftCurrency,
                      rightAmount: formik.values.leftAmount,
                    });
                  }}
                >
                  <CompareArrowsIcon style={{ color: theme.palette.background.light }}/>
                </Button>
                <div className={"calculator-form-currency-section"}>
                  <CustomAutoComplete
                    value={formik.values.rightCurrency}
                    options={currencyNames ?? []}
                    name={"rightCurrency"}
                    label={"Currency (TO)"}
                  />
                  <CustomTextField
                    name={"rightAmount"}
                    label={"Amount (TO)"}
                    disabled // only for display
                  />
                </div>
              </div>
              <SubmitToken/>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
}
function toFormValues(response: Calculation) {
  const leftCurrency = response.leftCurrency;
  const rightCurrency = response.rightCurrency;
  return {
    leftCurrency: `${leftCurrency.code} (${leftCurrency.nameEnglish})`,
    leftAmount: response.leftAmount,
    rightCurrency: `${rightCurrency.code} (${rightCurrency.nameEnglish})`,
    rightAmount: response.rightAmount,
  }
}
function getInitialValues(rate: Rate) {
  const leftCurrency = rate.leftCurrency;
  const rightCurrency = rate.rightCurrency;
  return {
    leftCurrency: `${leftCurrency.code} (${leftCurrency.nameEnglish})`,
    leftAmount: rate.leftAmount,
    rightCurrency: `${rightCurrency.code} (${rightCurrency.nameEnglish})`,
    rightAmount: rate.rightAmount,
  }
}
export type CalculationFormValues = ReturnType<typeof getInitialValues>;

function getValidationSchema(currencyNames: string[]) {
  return yup.object({
    leftCurrency: yup
      .string()
      .oneOf(currencyNames, "Please choose currency out of given currencies.")
      .required("Please choose currency out of given currencies."),
    leftAmount: yup
      .string()
      .max(15, "Number cannot be more than 23 symbols")
      .test(
        "isNumeric",
        "Please input a number.",
        (value?: string) => isNumeric(value)
      )
      .required("From amount is required."),
    rightCurrency: yup
      .string()
      .oneOf(currencyNames, "Please choose currency out of given currencies.")
      .required("Please choose currency out of given currencies."),
    rightAmount: yup
      .string()
      .required(),
  })
}
