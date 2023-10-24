import { useTheme } from "@mui/material";
import CustomTableRow from "./CustomTableRow";
import TextCell, { TextCellProps, TextVariant } from "./templates/TextCell";

interface Props {
  cells: TextCellProps[];
  textVariant?: TextVariant;
}

export default function CustomTableHeadRow(props: Props) {
  const theme = useTheme();

  return (
    <CustomTableRow
      disableHoverEffects
      style={{ backgroundColor: theme.palette.background.light }}
    >
      {props.cells.map((cell: TextCellProps, index: number) => (
        <TextCell
          {...cell}
          key={index}
          color={"white"}
        />
      ))}
    </CustomTableRow>
  );
}
