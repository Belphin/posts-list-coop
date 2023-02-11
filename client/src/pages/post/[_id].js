// react
import { useLayoutEffect, useState } from "react"
// next
import { useRouter } from "next/router"
import Link from "next/link"
// redux
import { useDispatch, useSelector } from "react-redux"

const Post = () => {
  const dispatch = useDispatch()
  // logged
  const logged = useSelector(state => state.logged)

	const router = useRouter()
	const [post, setPost] = useState()

	const getPost = async () => {
		await fetch("http://localhost:8080/api/post/" + router.query._id, { cache: "no-store", })
			.then(res => res.json())
			.then(data => setPost(data))
	}

<<<<<<< HEAD
	useEffect(() => {
		getPost();
	}, [router.query._id]);
=======
	useLayoutEffect(()=>{
		getPost()
	}, [router])
>>>>>>> 1688d18104be3b0bd0e1a9dc2874fbadc5bf767f

	return (
		<main className="post wrapper">
			{!post && <div>Loading...</div>}
			{post && (
				<div className="post">
					<h1>{post.title}</h1>
					<ul className="tags">
						{ post.tags && post.tags.map((tag, i) => (<li key={i}>#{ tag }</li>)) }
					</ul>
					<p>{post.body}</p>
					{ logged.logged && <Link className="btn outline" href={"/post/edit/"+post._id}>Edit</Link> }
				</div>
			)}
		</main>
	)
}

export default Post
