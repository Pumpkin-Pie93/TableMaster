import { create } from 'zustand';
import type {Data} from "../types/Data.ts"

export interface StoreState {
  data: Data[];
  addData: (entry: Data) => void;
  updateData: (entry: Data) => void;
  deleteData: (id: string) => void;
}

export const useTableStore = create<StoreState>((set) => ({
  data: [],
  addData: (entry) =>
	set((state) => ({ data: [...state.data, entry] })),
  updateData: (updated) =>
	set((state) => ({
	  data: state.data.map((e) => (e.id === updated.id ? updated : e)),
	})),
  deleteData: (id) =>
	set((state) => ({ data: state.data.filter((e) => e.id !== id) })),
}));
