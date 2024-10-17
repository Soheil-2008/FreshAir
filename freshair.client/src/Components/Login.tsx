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
    // setGlobalState({
    //   server: "https://localhost:7005",
    //   user: {
    //     id: 0,
    //     name: "",
    //     token: "",
    //     permission: "",
    //     units: {
    //       Length: "",
    //       Temperature: "",
    //       Weight: "",
    //       WaterFlowRate: "",
    //       FinsPerLength: "",
    //       Capacity: "",
    //       WaterPressureDrop: "",
    //       StaticPressure: "",
    //       CoilHumidity: "",
    //       AirFlowRate: "",
    //       WaterVolumeAcrossCoil: "",
    //       CoilHeaderAndConnection: "",
    //       RefrigerantMassFlow: "",
    //       AirVelocity: "",
    //       NominalPower: "",
    //       Diameter: "",
    //       BeltSpeed: "",
    //       HumidifierLoad: "",
    //       CircuitLength: "",
    //       Altitude: "",
    //       Torque: "",
    //     },
    //   },
    //   openedProject: {
    //     id: 0,
    //     Name: "",
    //     CreatedBy: "",
    //     CreatedAt: "",
    //     Reference: "",
    //     Consultant: "",
    //     Contractor: "",
    //     Client: "",
    //     Note: "",
    //   },
    //   openedProjectTags: [],
    //   openedTag: {
    //     name: "",
    //     inputData: {},
    //     sections: [],
    //   },
    //   sections: [],
    //   accessories: [],
    // });
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
        delete response.data.token;
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
    <div className="flex h-dvh">
      <div className="w-2/3 mt-24">
        <video src={"/public/imgs/AHU_Simulation.mp4"} autoPlay={true} loop />
      </div>

      <div className="w-1/3 h-full flex flex-col items-center justify-between rounded-md p-10 shadow-xl">
        <div className="flex flex-col items-center">
          <img className="w-1/2" src={"/public/imgs/Logo2.png"} alt="logo" />
          <h5 className="my-6 font-semibold text-3xl">
            Fresh Air Design Software
          </h5>
        </div>
        <p className="text-gray-6 00">
          Fresh Air Design Software is a tool for design and simulation AHU
          systems.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <TextField
            value={user.name || ""}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, name: e.target.value }))
            }
            margin="dense"
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
            margin="dense"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="new-password"
          />

          <Button
            sx={{
              mt: 2,
            }}
            color="primary"
            type="submit"
            variant="contained"
            fullWidth
            size="large"
          >
            Sign In
          </Button>
        </form>
        <h1 className="text-center text-xl">Version 1.0</h1>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default Login;
