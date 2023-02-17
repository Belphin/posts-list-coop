// react
import { useLayoutEffect, useEffect, useState, useRef } from "react"
// next
import Link from "next/link"

const Home = () => {
  const [observerTriggerSeen, setObserverTriggerSeen] = useState(false)
  const postsPerPage = 8
  const page = useRef(0)
  const maxCount = useRef(0)
  const [posts, setPosts] = useState([])
  const postsRef = useRef()
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

  const addPosts = () => {
    page.current = page.current + 1
    getPosts(page.current)
  }

  useEffect(()=>{
    // set an observer
    observer.current = new IntersectionObserver(entries => {
      const trigger = entries[0]
      if(trigger.isIntersecting) setObserverTriggerSeen(true)
      else setObserverTriggerSeen(false)
    })

    // add the observer
    observer.current.observe(observerTrigger.current)
  }, [])

  useEffect(()=>{
    if(observerTriggerSeen) addPosts()
  }, [observerTriggerSeen])

  useEffect(()=>{
    // load more posts if loaded posts do not overflow the page
    if(maxCount.current && document.querySelector("header").clientHeight + postsRef.current.clientHeight - 100 < window.innerHeight) addPosts()
  }, [posts])

  return(
    <main className="home wrapper">
      <div className="posts" ref={postsRef}>
        { posts.length == 0?
            null
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
        {(page.current+1) * postsPerPage - postsPerPage <= maxCount.current && <div className="observerTrigger" ref={observerTrigger}>Loading...</div> }
      </div>
    </main>
  )
}

export default Home