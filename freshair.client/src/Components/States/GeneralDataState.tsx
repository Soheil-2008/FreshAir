import React, { createContext, useContext, useState, ReactNode } from "react";

interface ContextType {
  generalData: State;
  setGeneralData: React.Dispatch<React.SetStateAction<State>>;
}

interface State {
  //! Tunnel Data
  SidesOptions: string[];
  sides: string;

  InsulationTypeOptions: string[];
  insulationType: string;

  PanelsTypeOptions: string[];
  panelsType: string;

  InnerSkinMaterialOptions: string[];
  innerSkinMaterial: string;

  InnerPanelsPaintTypeOptions: string[];
  innerPanelsPaintType: string;

  InnerPanelsPaintColorOptions: string[];
  innerPanelsPaintColor: string;

  OuterSkinMaterialOptions: string[];
  outerSkinMaterial: string;

  OuterPanelsPaintTypeOptions: string[];
  outerPanelsPaintType: string;

  OuterPanelsPaintColorOptions: string[];
  outerPanelsPaintColor: string;

  ScrewsOptions: string[];
  screws: string;

  VibrationIsolatorsOptions: string[];
  vibrationIsolators: string;

  //! Units Specifications Data
  ConstructionOptions: string[];
  construction: string;

  AHUDeckOptions: string[];
  AHUDeck: string;

  secondHeightScaling: number;

  AccessoriesOptions: string[];
  accessories: string;

  AccessoriesTypeOptions: string[];
  accessoriesType: string;

  FrameMaterialOptions: string[];
  frameMaterial: string;

  UChannelCommonBaseOptions: string[];
  UChannelCommonBase: string;

  MountedOptions: string[];
  mounted: string;

  FrameTypeOptions: string[];
  frameType: string;

  AccessTypeOptions: string[];
  accessType: string;

  DoorTypeOptions: string[];
  doorType: string;

  AccessLocationOptions: string[];
  accessLocation: string;

  //! Configurations
  ApplicationTypeOptions: string[];
  applicationType: string;

  showPrice: boolean;
  isEuroventType: boolean;

  condensingUnitHeightScaling: number;

  CurrencyOptions: string[];
  currency: string;
  currencyFactor: string;
  currencyFactorValue: number;

  unitQTY: number;

  //! Performance
  airFlow: number;
  staticPressure: number;
  coilFaceVelocity: number;
  altitude: number;

  //! Structure
  AHUTypeOptions: string[];
  AHUType: string;

  customizeStructureOptions: string[];
  customizeStructure: string;

  ModelOptions: string[];
  model: string;
}

const initialState: State = {
  //! Tunnel Data
  SidesOptions: ["25mm", "30mm", "42mm", "50mm", "60mm"],
  sides: "25mm",

  InsulationTypeOptions: ["Fiber Glass", "Rock Wool"],
  insulationType: "Fiber Glass",

  PanelsTypeOptions: ["Single", "Double"],
  panelsType: "Single",

  InnerSkinMaterialOptions: [
    "Stainless Steel Sheet 0.7mm thickness",
    "Stainless Steel Sheet 0.8mm thickness",
    "Stainless Steel Sheet 0.9mm thickness",
  ],
  innerSkinMaterial: "Stainless Steel Sheet 0.7mm thickness",

  InnerPanelsPaintTypeOptions: [
    "Electrostatic Paint",
    "Spray Paint",
    "Not Painted",
  ],
  innerPanelsPaintType: "Electrostatic Paint",

  InnerPanelsPaintColorOptions: ["Green", "RAL 6021", "Grey", "White"],
  innerPanelsPaintColor: "Green",

  OuterSkinMaterialOptions: [
    "Stainless Steel Sheet 0.7mm thickness",
    "Stainless Steel Sheet 0.8mm thickness",
    "Stainless Steel Sheet 0.9mm thickness",
  ],
  outerSkinMaterial: "Stainless Steel Sheet 0.7mm thickness",

  OuterPanelsPaintTypeOptions: [
    "Electrostatic Paint",
    "Spray Paint",
    "Not Painted",
  ],
  outerPanelsPaintType: "Electrostatic Paint",

  OuterPanelsPaintColorOptions: ["Green", "RAL 6021", "Grey", "White"],
  outerPanelsPaintColor: "Green",

  ScrewsOptions: ["Galvanized Steel", "Stainless Steel 316L"],
  screws: "Galvanized Steel",

  VibrationIsolatorsOptions: ["Rubber", "Spring"],
  vibrationIsolators: "Rubber",

  //! Units Specifications Data
  ConstructionOptions: ["Horizontal"],
  construction: "Horizontal",

  secondHeightScaling: 1,

  AHUDeckOptions: [
    "Single Deck Left To Right",
    "Single Deck Right To Left",
    "Double Deck 1LR - 2RL",
    "Double Deck 1RL - 2LR",
    "Double Deck 1RL - 2RL",
    "Double Deck 1LR - 2LR",
    "Double Deck One Fan (In First Deck)",
    "Double Deck One Fan (In Second Deck)",
  ],
  AHUDeck: "Single Deck Left To Right",

  AccessoriesOptions: ["In Door", "Out Door"],
  accessories: "In Door",

  AccessoriesTypeOptions: ["Standard Roof Canopy", "Roof Canopy With Slope"],
  accessoriesType: "Standard Roof Canopy",

  FrameMaterialOptions: ["Aluminum", "Mild", "Galvanized"],
  frameMaterial: "Aluminum",

  UChannelCommonBaseOptions: ["Floor Base Frame", "Hanged Base"],
  UChannelCommonBase: "Floor Base Frame",

  MountedOptions: ["Flat Mounted", "Curb Mounted"],
  mounted: "Flat Mounted",

  FrameTypeOptions: ["Standard Frame", "Hygienic Frame"],
  frameType: "Standard Frame",

  AccessTypeOptions: ["Door", "Panel"],
  accessType: "Door",

  DoorTypeOptions: ["Hanged", "Locker"],
  doorType: "Hanged",

  AccessLocationOptions: ["Left", "Right"],
  accessLocation: "Left",

  //! Configurations
  ApplicationTypeOptions: ["Cooling", "Heating"],
  applicationType: "Cooling",

  showPrice: true,
  isEuroventType: true,

  condensingUnitHeightScaling: 1,

  //! DB
  CurrencyOptions: [""],
  currency: "",
  currencyFactor: "",
  currencyFactorValue: 0,

  unitQTY: 1,

  //! Performance
  airFlow: 1000,
  staticPressure: 500,
  coilFaceVelocity: 2,
  altitude: 0,

  //! Structure
  AHUTypeOptions: ["Standard", "Hygienic"],
  AHUType: "Standard",

  customizeStructureOptions: ["Standard", "Customize"],
  customizeStructure: "Standard",

  ModelOptions: ["User1", "User2"],
  model: "User1",
};

const StateContext = createContext<ContextType | undefined>(undefined);

export const StateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [generalData, setGeneralData] = useState<State>(initialState);

  return (
    <StateContext.Provider value={{ generalData, setGeneralData }}>
      {children}
    </StateContext.Provider>
  );
};

export const UseGeneralDataState = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error("useStateValue must be used within a StateProvider");
  }
  return context;
};
