import { useState, useEffect } from "react";
import { PropagateLoader } from "react-spinners";

type Post = { body: string; id: number; title: string; userId: number };

function App() {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  //
  useEffect(() => {
    setLoading(true);

    fetch(`https://jsonplaceholder.typicode.com/pots`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setError(null);
        setPosts(
          data.map((post: Post, index: number) => {
            return (
              <li key={post.id}>
                <h3>{`${index + 1}. ${post.title}`}</h3>
                <p>{post.body}</p>
              </li>
            );
          })
        );
      })
      .catch(() => {
        setError(`Data fetching failed`);
        setPosts(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Loader styles
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <>
      {!error && <h2>Posts</h2>}
      <PropagateLoader
        loading={loading}
        cssOverride={override}
        color="#4fa94d"
        size={20}
        aria-label="Loading Spinner"
      />
      <ol>{posts}</ol>
      {error && <h1>{error}</h1>}
    </>
  );
}

export default App;
