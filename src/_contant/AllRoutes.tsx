import RatesPage from "_page/rates/RatesPage";
import CalculatorPage from "_page/calculator/CalculatorPage";

export interface PathItem {
  path: string;
  page: JSX.Element;
  title: string;
}

const AllRoutes: PathItem[] = [
  {
    title: "Rates",
    path: "/",
    page: <RatesPage/>,
  },
  {
    title: "Calculator",
    path: "/calculator",
    page: <CalculatorPage/>
  }
];

export default AllRoutes;