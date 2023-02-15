// react
import { useEffect, useState, useRef } from "react"
// next
import Link from "next/link"

const Home = () => {
  const [observerTriggerSeen, setObserverTriggerSeen] = useState(false)
  const postsPerPage = 8
  const page = useRef(0)
  const maxCount = useRef(0)
  const [posts, setPosts] = useState([])
  const observer = useRef()
  const observerTrigger = useRef()

  const getPosts = async (postNum) => {
    await fetch("http://localhost:8080/api/post?page="+postNum+"&limit="+postsPerPage, { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if(!maxCount.current) maxCount.current = data.maxCount
        setPosts([...posts, ...data.posts])
      })
  }

  useEffect(()=>{
    // set an observer
    observer.current = new IntersectionObserver(entries => {
      const trigger = entries[0]
      const nextPostsNum = (page.current+1) * postsPerPage - postsPerPage
      if(trigger.isIntersecting && nextPostsNum <= maxCount.current) setObserverTriggerSeen(true)
      else setObserverTriggerSeen(false)
    })

    // add the observer
    observer.current.observe(observerTrigger.current)
  }, [])

  useEffect(()=>{
    if(observerTriggerSeen){
      page.current = page.current + 1
      getPosts(page.current)
    }
  }, [observerTriggerSeen])

  return(
    <main className="home wrapper">
      <div className="posts">
        { posts.length == 0?
            <div>Loading...</div>
          :
            posts.map((post, i) => (
              <Link className="post" href={"/post/" + post._id} key={i}>
                <h3>{ post.title }</h3>
                <ul className="tags">
                  { post.tags && post.tags.map((tag, i) => (<li key={i}>#{ tag }</li>)) }
                </ul>
                <div className="author">{ post.author }</div>
              </Link>
            ))
        }
        <div className="observerTrigger" ref={observerTrigger} />
      </div>
    </main>
  )
}

export default Home