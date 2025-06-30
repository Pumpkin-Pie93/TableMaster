import {Modal} from "antd"
import type {Data} from "../../../types/Data.ts"
type DeleteModal = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  data?: Data | null
}
const DeleteModal = ({isOpen,onClose, onConfirm, data}:DeleteModal) => {
  return (
	<Modal
	  title="Удалить запись"
	  closable={{ 'aria-label': 'Custom Close Button' }}
	  open={isOpen}
	  onOk={onConfirm}
	  onCancel={onClose}
	>
	  <p>Вы действительно хотите удалить запись <b>{data?.name}</b>?</p>
	</Modal>
  )
}

export default DeleteModal;