// react
import { useState } from "react"

const New = () => {
  const submitPost = async (e) => {
    e.preventDefault()
    const tags = []
    for(let i=0; i<4; i++){
      const tag = e.target.querySelector("main.new form .tags .tag_"+i).value
      if(tag) tags.push(tag)
    }
    const data = {
      title: e.target.querySelector("#title").value,
      tags: tags,
      body: e.target.querySelector("#body").value,
      author: "test"
    }
    await fetch("http://localhost:8080/api/post", {
      method: "POST",
      cache: "no-cache",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
      .then(() => document.querySelector('header .logo').click())
  }

  return (
    <main className="new wrapper">
      <form onSubmit={submitPost}>
        <input type="text" className="title" id="title" placeholder="Title..." />
        <div className="tags">
          { [...Array(4)].map((n, i)=>(
            <div className="field" key={i}>
              <div className="hashtag">#</div>
              <input type="text" className={"tag_"+i} placeholder="new tag..." />
            </div>
          )) }
        </div>
        <textarea id="body" placeholder="Write here..." />
        <nav>
          <button className="btn">Publish</button>
        </nav>
      </form>
    </main>
  )
}
 
export default New