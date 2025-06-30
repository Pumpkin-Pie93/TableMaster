import './App.css'
import DataTable from "./components/ui/table/DataTable.tsx"
import Button from "./components/ui/button/Button.tsx"
import {useState} from "react"
import {NewDataModal} from "./components/ui/modal/NewDataModal.tsx"
import {useTableStore} from "./store/useTableStore.ts"
import type {Data} from "./types/Data.ts"
import DeleteModal from "./components/ui/modal/DeleteModal.tsx"

function App() {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState<Data | null>(null);
  const deleteData = useTableStore((state) => state.deleteData);
  const editData = useTableStore((state) => state.editData)
  const setEditData = useTableStore((state) => state.setEditData)

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
    <>
      <Button action={() => {
        setEditData(null)
        setIsOpenCreateModal(true)
      }
      }>Add Row</Button>
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
    </>

  )
}

export default App
