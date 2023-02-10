// reatc
import { useLayoutEffect, useState } from "react"
// next
import { useRouter } from "next/router"

const Post = () => {
  const router = useRouter()
  const [post, setPost] = useState()

  const getPost = async () => {
    await fetch("http://localhost:8080/api/post/" + router.query._id, {cache: 'no-store'})
      .then(res => res.json())
      // .then(data => console.log(data))
      .then(data => setPost(data))
  }

    useLayoutEffect(()=>{
      getPost()
      console.log(router.query)
    }, [])

  return (
    <main className="post wrapper">
      { post && post.message }
      { post && <div className="post">
        <h1>{ post.title }</h1>
      </div> }
    </main>
  )
}
 
export default Post