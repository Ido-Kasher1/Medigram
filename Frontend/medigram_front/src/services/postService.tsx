import { apiClient, CanceledError } from "./api-client";

export { CanceledError };

export interface PostDTO {
  _id: string;
  title: string;
  content: string;
  owner: string;
  imageName: string;
}

export interface SendPostDTO {
  title: string;
  content: string;
}

export interface PostModel {
  id: string;
  title: string;
  content: string;
  owner: string;
  imageName: string;
  profileImg: string;
}

const getAllPosts = () => {
  const abortController = new AbortController();
  const request = apiClient.get<PostDTO[]>("/posts", {
    signal: abortController.signal,
  });
  return { request, abort: () => abortController.abort() };
};

const addPost = async (newPost: SendPostDTO, image: File | null) => {
  const abortController = new AbortController();
  try {
    const response = await apiClient.post<PostDTO>("/posts", newPost, {
        signal: abortController.signal,
        headers: {
          "Content-Type": "application/json",
        },
      });
    if (response.status === 201) {
        console.log("response.data: ", response.data);
        addPostImage(image, response.data._id);
    } else {
      console.error("Failed to create post");
    }
  } catch (error) {
    if (error instanceof CanceledError) {
      console.log("Request canceled");
    } else {
      console.error("Error creating post:", error);
    }
  }

  return { abort: () => abortController.abort() };
};

const addPostImage = (image: File | null, postId : string) => {
  const abortController = new AbortController();
  const formData = new FormData();
  formData.append("file", image as Blob);
  formData.append("postId", postId);
  const request = apiClient.post<string>("/files/posts", formData, {
    signal: abortController.signal,
  });
  return { request, abort: () => abortController.abort };
};

export default { getAllPosts, addPost };
