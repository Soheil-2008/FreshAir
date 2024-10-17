import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SettingsIcon from "@mui/icons-material/Settings";

import { useEffect, useState } from "react";
import { UseGlobalState } from "./States/GlobalState";
import axios, { isAxiosError } from "axios";
import Swal from "sweetalert2";

type Units = {
  Length: string;
  Temperature: string;
  Weight: string;
  WaterFlowRate: string;
  FinsPerLength: string;
  Capacity: string;
  WaterPressureDrop: string;
  StaticPressure: string;
  CoilHumidity: string;
  AirFlowRate: string;
  WaterVolumeAcrossCoil: string;
  CoilHeaderAndConnection: string;
  RefrigerantMassFlow: string;
  AirVelocity: string;
  NominalPower: string;
  Diameter: string;
  BeltSpeed: string;
  HumidifierLoad: string;
  CircuitLength: string;
  Altitude: string;
  Torque: string;
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { globalState, setGlobalState } = UseGlobalState();
  const [openUnitsDialog, setOpenSettingDialog] = useState<boolean>(false);
  const [page, setPage] = useState<string>("");

  const [newUnits, setNewUnits] = useState<Units>({
    Length: globalState.user.units.Length,
    Temperature: globalState.user.units.Temperature,
    Weight: globalState.user.units.Weight,
    WaterFlowRate: globalState.user.units.WaterFlowRate,
    FinsPerLength: globalState.user.units.FinsPerLength,
    Capacity: globalState.user.units.Capacity,
    WaterPressureDrop: globalState.user.units.WaterPressureDrop,
    StaticPressure: globalState.user.units.StaticPressure,
    CoilHumidity: globalState.user.units.CoilHumidity,
    AirFlowRate: globalState.user.units.AirFlowRate,
    WaterVolumeAcrossCoil: globalState.user.units.WaterVolumeAcrossCoil,
    CoilHeaderAndConnection: globalState.user.units.CoilHeaderAndConnection,
    RefrigerantMassFlow: globalState.user.units.RefrigerantMassFlow,
    AirVelocity: globalState.user.units.AirVelocity,
    NominalPower: globalState.user.units.NominalPower,
    Diameter: globalState.user.units.Diameter,
    BeltSpeed: globalState.user.units.BeltSpeed,
    HumidifierLoad: globalState.user.units.HumidifierLoad,
    CircuitLength: globalState.user.units.CircuitLength,
    Altitude: globalState.user.units.Altitude,
    Torque: globalState.user.units.Torque,
  });

  useEffect(() => {
    if (
      location.pathname === "/user/dashboard" ||
      location.pathname === "/user/project"
    ) {
      setPage("dashboard");
    } else {
      setPage("not dashboard");
    }
  }, [location.pathname]);

  const resetUser = () => {
    setGlobalState((prev) => ({
      ...prev,
      user: {
        id: 0,
        name: "",
        token: "",
        permission: "",
        units: {
          Length: "",
          Temperature: "",
          Weight: "",
          WaterFlowRate: "",
          FinsPerLength: "",
          Capacity: "",
          WaterPressureDrop: "",
          StaticPressure: "",
          CoilHumidity: "",
          AirFlowRate: "",
          WaterVolumeAcrossCoil: "",
          CoilHeaderAndConnection: "",
          RefrigerantMassFlow: "",
          AirVelocity: "",
          NominalPower: "",
          Diameter: "",
          BeltSpeed: "",
          HumidifierLoad: "",
          CircuitLength: "",
          Altitude: "",
          Torque: "",
        },
      },
    }));
  };

  const handleUpdateUnits = async () => {
    try {
      console.log(newUnits);
      const response = await axios.put(
        `${globalState.server}/api/projects/editUnits/${globalState.user.id}`,
        {
          UnitsJSON: JSON.stringify(newUnits),
        }
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Units updated successfully",
          confirmButtonText: "Ok",
        });

        const oldGlobalState = globalState;
        const newGlobalState = {
          ...oldGlobalState,
          user: {
            ...oldGlobalState.user,
            units: {
              ...oldGlobalState.user.units,
              ...newUnits,
            },
          },
        };
        sessionStorage.setItem("user", JSON.stringify(newGlobalState.user));
        setGlobalState(newGlobalState);
        setOpenSettingDialog(false);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 401) {
          resetUser();
          navigate("/");
        } else if (error.response?.data.message) {
          Swal.fire({
            icon: "error",
            title: error.response?.data.message,
            text: error.response?.data.error,
            confirmButtonText: "Ok",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong",
            text: error.message,
          });
        }
      }
    } finally {
      setOpenSettingDialog(false);
    }
  };

  const handleChangeUnit = (e: SelectChangeEvent<string>) => {
    setNewUnits({ ...newUnits, [e.target.name]: e.target.value });
  };

  return (
    <nav className="bg-[#FBFEF8] h-[70px] p-2 flex justify-between items-center border shadow-inner shadow-gray-300">
      <div className=" w-[100px]">
        <img src={"/public/imgs/Logo2.png"} alt="logo" />
      </div>

      <div className="flex items-center gap-x-4">
        <Button
          variant={"outlined"}
          size="small"
          startIcon={<SettingsIcon />}
          onClick={() => {
            setOpenSettingDialog(true);
          }}
        >
          Units Setting
        </Button>

        <Button
          color={"error"}
          variant={"outlined"}
          size="small"
          endIcon={<LogoutOutlined />}
          onClick={() => {
            Swal.fire({
              icon: "warning",
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              showCancelButton: true,
              confirmButtonText: "Yes, Logout!",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/");
                window.location.reload();
              }
            });
          }}
        >
          Logout
        </Button>
      </div>

      <Dialog
        fullWidth
        maxWidth={"lg"}
        open={openUnitsDialog}
        onClose={() => setOpenSettingDialog(false)}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleUpdateUnits();
          },
        }}
      >
        <DialogTitle>
          <h6 className="text-center text-2xl border-b-2 pb-2 border-sky-700 text-sky-700 font-semibold">
            Update Software Units
          </h6>
        </DialogTitle>

        <DialogContent>
          <div className="flex flex-wrap mt-2 gap-y-5">
            {/*//! Length */}
            <div className="w-1/4 px-1">
              <FormControl
                fullWidth
                size="small"
                variant="outlined"
                disabled={page === "not dashboard"}
              >
                <InputLabel id="Length">Length</InputLabel>
                <Select
                  label="Length"
                  labelId="Length"
                  name="Length"
                  value={newUnits.Length}
                  onChange={handleChangeUnit}
                >
                  <MenuItem value={"in"}>in</MenuItem>
                  <MenuItem value={"m"}>m</MenuItem>
                  <MenuItem value={"mm"}>mm</MenuItem>
                  <MenuItem value={"ft"}>ft</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/*//! Temperature */}
            <div className="w-1/4 px-1">
              <FormControl
                fullWidth
                size="small"
                variant="outlined"
                disabled={page === "not dashboard"}
              >
                <InputLabel id="Temperature">Temperature</InputLabel>
                <Select
                  label="Temperature"
                  labelId="Temperature"
                  name="Temperature"
                  value={newUnits.Temperature}
                  onChange={handleChangeUnit}
                >
                  <MenuItem value={"C"}>°C</MenuItem>
                  <MenuItem value={"F"}>°F</MenuItem>
                  <MenuItem value={"K"}>K</MenuItem>
                  <MenuItem value={"R"}>°R</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/*//! Weight */}
            <div className="w-1/4 px-1">
              <FormControl
                fullWidth
                size="small"
                variant="outlined"
                disabled={page === "not dashboard"}
              >
                <InputLabel id="Weight">Weight</InputLabel>
                <Select
                  label="Weight"
                  labelId="Weight"
                  name="Weight"
                  value={newUnits.Weight}
                  onChange={handleChangeUnit}
                >
                  <MenuItem value={"lb"}>lb</MenuItem>
                  <MenuItem value={"kg"}>kg</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/*//! Water Flow Rate */}
            <div className="w-1/4 px-1">
              <FormControl
                fullWidth
                size="small"
                variant="outlined"
                disabled={page === "not dashboard"}
              >
                <InputLabel id="WaterFlowRate">Water Flow Rate</InputLabel>
                <Select
                  label="Water Flow Rate"
                  labelId="WaterFlowRate"
                  name="WaterFlowRate"
                  value={newUnits.WaterFlowRate}
                  onChange={handleChangeUnit}
                >
                  <MenuItem value={"GPM"}>GPM</MenuItem>
                  <MenuItem value={"m3/hr"}>
                    m<sup>3</sup>/hr
                  </MenuItem>
                  <MenuItem value={"m3/s"}>
                    m<sup>3</sup>/s
                  </MenuItem>
                  <MenuItem value={"l/s"}>l/s</MenuItem>
                  <MenuItem value={"l/h"}>l/h</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/*//! Fins Per Length */}
            <div className="w-1/4 px-1">
              <FormControl
                fullWidth
                size="small"
                variant="outlined"
                disabled={page === "not dashboard"}
              >
                <InputLabel id="FinsPerLength">Fins Per Length</InputLabel>
                <Select
                  label="Fins Per Length"
                  labelId="FinsPerLength"
                  name="FinsPerLength"
                  value={newUnits.FinsPerLength}
                  onChange={handleChangeUnit}
                >
                  <MenuItem value={"fins/m"}>fins/m</MenuItem>
                  <MenuItem value={"fins/inch"}>fins/inch</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/*//! Capacity & Sensible */}
            <div className="w-1/4 px-1">
              <FormControl
                fullWidth
                size="small"
                variant="outlined"
                disabled={page === "not dashboard"}
              >
                <InputLabel id="Capacity">Capacity & Sensible</InputLabel>
                <Select
                  label="Capacity & Sensible"
                  labelId="Capacity"
                  name="Capacity"
                  value={newUnits.Capacity}
                  onChange={handleChangeUnit}
                >
                  <MenuItem value={"kW"}>kW</MenuItem>
                  <MenuItem value={"W"}>W</MenuItem>
                  <MenuItem value={"BTU/hr"}>BTU/hr</MenuItem>
                  <MenuItem value={"KBTU/hr"}>KBTU/hr</MenuItem>
                  <MenuItem value={"TR"}>TR</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/*//! Water Pressure Drop */}
            <div className="w-1/4 px-1">
              <FormControl
                fullWidth
                size="small"
                variant="outlined"
                disabled={page === "not dashboard"}
              >
                <InputLabel id="WaterPressureDrop">
                  Water Pressure Drop
                </InputLabel>
                <Select
                  label="Water Pressure Drop"
                  labelId="WaterPressureDrop"
                  name="WaterPressureDrop"
                  value={newUnits.WaterPressureDrop}
                  onChange={handleChangeUnit}
                >
                  <MenuItem value={"Pa"}>Pa</MenuItem>
                  <MenuItem value={"kPa"}>kPa</MenuItem>
                  <MenuItem value={"psi"}>psi</MenuItem>
                  <MenuItem value={"ft H2O"}>
                    ft H<sub>2</sub>O
                  </MenuItem>
                  <MenuItem value={"in H2O"}>
                    in H<sub>2</sub>O
                  </MenuItem>
                </Select>
              </FormControl>
            </div>

            {/*//! Static Pressure */}
            <div className="w-1/4 px-1">
              <FormControl
                fullWidth
                size="small"
                variant="outlined"
                disabled={page === "not dashboard"}
              >
                <InputLabel id="StaticPressure">Static Pressure</InputLabel>
                <Select
                  label="Static Pressure"
                  labelId="StaticPressure"
                  name="StaticPressure"
                  value={newUnits.StaticPressure}
                  onChange={handleChangeUnit}
                >
                  <MenuItem value={"Pa"}>Pa</MenuItem>
                  <MenuItem value={"inH2O"}>
                    in H<sub>2</sub>O
                  </MenuItem>
                </Select>
              </FormControl>
            </div>

            {/*//! Coil Humidity */}
            <div className="w-1/4 px-1">
              <FormControl
                fullWidth
                size="small"
                variant="outlined"
                disabled={page === "not dashboard"}
              >
                <InputLabel id="CoilHumidity">Coil Humidity</InputLabel>
                <Select
                  label="Coil Humidity"
                  labelId="CoilHumidity"
                  name="CoilHumidity"
                  value={newUnits.CoilHumidity}
                  onChange={handleChangeUnit}
                >
                  <MenuItem value={"g/kg"}>g/kg</MenuItem>
                  <MenuItem value={"g/lb"}>g/lb</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/*//! Air Flow Rate */}
            <div className="w-1/4 px-1">
              <FormControl
                fullWidth
                size="small"
                variant="outlined"
                disabled={page === "not dashboard"}
              >
                <InputLabel id="AirFlowRate">Air Flow Rate</InputLabel>
                <Select
                  label="Air Flow Rate"
                  labelId="AirFlowRate"
                  name="AirFlowRate"
                  value={newUnits.AirFlowRate}
                  onChange={handleChangeUnit}
                >
                  <MenuItem value={"m3/hr"}>
                    m<sup>3</sup>/hr
                  </MenuItem>
                  <MenuItem value={"m3/s"}>
                    m<sup>3</sup>/s
                  </MenuItem>
                  <MenuItem value={"CFM"}>CFM</MenuItem>
                  <MenuItem value={"l/s"}>l/s</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/*//! Water Volume Across Coil */}
            <div className="w-1/4 px-1">
              <FormControl
                fullWidth
                size="small"
                variant="outlined"
                disabled={page === "not dashboard"}
              >
                <InputLabel id="WaterVolumeAcrossCoil">
                  Water Volume Across Coil
                </InputLabel>
                <Select
                  label="Water Volume Across Coil"
                  labelId="WaterVolumeAcrossCoil"
                  name="WaterVolumeAcrossCoil"
                  value={newUnits.WaterVolumeAcrossCoil}
                  onChange={handleChangeUnit}
                >
                  <MenuItem value={"liter"}>liter</MenuItem>
                  <MenuItem value={"gal"}>gal</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/*//! Coil Header And Connection */}
            <div className="w-1/4 px-1">
              <FormControl
                fullWidth
                size="small"
                variant="outlined"
                disabled={page === "not dashboard"}
              >
                <InputLabel id="CoilHeaderAndConnection">
                  Coil Header And Connection
                </InputLabel>
                <Select
                  label="Coil Header And Connection"
                  labelId="CoilHeaderAndConnection"
                  name="CoilHeaderAndConnection"
                  value={newUnits.CoilHeaderAndConnection}
                  onChange={handleChangeUnit}
                >
                  <MenuItem value={"in"}>in</MenuItem>
                  <MenuItem value={"mm"}>mm</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/*//! Refrigerant Mass Flow */}
            <div className="w-1/4 px-1">
              <FormControl
                fullWidth
                size="small"
                variant="outlined"
                disabled={page === "not dashboard"}
              >
                <InputLabel id="RefrigerantMassFlow">
                  Refrigerant Mass Flow
                </InputLabel>
                <Select
                  label="Refrigerant Mass Flow"
                  labelId="RefrigerantMassFlow"
                  name="RefrigerantMassFlow"
                  value={newUnits.RefrigerantMassFlow}
                  onChange={handleChangeUnit}
                >
                  <MenuItem value={"kg/hr"}>kg/hr</MenuItem>
                  <MenuItem value={"lb/hr"}>lb/hr</MenuItem>
                  <MenuItem value={"kg/s"}>kg/s</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/*//! Air Velocity */}
            <div className="w-1/4 px-1">
              <FormControl
                fullWidth
                size="small"
                variant="outlined"
                disabled={page === "not dashboard"}
              >
                <InputLabel id="AirVelocity">Air Velocity</InputLabel>
                <Select
                  label="Air Velocity"
                  labelId="AirVelocity"
                  name="AirVelocity"
                  value={newUnits.AirVelocity}
                  onChange={handleChangeUnit}
                >
                  <MenuItem value={"m/s"}>m/s</MenuItem>
                  <MenuItem value={"ft/min"}>ft/min</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/*//! Nominal Power */}
            <div className="w-1/4 px-1">
              <FormControl
                fullWidth
                size="small"
                variant="outlined"
                disabled={page === "not dashboard"}
              >
                <InputLabel id="NominalPower">Nominal Power</InputLabel>
                <Select
                  label="Nominal Power"
                  labelId="NominalPower"
                  name="NominalPower"
                  value={newUnits.NominalPower}
                  onChange={handleChangeUnit}
                >
                  <MenuItem value={"kW"}>kW</MenuItem>
                  <MenuItem value={"W"}>W</MenuItem>
                  <MenuItem value={"hp"}>hp</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/*//! Diameter */}
            <div className="w-1/4 px-1">
              <FormControl
                fullWidth
                size="small"
                variant="outlined"
                disabled={page === "not dashboard"}
              >
                <InputLabel id="Diameter">Diameter</InputLabel>
                <Select
                  label="Diameter"
                  labelId="Diameter"
                  name="Diameter"
                  value={newUnits.Diameter}
                  onChange={handleChangeUnit}
                >
                  <MenuItem value={"in"}>in</MenuItem>
                  <MenuItem value={"mm"}>mm</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/*//! Shaft Diameter */}
            {/* <div className="w-1/4 px-1">
              <FormControl
                fullWidth
                size="small"
                variant="outlined"
                disabled={page === "not dashboard"}
              >
                <InputLabel id="ShaftDiameter">Shaft Diameter</InputLabel>
                <Select
                  label="Shaft Diameter"
                  labelId="ShaftDiameter"
                  name="ShaftDiameter"
                  value={newUnits.ShaftDiameter}
                  onChange={handleChangeUnit}
                >
                  <MenuItem value={"in"}>in</MenuItem>
                  <MenuItem value={"mm"}>mm</MenuItem>
                </Select>
              </FormControl>
            </div> */}

            {/*//! Nicotra Centre dist */}
            {/* <div className="w-1/4 px-1">
              <FormControl
                fullWidth
                size="small"
                variant="outlined"
                disabled={page === "not dashboard"}
              >
                <InputLabel id="NicotraCentredist">
                  Nicotra Centre dist.
                </InputLabel>
                <Select
                  label="Nicotra Centre dist"
                  labelId="NicotraCentredist"
                  name="NicotraCentredist"
                  value={newUnits.NicotraCentredist}
                  onChange={handleChangeUnit}
                >
                  <MenuItem value={"in"}>in</MenuItem>
                  <MenuItem value={"mm"}>mm</MenuItem>
                </Select>
              </FormControl>
            </div> */}

            {/*//! Belt Speed */}
            <div className="w-1/4 px-1">
              <FormControl
                fullWidth
                size="small"
                variant="outlined"
                disabled={page === "not dashboard"}
              >
                <InputLabel id="BeltSpeed">Belt Speed</InputLabel>
                <Select
                  label="Belt Speed"
                  labelId="BeltSpeed"
                  name="BeltSpeed"
                  value={newUnits.BeltSpeed}
                  onChange={handleChangeUnit}
                >
                  <MenuItem value={"m/s"}>m/s</MenuItem>
                  <MenuItem value={"ft/min"}>ft/min</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/*//! Humidifier Load */}
            <div className="w-1/4 px-1">
              <FormControl
                fullWidth
                size="small"
                variant="outlined"
                disabled={page === "not dashboard"}
              >
                <InputLabel id="HumidifierLoad">Humidifier Load</InputLabel>
                <Select
                  label="Humidifier Load"
                  labelId="HumidifierLoad"
                  name="HumidifierLoad"
                  value={newUnits.HumidifierLoad}
                  onChange={handleChangeUnit}
                >
                  <MenuItem value={"kg/hr"}>kg/hr</MenuItem>
                  <MenuItem value={"lb/hr"}>lb/hr</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/*//! Circuit Length */}
            <div className="w-1/4 px-1">
              <FormControl
                fullWidth
                size="small"
                variant="outlined"
                disabled={page === "not dashboard"}
              >
                <InputLabel id="CircuitLength">Circuit Length</InputLabel>
                <Select
                  label="Circuit Length"
                  labelId="CircuitLength"
                  name="CircuitLength"
                  value={newUnits.CircuitLength}
                  onChange={handleChangeUnit}
                >
                  <MenuItem value={"in"}>in</MenuItem>
                  <MenuItem value={"m"}>m</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/*//! Altitude */}
            <div className="w-1/4 px-1">
              <FormControl
                fullWidth
                size="small"
                variant="outlined"
                disabled={page === "not dashboard"}
              >
                <InputLabel id="Altitude">Altitude</InputLabel>
                <Select
                  label="Altitude"
                  labelId="Altitude"
                  name="Altitude"
                  value={newUnits.Altitude}
                  onChange={handleChangeUnit}
                >
                  <MenuItem value={"m"}>m</MenuItem>
                  <MenuItem value={"ft"}>ft</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/*//! Torque */}
            <div className="w-1/4 px-1">
              <FormControl
                fullWidth
                size="small"
                variant="outlined"
                disabled={page === "not dashboard"}
              >
                <InputLabel id="Torque">Torque</InputLabel>
                <Select
                  label="Torque"
                  labelId="Torque"
                  name="Torque"
                  value={newUnits.Torque}
                  onChange={handleChangeUnit}
                >
                  <MenuItem value={"Nm"}>Nm</MenuItem>
                  <MenuItem value={"in-lb"}>in-lb</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          {page === "not dashboard" && (
            <div className="w-1/5 mt-5 flex flex-col gap-2">
              <span className="text-red-500 text-nowrap font-medium">
                If you want to update units, please save your work and return to
                dashboard
              </span>
              <Button
                size="medium"
                variant="outlined"
                className="w-full"
                onClick={() => {
                  navigate("/user/dashboard");
                  setOpenSettingDialog(false);
                }}
              >
                Save & Go to dashboard
              </Button>
            </div>
          )}
        </DialogContent>

        <DialogActions>
          <div className="flex justify-center w-full px-4 pb-5 gap-5">
            <Button
              startIcon={<CloseIcon />}
              size="medium"
              variant="outlined"
              color="error"
              onClick={() => {
                setOpenSettingDialog(false);
              }}
            >
              Cancel
            </Button>
            <Button
              startIcon={<RestartAltIcon />}
              size="medium"
              variant="outlined"
              disabled={page === "not dashboard"}
              color="warning"
            >
              Reset to defaults
            </Button>

            <Button
              startIcon={<SaveIcon />}
              type="submit"
              size="medium"
              variant="outlined"
              color="success"
              disabled={page === "not dashboard"}
            >
              Save
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </nav>
  );
};
export default Navbar;
