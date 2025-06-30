import {Input, Select, Space} from "antd"
import type {Filter} from "../../../store/useTableStore.ts"

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
	<Space direction="vertical" size="middle" style={{flexGrow:'1', width:'100%'}}>
	  <Space.Compact>
		<Select value={selectedColumn}
				onChange={onColumnChange}
				options={options}/>
		<Input
		  placeholder={'Поиск...'}
		  value={value}
		  onChange={(e) => onChange(e.target.value)}
		/>
	  </Space.Compact>
	</Space>
  )
}