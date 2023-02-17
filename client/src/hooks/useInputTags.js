import { useState } from "react"

export default () => {
	const [value, setValue] = useState("")
  const allowed = [null, '_', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

	const onChange = (e) => {
    if(!allowed.includes(e.nativeEvent.data)) setValue(e.target.value-1)
    else setValue(e.target.value)
  }
	return { value, onChange }
}