import React from "react";
import {Button, Typography, useTheme} from "@mui/material";
import "./Main.css";
import {Route, Routes, useNavigate} from "react-router";
import AllRoutes, { PathItem } from "_contant/AllRoutes";

export default function Main() {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <div className={"main-container"}>
      <div
        className={"main-header"}
        style={{backgroundColor: theme.palette.background.light}}
      >
        <Typography
          variant={"h1"}
          color={"white"}
        >
          Exchange rates
        </Typography>
        <div className={"main-header-links"}>
          {AllRoutes.map((item: PathItem) => (
            <Button
              key={item.path}
              variant={"outlined"}
              onClick={() => navigate(item.path)}
              style={{ color: "white" }}
            >
              {item.title}
            </Button>
          ))}
        </div>
      </div>
      <div className={"main-body"}>
        <Routes>
          {AllRoutes.map((item: PathItem) => (
            <Route
              key={item.path}
              path={item.path}
              element={item.page}
            />
          ))}
        </Routes>
      </div>
    </div>
  );
}
