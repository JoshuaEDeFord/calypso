import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store'
import { CellReservation } from './CellReservation';
import { Cell } from '../../../types';

export interface CellsState {
  reservations: {[cellId: string]: CellReservation}
}

const initialState: CellsState = {
  reservations: {}
}

export const cellsSlice = createSlice({
  name: 'cells',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addReservation: (state, action: PayloadAction<Cell>) => {
      const reservation: CellReservation = {
        cell: action.payload
      }
      state.reservations[action.payload.cellId] = reservation;
    },
    removeReservation: (state, action: PayloadAction<Cell>) => {
      const reservation: CellReservation = {
        cell: action.payload
      }
      delete state.reservations[action.payload.cellId];
    },
    toggleReservation: (state, action: PayloadAction<Cell>) => {
      const reservation: CellReservation = {
        cell: action.payload
      }
      if (action.payload.cellId in state.reservations) {
        delete state.reservations[action.payload.cellId];
      } else {
        state.reservations[action.payload.cellId] = reservation;
      }
    },
  },
})

export const { addReservation, removeReservation, toggleReservation } = cellsSlice.actions

export const selectReservations = (state: RootState) => state.cells.reservations;

export default cellsSlice.reducer
