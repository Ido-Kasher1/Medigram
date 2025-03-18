import { useEffect, useState } from "react";
import postService, { CanceledError, PostModel, SendPostDTO } from "../services/postService";

const usePosts = (userId?: string) => {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const { request, abort } = userId ? postService.getUserPosts(userId) : postService.getAllPosts();
    
    request
      .then((response) => {
        const transformedPosts = response.data.map((PostModel: PostModel) => ({
          _id: PostModel._id,
          title: PostModel.title,
          content: PostModel.content,
          owner: PostModel.owner,
          imageName: PostModel.imageName,
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
  }, [userId]);

  const addPost = async (newPost: SendPostDTO, image: File | null) => {
    //add post to the server
    const {post} = await postService.addPost(newPost, image);
    if (!post) {
      throw new Error("Post creation failed");
    }
    setPosts([...posts, post]);
  }

  return { posts, loading, error, addPost };
};
export default usePosts;
