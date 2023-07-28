import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import HomePage from "./components/startPage/HomePage";

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
  return <div > <HomePage/> </div>;
}

export default App;
