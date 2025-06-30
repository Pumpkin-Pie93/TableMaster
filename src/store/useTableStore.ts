import { create } from 'zustand';
import type {Data} from "../types/Data.ts"

export interface StoreState {
  data: Data[]
  editData: Data | null
  addData: (data: Data) => void
  updateData: (data: Data) => void
  deleteData: (id: string) => void
  setEditData: (data: Data | null) => void
}

export const useTableStore = create<StoreState>((set) => ({
  data: [],
  editData:null,
  addData: (data) =>
	set((state) => ({ data: [...state.data, data] })),
  updateData: (updated) =>
	set((state) => ({
	  data: state.data.map((e) => (e.id === updated.id ? updated : e)),
	})),
  deleteData: (id) =>
	set((state) => ({ data: state.data.filter((e) => e.id !== id) })),
  setEditData:(editData:Data | null)=>
	set(()=>({editData}))
}))
