import './App.css';

// For firebase
import React, { useState } from 'react';

import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Routes, Route, Outlet, Link, useSearchParams, useNavigate } from "react-router-dom";

// For firebase
import {database} from './firebase'
import {ref, push, child, update, query, limitToLast, onValue} from "firebase/database";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
			 <Route path="post" element={<Post />} />
          <Route path="*" element={<NoMatch />} />
	     </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
	   <Title />
      <MySidebar />
      <Outlet />
    </div>
  );
}

function MySidebar() {
  return(
    <div id="header">
      <Sidebar>
        <Menu>
          <MenuItem routerLink={<Link to="/" />}> Home </MenuItem>
			 <MenuItem routerLink={<Link to="/search" />}> Search </MenuItem>
			 <MenuItem routerLink={<Link to="/post" />}> Post </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  )
}

function Title() {
  return(
    <nav className="bg-dark navbar-dark navbar">
      <div className="row col-12 d-flex justify-content-center text-white">
        <h3>Welcome to NTUT Web Programming</h3>
      </div>
    </nav>
  )
}

function Home() {
  return (
    <div>
      <h2>This is our Home!</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  // const navigate = useNavigate();

  const handleSubmit = (event) => {
	  // navigate('/search')
  };

  return (
    <div>
      <h2>Your search term: {searchParams.get('q')}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Search:
          <input name="q" />
        </label>
		  <input type="submit" value="Submit" />
     </form>
    </div>
  );
}



function ListItem(props) {
  return <li>{props.post}</li>;
}

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      posts: [],
    };
  }

  /* TODO: finish this method */
  getPosts = () => {
    const recentPostsRef = query(ref(database, 'posts'), limitToLast(100));
    /* TODO: use the query() method */
    onValue(recentPostsRef, (snapshot) => {
       let newPosts = []
       snapshot.forEach((childSnapshot) => {
         /* TODO: parse the childSnapshot and use newPosts.push() to
         store the key and the post pair. You can use console.log() first to
         see what childSnapshot looks like. */
         const childKey = childSnapshot.key;
         const childData = childSnapshot.val().post;

         newPosts.push({childKey, childData});
         console.log({childKey, childData});
       });

		 // Save the newPosts to the state var.
       this.setState({posts: newPosts})
     }, {
		 // We only need to fetch once
       onlyOnce: true
     });
  }

  componentDidMount() {
	 /* TODO: call the method to get posts */
    this.getPosts();
  }

  handleChange = (e) => {
     const {name , value} = e.target;
     if (name == 'post') {
        this.state.post = value
     }
  }

  handleSubmit = (e) => {
    let obj = {
      post : this.state.post,
    }
    // Create a unique key for new posts
    const newPostKey = push(child(ref(database), 'posts')).key;
    const updates = {};
    updates['/posts/' + newPostKey] = obj;
    update(ref(database), updates);

    /* TODO: call the method to get the posts */
    this.getPosts();

    e.preventDefault()
  };

  render() {
    const temp = this.state.posts;
    const listPosts = temp.map((value) =>
      <ListItem key={value.childKey.toString()} post={value.childData}/>
    );
    /* TODO: convert this.state.posts into a list of <ListItem>.
    Remember to set the key and the post props */

    return (
      <div>
         <ul>
           {listPosts}
         </ul>
        <h2>Submit your post!</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            New post:
            <input name="post" onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Post!" />
       </form>
      </div>
    );
  }
}
//
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<Post />);

export default App;
