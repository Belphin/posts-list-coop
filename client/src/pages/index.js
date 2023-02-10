// react
import { useLayoutEffect, useState } from "react"

const Home = () => {
  const [posts, setPosts] = useState()
  const [authors, setAuthors] = useState()

  const getPosts = async () => {
    await fetch("https://raw.githubusercontent.com/Belphin/posts-list-coop/main/client/src/api/posts.json")
      .then(res => res.json())
      .then(data => setPosts(data))
  }
  
  const getAuthors = async () => {
    await fetch("https://raw.githubusercontent.com/Belphin/posts-list-coop/main/client/src/api/authors.json")
      .then(res => res.json())
      .then(data => setAuthors(data))
  }

  useLayoutEffect(()=>{
    getPosts()
    getAuthors()
  }, [])

  return(
    <main className="home wrapper">
      <div className="posts">
        {
          posts && authors && posts.map((post, i) => (
            <a className="post" href={"/post/" + "postID_01"} key={i}>
              <h3>{ post.title }</h3>
              <ul className="hashtags">
                <li>#lorem</li>
                <li>#ipsum</li>
              </ul>
              <div className="author">{ authors[post.author_id].name }</div>
            </a>
          ))
        }
      </div>
    </main>
  )
}

export default Home