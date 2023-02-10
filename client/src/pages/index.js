// react
import { useLayoutEffect, useState } from "react"

const Home = () => {
  const [posts, setPosts] = useState()
  const [authors, setAuthors] = useState()

  const getPosts = async () => {
    await fetch("https://raw.githubusercontent.com/Belphin/posts-list-coop/main/client/src/api/posts.json", {cache: 'no-store'})
      .then(res => res.json())
      // .then(data => console.log(data[0]))
      .then(data => setPosts(data))
  }
  
  const getAuthors = async () => {
    await fetch("https://raw.githubusercontent.com/Belphin/posts-list-coop/main/client/src/api/authors.json", {cache: 'no-store'})
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
            <a className="post" href={"/post/" + post._id} key={i}>
              <h3>{ post.title }</h3>
              <ul className="hashtags">
                {/* { post.tags.map((tag, i) => (<li key={i}>#{ tag }</li>)) } */}
              </ul>
              <div className="author">{ authors.find(obj => obj._id == post.author_id).name }</div>
            </a>
          ))
        }
      </div>
    </main>
  )
}

export default Home