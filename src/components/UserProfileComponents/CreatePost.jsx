import React, { useState, useEffect } from "react";
import "../../styles/ProfilePage/createpost.styles.css";
import avatar from "../../assets/avatar-g.png";
import { createPost } from "../../services/reducers/actions/postActions/createPost";
import { useDispatch, useSelector } from "react-redux";

function CreatePost({ userImg }) {
  const [postText, setPostText] = useState("");
  const [postImg, setPostImg] = useState(null);
  const dispatch = useDispatch();

  const status = useSelector((state) => state.createPost.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(postImg, postText);
    const dataInput = { postText, postImg };
    if (postText.length < 2) {
      return;
    }
    dispatch(createPost(dataInput));
    // setPostText("");
    // setPostImg(null);
  };

  const handleImageChange = (e) => {
    const [file] = e.target.files;
    console.log(e.target.files[0].name);
    setPostImg(e.target.files[0]);
  };

  useEffect(() => {
    if (status === "fulfilled") {
      setPostText("");
      setPostImg(null);
    }
  }, [status]);

  return (
    <div className="create-post-container">
      <div className="create-post-user-img-container">
        <img
          src={userImg ? userImg : avatar}
          alt=""
          className="create-post-user-img"
        />
      </div>

      <form
        className="create-post-input-field-container"
        onSubmit={handleSubmit}
      >
        <textarea
          type="text-field"
          className="create-post-input-text-field"
          placeholder="Say something ..."
          onChange={(e) => setPostText(e.target.value)}
          value={postText}
        />
        <input
          type="file"
          id="img"
          name="img"
          className="create-post-input-image-field"
          accept="image/jpeg,image/png,image/gif"
          onChange={handleImageChange}
        />
        <label htmlFor="img" className="create-post-input-image-field-label">
          Insert Image
        </label>

        <button type="submit" className="create-post-input-post-button">
          Post
        </button>
      </form>
      {postImg && <img src={postImg} alt="" />}
    </div>
  );
}

export default CreatePost;
