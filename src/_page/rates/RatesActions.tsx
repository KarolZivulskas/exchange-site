import {Formik} from "formik";
import * as yup from "yup";
import CustomAutoComplete from "_component/field/CustomAutoComplete";
import {Button} from "@mui/material";
import "./Rates.css";
import Currency from "_model/Currency";
import TableChartIcon from '@mui/icons-material/TableChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import SubmitToken from "_component/field/SubmitToken";

export enum Period {
  ONE_MONTH = 1,
  TWO_MONTHS,
  THREE_MONTHS
}
interface PeriodButtonProps {
  label: string;
  value: Period;
}

function getInitialValues() {
  return {
    currency: "USD (US dollar)",
  }
}
export type ActionValues = ReturnType<typeof getInitialValues>;

interface Props {
  showTable: boolean;
  currencyNames: string[];
  period: Period;
  setPeriod: (period: Period) => void;
  chooseCurrency: (values: ActionValues) => void;
  changeDisplay: () => void;
  handleFiltering: (period: Period) => void;
}
export default function RatesActions(props: Props) {
  const {
    showTable,
    currencyNames,
    period,
    setPeriod,
    chooseCurrency,
    changeDisplay,
    handleFiltering
  } = props;
  const periodButtons: PeriodButtonProps[] = [
    {
      label: "1 MONTH",
      value: Period.ONE_MONTH,
    },
    {
      label: "2 MONTHS",
      value: Period.TWO_MONTHS,
    },
    {
      label: "3 MONTHS",
      value: Period.THREE_MONTHS,
    },
  ]
  return (
    <div className={"rates-actions-container"}>
      <Formik
        initialValues={getInitialValues()}
        validationSchema={yup.object({
          currency: yup
            .string()
            .oneOf(currencyNames, "Please choose currency out of given currencies.")
            .required("Please choose currency out of given currencies.")
        })}
        onSubmit={(values: unknown) => chooseCurrency(values as ActionValues)}   // any tipas kompiliatoriaus netikrinamas tipo validavimu, tad saugiau jį pakeisti į unknown (arba konkretų tipą). Tai gali tapti saugumo problema arba bug'ų šaltiniu
      >
        {() => (
          <div className={"rates-actions-form"}>
            <CustomAutoComplete
              options={currencyNames ?? []}
              name={"currency"}
              label={"Currency"}
            />
            <Button
              variant={"outlined"}
              onClick={changeDisplay}
              style={{ height: "56px" }}
            >
              {showTable ? (
                <TimelineIcon/>
              ) : (
                <TableChartIcon/>
              )}
            </Button>
            <SubmitToken/>
          </div>
        )}
      </Formik>
      <div className={"rates-actions-period-buttons"}>
        {periodButtons.map((buttonProps: PeriodButtonProps) => (
          <Button
            key={buttonProps.label}
            variant={"contained"}
            onClick={() => {
              setPeriod(buttonProps.value);
              handleFiltering(buttonProps.value);
            }}
            disabled={buttonProps.value === period}
          >
            {buttonProps.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
