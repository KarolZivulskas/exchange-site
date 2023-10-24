import AppTheme from "../../AppTheme";
import {CircularProgress} from "@mui/material";
import React from "react";

export default function CustomSpinner({size}: {size?: number}) {
  return (
    <CircularProgress
      size={size}
      style={{
        color: AppTheme.palette.primary.main,
      }}
    />
  )
};