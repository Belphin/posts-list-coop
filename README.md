# Backend Routes

# /auth

### POST:

/registration <span style='color: blue; font-weight: 700'>-----></span> registration( username, password )</br>
/login <span style='color: blue; font-weight: 700'>-----></span> login( username, password )

<hr/>

# /post

### GET:

/?limit&page <span style='color: green; font-weight: 700'>-----></span> getPage</br>
/:id <span style='color: green; font-weight: 700'>-----></span> getOne

### POST:

/ <span style='color: blue; font-weight: 700'>-----></span> create( author, body, title, <span style='color: blue'>?</span>tags<span style='color: blue'>?</span>)

### PUT:

/ <span style='color: blue; font-weight: 700'>-----></span> update( \_id, comments, author, body, title, <span style='color: blue'>?</span>tags<span style='color: blue'>?</span>)

### DELETE:

/:id <span style='color: red; font-weight: 700'>-----></span> delete

<hr/>

# /comment

### GET:

/:id <span style='color: green; font-weight: 700'>-----></span> getOne</br>
/page/:id?limit&page <span style='color: green; font-weight: 700'>-----></span>getPage</br>

### POST:

/:id <span style='color: blue; font-weight: 700'>-----></span> create( author, title )
