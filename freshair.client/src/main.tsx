import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import "./index.css";

import User from "./User/User";
import Admin from "./Admin/Admin";
import { Suspense } from "react";
import Loading from "./Components/Loading";

import { StateProvider as GeneralDataState } from "./Components/States/GeneralDataState";
import { StateProvider as GlobalState } from "./Components/States/GlobalState";
import { StateProvider as DesignState } from "./Components/States/DesignState";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <GlobalState>
    <GeneralDataState>
      <DesignState>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<Loading />}>
                  <Login />
                </Suspense>
              }
            />

            <Route path="/user/*" element={<User />} />

            <Route
              path="/admin/*"
              element={
                <Suspense fallback={<Loading />}>
                  <Admin />
                </Suspense>
              }
            />

            <Route
              path="*"
              element={
                <Suspense fallback={<Loading />}>
                  <Login />
                </Suspense>
              }
            />
          </Routes>
        </BrowserRouter>
      </DesignState>
    </GeneralDataState>
  </GlobalState>
  // </StrictMode>
);
