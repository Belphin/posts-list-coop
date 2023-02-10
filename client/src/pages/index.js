// react
import { useLayoutEffect, useState } from "react"
// next
import Link from "next/link"

const Home = () => {
  const [posts, setPosts] = useState()

  const getPosts = async () => {
    await fetch("http://localhost:8080/api/post", {cache: 'no-store'})
      .then(res => res.json())
      .then(data => setPosts(data))
  }

  useLayoutEffect(()=>{
    getPosts()
  }, [])

  return(
    <main className="home wrapper">
      <div className="posts">
        { !posts && <div>Loading...</div> }
        { posts && posts.message }
        {
          posts && posts.posts.map((post, i) => (
            <Link className="post" href={"/post/" + post._id} key={i}>
              <h3>{ post.title }</h3>
              <ul className="hashtags">
                { post.tags && post.tags.map((tag, i) => (<li key={i}>#{ tag }</li>)) }
              </ul>
              <div className="author">{ post.author }</div>
            </Link>
          ))
        }
      </div>
    </main>
  )
}

export default Home