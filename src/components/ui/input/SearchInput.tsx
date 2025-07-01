import {Input, Select} from "antd"
import type {Filter} from "../../../store/useTableStore.ts"
import s from './SearchInput.module.scss'

type SearchInput = {
  value: string
  onChange: (value: string) => void
  selectedColumn: Filter
  onColumnChange: (value: Filter) => void
}

const options = [
  { value: 'all',label: 'Все'},
  { label: 'Имя', value: 'name' },
  { label: 'Дата', value: 'date' },
  { label: 'Число', value: 'value' },
]
export const SearchInput = ({onChange,onColumnChange, selectedColumn,value}:SearchInput) => {
  return (
	<div className={s.inputBox}>
	  <Select value={selectedColumn} onChange={onColumnChange} options={options}/>
	  <Input
		placeholder={'Поиск...'}
		value={value}
		onChange={(e) => onChange(e.target.value)}
	  />
	</div>
  )
}