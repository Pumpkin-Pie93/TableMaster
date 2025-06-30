import {Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {type StoreState, useTableStore} from "../../../store/useTableStore.ts"
import type {Data} from "../../../types/Data.ts"

type DataTable = {
  onEdit: (data:Data) => void
}
const DataTable = ({onEdit}:DataTable) => {
  const data = useTableStore((state: StoreState) => state.data);
  // const setEditData = useTableStore((state) => state.setEditData)
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
		  {/*<button onClick={() => console.log('Редактировать', data)}>✏️</button>*/}
		  <button onClick={() => console.log('Удалить', data)}>🗑️</button>
		</div>
	  ),
	},
  ];

  return <Table columns={columns} dataSource={data} rowKey="id"/>;
};

export default DataTable;
