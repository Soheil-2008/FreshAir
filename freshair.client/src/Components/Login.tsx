import { useNavigate } from "react-router-dom";
import axios, { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

import { Button } from "@mui/material";

import { UseGlobalState } from "./States/GlobalState";
import Swal from "sweetalert2";
import Loading from "./Loading";
type User = {
  name?: string;
  password?: string;
};

const Login = () => {
  const { globalState, setGlobalState } = UseGlobalState();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({});

  useEffect(() => {
    navigate("/");
    setAxiosDefaultHeaders();
    setGlobalState({
      server: "https://localhost:7005",
      user: {
        id: 0,
        name: "",
        token: "",
        permission: "",
        units: {
          Dimensions: "",
          Temperature: "",
          Weight: "",
          WaterFlowRate: "",
          FinsPerLength: "",
          Capacity: "",
          // SensibleCapacity: "",
          WaterPressureDrop: "",
          StaticPressure: "",
          CoilHumidity: "",
          AirFlowRate: "",
          WaterVolumeAcrossCoil: "",
          CoilHeaderAndConnection: "",
          RefrigerantMassFlow: "",
          AirVelocity: "",
          NominalPower: "",
          PulleyDiameter: "",
          ShaftDiameter: "",
          NicotraCentredist: "",
          BeltSpeed: "",
          HumidifierLoad: "",
          CircuitLength: "",
          Altitude: "",
          Torque: "",
        },
      },
      openedProject: {
        id: 0,
        Name: "",
        CreatedBy: "",
        CreatedAt: "",
        Reference: "",
        Consultant: "",
        Contractor: "",
        Client: "",
        Note: "",
      },
      openedProjectTags: [],
      openedTag: {
        name: "",
        inputData: {},
        sections: [],
      },
      sections: [],
      accessories: [],
    });
    sessionStorage.clear();
    // eslint-disable-next-line
  }, []);

  const setAxiosDefaultHeaders = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user.name || !user.password) {
      Swal.fire({
        icon: "info",
        title: "Please fill out all fields",
      });
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `${globalState.server}/api/account/login`,
        {
          Username: user.name,
          Password: user.password,
        }
      );

      if (response.status == 200) {
        setGlobalState((prev) => ({ ...prev, user: response.data }));

        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("user", JSON.stringify(response.data));

        setAxiosDefaultHeaders();
        if (response.data.role === "admin") {
          navigate("/admin");
        } else {
          navigate(`/user/dashboard`);
        }
      }
    } catch (error) {
      console.log(error);
      if (isAxiosError(error)) {
        if (error.response?.status == 401) {
          Swal.fire({
            icon: "warning",
            title: "Invalid username or password",
            width: 550,
          });
        } else if (error.response?.data.message) {
          Swal.fire({
            icon: "error",
            title: error.response?.data.message,
            text: error.response?.data.error,
            confirmButtonText: "Ok",
          });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="w-[500px] mt-20 mx-auto flex flex-col items-center bg-gray-100 rounded-md p-5 shadow-xl">
        <img className="w-1/2" src={"../../src/imgs/Logo2.png"} alt="logo" />
        <h5 className="my-6 font-semibold text-lg">
          Fresh Air Design Software
        </h5>

        <form onSubmit={handleSubmit} noValidate>
          <TextField
            value={user.name || ""}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, name: e.target.value }))
            }
            margin="normal"
            required
            fullWidth
            label="Username"
            autoComplete="new-username"
            autoFocus
          />

          <TextField
            value={user.password || ""}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, password: e.target.value }))
            }
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="new-password"
          />

          <Button
            color="primary"
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <h1 className="text-center text-xl">Version 1.0</h1>
        </form>
      </div>
      {loading && <Loading />}
    </main>
  );
};

export default Login;
