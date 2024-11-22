import { useState, useEffect } from "react";

function App() {
  const [posts, setPosts] = useState(null);

  fetch(`https://jsonplaceholder.typicode.com/posts`)
    .then((respnse) => respnse.json())
    .then((data) => {
      setPosts(
        data.map((post) => {
          return <li key={post.id}>{post.title}</li>;
        })
      );
    });

  return (
    <>
      <h2>Posts</h2>
      <ol>{posts}</ol>
    </>
  );
}

export default App;
