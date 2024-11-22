import { useState, useEffect } from "react";

type Post = { body: string; id: number; title: string; userId: number };

function App() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((respnse) => respnse.json())
      .then((data) => {
        console.log(data);
        setPosts(
          data.map((post: Post) => {
            return <li key={post.id}>{post.title}</li>;
          })
        );
      });
  }, []);

  return (
    <>
      <h2>Posts</h2>
      <ol>{posts}</ol>
    </>
  );
}

export default App;
