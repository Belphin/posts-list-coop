// react
import { useEffect, useLayoutEffect, useState } from "react"
// next
import { useRouter } from "next/router"

const New = () => {
  const router = useRouter()
  const [post, setPost] = useState()
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  const getPost = async () => {
    await fetch("http://localhost:8080/api/post/" + router.query._id, { cache: "no-store" })
      .then(res => res.json())
      .then(data => setPost(data))
  }

  const submitPost = async (e) => {
    e.preventDefault()
    await fetch("http://localhost:8080/api/post/", {
      method: "PUT",
      cache: "no-cache",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: router.query._id,
        title: title,
        body: body,
        author: "test"
      }),
    })
      .then(() => document.querySelector('header .logo').click())
  }

  useLayoutEffect(()=>{
    getPost()
  }, [router])

  useEffect(()=>{
    if(post){
      setTitle(post.title)
      setBody(post.body)
    }
  }, [post])

  return (
    <main className="new wrapper">
      <form onSubmit={submitPost}>
        <div>
          <h3>Title</h3>
          <input type="text" value={ title } onChange={(e)=>{setTitle(e.target.value)}} />
        </div>
        <div>
          <h3>Body</h3>
          <textarea value={ body } onChange={(e)=>{setBody(e.target.value)}} />
        </div>
        <button className="btn">Save</button>
      </form>
    </main>
  )
}
 
export default New