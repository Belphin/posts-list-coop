const Home = () => {
  return(
    <main className="home wrapper">
      <div className="posts">
        <a className="post" href={"/post/" + "postID_01"}>
          <h3>Lorem, ipsum.</h3>
          <ul className="hashtags">
            <li>#lorem</li>
            <li>#ipsum</li>
          </ul>
          <div className="author">Ekaterine Mitagvaria</div>
        </a>
        <a className="post" href={"/post/" + "postID_02"}>
          <h3>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero corporis dolorem veniam quod earum voluptate minus dolor, unde possimus fugit?</h3>
          <ul className="hashtags">
            <li>#lorem</li>
            <li>#ipsum</li>
          </ul>
          <div className="author">Ekaterine Mitagvaria</div>
        </a>
        <a className="post" href={"/post/" + "postID_03"}>
          <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi maxime officia earum repellendus autem ipsa odit tempora iure, sed pariatur consectetur ullam error iusto doloremque. Aspernatur iusto, aut quas sit harum eveniet laborum animi quos id. Ducimus nemo excepturi officia dignissimos? Dolorum nulla illo aliquam. Nesciunt repellat eveniet debitis repellendus.</h3>
          <ul className="hashtags">
            <li>#lorem</li>
            <li>#ipsum</li>
          </ul>
          <div className="author">Ekaterine Mitagvaria</div>
        </a>
      </div>
    </main>
  )
}

export default Home