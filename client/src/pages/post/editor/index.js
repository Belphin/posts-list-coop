// react
import { useState } from "react"

const New = () => {
  const tagsNum = 4
  const [tags, setTags] = useState(["", "", "", ""])
  const allowed = [null, '_', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

  const submitPost = async (e) => {
    e.preventDefault()
    // choose only not empty tags
    const finalTags = []
    tags.forEach(tag => {
      if(tag) finalTags.push(tag)
    })
    const data = {
      title: e.target.querySelector("#title").value,
      tags: finalTags,
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
          { [...Array(tagsNum)].map((x, i)=>(
            <div className="field" key={i}>
              <div className="hashtag">#</div>
              <input type="text" className={"tag_"+i} placeholder="new tag..." value={ tags && tags[i] } 
                onPaste={(e)=>{e.preventDefault()}}
                onChange={(e)=>{
                  if(!allowed.includes(e.nativeEvent.data)) e.target.value = e.target.value-1
                  else{
                    let tmp = [...tags]
                    tmp[i] = e.target.value
                    setTags(tmp)
                  }
                }
              } />
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