// src/features/progressBar/progressBarSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProgressBarState {
  activeStep: number;
  completedSteps: number[];
}

const initialState: ProgressBarState = {
  activeStep: 0,
  completedSteps: [],
};

const progressBarSlice = createSlice({
  name: "progressBar",
  initialState,
  reducers: {
    setActiveStep: (state, action: PayloadAction<number>) => {
      state.activeStep = action.payload;
    },
    setCompletedSteps: (state, action: PayloadAction<number[]>) => {
      state.completedSteps = action.payload;
    },
    moveToNextStep: (state) => {
      const steps = ["Quotations", "Order", "Challan", "Invoice"];
      if (state.activeStep < steps.length - 1) {
        state.completedSteps = [...state.completedSteps, state.activeStep];
        state.activeStep += 1;
      }
    },
    moveToPreviousStep: (state) => {
      if (state.activeStep > 0) {
        state.completedSteps = state.completedSteps.filter(
          (step) => step !== state.activeStep - 1
        );
        state.activeStep -= 1;
      }
    },
    // Action to move to a specific step (e.g., after quotation creation)
    moveToStep: (state, action: PayloadAction<number>) => {
      const steps = ["Quotations", "Order", "Challan", "Invoice"];
      const targetStep = action.payload;
      if (targetStep >= 0 && targetStep < steps.length) {
        // Mark all steps before the target as completed
        state.completedSteps = Array.from(
          { length: targetStep },
          (_, index) => index
        );
        state.activeStep = targetStep;
      }
    },
  },
});

export const {
  setActiveStep,
  setCompletedSteps,
  moveToNextStep,
  moveToPreviousStep,
  moveToStep,
} = progressBarSlice.actions;

export default progressBarSlice.reducer;
