# Backend routing:

<pre>
	const data = await axios.post("http://localhost:5000/api/auth/login", {"username": "test", "password": "test"});
	console.log(data);  /*
			      {
				"_id": "63e631f29ae6afc9ec09efb8",
				"username": "test",
				"password": "test",
				"__v": 0
			      }
			    */
			    
	const data = await axios.post("http://localhost:5000/api/auth/registration", {"username": "test", "password": "test"});
	console.log(data); // { message: "User was created" }
<pre>
