import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import {Autocomplete, TextField} from "@mui/material";
import {FieldHookConfig, useField, useFormikContext} from "formik";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import AppTheme from "AppTheme";
import "./CustomField.css";

interface OtherProps {
  options: string[];
  label?: string;
}

export default function CustomAutoComplete(props: OtherProps & FieldHookConfig<string>) {
  const [field, meta] = useField(props);
  const formikContext = useFormikContext();

  const handleChange = (newValue: string | undefined) => {
    formikContext.setFieldTouched(props.name, true);
    formikContext.setFieldValue(props.name, newValue);
  };

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "5px"}}>
      <Autocomplete
        freeSolo
        fullWidth
        value={field.value}
        key={field.name}
        onChange={(event: any, newValue: string | null) => {
          handleChange( newValue ?? "");
        }}
        options={["", ...props.options]}
        isOptionEqualToValue={(option, value) => option === value}
        renderInput={(params) => (
          <TextField
            {...field}
            {...params}
            label={props.label}
            fullWidth
            error={meta.touched && Boolean(meta.error)}
            InputProps={{
              ...params.InputProps,
            }}
          />
        )}
      />
      {meta.touched && Boolean(meta.error) && (
        <Box className="textField-error-container">
          <ErrorRoundedIcon className="textField-error-icon" />
          <Typography
            variant="subtitle"
            color={AppTheme.palette.red[800]}
            align="left"
          >
            {meta.error}
          </Typography>
        </Box>
      )}
    </div>
  )
}