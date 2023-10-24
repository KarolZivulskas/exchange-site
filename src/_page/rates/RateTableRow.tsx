import CustomTableRow from "_component/table/CustomTableRow";
import CustomTableHeadRow from "_component/table/CustomTableHeadRow";
import Rate from "_model/Rate";
import TextCell from "_component/table/templates/TextCell";
import moment from "moment";

export function RateTableHeadRow() {
  return (
    <CustomTableHeadRow
      cells={[
        {
          primaryText: "Date",
          width: "30%",
          align: "left",
        },
        {
          primaryText: "Currency",
          width: "20%",
          align: "left",
        },
        {
          primaryText: "Exchange rate",
          width: "30%",
          align: "left",
        },
        {
          primaryText: "Currency",
          width: "20%",
          align: "left",
        }
      ]}
    />
  )
}

interface RateTableRowProps {
  row: Rate;
}
export function RateTableRow({ row }: RateTableRowProps) {
  return (
    <CustomTableRow>
      <TextCell
        width={"30%"}
        primaryText={moment(row.date).format("yyyy-MM-DD")}
      />
      <TextCell
        width={"20%"}
        primaryText={`${row?.leftCurrency?.code} (${row?.leftCurrency?.nameEnglish})`}
        align={"left"}
      />
      <TextCell
        width={"30%"}
        primaryText={`${row.leftAmount} : ${row.rightAmount}`}
        align={"left"}
      />
      <TextCell
        width={"20%"}
        primaryText={`${row?.rightCurrency?.code} (${row?.rightCurrency?.nameEnglish})`}
        align={"left"}
      />
    </CustomTableRow>
  )
}