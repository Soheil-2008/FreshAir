import { Suspense, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";

import Loading from "../Components/Loading";
import Navbar from "../Components/Navbar";

import Design from "./Pages/Design";

import { UseGlobalState } from "../Components/States/GlobalState";
import Dashboard from "./Pages/Dashboard";

import "./user.css";
import Project from "./Pages/Project";
// import Footer from "../Components/Footer";

interface Unit {
  Dimensions: string;
  Temperature: string;
  Weight: string;
  WaterFlowRate: string;
  FinsPerLength: string;
  Capacity: string;
  // SensibleCapacity: string;
  WaterPressureDrop: string;
  StaticPressure: string;
  CoilHumidity: string;
  AirFlowRate: string;
  WaterVolumeAcrossCoil: string;
  CoilHeaderAndConnection: string;
  RefrigerantMassFlow: string;
  AirVelocity: string;
  NominalPower: string;
  PulleyDiameter: string;
  ShaftDiameter: string;
  NicotraCentredist: string;
  BeltSpeed: string;
  HumidifierLoad: string;
  CircuitLength: string;
  Altitude: string;
  Torque: string;
}

type User = {
  id: number;
  name: string;
  token: string;
  permission: string;
  units: Unit;
};

const User = () => {
  const navigate = useNavigate();
  const { setGlobalState } = UseGlobalState();
  const [dataFetched, setDataFetched] = useState<boolean>(false);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const user: User = JSON.parse(storedUser);
      setGlobalState((prev) => ({
        ...prev,
        user,
      }));
      setAxiosDefaultHeaders();
      setDataFetched(true);
    } else {
      navigate("/");
    }
  }, [setGlobalState, navigate]);

  const setAxiosDefaultHeaders = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  return dataFetched ? (
    <div className="min-h-dvh flex flex-col relative">
      <Navbar />
      <Routes>
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<Loading />}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path="/project"
          element={
            <Suspense fallback={<Loading />}>
              <Project />
            </Suspense>
          }
        />
        <Route path="/design" element={<Design />} />

        <Route path="*" element={<h1>Error : 404 , Page Not Found</h1>} />
      </Routes>
      {/* <Footer /> */}
    </div>
  ) : (
    <Loading />
  );
};

export default User;
