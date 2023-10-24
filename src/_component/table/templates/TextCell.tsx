import React from "react";
import { TableCell, Typography } from "@mui/material";
import AppTheme from "AppTheme";
import { OverridableStringUnion } from "@mui/types";
import { Variant } from "@mui/material/styles/createTypography";
import { TypographyPropsVariantOverrides } from "@mui/material/Typography/Typography";


export type TextVariant = OverridableStringUnion<
	Variant | "inherit",
	TypographyPropsVariantOverrides
	>;

export interface TextCellProps {
	primaryText?: string[] | string;
	secondaryText?: string[] | string;
	className?: string;
	header?: boolean;
	boldLastPrimaryText?: boolean;
	boldFontWeight?: number;
	width?: string;
	align?: "center" | "left" | "right";
	color?: string;
}

function TextCell(props: TextCellProps) {
	const boldFontWeight = props?.boldFontWeight ?? 500;
	function getText(text?: string[] | string): string[] | undefined {
		return typeof text === "string" ? [text] : text;
	}
	return (
		<TableCell
			className={props?.className}
			style={{
				display: "flex",
				width: props?.width,
				alignItems: "center",
				justifyContent: props?.align ?? "center",
			}}
		>
			{getText(props.primaryText)?.map((text, index, array) => (
				<Typography
					key={text}
					variant="body2"
					color={props.color ?? AppTheme.palette.text.primary}
					fontWeight={
						props.header ||
						(props.boldLastPrimaryText && index === array.length - 1)
							? boldFontWeight
							: undefined
					}
				>
					{text}
				</Typography>
			))}
			{getText(props.secondaryText)?.map((text) => (
				<Typography
					variant="body2"
					color={AppTheme.palette.text.secondary}
					key={text}
				>
					{text}
				</Typography>
			))}
		</TableCell>
	);
}

export default React.memo(TextCell);
