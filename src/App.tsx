import './App.css'
import DataTable from "./components/ui/table/DataTable.tsx"
import Button from "./components/ui/button/Button.tsx"
import {useState} from "react"
import {NewDataModal} from "./components/ui/modal/NewDataModal.tsx"

function App() {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false)
  return (
    <>
      <Button action={() => setIsOpenCreateModal(true)}>Add Row</Button>
      <DataTable/>
      {isOpenCreateModal && <NewDataModal isOpen={isOpenCreateModal} onClose={()=>setIsOpenCreateModal(false)}/>}
    </>

  )
}

export default App
