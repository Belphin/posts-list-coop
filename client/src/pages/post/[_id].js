// react
import { useEffect, useLayoutEffect, useState } from "react"
// next
import { useRouter } from "next/router"
import Link from "next/link"
// redux
import { useDispatch, useSelector } from "react-redux"

const Post = () => {
	const dispatch = useDispatch()
	// logged
	const logged = useSelector((state) => state.logged)

	const router = useRouter()
	const [post, setPost] = useState()

	const getPost = async () => {
		await fetch("http://localhost:8080/api/post/" + router.query._id, {
			cache: "no-store",
		})
			.then((res) => res.json())
			.then((data) => setPost(data))
	}

	useLayoutEffect(() => {
		getPost()
	}, [router])

	return (
		<main className="post wrapper">
			{!post && <div>Loading...</div>}
			{post && (
				<div className="post">
					<h1 className="title">{post.title}</h1>
					{ post.tags && post.tags.length?
						<ul className="tags">
							{ post.tags.map((tag, i) => <li key={i}>#{tag}</li>) }
						</ul> : null
					}
					<div className="body">
						{
							post.body &&
								post.body.includes("\n")?
									post.body.split("\n").map((paragraph, i) => (
										<p key={i}>{ paragraph }</p>
									))
									:
									post.body
						}
					</div>
					{ logged.logged && <Link className="btn" href={"/post/editor/"+post._id}>Edit</Link> }
				</div>
			)}
		</main>
	)
}

export default Post
