import './App.css'
import DataTable from "./components/ui/table/DataTable.tsx"
import Button from "./components/ui/button/Button.tsx"
import {useState} from "react"
import {NewDataModal} from "./components/ui/modal/NewDataModal.tsx"
import {useTableStore} from "./store/useTableStore.ts"
import type {Data} from "./types/Data.ts"

function App() {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false)
  const editData = useTableStore((state) => state.editData)
  const setEditData = useTableStore((state) => state.setEditData)
  const editDataHandler = (data:Data | null) => {
    console.log('before', editData)
    setEditData(data)
    setIsOpenCreateModal(true)
    console.log('after', editData)

  }

  return (
    <>
      <Button action={() => {
        setEditData(null)
        setIsOpenCreateModal(true)
      }
      }>Add Row</Button>
      <DataTable onEdit={editDataHandler}/>
      {isOpenCreateModal &&
        <NewDataModal
          isOpen={isOpenCreateModal}
          onClose={()=>setIsOpenCreateModal(false)}
          initialData={editData}
        />
      }
    </>

  )
}

export default App
