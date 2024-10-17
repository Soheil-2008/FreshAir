import React, { createContext, useContext, useState, ReactNode } from "react";

interface ContextType {
  designState: State;
  setDesignState: React.Dispatch<React.SetStateAction<State>>;
}

interface Section {
  name: string;
  width: number;
}

interface State {
  sections: Section[];
  height: number;
  depth: number;
  selectedSectionIndex: number;
}

const initialState: State = {
  sections: [],
  height: 1.8,
  depth: 1.5,
  selectedSectionIndex: -1,
};

const StateContext = createContext<ContextType | undefined>(undefined);

export const StateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [designState, setDesignState] = useState<State>(initialState);

  return (
    <StateContext.Provider value={{ designState, setDesignState }}>
      {children}
    </StateContext.Provider>
  );
};

export const UseDesignState = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error("useStateValue must be used within a StateProvider");
  }
  return context;
};
