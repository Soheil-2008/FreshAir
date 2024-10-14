import React, { createContext, useContext, useState, ReactNode } from "react";

interface ContextType {
  globalState: State;
  setGlobalState: React.Dispatch<React.SetStateAction<State>>;
}

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

interface User {
  id: number;
  name: string;
  token: string;
  permission: string;
  units: Unit;
}

interface Project {
  id: number;
  Name: string;
  CreatedBy: string;
  CreatedAt: string;
  Reference: string;
  Consultant: string;
  Contractor: string;
  Client: string;
  Note?: string;
}

interface Tag {
  id: string;
  name: string;
}

interface OpenedTag {
  name: string;
  inputData: object;
  sections: string[];
}

interface Section {
  name: string;
  width: number;
}

interface State {
  server: string;
  user: User;
  openedProject: Project;
  openedProjectTags: Tag[];
  openedTag: OpenedTag;
  sections: Section[];
  accessories: string[];
}

const initialState: State = {
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
  accessories: [""],
};

const StateContext = createContext<ContextType | undefined>(undefined);

export const StateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [globalState, setGlobalState] = useState<State>(initialState);

  return (
    <StateContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </StateContext.Provider>
  );
};

export const UseGlobalState = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error("useStateValue must be used within a StateProvider");
  }
  return context;
};
