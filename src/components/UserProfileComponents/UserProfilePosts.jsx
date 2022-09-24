import React, { useEffect, useState } from "react";
import "../../styles/homepageposts.style.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserPostData } from "../../services/reducers/actions/postActions/getUserPostsAction";
import avatarimg from "../../assets/avatar-g.png";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

function UserProfilePosts({ id }) {
  const [openPhoto, setOpenPhoto] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const status = useSelector((state) => state.createPost.status);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserPostData(id));
  }, [dispatch, id, status]);

  const postData = useSelector((state) => state.searchUserPosts.posts);
  const postsLoading = useSelector((state) => state.searchUserPosts.loading);
  const errMessage = useSelector((state) => state.searchUserPosts.errMessage);

  const openImageFunction = (postId) => {
    const currentPost = postData.filter((post) => post.id === postId);
    setOpenPhoto(currentPost[0].post_img);
    setOpenModal(true);
  };

  const capitalizeFirst = (str) => {
    if (str) {
      return str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();
    }
  };

  return (
    <div>
      {Array.isArray(postData) ? (
        postData?.map((post) => (
          <div key={post.id}>
            <div className="post-user-container">
              <div className="post-user-data-container">
                <div>
                  <img
                    src={
                      post.user.profile_photo
                        ? post.user.profile_photo
                        : avatarimg
                    }
                    alt="boli"
                    className="post-user-profile-photo"
                  />
                </div>
                <div className="post-user-name">
                  {capitalizeFirst(post.user?.first_name)}{" "}
                  {capitalizeFirst(post.user?.last_name)}
                </div>
              </div>
              <div className="post-text-container">
                <p>{post.post_text}</p>
              </div>
              <div className="post-image-container">
                <img
                  src={post.post_img}
                  alt=""
                  className="post-image"
                  onClick={() => openImageFunction(post.id)}
                />
              </div>
              <div className="post-like-container">
                {post.isMine ? <AiFillHeart /> : <AiOutlineHeart />}

                {/* <p className="post-likes">{post.likes} likes</p> */}
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1 style={{ textAlign: "center" }}>
          Log in is required - {errMessage}
        </h1>
      )}
      {openModal && (
        <div
          className="post-image-modal-container"
          onClick={() => setOpenModal(false)}
        >
          <img src={openPhoto} alt="postImg" className="post-image-modal" />
        </div>
      )}
    </div>
  );
}

export default UserProfilePosts;
