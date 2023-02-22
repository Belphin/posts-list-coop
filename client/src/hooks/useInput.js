import { useState } from "react"

const useInput = (propValue) => {
	const [value, setValue] = useState(propValue)

	const onChange = (e) => setValue(e.target.value)
	return { value, onChange }
}

export default useInput