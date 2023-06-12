import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import "bootstrap/dist/css/bootstrap.min.css";
import Otp from "./Pages/Otp";
import OtpSuccess from "./Components/OtpSuccess";
import OtpFailed from "./Components/OtpFailed";
import Home from "./Pages/Home";
import PassiveCategory from "./Pages/PassiveCategory";
import ActiveCategory from "./Pages/ActiveCategory";
import AddProductForm from "./Pages/AddProduct";
import VendorList from "./Pages/VendorList";
import VendorProduct from "./Pages/VendorProduct";
import ManageAccount from "./Pages/ManageAccount";
import {
  AddSubCategoryActive,
  AddSubCategoryPassive,
} from "./Pages/AddSubCategory";
import ProductBrands from "./Pages/ProductBrands";
import Scanner from "./Pages/Scanner";
import Report from "./Pages/Report";
import ProductBrandsDetail from "./Pages/ProductBrandsDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/otp",
    element: <Otp />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/otp-successful",
    element: <OtpSuccess />,
  },
  {
    path: "/otp-failed",
    element: <OtpFailed />,
  },
  {
    path: "/active-category",
    element: <ActiveCategory />,
  },
  {
    path: "/passive-category",
    element: <PassiveCategory />,
  },
  {
    path: "/add-product",
    element: <AddProductForm />,
  },
  {
    path: "/vendor-list",
    element: <VendorList />,
  },
  {
    path: "/vendor-list/:name",
    element: <VendorProduct />,
  },
  {
    path: "/manage-account",
    element: <ManageAccount />,
  },
  {
    path: "/add-sub-category/active",
    element: <AddSubCategoryActive />,
  },
  {
    path: "/add-sub-category/passive",
    element: <AddSubCategoryPassive />,
  },
  {
    path: "/active-category/computer-devices/:name",
    element: <ProductBrands />,
  },
  {
    path: "/active-category/household-appliances/:name",
    element: <ProductBrands />,
  },
  {
    path: "/passive-category/furniture/name",
    element: <ProductBrands />,
  },
  {
    path: "/passive-category/office-supplies/:name",
    element: <ProductBrands />,
  },
  {
    path: "/scanner",
    element: <Scanner />,
  },
  {
    path: "/reports",
    element: <Report />,
  },
  {
    path: "/:subCategory/:brandName",
    element: <ProductBrandsDetail />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
