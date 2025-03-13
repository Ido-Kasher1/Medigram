import { useEffect, useState } from "react";
import commentService, { CanceledError, Comment } from "../services/commentService";

const useComments = (postId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { request, abort } = commentService.getPostComments(postId);
    request
      .then((response) => setComments(response.data))
      .catch((error) => {
        if (!(error instanceof CanceledError)) { // Ignore cancel error
          console.error("Comment request failed", error);
          setError(error.message);
        }
      });
  
    return () => abort(); // Abort request on unmount
  }, [postId]);

  return { comments, error };
};

export default useComments;
