// react
import { useLayoutEffect, useState } from "react"

const Home = () => {
  const [posts, setPosts] = useState()

  const getPosts = async () => {
    await fetch(require("./api/posts.json"))
      .then(res => res.json())
      .then(data => console.log(data))
  }

  useLayoutEffect(()=>{
    getPosts()
  }, [])

  return(
    <main className="home wrapper">
      <div className="posts">
        <a className="post" href={"/post/" + "postID_01"}>
          <h3>Lorem, ipsum.</h3>
          <ul className="hashtags">
            <li>#lorem</li>
            <li>#ipsum</li>
          </ul>
          <div className="author">Ekaterine Mitagvaria</div>
        </a>
      </div>
    </main>
  )
}

export default Home