import "./App.css";
import Post from "./components/Post";
import usePosts from "./hooks/usePosts";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Tooltip } from "bootstrap";
import { useEffect, useRef, useState } from "react";
import AddPostDialog from "./components/AddPostDialog";

  const App: React.FC = () => {
    const { posts, loading, error, addPost } = usePosts();
    const tooltipRef = useRef<HTMLButtonElement>(null);
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
      const tooltip = new Tooltip(tooltipRef.current!, {
        title: "Add New Post",
        placement: "top",
        trigger: "hover",
      });

      return () => {
        tooltip.dispose();
      };
    });

    useEffect(() => {
      if (showModal) {
        document.body.classList.add("modal-open");
      } else {
        document.body.classList.remove("modal-open");
      }
    }, [showModal]);

    return (
      <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 position-relative">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {posts.map((postItem) => (
          <Post
            key={postItem.id}
            owner={postItem.owner}
            postId={postItem.id}
            caption={postItem.content}
            imageName={postItem.imageName}
          />
        ))}
      <button
        className="btn btn-light rounded-circle p-3 shadow-lg d-flex align-items-center justify-content-center fs-3 fw-bold border border-dark position-fixed"
        style={{ width: "3vw", height: "6vh", zIndex: 1000, bottom: "10%", right: "10%", fontWeight: "bold" }}
        ref={tooltipRef}
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        data-bs-custom-class="custom-tooltip"
        data-bs-title="Add New Post"
        onClick={() => setShowModal(true)}
      >
        +
      </button>
        <AddPostDialog show={showModal} onClose={() => setShowModal(false)} onSubmit={addPost}/>
      </div>
    );
  };

  export default App;