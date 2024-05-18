import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DataPacket } from "./liveData";

export type SavedDataPacket = {
  id: string;
  experimentName: string;
  recordingStartDate: number;
  recordingStopDate: number;
  states: {
    solarPanel: boolean;
    battery: boolean;
    load: boolean;
  };
  data: DataPacket[];
};

type DataProps = {
  saved: SavedDataPacket[];
};

const initialState = {
  saved: [],
} as DataProps;

export const products = createSlice({
  name: "savedData",
  initialState,
  reducers: {
    saveExperiment: (state, action: PayloadAction<SavedDataPacket>) => {
      state.saved.push(action.payload);
    },
    deleteExperiment: (state, action: PayloadAction<string>) => {
      state.saved = state.saved.filter((data) => data.id !== action.payload);
    },
  },
});

export const { saveExperiment, deleteExperiment } = products.actions;
export default products.reducer;
