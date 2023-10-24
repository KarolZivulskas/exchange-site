import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import { createTheme } from "@mui/material";
import React from "react";

const AppTheme = createTheme({
	typography: {
		fontFamily: "Inter",
		fontWeightRegular: "400",
		fontWeightMedium: "500",
		fontWeightBold: "600",
		h1: {
			fontSize: "36px",
			lineHeight: "140%",
			fontWeight: "700",
			color: "#181D2B",
		},
		h2: {
			fontSize: "28px",
			lineHeight: "140%",
			fontWeight: "700",
			color: "#181D2B",
		},
		h3: {
			fontSize: "18px",
			lineHeight: "140%",
			fontWeight: "500",
			color: "#181D2B",
		},
		h5: {
			fontSize: "15px",
			lineHeight: "140%",
			fontWeight: "500",
			color: "#181D2B",
		},
		h6: {
			fontSize: "13px",
			lineHeight: "140%",
			fontWeight: "500",
			color: "#181D2B",
		},
		body: {
			fontSize: "16px",
			lineHeight: "140%",
			fontWeight: "400",
			color: "#181D2B",
		},
		body2: {
			fontSize: "14px",
			lineHeight: "140%",
			fontWeight: "400",
			color: "#181D2B",
		},
		subtitle: {
			fontSize: "12px",
			lineHeight: "140%",
			fontWeight: "400",
			color: "#181D2B",
		},
		hyperlink: {
			fontSize: "16px",
			lineHeight: "140%",
			fontWeight: "400",
			color: "#4A5E96",
			textDecorationLine: "underline",
		},
	},
	palette: {
		primary: {
			main: "#4A5E96",
			light: "#7A8BC7",
			dark: "#183568",
			extraLight: "#7A8BC7",
		},
		text: {
			primary: "#171440",
			secondary: "rgba(23, 20, 64, 0.6)",
			light: "#F8F8F8",
			disabled: "rgba(24, 29, 43, 0.6)",
		},
		background: {
			default: "#FFFFFF",
			light: "#00214a",
		},
		error: {
			main: "#E53935",
		},
		warning: {
			main: "#FFC107",
			contrastText: "#3A3500",
		},
		grey: {
			50: "#FAFAFA",
			100: "#F5F5F5",
			200: "#EEEEEE",
			300: "#E0E0E0",
			400: "#BDBDBD",
			500: "#9E9E9E",
			600: "#9E9E9E",
			700: "#616161",
			800: "#424242",
			900: "#212121",
		},
		red: {
			50: "#FEEBEE",
			100: "#FECDD2",
			200: "#EF9A9A",
			300: "#E57373",
			400: "#EF5350",
			500: "#F44336",
			600: "#E53935",
			700: "#D32F2F",
			800: "#C62828",
			900: "#B71C1C",
		},
		green: {
			50: "#E8F5E9",
			100: "#C8E6C9",
			200: "#A5D6A7",
			300: "#81C784",
			400: "#66BB6A",
			500: "#4CAF50",
			600: "#43A047",
			700: "#388E3C",
			800: "#2E7D32",
			900: "#1B5E20",
		},
		neutral: {
			50: "#F9FBFB",
		},
	},
});

declare module "@mui/material/Typography" {
	interface TypographyPropsVariantOverrides {
		hyperlink: true;
		overline: false;
		body: true;
		body1: false;
		subtitle: true;
		subtitle1: false;
	}
}

declare module "@mui/material/Button" {
	interface ButtonPropsVariantOverrides {
		danger: true;
		grey: true;
	}
}

declare module "@mui/material/styles" {
	interface TypographyVariants {
		hyperlink: React.CSSProperties;
		body: React.CSSProperties;
		subtitle: React.CSSProperties;
	}

	interface TypographyVariantsOptions {
		hyperlink?: React.CSSProperties;
		body?: React.CSSProperties;
		subtitle?: React.CSSProperties;
	}
}

declare module "@mui/material/styles/createPalette" {
	interface Palette {
		specific: Palette["primary"];
		neutral: Palette["primary"];
		error: Palette["primary"];
		red: Palette["grey"];
		green: Palette["grey"];
	}

	interface PaletteOptions {
		specific?: PaletteOptions["primary"];
		neutral?: PaletteOptions["primary"];
		error?: PaletteOptions["primary"];
		red?: PaletteOptions["grey"];
		green?: PaletteOptions["grey"];
	}

	interface TypeText {
		light: string;
	}

	interface TypeTextOptions {
		light?: PaletteOptions["primary"];
	}

	interface PaletteColor {
		extraLight?: string;
	}

	interface SimplePaletteColorOptions {
		extraLight?: string;
	}

	interface TypeBackground {
		light: string;
	}

	interface SimplePaletteColorOptions {
		light?: string;
	}
}

export default AppTheme;
