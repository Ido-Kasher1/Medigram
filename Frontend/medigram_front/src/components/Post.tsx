import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaHeart, FaRegHeart, FaRegComment } from "react-icons/fa";
import useComments from "../hooks/useComments";
import imageService from "../services/imageService";
import useUser from "../hooks/useUser";

interface PostProps {
  owner: string;
  caption: string;
  postId: string;
  imageName: string;
}

const Post: React.FC<PostProps> = ({ owner, caption, postId, imageName }) => {
  const { comments } = useComments(postId);
  const { username, isDoctor, loading } = useUser(owner);
  const [postImg, setPostImg] = useState("./images/default_post.png");
  const [profileImg, setProfileImg] = useState("./images/default_avatar.png");
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchPostImage = async () => {
      if (imageName) {
        const url = await imageService.getPostImage(imageName, owner);
        setPostImg(url);
      }
    };

    fetchPostImage();
    // imageService.getProfileImage(owner).request
    //   .then((response) => setProfileImg(response.data.url))
    //   .catch((error: any) => console.error("Error loading profile image:", error));
  }, [postId, username, imageName, owner]);

  // Handle Like Click
  const handleLikeClick = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  return (
    <div className="card mx-auto my-3" style={{ maxWidth: "50vw" }}>
      {/* Post Header */}
      <div className="card-header d-flex align-items-center">
        <img
          src={profileImg}
          alt="Profile"
          className="rounded-circle me-2"
          width="40"
          height="40"
        />
        <strong>{username}</strong>
      </div>

      {/* Post Image */}
      <img src={postImg} className="card-img-top" alt="Post" />

      {/* Post Actions */}
      <div className="card-body">
        <div className="d-flex justify-content-between mb-2">
          <div>
            {/* Toggle Like Icon */}
            {liked ? (
              <FaHeart
                size={24}
                className="me-2 text-danger"
                onClick={handleLikeClick}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <FaRegHeart
                size={24}
                className="me-2"
                onClick={handleLikeClick}
                style={{ cursor: "pointer" }}
              />
            )}
            <FaRegComment size={24} className="me-2" />
          </div>
        </div>

        {/* Post Caption */}
        <p className="mb-1">
          <strong>{username}</strong> {caption}
        </p>

        {/* Display First 3 Comments (if any exist) */}
        {comments.length > 0 && (
          <div className="mt-2">
            {comments.slice(0, 3).map((comment, index) => (
              <p key={index} className="mb-1">
                <strong>{comment.owner}:</strong> {comment.comment}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
