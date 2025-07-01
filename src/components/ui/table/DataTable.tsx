import {Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {type StoreState, useTableStore} from "../../../store/useTableStore.ts"
import type {Data} from "../../../types/Data.ts"
import {useMemo} from "react"
import s from './DataTable.module.scss'

type DataTable = {
  onEdit: (data:Data) => void
  onDelete: (data:Data) => void
}
export const DataTable = ({onEdit, onDelete}:DataTable) => {
  const data = useTableStore((state: StoreState) => state.data)
  const searchValue = useTableStore((s) => s.searchValue)
  const filter = useTableStore((s) => s.filter)
  const columns: ColumnsType<Data> = [
	{
	  title: 'Имя',
	  dataIndex: 'name',
	  key: 'name',
	  sorter: (a, b) => a.name.localeCompare(b.name),
	},
	{
	  title: 'Дата',
	  dataIndex: 'date',
	  key: 'date',
	  sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
	},
	{
	  title: 'Число',
	  dataIndex: 'value',
	  key: 'value',
	  sorter: (a, b) => a.value - b.value,
	},
	{
	  title: 'Действия',
	  key: 'actions',
	  render: (_, data) => (
		<div>
		  <button onClick={() => onEdit(data)}>✏️</button>
		  <button onClick={() => onDelete(data)}>🗑️</button>
		</div>
	  ),
	},
  ]

  const filteredData = useMemo(() => {
	if (!searchValue.trim()) return data
	const searchStr = String(searchValue).toLowerCase()

	return data.filter((row) => {
	  if (filter === 'all') {
		return Object.entries(row).some(([key, val]) => {
		  if (key === 'id') return false
		  return String(val).toLowerCase().includes(searchStr)
		})
	  }

	  const field = row[filter]
	  return String(field).toLowerCase().includes(searchStr)
	})
  }, [data, filter, searchValue])


  return <Table columns={columns} dataSource={filteredData} rowKey="id" className={s.table} pagination={{pageSize:5}}/>
}