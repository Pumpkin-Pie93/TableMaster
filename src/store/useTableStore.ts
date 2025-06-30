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
  data: [
	{date:"2025-06-30", id:"bb0f5313-af8a-44a3-b723-8e003407da09", name:"Polina", value:1},
	{date:"2025-06-29", id:"bb0f5313-af8a-44a3-b723-8e003407da45", name:"Kirill", value:2},
	{date:"2025-06-20", id:"bb0f5313-af8a-44a3-b723-8e0034507da45", name:"Vika", value:13},
	{date:"2025-06-21", id:"bb0f5313-af8a-44a3-b723-8e004567da45", name:"Veronika", value:4},
	{date:"2025-06-26", id:"bb0f5313-af8a-44a3-b723-8e0078507da45", name:"Tanya", value:23},
	{date:"2025-06-15", id:"bb0f5313-af8a-44a3-b723-8e003407d4", name:"Marya", value:21},
  ],
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
