// reatc
import { useEffect, useState } from "react";
// next
import { useRouter } from "next/router";

const Post = () => {
	const router = useRouter();
	const [post, setPost] = useState();

	const getPost = async () => {
		await fetch("http://localhost:8080/api/post/" + router.query._id, {
			cache: "no-store",
		})
			.then((res) => res.json())
			.then((data) => setPost(data));
	};

	useEffect(() => {
		getPost();
	}, [router.query._id]);

	return (
		<main className="post wrapper">
			{!post && <div>Loading...</div>}
			{post && post.message}
			{post && (
				<div className="post">
					<h1>{post.title}</h1>
					<p>{post.body}</p>
				</div>
			)}
		</main>
	);
};

export default Post;
