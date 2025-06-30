import {DatePicker, Form, Input, InputNumber, Modal} from "antd"
import {useTableStore} from "../../../store/useTableStore.ts"
import type {Data} from "../../../types/Data.ts"
import {useEffect} from "react"
import dayjs from 'dayjs'

type NewDataModal = {
  isOpen: boolean
  onClose: () => void
  initialData?: Data | null
}
export const NewDataModal = ({isOpen, onClose, initialData}: NewDataModal) => {
  const [form] = Form.useForm()
  const addData = useTableStore((state) => state.addData)
  const updateData = useTableStore((state) => state.updateData)
  const setEditData = useTableStore((state) => state.setEditData)
  // const editData = useTableStore.getInitialState().editData

  useEffect(() => {
	// console.log('init', initialData)
	// console.log('edit', editData)
	if (initialData) {
	  form.setFieldsValue({
		name: initialData.name,
		date: dayjs(initialData.date),
		value: initialData.value,
	  });
	} else {
	  form.resetFields()
	}
  }, [initialData, form])
  const handleSubmit  = async () => {
	try {
	  const values = await form.validateFields()

	  const prepared: Data = {
		id: initialData?.id || crypto.randomUUID(),
		name: values.name.trim(),
		date: values.date.format('YYYY-MM-DD'),
		value: values.value,
	  };

	  if (initialData) {
		updateData(prepared)
		setEditData(null)
	  } else {
		addData(prepared)
	  }

	  form.resetFields()
	  onClose()
	} catch (error) {
	  console.log(error, 'invalid form')
	}
  }
  const handleCancel = () => {
	form.resetFields()
	onClose()
  }
	return (
	  <Modal
		open={isOpen}
		title={initialData ? 'Редактировать запись' : 'Добавить запись'}
		onOk={handleSubmit}
		onCancel={handleCancel}
		okText="Сохранить"
		cancelText="Отмена"
	  >
		<Form form={form} layout="vertical">
		  <Form.Item
			name="name"
			label="Имя"
			rules={[{ required: true, message: 'Пожалуйста, введите имя' }]}
		  >
			<Input />
		  </Form.Item>

		  <Form.Item
			name="date"
			label="Дата"
			rules={[{ required: true, message: 'Пожалуйста, выберите дату' }]}
		  >
			<DatePicker style={{ width: '100%' }} />
		  </Form.Item>

		  <Form.Item
			name="value"
			label="Числовое значение"
			rules={[{ required: true, message: 'Введите число' }]}
		  >
			<InputNumber style={{ width: '100%' }} />
		  </Form.Item>
		</Form>
	  </Modal>
	)
  }