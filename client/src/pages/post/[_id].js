// axios
import axios from "axios"
// react
import { useEffect, useRef, useState } from "react"
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
	const observer = useRef()
	const observerTrigger = useRef()
	const [observerTriggerSeen, setObserverTriggerSeen] = useState(false)
	const user = useSelector(state => state.user)
	const postRef = useRef()
	const page = useRef(0)
	const commentsPerPage = 5
	const maxCount = useRef(0)
	const [comments, setComments] = useState([])
	const [newComment, setNewComment] = useState("")

	useEffect(()=>{
		// set an observer
		observer.current = new IntersectionObserver((entries) => {
			const trigger = entries[0]
			if (trigger.isIntersecting) setObserverTriggerSeen(true)
			else setObserverTriggerSeen(false)
		})

		// add the observer
		observer.current.observe(observerTrigger.current)
	}, [])

	useEffect(() => {
		if(observerTriggerSeen) addComments()
	}, [observerTriggerSeen])

	const addComments = () => {
		page.current = page.current + 1
		getComments(page.current)
	}

	const getComments = async (commentNum) => {
		// fetch comments
		await axios.get(`http://localhost:8080/api/comment/page/${post.comments}?page=${commentNum}&limit=${commentsPerPage}`)
			.then(res => res.data)
			.then(data => {
				if(!maxCount.current) maxCount.current = data.maxCount
				setComments([...comments, ...data])
			})
			.catch(e => console.log(e.response.data.message))
	}

	useEffect(() => {
		// load more comments if loaded comments do not overflow the page
		const headerHeight = document.querySelector("header").clientHeight
		if(maxCount.current && observerTrigger.current && headerHeight + postRef.current.clientHeight - 100 < window.innerHeight) addComments()
	}, [comments])

	const addComment = (e) => {
		e.preventDefault()
		const data = {
			author: user.username,
			content: newComment
		}
		const config = {
			headers: {
				Authorization: "Bearer " + user.token
			}
		}
		axios.post(`http://localhost:8080/api/comment/${post.comments}`, data, config)
			.then(res => res.data)
			.then(data => {
				setComments([{ content: data.content, author: data.author }, ...comments])
				setNewComment("")
			})
			.catch(e => console.log(e.response.data.message))
	}

	return (
		<main className="post wrapper">

			<section ref={postRef} className="post">
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
				<form onSubmit={addComment}>
					<textarea type="text" placeholder="New comment" value={newComment}
						onChange={(e)=>{
							setNewComment(e.target.value)
							e.target.style.height = "100%"
							e.target.style.height = e.target.scrollHeight + "px"
						}}
					/>
					<button className="btn">Submit</button>
				</form>
				<div className="cont">
					{
						comments.map((comment, i) => (
							<div className="comment" key={i}>
								<h4>{ comment.author }</h4>
								<p>{ comment.content }</p>
							</div>
						))
					}
				</div>
				<div className="observerTrigger" ref={observerTrigger}>Loading...</div>
			</section>

		</main>
	)
}

export default Post