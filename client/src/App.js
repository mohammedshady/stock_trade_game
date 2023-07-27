import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState("");
  //_________________test request________________________
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/api/user/users")
  //     .then((response) => {
  //       setPosts(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  // console.log(posts);
  return <div className="App"></div>;
}

export default App;
