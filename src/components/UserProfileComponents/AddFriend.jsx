import React from "react";
import { FaUserPlus } from "react-icons/fa";
import "../../styles/UsersSearch/isfriend.styles.css";

import { addFriendsAction } from "../../services/reducers/actions/friendsActions/addFriends";
import { getUserMessageFriends } from "../../services/reducers/actions/messagesActions/messageFriendsAction";
import { useDispatch } from "react-redux";

function AddFriend({ userId }) {
  const dispatch = useDispatch();
  const addFriendHandler = async () => {
    await dispatch(addFriendsAction(userId));
    dispatch(getUserMessageFriends());
  };

  return (
    <div className="add-friend-container" onClick={addFriendHandler}>
      <FaUserPlus /> <h4 className="add-friend-text">Add Friend</h4>
    </div>
  );
}

export default AddFriend;
