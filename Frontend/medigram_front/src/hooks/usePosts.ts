import { useEffect, useState } from "react";
import postService, { CanceledError, PostDTO, PostModel, SendPostDTO } from "../services/postService";

const usePosts = () => {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const { request, abort } = postService.getAllPosts();
    request
      .then((response) => {
        const transformedPosts = response.data.map((postDTO: PostDTO) => ({
          id: postDTO._id,
          title: postDTO.title,
          content: postDTO.content,
          owner: postDTO.owner,
          imageName: postDTO.imageName,
          profileImg: "",
        }));
        
        setPosts(transformedPosts);
      })
      .catch((error) => {
        if (!(error instanceof CanceledError)) {
          setError(error.message);
        }
      })
      .finally(() => setLoading(false));

    return () => abort();
  }, []);

  const addPost = (newPost: SendPostDTO, image: File | null) => {
    //add post to the server
    postService.addPost(newPost, image)
    console.log("Post created successfully");
  }

  return { posts, loading, error, addPost };
};
export default usePosts;
