import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Breadcrumbs,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  LinearProgress,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { UseGeneralDataState } from "../../Components/States/GeneralDataState";
import { UseGlobalState } from "../../Components/States/GlobalState";

// @ts-expect-error Not Found
import AHUSimulationVideo from "../../imgs/AHU_Simulation.mp4";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ReplayIcon from "@mui/icons-material/Replay";
import SettingsIcon from "@mui/icons-material/Settings";
import ClearIcon from "@mui/icons-material/Clear";
import ReorderIcon from "@mui/icons-material/Reorder";

import Drawing from "./Drawing/Drawing";
import { UseDesignState } from "../../Components/States/DesignState";
import ManageSections from "./Drawing/Dialogs/Design/ManageSections";

interface DialogOptions {
  open: boolean;
  type: string;
}

const Home = () => {
  const navigate = useNavigate();

  const { generalData, setGeneralData } = UseGeneralDataState();
  const { designState, setDesignState } = UseDesignState();
  const { globalState } = UseGlobalState();

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);
  const [dialogOptions, setDialogOptions] = useState<DialogOptions>({
    open: false,
    type: "",
  });

  const [expanded, setExpanded] = useState<string>("");

  const [tab, setTab] = useState("1");

  useEffect(() => {
    if (
      !globalState.openedTag.name ||
      !globalState.openedProject.Name
      // || globalState.sections.length <= 1
    ) {
      navigate("/user/project");
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    const getData = () => {
      getGeneralDataOptions();
    };
    getData();
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const getGeneralDataOptions = async () => {
    // Fetch data from server
    // setGeneralData(response.data);

    // setTimeout(() => {
    setIsDataFetched(true);
    // }, 1000);
  };

  return isDataFetched ? (
    <main className="design container bg-[#eff2eb] flex flex-col px-5">
      <div className="flex justify-between items-center mt-3 pb-4">
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          className="absolute left-1/2 -translate-x-1/2"
        >
          <Link
            color="inherit"
            to={"/user/dashboard"}
            className="hover:underline font-semibold"
          >
            Dashboard
          </Link>

          <Link
            color="inherit"
            to={"/user/project"}
            className="hover:underline font-semibold"
          >
            Project
          </Link>

          <Link
            color="inherit"
            to={""}
            className="text-sky-700 hover:underline font-semibold"
          >
            Design
          </Link>
        </Breadcrumbs>
        <div className="flex gap-10">
          <h4 className="text-base">
            Project : {globalState.openedProject.Name}
          </h4>
          <h4 className="text-base">Tag : {globalState.openedTag.name}</h4>
        </div>
      </div>

      <div className="flex h-full overflow-hidden bg-white border border-slate-300">
        <div className="w-[29%] border-r border-slate-300 overflow-auto">
          <TabContext value={tab}>
            <Box className="border-b border-slate-300 shadow-md">
              <TabList
                variant="scrollable"
                onChange={(_e: React.SyntheticEvent, newValue: string) =>
                  setTab(newValue)
                }
              >
                <Tab label="AHU" value="1" />
                <Tab label="Cabinet" value="2" />
                <Tab label="Component" value="3" />
                <Tab label="Accessories" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div className="flex flex-col gap-0 pt-2">
                <Accordion
                  expanded={expanded === "panel1"}
                  onChange={() => {
                    if (expanded === "panel1") setExpanded("");
                    else setExpanded("panel1");
                  }}
                >
                  <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                    <h6 className="font-medium text-base text-[#353C8B]">
                      Performance
                    </h6>
                  </AccordionSummary>
                  <AccordionDetails className="bg-white border-t border-gray-600">
                    {/*//! Air Flow */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="w-1/2">
                        <span className="text-xs font-medium">Air Flow</span>
                      </div>
                      <div className="w-1/2">
                        <TextField
                          fullWidth
                          variant="standard"
                          value={generalData.airFlow}
                          type="number"
                          onChange={(e) =>
                            setGeneralData((prev) => ({
                              ...prev,
                              airFlow: parseFloat(e.target.value),
                            }))
                          }
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                m<sup>3</sup>/hr
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>
                    </div>

                    {/*//! External Static Pressure */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="w-1/2">
                        <span className="text-xs font-medium">
                          External Static Pressure
                        </span>
                      </div>
                      <div className="w-1/2">
                        <TextField
                          fullWidth
                          variant="standard"
                          value={generalData.staticPressure}
                          type="number"
                          onChange={(e) =>
                            setGeneralData((prev) => ({
                              ...prev,
                              staticPressure: parseFloat(e.target.value),
                            }))
                          }
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                in H<sub>2</sub>o
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>
                    </div>

                    {/*//! Max Coil Face Velocity */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="w-1/2">
                        <span className="text-xs font-medium">
                          Max Coil Face Velocity
                        </span>
                      </div>
                      <div className="w-1/2">
                        <TextField
                          fullWidth
                          variant="standard"
                          value={generalData.coilFaceVelocity}
                          type="number"
                          onChange={(e) =>
                            setGeneralData((prev) => ({
                              ...prev,
                              coilFaceVelocity: parseFloat(e.target.value),
                            }))
                          }
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                m/s
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>
                    </div>

                    {/*//! Altitude */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="w-1/2">
                        <span className="text-xs font-medium">Altitude</span>
                      </div>
                      <div className="w-1/2">
                        <TextField
                          fullWidth
                          variant="standard"
                          value={generalData.altitude}
                          type="number"
                          onChange={(e) =>
                            setGeneralData((prev) => ({
                              ...prev,
                              altitude:
                                parseFloat(e.target.value) > 0
                                  ? parseFloat(e.target.value)
                                  : 0,
                            }))
                          }
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">m</InputAdornment>
                            ),
                          }}
                        />
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>

                <Accordion
                  expanded={expanded === "panel2"}
                  onChange={() => {
                    if (expanded === "panel2") setExpanded("");
                    else setExpanded("panel2");
                  }}
                >
                  <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                    <h6 className="font-medium text-base text-[#353C8B]">
                      Tunnel
                    </h6>
                  </AccordionSummary>
                  <AccordionDetails className="bg-white border-t border-gray-600">
                    {/*//! Sides */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="w-1/2">
                        <span className="text-xs font-medium">Sides</span>
                      </div>
                      <div className="w-1/2">
                        <Autocomplete
                          value={generalData.sides}
                          onChange={(_, newValue) =>
                            setGeneralData((prev) => ({
                              ...prev,
                              sides: newValue ? newValue : "",
                            }))
                          }
                          options={generalData.SidesOptions}
                          renderInput={(params) => (
                            <TextField {...params} variant="standard" />
                          )}
                        />
                      </div>
                    </div>

                    {/*//! Insulation Type */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="w-1/2">
                        <span className="text-xs font-medium">
                          Insulation Type
                        </span>
                      </div>
                      <div className="w-1/2">
                        <Autocomplete
                          value={generalData.insulationType}
                          onChange={(_, newValue) =>
                            setGeneralData((prev) => ({
                              ...prev,
                              insulationType: newValue ? newValue : "",
                            }))
                          }
                          options={generalData.InsulationTypeOptions}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="standard"
                              sx={{ fontSize: "8px" }}
                            />
                          )}
                        />
                      </div>
                    </div>

                    {/*//! Panels Type */}
                    <div className="flex items-center justify-between">
                      <div className="w-1/2">
                        <span className="text-xs font-medium">Panels Type</span>
                      </div>
                      <div className="w-1/2">
                        <RadioGroup
                          value={generalData.panelsType}
                          onChange={(_, newValue) =>
                            setGeneralData((prev) => ({
                              ...prev,
                              panelsType: newValue,
                            }))
                          }
                        >
                          <div className="flex justify-between">
                            {generalData.PanelsTypeOptions.map((option) => (
                              <FormControlLabel
                                key={option}
                                value={option}
                                control={<Radio size="small" />}
                                label={option}
                              />
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    {/*//! Inner Skin Material */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="w-1/2">
                        <span className="text-xs font-medium">
                          Inner Skin Material
                        </span>
                      </div>
                      <div className="w-1/2">
                        <Autocomplete
                          disabled={generalData.panelsType === "Single"}
                          value={generalData.innerSkinMaterial}
                          onChange={(_, newValue) =>
                            setGeneralData((prev) => ({
                              ...prev,
                              innerSkinMaterial: newValue ? newValue : "",
                            }))
                          }
                          options={generalData.InnerSkinMaterialOptions}
                          renderInput={(params) => (
                            <TextField {...params} variant="standard" />
                          )}
                        />
                      </div>
                    </div>

                    {/*//! Inner Skin Panels Paint Type */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="w-1/2">
                        <span className="text-xs font-medium">
                          Inner Skin Panels Paint Type
                        </span>
                      </div>
                      <div className="w-1/2">
                        <Autocomplete
                          disabled={generalData.panelsType === "Single"}
                          value={generalData.innerPanelsPaintType}
                          onChange={(_, newValue) =>
                            setGeneralData((prev) => ({
                              ...prev,
                              innerPanelsPaintType: newValue ? newValue : "",
                            }))
                          }
                          options={generalData.InnerPanelsPaintTypeOptions}
                          renderInput={(params) => (
                            <TextField {...params} variant="standard" />
                          )}
                        />
                      </div>
                    </div>

                    {/*//! Inner Skin Panels Paint Color */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="w-1/2">
                        <span className="text-xs font-medium">
                          Inner Skin Panels Paint Color
                        </span>
                      </div>
                      <div className="w-1/2">
                        <Autocomplete
                          disabled={
                            generalData.panelsType === "Single" ||
                            generalData.innerPanelsPaintType === "Not Painted"
                          }
                          value={generalData.innerPanelsPaintColor}
                          onChange={(_, newValue) =>
                            setGeneralData((prev) => ({
                              ...prev,
                              innerPanelsPaintColor: newValue ? newValue : "",
                            }))
                          }
                          options={generalData.InnerPanelsPaintColorOptions}
                          renderInput={(params) => (
                            <TextField {...params} variant="standard" />
                          )}
                        />
                      </div>
                    </div>

                    {/*//! Outer Skin Material */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="w-1/2">
                        <span className="text-xs font-medium">
                          Outer Skin Material
                        </span>
                      </div>
                      <div className="w-1/2">
                        <Autocomplete
                          value={generalData.outerSkinMaterial}
                          onChange={(_, newValue) =>
                            setGeneralData((prev) => ({
                              ...prev,
                              outerSkinMaterial: newValue ? newValue : "",
                            }))
                          }
                          options={generalData.OuterSkinMaterialOptions}
                          renderInput={(params) => (
                            <TextField {...params} variant="standard" />
                          )}
                        />
                      </div>
                    </div>

                    {/*//! Outer Skin Panels Paint Type */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="w-1/2">
                        <span className="text-xs font-medium">
                          Outer Skin Panels Paint Type
                        </span>
                      </div>
                      <div className="w-1/2">
                        <Autocomplete
                          value={generalData.outerPanelsPaintType}
                          onChange={(_, newValue) =>
                            setGeneralData((prev) => ({
                              ...prev,
                              outerPanelsPaintType: newValue ? newValue : "",
                            }))
                          }
                          options={generalData.OuterPanelsPaintTypeOptions}
                          renderInput={(params) => (
                            <TextField {...params} variant="standard" />
                          )}
                        />
                      </div>
                    </div>

                    {/*//! Outer Skin Panels Paint Color */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="w-1/2">
                        <span className="text-xs font-medium">
                          Outer Skin Panels Paint Color
                        </span>
                      </div>
                      <div className="w-1/2">
                        <Autocomplete
                          disabled={
                            generalData.outerPanelsPaintType === "Not Painted"
                          }
                          value={generalData.outerPanelsPaintColor}
                          onChange={(_, newValue) =>
                            setGeneralData((prev) => ({
                              ...prev,
                              outerPanelsPaintColor: newValue ? newValue : "",
                            }))
                          }
                          options={generalData.OuterPanelsPaintColorOptions}
                          renderInput={(params) => (
                            <TextField {...params} variant="standard" />
                          )}
                        />
                      </div>
                    </div>

                    {/*//! Screws */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="w-1/2">
                        <span className="text-xs font-medium">Screws</span>
                      </div>
                      <div className="w-1/2">
                        <Autocomplete
                          value={generalData.screws}
                          onChange={(_, newValue) =>
                            setGeneralData((prev) => ({
                              ...prev,
                              screws: newValue ? newValue : "",
                            }))
                          }
                          options={generalData.ScrewsOptions}
                          renderInput={(params) => (
                            <TextField {...params} variant="standard" />
                          )}
                        />
                      </div>
                    </div>

                    {/*//! Vibration Isolators */}
                    <div className="flex items-center justify-between">
                      <div className="w-1/2">
                        <span className="text-xs font-medium">
                          Vibration Isolators
                        </span>
                      </div>
                      <div className="w-1/2">
                        <RadioGroup
                          value={generalData.vibrationIsolators}
                          onChange={(_, newValue) =>
                            setGeneralData((prev) => ({
                              ...prev,
                              vibrationIsolators: newValue,
                            }))
                          }
                        >
                          <div className="flex justify-between">
                            {generalData.VibrationIsolatorsOptions.map(
                              (option) => (
                                <FormControlLabel
                                  key={option}
                                  value={option}
                                  control={<Radio size="small" />}
                                  label={option}
                                />
                              )
                            )}
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>

                <Accordion
                  expanded={expanded === "panel3"}
                  onChange={() => {
                    if (expanded === "panel3") setExpanded("");
                    else setExpanded("panel3");
                  }}
                >
                  <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                    <h6 className="font-medium text-base text-[#353C8B]">
                      Units Specifications
                    </h6>
                  </AccordionSummary>
                  <AccordionDetails className="bg-white border-t border-gray-600">
                    {/*//! Construction */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="w-1/2">
                        <span className="text-xs font-medium">
                          Construction
                        </span>
                      </div>
                      <div className="w-1/2">
                        <Autocomplete
                          value={generalData.construction}
                          onChange={(_, newValue) =>
                            setGeneralData((prev) => ({
                              ...prev,
                              construction: newValue ? newValue : "",
                            }))
                          }
                          options={generalData.ConstructionOptions}
                          renderInput={(params) => (
                            <TextField {...params} variant="standard" />
                          )}
                        />
                      </div>
                    </div>

                    {/*//! AHU Deck */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="w-1/2">
                        <span className="text-xs font-medium">AHU Deck</span>
                      </div>
                      <div className="w-1/2">
                        <Autocomplete
                          value={generalData.AHUDeck}
                          onChange={(_, newValue) =>
                            setGeneralData((prev) => ({
                              ...prev,
                              AHUDeck: newValue ? newValue : "",
                            }))
                          }
                          options={generalData.AHUDeckOptions}
                          renderOption={(props, option) => {
                            const { key, ...optionProps } = props;
                            if (option === "Single Deck Left To Right") {
                              return (
                                <li key={key} {...optionProps}>
                                  {option}{" "}
                                  <ArrowForwardIcon
                                    fontSize="small"
                                    className="ml-2 generalData-AHUDeck1"
                                  />
                                </li>
                              );
                            } else if (option === "Single Deck Right To Left") {
                              return (
                                <li key={key} {...optionProps}>
                                  {option}{" "}
                                  <ArrowBackIcon
                                    fontSize="small"
                                    className="ml-2 generalData-AHUDeck2"
                                  />
                                </li>
                              );
                            } else if (option === "Double Deck 1LR - 2RL") {
                              return (
                                <li key={key} {...optionProps}>
                                  {option}{" "}
                                  <div className="flex flex-col">
                                    <ArrowBackIcon
                                      fontSize="small"
                                      className="ml-2 generalData-AHUDeck2 text-red-600"
                                    />
                                    <ArrowForwardIcon
                                      fontSize="small"
                                      className="ml-2 generalData-AHUDeck1"
                                    />
                                  </div>
                                </li>
                              );
                            } else if (option === "Double Deck 1RL - 2LR") {
                              return (
                                <li key={key} {...optionProps}>
                                  {option}{" "}
                                  <div className="flex flex-col">
                                    <ArrowForwardIcon
                                      fontSize="small"
                                      className="ml-2 generalData-AHUDeck1 text-red-600"
                                    />

                                    <ArrowBackIcon
                                      fontSize="small"
                                      className="ml-2 generalData-AHUDeck2"
                                    />
                                  </div>
                                </li>
                              );
                            } else if (option === "Double Deck 1RL - 2RL") {
                              return (
                                <li key={key} {...optionProps}>
                                  {option}{" "}
                                  <div className="flex flex-col">
                                    <ArrowBackIcon
                                      fontSize="small"
                                      className="ml-2 generalData-AHUDeck2 text-red-600"
                                    />

                                    <ArrowBackIcon
                                      fontSize="small"
                                      className="ml-2 generalData-AHUDeck2"
                                    />
                                  </div>
                                </li>
                              );
                            } else if (option === "Double Deck 1LR - 2LR") {
                              return (
                                <li key={key} {...optionProps}>
                                  {option}{" "}
                                  <div className="flex flex-col">
                                    <ArrowForwardIcon
                                      fontSize="small"
                                      className="ml-2 generalData-AHUDeck1 text-red-600"
                                    />
                                    <ArrowForwardIcon
                                      fontSize="small"
                                      className="ml-2 generalData-AHUDeck1"
                                    />
                                  </div>
                                </li>
                              );
                            } else if (
                              option === "Double Deck One Fan (In First Deck)"
                            ) {
                              return (
                                <li key={key} {...optionProps}>
                                  {option} <div className="flex flex-col"></div>
                                  <ReplayIcon
                                    fontSize="small"
                                    className="ml-2 generalData-AHUDeck3"
                                  />
                                </li>
                              );
                            } else if (
                              option === "Double Deck One Fan (In Second Deck)"
                            ) {
                              return (
                                <li key={key} {...optionProps}>
                                  {option}{" "}
                                  <div className="flex flex-col">
                                    <ReplayIcon
                                      fontSize="small"
                                      className="ml-2 generalData-AHUDeck4 "
                                    />
                                  </div>
                                </li>
                              );
                            }
                          }}
                          renderInput={(params) => (
                            <TextField {...params} variant="standard" />
                          )}
                        />
                      </div>
                    </div>

                    {/*//! 2ND Height Scaling */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="w-1/2">
                        <span className="text-xs font-medium">
                          2nd Height Scaling
                        </span>
                      </div>
                      <div className="w-1/2">
                        <TextField
                          disabled={generalData.AHUDeck?.split("")[0] == "S"}
                          fullWidth
                          variant="standard"
                          value={generalData.secondHeightScaling}
                          type="number"
                          onChange={(e) =>
                            setGeneralData((prev) => ({
                              ...prev,
                              secondHeightScaling:
                                parseFloat(e.target.value) > 0
                                  ? parseFloat(e.target.value)
                                  : 0,
                            }))
                          }
                        />
                      </div>
                    </div>

                    {/*//! Accessories */}
                    <div className="flex items-center justify-between">
                      <div className="w-1/2">
                        <span className="text-xs font-medium">Accessories</span>
                      </div>
                      <div className="w-1/2">
                        <RadioGroup
                          value={generalData.accessories}
                          onChange={(_, newValue) =>
                            setGeneralData((prev) => ({
                              ...prev,
                              accessories: newValue,
                            }))
                          }
                        >
                          <div className="flex justify-between">
                            {generalData.AccessoriesOptions.map((option) => (
                              <FormControlLabel
                                key={option}
                                value={option}
                                control={<Radio size="small" />}
                                label={option}
                              />
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    {/*//! Accessory Type */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="w-1/2">
                        <span className="text-xs font-medium">
                          Accessory Type
                        </span>
                      </div>
                      <div className="w-1/2">
                        <Autocomplete
                          disabled={generalData.accessories === "In Door"}
                          value={generalData.accessoriesType}
                          onChange={(_, newValue) =>
                            setGeneralData((prev) => ({
                              ...prev,
                              accessoriesType: newValue ? newValue : "",
                            }))
                          }
                          options={generalData.AccessoriesTypeOptions}
                          renderInput={(params) => (
                            <TextField {...params} variant="standard" />
                          )}
                        />
                      </div>
                    </div>

                    {/*//! Frame Material */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="w-1/2">
                        <span className="text-xs font-medium">
                          Frame Material
                        </span>
                      </div>
                      <div className="w-1/2">
                        <Autocomplete
                          value={generalData.frameMaterial}
                          onChange={(_, newValue) =>
                            setGeneralData((prev) => ({
                              ...prev,
                              frameMaterial: newValue ? newValue : "",
                            }))
                          }
                          options={generalData.FrameMaterialOptions}
                          renderInput={(params) => (
                            <TextField {...params} variant="standard" />
                          )}
                        />
                      </div>
                    </div>

                    {/*//! U Channel Common Base */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="w-1/2">
                        <span className="text-xs font-medium">
                          U-Channel Common Base
                        </span>
                      </div>
                      <div className="w-1/2">
                        <Autocomplete
                          value={generalData.UChannelCommonBase}
                          onChange={(_, newValue) =>
                            setGeneralData((prev) => ({
                              ...prev,
                              UChannelCommonBase: newValue ? newValue : "",
                            }))
                          }
                          options={generalData.UChannelCommonBaseOptions}
                          renderInput={(params) => (
                            <TextField {...params} variant="standard" />
                          )}
                        />
                      </div>
                    </div>

                    {/*//! Mounted */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="w-1/2">
                        <span className="text-xs font-medium">Mounted</span>
                      </div>
                      <div className="w-1/2">
                        <Autocomplete
                          value={generalData.mounted}
                          onChange={(_, newValue) =>
                            setGeneralData((prev) => ({
                              ...prev,
                              mounted: newValue ? newValue : "",
                            }))
                          }
                          options={generalData.MountedOptions}
                          renderInput={(params) => (
                            <TextField {...params} variant="standard" />
                          )}
                        />
                      </div>
                    </div>

                    {/*//! Frame Type */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="w-1/2">
                        <span className="text-xs font-medium">Frame Type</span>
                      </div>
                      <div className="w-1/2">
                        <Autocomplete
                          value={generalData.frameType}
                          onChange={(_, newValue) =>
                            setGeneralData((prev) => ({
                              ...prev,
                              frameType: newValue ? newValue : "",
                            }))
                          }
                          options={generalData.FrameTypeOptions}
                          renderInput={(params) => (
                            <TextField {...params} variant="standard" />
                          )}
                        />
                      </div>
                    </div>

                    {/*//! Access Type */}
                    <div className="flex items-center justify-between">
                      <div className="w-1/2">
                        <span className="text-xs font-medium">Access Type</span>
                      </div>
                      <div className="w-1/2">
                        <RadioGroup
                          value={generalData.accessType}
                          onChange={(_, newValue) =>
                            setGeneralData((prev) => ({
                              ...prev,
                              accessType: newValue,
                            }))
                          }
                        >
                          <div className="flex justify-between">
                            {generalData.AccessTypeOptions.map((option) => (
                              <FormControlLabel
                                key={option}
                                value={option}
                                control={<Radio size="small" />}
                                label={option}
                              />
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    {/*//! Door Type */}
                    <div className="flex items-center justify-between">
                      <div className="w-1/2">
                        <span className="text-xs font-medium">Door Type</span>
                      </div>
                      <div className="w-1/2">
                        <RadioGroup
                          value={generalData.doorType}
                          onChange={(_, newValue) =>
                            setGeneralData((prev) => ({
                              ...prev,
                              doorType: newValue,
                            }))
                          }
                        >
                          <div className="flex justify-between">
                            {generalData.DoorTypeOptions.map((option) => (
                              <FormControlLabel
                                disabled={generalData.accessType === "Panel"}
                                key={option}
                                value={option}
                                control={<Radio size="small" />}
                                label={option}
                              />
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    {/*//! Access Location */}
                    <div className="flex items-center justify-between">
                      <div className="w-1/2">
                        <span className="text-xs font-medium">
                          {generalData.accessType} Location (F.R.A.)
                        </span>
                      </div>
                      <div className="w-1/2">
                        <RadioGroup
                          value={generalData.accessLocation}
                          onChange={(_, newValue) =>
                            setGeneralData((prev) => ({
                              ...prev,
                              accessLocation: newValue,
                            }))
                          }
                        >
                          <div className="flex justify-between">
                            {generalData.AccessLocationOptions.map((option) => (
                              <FormControlLabel
                                key={option}
                                value={option}
                                control={<Radio size="small" />}
                                label={option}
                              />
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>

                <Accordion
                  expanded={expanded === "panel4"}
                  onChange={() => {
                    if (expanded === "panel4") setExpanded("");
                    else setExpanded("panel4");
                  }}
                >
                  <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                    <h6 className="font-medium text-base text-[#353C8B]">
                      Configuration
                    </h6>
                  </AccordionSummary>
                  <AccordionDetails className="bg-white border-t border-gray-600">
                    {/*//! Application Type */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="w-1/2">
                        <span className="text-xs font-medium">
                          Application Type
                        </span>
                      </div>
                      <div className="w-1/2">
                        <RadioGroup
                          value={generalData.applicationType}
                          onChange={(_, newValue) =>
                            setGeneralData((prev) => ({
                              ...prev,
                              applicationType: newValue,
                            }))
                          }
                        >
                          <div className="flex justify-between">
                            {generalData.ApplicationTypeOptions.map(
                              (option) => (
                                <FormControlLabel
                                  key={option}
                                  value={option}
                                  control={<Radio size="small" />}
                                  label={option}
                                />
                              )
                            )}
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    {/*//! Show Price & Is Eurovent */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="w-1/2">
                        <FormControlLabel
                          control={
                            <Checkbox
                              size="small"
                              checked={generalData.showPrice}
                              onChange={(e) => {
                                setGeneralData((prev) => ({
                                  ...prev,
                                  showPrice: e.target.checked,
                                }));
                              }}
                            />
                          }
                          label="Show Price"
                        />
                      </div>
                      <div className="w-1/2">
                        <FormControlLabel
                          control={
                            <Checkbox
                              size="small"
                              checked={generalData.isEuroventType}
                              onChange={(e) => {
                                setGeneralData((prev) => ({
                                  ...prev,
                                  isEuroventType: e.target.checked,
                                }));
                              }}
                            />
                          }
                          label="Eurovent Type"
                        />
                      </div>
                    </div>

                    {/*//! Condensing Unit Height Scaling */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="w-1/2">
                        <span className="text-xs font-medium">
                          Condensing Unit Height Scaling
                        </span>
                      </div>
                      <div className="w-1/2">
                        <TextField
                          fullWidth
                          variant="standard"
                          value={generalData.condensingUnitHeightScaling}
                          type="number"
                          onChange={(e) =>
                            setGeneralData((prev) => ({
                              ...prev,
                              condensingUnitHeightScaling:
                                parseFloat(e.target.value) > 0
                                  ? parseFloat(e.target.value)
                                  : 0,
                            }))
                          }
                        />
                      </div>
                    </div>

                    {/*//! Currency */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="w-1/2">
                        <span className="text-xs font-medium">Currency</span>
                      </div>
                      <div className="w-1/2">
                        <Autocomplete
                          value={generalData.currency}
                          onChange={(_, newValue) =>
                            setGeneralData((prev) => ({
                              ...prev,
                              currency: newValue ? newValue : "",
                            }))
                          }
                          options={generalData.CurrencyOptions}
                          renderInput={(params) => (
                            <TextField {...params} variant="standard" />
                          )}
                        />
                      </div>
                    </div>

                    {/*//! Unit QTY */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="w-1/2">
                        <span className="text-xs font-medium">Unit QTY</span>
                      </div>
                      <div className="w-1/2">
                        <TextField
                          fullWidth
                          variant="standard"
                          value={generalData.unitQTY}
                          type="number"
                          onChange={(e) =>
                            setGeneralData((prev) => ({
                              ...prev,
                              unitQTY:
                                parseFloat(e.target.value) > 0
                                  ? parseFloat(e.target.value)
                                  : 0,
                            }))
                          }
                        />
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            </TabPanel>
            <TabPanel value="2">
              <div className="flex flex-col gap-0 pt-2">
                {designState.sections.length > 0 &&
                  designState.selectedSectionIndex >= 0 && (
                    <h2>
                      {
                        designState.sections[designState.selectedSectionIndex]
                          .name
                      }
                    </h2>
                  )}
              </div>
            </TabPanel>
            <TabPanel value="3">Component</TabPanel>
            <TabPanel value="4">Accessories</TabPanel>
          </TabContext>
        </div>

        <div className="w-[56%] border-r border-slate-300 overflow-auto flex flex-col items-center">
          <div className="w-full h-full relative">
            {designState.sections.length === 0 ? (
              <div className="mt-10">
                <video src={AHUSimulationVideo} autoPlay={true} loop />
                <div className="overlay bg-white w-full h-10 absolute bottom-0"></div>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <div className="flex p-2 gap-3 border-b">
                  <Button
                    startIcon={<ClearIcon />}
                    size="small"
                    variant="outlined"
                    onClick={() =>
                      setDesignState((prev) => ({ ...prev, sections: [] }))
                    }
                  >
                    Clear
                  </Button>
                  <Button
                    size="small"
                    startIcon={<SettingsIcon />}
                    variant="outlined"
                    onClick={() => {
                      setDialogOptions({ open: true, type: "manageSections" });
                    }}
                  >
                    Manage Sections
                  </Button>
                </div>
                <Drawing />
              </div>
            )}
          </div>
        </div>

        <div className="w-1/6 overflow-auto">
          {/* <div className="flex"> */}
          <div className="flex flex-col pt-2">
            <h2 className="text-base font-semibold text-blue-800 pl-2">
              Sections
            </h2>
            {globalState.sections.map((section) => (
              <div
                key={section.name}
                onClick={() => {
                  setDesignState((prev) => ({
                    ...prev,
                    sections: [...prev.sections, section],
                  }));
                }}
                className="p-1 hover:bg-[#01579b] hover:text-white hover:shadow-md cursor-pointer border-b"
              >
                {section.name}
              </div>
            ))}
          </div>
          {/* <div className="flex flex-col pt-2">
              <h2 className="text-base font-semibold text-blue-800 pl-2">
                Accessories
              </h2>
              {globalState.accessories.map((accessory) => (
                <div
                  key={accessory}
                  onClick={() => {}}
                  className="p-1 hover:bg-[#01579b] hover:text-white hover:shadow-md cursor-pointer border-b"
                >
                  {accessory}
                </div>
              ))}
            </div> */}
          {/* </div> */}
        </div>
      </div>
      {dialogOptions.open ? (
        dialogOptions.type === "manageSections" ? (
          <ManageSections
            open={dialogOptions.open}
            setDialogOptions={setDialogOptions}
          />
        ) : null
      ) : null}
    </main>
  ) : (
    <LinearProgress color="inherit" />
  );
};

export default Home;
