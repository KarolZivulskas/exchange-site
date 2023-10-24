import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import {
	Box,
	OutlinedTextFieldProps,
	TextField,
	Typography, useTheme,
} from "@mui/material";
import { FieldHookConfig, useField } from "formik";
import "./CustomField.css";
import React from "react";

interface OtherProps extends OutlinedTextFieldProps {}

export default function CustomTextField(
	props: OtherProps & FieldHookConfig<string>
) {
	const theme = useTheme();
	const [field, meta] = useField(props);

	return (
		<div className="textField-container">
			<TextField
				fullWidth
				error={meta.touched && Boolean(meta.error)}
				{...field}
				{...props}
			/>
			{meta.touched && Boolean(meta.error) && (
				<Box className="textField-error-container">
					<ErrorRoundedIcon className="textField-error-icon" />
					<Typography
						variant="subtitle"
						color={theme.palette.error.main}
						align="left"
					>
						{meta.error}
					</Typography>
				</Box>
			)}
		</div>
	);
}

CustomTextField.defaultProps = {
	variant: "outlined",
};
