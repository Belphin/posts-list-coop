# Backend Routes

http://localhost:8080/api
  /post
    ?page=NUM&limit=NUM
  /comment
  /auth
    /registration
    /login




const deletePost = async () => {
  await fetch("http://localhost:8080/api/post/" + router.query._id, {
    method: "DELETE",
    cache: "no-store"
  })
    .then(() => document.querySelector('header .logo').click())
}