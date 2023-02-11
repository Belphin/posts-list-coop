const New = () => {
  const submitPost = async (e) => {
    e.preventDefault()
    await fetch("http://localhost:8080/api/post", {
      method: "POST",
      cache: "no-cache",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: e.target.querySelector("#title").value,
        body: e.target.querySelector("#body").value,
        author: "test"
      }),
    })
      .then(() => document.querySelector('header .logo').click())
  }

  return (
    <main className="new wrapper">
      <form onSubmit={submitPost}>
        <div>
          <h3>Title</h3>
          <input type="text" id="title" />
        </div>
        <div>
          <h3>Body</h3>
          <textarea id="body" />
        </div>
        <nav>
          <button className="btn">Save</button>
        </nav>
      </form>
    </main>
  )
}
 
export default New