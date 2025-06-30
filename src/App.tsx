import './App.css'
import Button from "./components/ui/button/Button.tsx"
import {useState} from "react"
import {NewDataModal} from "./components/ui/modal/NewDataModal.tsx"
import {useTableStore} from "./store/useTableStore.ts"
import type {Data} from "./types/Data.ts"
import DeleteModal from "./components/ui/modal/DeleteModal.tsx"
import {SearchInput} from "./components/ui/input/SearchInput.tsx"
import {DataTable} from "./components/ui/table/DataTable.tsx"

function App() {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedToDelete, setSelectedToDelete] = useState<Data | null>(null)

  const deleteData = useTableStore((state) => state.deleteData)
  const editData = useTableStore((state) => state.editData)
  const setEditData = useTableStore((state) => state.setEditData)
  const searchValue = useTableStore(state => state.searchValue)
  const setSearchValue = useTableStore(state => state.setSearchValue)
  const filter = useTableStore(state => state.filter)
  const setFilter = useTableStore(state => state.setFilter)

  const editDataHandler = (data:Data | null) => {
    setEditData(data)
    setIsOpenCreateModal(true)
  }

  const handleDeleteClick = (data: Data) => {
    setSelectedToDelete(data)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    if (selectedToDelete) {
      deleteData(selectedToDelete.id)
      setSelectedToDelete(null)
      setIsDeleteModalOpen(false)
    }
  }

  return (
    <section style={{minWidth:'660px'}}>
      <div style={{display:'flex', justifyContent:'space-between', width:'100%', backgroundColor:'blueviolet', alignItems:'center'}}>
        <Button action={() => {
          setEditData(null)
          setIsOpenCreateModal(true)
        }
        }>Add Row</Button>
        <SearchInput value={searchValue} onColumnChange={setFilter} onChange={setSearchValue} selectedColumn={filter}/>
      </div>

      <DataTable onEdit={editDataHandler} onDelete={handleDeleteClick}/>
      {isOpenCreateModal &&
        <NewDataModal
          isOpen={isOpenCreateModal}
          onClose={()=>setIsOpenCreateModal(false)}
          initialData={editData}
        />
      }
      {isDeleteModalOpen &&
        <DeleteModal
          data={selectedToDelete}
          onConfirm={confirmDelete}
          isOpen={isDeleteModalOpen}
          onClose={()=>{
            setIsDeleteModalOpen(false)
            setSelectedToDelete(null)
          }}/>}
    </section>

  )
}

export default App
