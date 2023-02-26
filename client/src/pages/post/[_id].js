// axios
import axios from "axios"
// react
import { useEffect, useState } from "react"
// redux
import { useSelector } from "react-redux"
// next
import Link from "next/link"

export const getServerSideProps = async (context) => {
	const post = await axios.get(`http://localhost:8080/api/post/${context.query._id}`)
		.then(res => res.data)
		.catch(e => console.log(e.response.data.message))
	return {
		props: post
	}
}

const Post = (post) => {
	const user = useSelector(state => state.user)
	const [comments, setComments] = useState()
	const [newComment, setNewComment] = useState("")

	useEffect(()=>{
		axios.get(`http://localhost:8080/api/comment/page/${post.comments}`)
			.then(res => res.data)
			.then(data => setComments(data))
			.catch(e => console.log(e.response.data.message))
		// const data = {
		// 	author: user.username,
		// 	content: "123"
		// }
		// const config = {
		// 	headers: {
		// 		Authorization: "Bearer " + user.token
		// 	}
		// }
		// axios.post(`http://localhost:8080/api/comment/${post.comments}`, data, config)
		// 	.then(res => console.log(res.data))
		// 	.catch(e => console.log(e.response.data.message))
	}, [])

	return (
		<main className="post wrapper">
			<section className="post">
				<h1 className="title">{post.title}</h1>
				{ post.tags.length != 0 &&
						<ul className="tags">
							{ post.tags.map((tag, i) => {
								if(tag.length) return <li key={i}>#{tag}</li>
							}) }
						</ul>
				}
				<div className="body">
					{ post.body.includes("\n")?
							post.body.split("\n").map((paragraph, i) => <p key={i}>{paragraph}</p>)
						:
							post.body
					}
				</div>
				<Link className="btn" href={`/post/editor/${post._id}`}>Edit</Link>
			</section>
			<section className="comments">
				<h3>Comments</h3>
				<form>
					<textarea type="text" placeholder="New comment" value={newComment} onChange={(e)=>{
						setNewComment(e.target.value)
						e.target.style.height = "100%"
						e.target.style.height = e.target.scrollHeight + "px"
					}} />
				</form>
				<div className="cont">
					{ comments?
							comments.length?
								comments.map((comment, i) => (
									<div className="comment" key={i}>
										<h4>{ comment.author }</h4>
										<p>{ comment.content }</p>
									</div>
								))
							:
								<div>No comments yet</div>
						:
							<div>Loading...</div>
					}
				</div>
			</section>
		</main>
	)
}

export default Post