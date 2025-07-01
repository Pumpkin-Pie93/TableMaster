import type {ReactNode} from "react"
import s from './Button.module.scss'

type Button = {
  children:ReactNode
  action?: ()=> void
}
const Button = (props: Button) => {
  const {children, action} = props
  return (
	<button className={s.button} onClick={action}>{children}</button>
  )
}

export default Button;