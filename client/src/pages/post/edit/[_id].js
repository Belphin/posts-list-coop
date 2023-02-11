// react
import { useEffect, useLayoutEffect, useState } from "react"
// next
import { useRouter } from "next/router"

const Edit = () => {
  const router = useRouter()
  const [post, setPost] = useState()
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [deleteConfirm, setDeleteConfirm] = useState(false)

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

  const deletePost = async () => {
    await fetch("http://localhost:8080/api/post/" + router.query._id, {
      method: "DELETE",
      cache: "no-store"
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
      { deleteConfirm &&
        <div className="deleteConfirm">
          <div className="cont">
            <div className="text">
              <h3>Are you sure?</h3>
              <p>Do you really want to delete this post? This process cannot be undone.</p>
            </div>
            <nav>
              <div className="cancel btn" onClick={()=>{setDeleteConfirm(false)}}>Cancel</div>
              <button className="delete btn red" onClick={deletePost}>Delete</button>
            </nav>
          </div>
        </div>
      }
      <form onSubmit={submitPost}>
        <div>
          <h3>Title</h3>
          <input type="text" value={ title } onChange={(e)=>{setTitle(e.target.value)}} />
        </div>
        <div>
          <h3>Body</h3>
          <textarea value={ body } onChange={(e)=>{setBody(e.target.value)}} />
        </div>
        <nav>
          <div className="delete btn outline red" onClick={()=>{setDeleteConfirm(true)}}>Delete</div>
          <button className="save btn">Save</button>
        </nav>
      </form>
    </main>
  )
}
 
export default Edit