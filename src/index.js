import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Otp from "./Pages/Otp";
import OtpSuccess from "./Components/OtpSuccess";
import OtpFailed from "./Components/OtpFailed";

import Home from "./Pages/Home";

import PassiveCategory from "./Pages/PassiveCategory";
import ActiveCategory from "./Pages/ActiveCategory";

import AddProductForm from "./Pages/AddProduct";

import AddProductType from "./Pages/AddProductType";

import VendorList from "./Pages/VendorList";
import VendorProduct from "./Pages/VendorProduct";
import VendorTable from "./Pages/VendorTable";

import {
  AddSubCategoryActive,
  AddSubCategoryPassive,
} from "./Pages/AddSubCategory";

import ProductBrands from "./Pages/ProductBrands";
import ProductBrandsDetail from "./Pages/ProductBrandsDetail";

import ProductSeeAll from "./Pages/ProductSeeAll";
import ProductDetail from "./Pages/ProductDetail";
import EditProduct from "./Pages/EditProduct";

import ManageAccount from "./Pages/ManageAccount";
import ManageAccountDetail from "./Pages/ManageAccountDetail";

import Scanner from "./Pages/Scanner";
import Report from "./Pages/Report";

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
    path: "/:groupSlug-category/:subCategorySlug",
    element: <ProductSeeAll />,
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
    path: "/vendor-list/:vendorSlug",
    element: <VendorProduct />,
  },
  {
    path: "/manage-account",
    element: <ManageAccount />,
  },
  {
    path: "/manage-account/:id",
    element: <ManageAccountDetail />,
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
    path: "/:groupSlug-category/:categorySlug/:subCategorySlug",
    element: <ProductBrands />,
  },
  {
    path: "/:groupSlug-category/:categorySlug/:subCategorySlug/:productSlug/:id",
    element: <ProductBrandsDetail />,
  },
  {
    path: "/:groupSlug-category/:categorySlug/:subCategorySlug/:productSlug/:id",
    element: <ProductDetail />,
  },
  {
    path: "/vendor-list/:categorySlug/:subCategorySlug/:productSlug/:id",
    element: <ProductDetail />,
  },
  {
    path: "/:groupSlug-category/:categorySlug/:subCategorySlug/:productSlug/add-product-type",
    element: <AddProductType />,
  },
  {
    path: "/vendor-list/:vendorSlug/:subCategorySlug/:productSlug",
    element: <VendorTable />,
  },
  {
    path: "/:groupSlug-category/:categorySlug/:subCategorySlug/:productSlug/:id/edit-product",
    element: <EditProduct />,
  },
  {
    path: "/scanner",
    element: <Scanner />,
  },
  {
    path: "/reports",
    element: <Report />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
