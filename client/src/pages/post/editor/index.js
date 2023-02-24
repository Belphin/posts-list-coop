// axios
import axios from "axios"
// react
import { useState } from "react"
// redux
import { useSelector } from "react-redux"
// next
import { useRouter } from "next/router"

const New = () => {
	const user = useSelector(state => state.user)

	const router = useRouter()

	const [title, setTitle] = useState("")
	const [body, setBody] = useState("")
	const tagsNum = 4
	const [tags, setTags] = useState(["", "", "", ""])
	const allowed = [ null, "_", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ]

	const submitPost = async (e) => {
		e.preventDefault()
		const data = {
			title,
			tags,
			body,
			author: user.username
		}
		const config = {
			headers: {
				Authorization: "Bearer " + user.token
			}
		}
		await axios.post(`http://localhost:8080/api/post`, data, config)
			.then(res => router.push(`/post/${res.data._id}`))
			.catch(e => console.log(e.response.data.message))
	}

	return (
		<main className="editor wrapper">
			<form onSubmit={submitPost}>
				<textarea
					required
					type="text"
					className="title"
					id="title"
					placeholder="Title..."
					value={title}
					onChange={(e) => {
						setTitle(e.target.value)
						e.target.style.height = e.target.scrollHeight + "px"
					}}
				/>
				<div className="tags">
					{[...Array(tagsNum)].map((x, i) => (
						<div className="field" key={i}>
							<div className="hashtag">#</div>
							<input
								type="text"
								className={"tag_" + i}
								placeholder="new tag..."
								value={tags && tags[i]}
								onPaste={(e) => {
									e.preventDefault()
								}}
								onChange={(e) => {
									if (!allowed.includes(e.nativeEvent.data))
										e.target.value = e.target.value - 1
									else {
										let tmp = [...tags]
										tmp[i] = e.target.value
										setTags(tmp)
									}
								}}
							/>
						</div>
					))}
				</div>
				<textarea
					required
					className="body"
					id="body"
					placeholder="Write here..."
					value={body}
					onChange={(e)=>{setBody(e.target.value)}}
				/>
				<nav>
					<button className="btn">Publish</button>
				</nav>
			</form>
		</main>
	)
}

export default New