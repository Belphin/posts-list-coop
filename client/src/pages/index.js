// react
import { useEffect, useState } from "react"
// next
import Link from "next/link"

const Home = () => {
  const postsPerPage = 8
  const [page, setPage] = useState(0)
  const [maxCount, setMaxCount] = useState()
  const [posts, setPosts] = useState([])

  const getPosts = async (postNum) => {
    await fetch("http://localhost:8080/api/post?page="+postNum+"&limit="+postsPerPage, { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if(!maxCount) setMaxCount(data.maxCount)
        setPosts([...posts, ...data.posts])
      })
  }

  useEffect(()=>{
    // set an observer
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        let observerIntervar
        if(entry.isIntersecting) setPage(page => page + .5)
        ////
        // let observerIntervar
        // if(entry.isIntersecting) observerIntervar = setInterval(()=>{setPage(page => page + .5)}, 1000)
        // else{
        //   console.log("NOT OBSERVING");
        //   clearInterval(observerIntervar)
        // }
      })
    })

    // add the observer
    const observerTrigger = document.querySelector("main.home .posts .observerTrigger")
    observer.observe(observerTrigger)
  }, [])

  useEffect(()=>{
    console.log("page: " + page);
    if(maxCount && (page * postsPerPage - postsPerPage) > maxCount) return
    if(page > 0) getPosts(page)
  }, [page])

  // useEffect(()=>{
  //   console.log(posts);
  // }, [posts])

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
        <div className="observerTrigger" />
      </div>
    </main>
  )
}

export default Home