import {create} from 'zustand';
import type {Data} from "../types/Data.ts"

export type Filter = 'all' | 'name' | 'date' | 'value'
export interface StoreState {
  data: Data[]
  editData: Data | null
  filter: Filter
  searchValue: string
  setFilter: (filter:Filter)=>void
  setSearchValue: (value: string) => void
  addData: (data: Data) => void
  updateData: (data: Data) => void
  deleteData: (id: string) => void
  setEditData: (data: Data | null) => void
}

export const useTableStore = create<StoreState>((set) => ({
  data: [],
  editData: null,
  filter:'all',
  searchValue:'',
  addData: (data) =>
	set((state) => ({data: [...state.data, data]})),
  updateData: (updated) =>
	set((state) => ({
	  data: state.data.map((e) => (e.id === updated.id ? updated : e)),
	})),
  deleteData: (id) =>
	set((state) => ({data: state.data.filter((e) => e.id !== id)})),
  setEditData: (editData: Data | null) =>
	set(() => ({editData})),
  setFilter: (filter) => set(() => ({ filter })),
  setSearchValue: (value) => set(() => ({ searchValue: value })),
}))
