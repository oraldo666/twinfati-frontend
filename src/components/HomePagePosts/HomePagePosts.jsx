import React, { useEffect, useState } from "react";
import "../../styles/homepageposts.style.css";
import { useDispatch, useSelector } from "react-redux";
import { getPostData } from "../../services/reducers/actions/postActions/getAllPosts";
import avatarimg from "../../assets/avatar-g.png";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import { getRefreshToken } from "../../services/reducers/actions/authActions/refreshTokenAction";

function HomePagePosts() {
  const [openPhoto, setOpenPhoto] = useState("");
  const [openModal, setOpenModal] = useState(false);

  let navigate = useNavigate();

  const status = useSelector((state) => state.createPost.status);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostData());
  }, [dispatch, status]);

  const postData = useSelector((state) => state.postData.posts.results);
  const postsLoading = useSelector((state) => state.postData.loading);
  const errMessage = useSelector((state) => state.postData.errMessage);

  const openImageFunction = (postId) => {
    console.log(postId);
    const currentPost = postData.filter((post) => post.id === postId);
    console.log(currentPost[0].post_img);
    setOpenPhoto(currentPost[0].post_img);
    setOpenModal(true);
  };

  const goToUserProfile = (userId) => {
    console.log(typeof userId);
    if (userId === parseInt(localStorage.getItem("userId"))) {
      navigate("/profile");
    } else {
      navigate(`/user/profile/${userId}`);
    }
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
                <div
                  onClick={() => goToUserProfile(post.user.id)}
                  className="post-user-profile-photo-container"
                >
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
                <div
                  className="post-user-name"
                  onClick={() => goToUserProfile(post.user.id)}
                >
                  {capitalizeFirst(post.user.first_name)}{" "}
                  {capitalizeFirst(post.user.last_name)}
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

export default HomePagePosts;
