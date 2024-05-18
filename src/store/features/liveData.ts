import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type DataPacket = {
  temp: number;
  ldr: number;
  load_voltage: number;
  load_current: number;
  solar_voltage: number;
  solar_current: number;
  battery_voltage: number;
  battery_current: number;
  timestamp: number;
};

type DataProps = {
  isConnected: boolean;
  live: DataPacket[];
  isRecording: boolean;
  recordStartDate?: number; // TimeStamp
};

const initialState = {
  isConnected: false,
  isRecording: false,
  recordStartDate: undefined,
  live: [],
} as DataProps;

export const products = createSlice({
  name: "liveData",
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<DataPacket>) => {
      state.live = [...state.live, action.payload];
    },
    clearData: (state) => {
      state.live = [];
    },
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    setRecording: (state, action: PayloadAction<boolean>) => {
      state.isRecording = action.payload;
      if (action.payload) {
        state.recordStartDate = Date.now();
      } else {
        state.recordStartDate = undefined;
      }
    },
  },
});

export const { addData, clearData, setConnected, setRecording } =
  products.actions;
export default products.reducer;
