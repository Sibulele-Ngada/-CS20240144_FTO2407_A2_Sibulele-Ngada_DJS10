import { useState, useEffect } from "react";

type Post = { body: string; id: number; title: string; userId: number };

function App() {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setError(null);
        setPosts(
          data.map((post: Post) => {
            return (
              <li key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </li>
            );
          })
        );
      })
      .catch(() => {
        setError(`Data fetching failed`);
      });
  }, []);

  return (
    <>
      {!error && <h2>Posts</h2>}
      <ol>{posts}</ol>
      {error && <h1>{error}</h1>}
    </>
  );
}

export default App;
