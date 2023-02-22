// react
import { useEffect, useLayoutEffect, useState } from "react";
// next
import { useRouter } from "next/router";
import Link from "next/link";

const Edit = () => {
	const router = useRouter();
	const [post, setPost] = useState();
	const [title, setTitle] = useState("");
	const tagsNum = 4;
	const [tags, setTags] = useState(["", "", "", ""]);
	const allowed = [
		null,
		"_",
		"a",
		"b",
		"c",
		"d",
		"e",
		"f",
		"g",
		"h",
		"i",
		"j",
		"k",
		"l",
		"m",
		"n",
		"o",
		"p",
		"q",
		"r",
		"s",
		"t",
		"u",
		"v",
		"w",
		"x",
		"y",
		"z",
		"0",
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
	];
	const [body, setBody] = useState("");
	const [deleteConfirm, setDeleteConfirm] = useState(false);

	const getPost = async () => {
		await fetch("http://localhost:8080/api/post/" + router.query._id, {
			cache: "no-store",
		})
			.then((res) => res.json())
			.then((data) => setPost(data));
	};

	const submitPost = async (e) => {
		e.preventDefault();
		// choose only not empty tags
		const finalTags = [];
		tags.forEach((tag) => {
			if (tag) finalTags.push(tag);
		});
		await fetch("http://localhost:8080/api/post/", {
			method: "PUT",
			cache: "no-cache",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("token"),
			},
			body: JSON.stringify({
				_id: router.query._id,
				title,
				tags: finalTags,
				body,
				author: localStorage.getItem("username"),
			}),
		}).then(() =>
			document.querySelector("main.editor form nav .toPost").click()
		);
	};

	const deletePost = async () => {
		await fetch("http://localhost:8080/api/post/" + router.query._id, {
			method: "DELETE",
			cache: "no-store",
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token"),
			},
		}).then(() => document.querySelector("header .logo").click());
	};

	useLayoutEffect(() => {
		getPost();
	}, [router]);

	useEffect(() => {
		if (post && post.tags) {
			setTitle(post.title);
			const tmp = ["", "", "", ""];
			post.tags.map((item, i) => (tmp[i] = item));
			setTags(tmp);
			setBody(post.body);
		}
	}, [post]);

	return (
		<>
			{post ? (
				post.author == localStorage.getItem("username") ? (
					<main className="editor wrapper">
						{deleteConfirm && (
							<div className="deleteConfirm">
								<div className="cont">
									<div className="text">
										<h3>Are you sure?</h3>
										<p>
											Do you really want to delete this post? This process
											cannot be undone.
										</p>
									</div>
									<nav>
										<div
											className="cancel btn"
											onClick={() => {
												setDeleteConfirm(false);
											}}>
											Cancel
										</div>
										<button className="delete btn red" onClick={deletePost}>
											Delete
										</button>
									</nav>
								</div>
							</div>
						)}

						<form onSubmit={submitPost}>
							<textarea
								required
								className="title"
								id="title"
								placeholder="Title..."
								value={title && title}
								onChange={(e) => {
									setTitle(e.target.value);
									e.target.style.height = e.target.scrollHeight + "px";
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
											onPaste={(e) => e.preventDefault()}
											onChange={(e) => {
												if (!allowed.includes(e.nativeEvent.data))
													e.target.value = e.target.value - 1;
												else {
													let tmp = [...tags];
													tmp[i] = e.target.value;
													setTags(tmp);
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
								value={body && body}
								onChange={(e) => {
									setBody(e.target.value);
								}}
							/>
							<nav>
								<div
									className="delete btn outline red"
									onClick={() => {
										setDeleteConfirm(true);
									}}>
									Delete
								</div>
								<button className="save btn">Save</button>
								<Link
									className="btn hidden toPost"
									href={"/post/" + router.query._id}>
									To the post
								</Link>
							</nav>
						</form>
					</main>
				) : (
					<div className="wrapper">Forbidden 403</div>
				)
			) : (
				<div className="wrapper">Loading...</div>
			)}
		</>
	);
};

export default Edit;
