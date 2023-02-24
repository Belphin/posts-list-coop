// axios
import axios from "axios"
// next
import Link from "next/link"

export const getServerSideProps = async (context) => {
	const data = await axios.get(`http://localhost:8080/api/post/${context.query._id}`)
		.then(res => res.data)
		.catch(e => console.log(e.response.data.message))
	return {
		props: data
	}
}

const Post = (data) => {
	return (
		<main className="post wrapper">
			<div className="post">
				<h1 className="title">{data.title}</h1>
				{ data.tags.length != 0 &&
						<ul className="tags">
							{ data.tags.map((tag, i) => {
								if(tag.length) return <li key={i}>#{tag}</li>
							}) }
						</ul>
				}
				<div className="body">
					{ data.body.includes("\n")?
							data.body.split("\n").map((paragraph, i) => <p key={i}>{paragraph}</p>)
						:
							data.body
					}
				</div>
				<Link className="btn" href={`/post/editor/${data._id}`}>Edit</Link>
			</div>
		</main>
	)
}

export default Post