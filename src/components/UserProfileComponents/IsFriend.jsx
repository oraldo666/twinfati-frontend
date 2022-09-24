import React from "react";
import { FaUserCheck } from "react-icons/fa";
import "../../styles/UsersSearch/isfriend.styles.css";
import { BACKEND_URL } from "../../services/constants/constatns";
import { useDispatch } from "react-redux";

import { getUserMessageFriends } from "../../services/reducers/actions/messagesActions/messageFriendsAction";
import { removeFriendsAction } from "../../services/reducers/actions/friendsActions/removeFriends";

function IsFriend({ userId, freindshipId, setIsFriend }) {
  const dispatch = useDispatch();

  const removeFriendHandler = async () => {
    console.log(freindshipId);
    await removeFriendsAction(freindshipId);
    dispatch(getUserMessageFriends());
    setIsFriend(false);
  };

  return (
    <div className="is-friend-container" onClick={removeFriendHandler}>
      <FaUserCheck /> <h4 className="add-friend-text">Friends</h4>
    </div>
  );
}

export default IsFriend;
