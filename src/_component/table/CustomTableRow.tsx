import "./TableComponents.css";
import React  from "react";
import { TableRow } from "@mui/material";

interface Props {
	children: any;
	style?: React.CSSProperties;
	className?: string;
	disableHoverEffects?: boolean;
}

export default function CustomTableRow({ children, style, className, disableHoverEffects }: Props) {
	return (
		<TableRow
			className={
				(className ?? "customTableRow-table-row") +
				(disableHoverEffects ? "" : " custom-table-hover-effects")
			}
			style={{
				...style,
			}}
		>
			{children}
		</TableRow>
	);
};
