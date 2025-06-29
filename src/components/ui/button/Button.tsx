import type {ReactNode} from "react"

type Button = {
  children:ReactNode
  action?: ()=> void
}
const Button = (props: Button) => {
  const {children, action} = props
  return (
	<button onClick={action}>{children}</button>
  );
};

export default Button;