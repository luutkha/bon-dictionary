import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "../src/app/redux/store";
import App from "./App";
import PageLayout from "./app/components/layout/page-layout/PageLayout";
import { BasicSplashCardPage } from "./app/pages/basic/BasicSplashCardPage";
import { ToeicSplashCardPage } from "./app/pages/toeic/ToeicSplashCardPage";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/toeic",
    element: <ToeicSplashCardPage />,
  },
  {
    path: "/basic",
    element: <BasicSplashCardPage />,
  },
]);
const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PageLayout>
        <RouterProvider router={router} />
      </PageLayout>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
